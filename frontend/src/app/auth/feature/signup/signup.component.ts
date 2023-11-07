import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../auth-base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent {
  private readonly _router = inject(Router);

  goToLoginPage() {
    this._router.navigate(['/login']);
  }
}
