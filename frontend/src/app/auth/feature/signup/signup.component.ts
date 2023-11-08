import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
import { Router } from '@angular/router';
import { AuthService } from '../../data-access/auth.service';
import { matchingPasswordValidator } from '../../utils/validators/matching-password.validator';
import { LoadingService } from 'src/app/core/services/loading.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgIf,
    MatSnackBarModule,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../auth-base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService);
  private readonly _snackBar = inject(MatSnackBar);
  private readonly _loadingService = inject(LoadingService);

  readonly formGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  constructor() {
    this.formGroup.addValidators(matchingPasswordValidator(this.formGroup));
  }

  goToLoginPage(): void {
    this._router.navigate(['/login']);
  }

  signup(): void {
    const { firstName, lastName, email, password } = this.formGroup.value;
    this._loadingService.start();

    this._authService
      .signup({
        firstName: firstName!,
        lastName: lastName!,
        email: email!,
        password: password!,
      })
      .pipe(finalize(() => this._loadingService.stop()))
      .subscribe({
        next: () => {
          this._snackBar.open('Signup successful', 'Close');
          this._router.navigate(['/']);
        },
        error: (error) => {
          this._snackBar.open(error.message, 'Close');
        },
      });
  }
}
