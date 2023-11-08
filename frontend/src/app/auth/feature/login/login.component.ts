import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../data-access/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../auth-base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService);
  private readonly _snackBar = inject(MatSnackBar);

  readonly formGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  goToSignUpPage(): void {
    this._router.navigate(['/signup']);
  }

  login(): void {
    const { email, password } = this.formGroup.value;

    this._authService.login({
      email: email!,
      password: password!,
    }).subscribe({
      next: () => {
        this._snackBar.open('Login successful', 'Close');
        this._router.navigate(['/']);
      },
      error: (error) => {
        this._snackBar.open(error.message, 'Close');
      }
    });
  }
}
