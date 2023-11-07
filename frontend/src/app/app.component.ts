import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  private readonly _router = inject(Router);

  logout(): void {
    console.log('Logout');
  }

  goToHome(): void {
    this._router.navigate(['/']);
  }
}
