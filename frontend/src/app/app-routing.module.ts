import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/feature/login/login.component').then(
        (m) => m.LoginComponent,
      ),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./auth/feature/signup/signup.component').then(
        (m) => m.SignupComponent,
      ),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/profile.component').then((m) => m.ProfileComponent),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
