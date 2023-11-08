import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
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
import { Router } from '@angular/router';
import { matchingPasswordValidator } from '../../utils/validators/matching-password.validator';
import { AuthService } from '../../data-access/auth.service';

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
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../auth-base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService);

  formGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
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

    this._authService.signup({
      firstName: firstName!,
      lastName: lastName!,
      email: email!,
      password: password!,
    }).subscribe({
      next: (v) => {
        console.log(v);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
