import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/data-access/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService);

  readonly user = this._authService.user;

  logout(): void {
    console.log('Logout');
  }

  goToHome(): void {
    this._router.navigate(['/']);
  }
}
