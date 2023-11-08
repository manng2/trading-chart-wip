import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
    canActivate: [authGuard(false)],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/feature/login/login.component').then(
        (m) => m.LoginComponent,
      ),
    canActivate: [authGuard(true)],
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./auth/feature/signup/signup.component').then(
        (m) => m.SignupComponent,
      ),
    canActivate: [authGuard(true)],
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/profile.component').then((m) => m.ProfileComponent),
    canActivate: [authGuard(false)],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
