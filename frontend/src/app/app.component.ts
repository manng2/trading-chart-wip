import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/data-access/auth.service';
import { LoadingService } from './core/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService);
  private readonly _loadingService = inject(LoadingService);

  readonly user = this._authService.user;
  readonly isLoading = this._loadingService.isLoading;

  logout(): void {
    this._authService.logout();
  }

  goToHome(): void {
    this._router.navigate(['/']);
  }
}
