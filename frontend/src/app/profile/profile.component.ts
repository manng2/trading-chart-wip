import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../auth/data-access/auth.service';
import { ProfileService } from './data-access/profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatCardModule, NgIf, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProfileService],
})
export class ProfileComponent {
  private readonly _authService = inject(AuthService);
  private readonly _profileService = inject(ProfileService);

  readonly user = this._authService.user;
  readonly accountSettingsFormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
  });

  constructor() {
    effect(() => {
      this.accountSettingsFormGroup.patchValue(this.user()!);
    })
  }

  updateAccountSettings(): void {
    const { firstName, lastName, email } = this.accountSettingsFormGroup.value;
    this._profileService.updateAccountSettings(this.user()!.id, {
      firstName: firstName!,
      lastName: lastName!,
      email: email!,
    }).subscribe({
      next: (user) => {
        this.accountSettingsFormGroup.patchValue(user);
      },
      error: (error) => console.error(error)
    });
  }
}
