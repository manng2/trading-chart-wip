import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { finalize, map } from 'rxjs';
import { AuthService } from '../auth/data-access/auth.service';
import { matchingPasswordValidator } from '../auth/utils/validators/matching-password.validator';
import { ProfileService } from './data-access/profile.service';
import { LoadingService } from '../core/services/loading.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatCardModule,
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProfileService],
})
export class ProfileComponent {
  private readonly _authService = inject(AuthService);
  private readonly _profileService = inject(ProfileService);
  private readonly _snackBar = inject(MatSnackBar);
  private readonly _loadingService = inject(LoadingService);

  readonly user = this._authService.user;
  readonly accountSettingsFormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
  });
  readonly passwordFormGroup = new FormGroup({
    oldPassword: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  isChangePasswordFormFilled = toSignal(
    this.passwordFormGroup.valueChanges.pipe(
      map((it) => Object.entries(it).every(([_, value]) => !!value)),
    ),
  );

  constructor() {
    this.passwordFormGroup.addValidators(
      matchingPasswordValidator(this.passwordFormGroup),
    );

    effect(() => {
      this.accountSettingsFormGroup.patchValue(this.user()!);
    });
  }

  updateAccountSettings(): void {
    const { firstName, lastName, email } = this.accountSettingsFormGroup.value;
    this._loadingService.start();

    this._profileService
      .updateAccountSettings(this.user()!.id, {
        firstName: firstName!,
        lastName: lastName!,
        email: email!,
      })
      .pipe(finalize(() => this._loadingService.stop()))
      .subscribe({
        next: (user) => {
          this.accountSettingsFormGroup.patchValue(user);

          // TODO: It is not a good practice to update the user in the local storage
          localStorage.setItem(
            'user',
            JSON.stringify({
              ...this.user(),
              ...user,
            }),
          );
          this._snackBar.open('Account settings updated', 'Close');
        },
        error: (error) => {
          this._snackBar.open(error.message, 'Close');
        },
      });
  }

  changePassword(): void {
    const { oldPassword, password } = this.passwordFormGroup.value;
    this._loadingService.start();

    this._profileService
      .changePassword(this.user()!.id, oldPassword!, password!)
      .pipe(finalize(() => this._loadingService.stop()))
      .subscribe({
        next: () => {
          this.passwordFormGroup.reset();
        },
        error: (error) => {
          this._snackBar.open(error.message, 'Close');
        },
      });
  }
}
