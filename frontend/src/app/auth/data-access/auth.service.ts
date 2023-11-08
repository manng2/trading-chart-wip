import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupModel } from './models/signup.model';
import { Observable, map, noop, tap } from 'rxjs';
import { UserModel } from 'src/app/core/models/user.model';
import { DataResponse } from 'src/app/core/models/data-response.model';
import { LoginModel } from './models/login.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _router = inject(Router);

  readonly user: WritableSignal<UserModel | null> =
    signal(null);

  signup(payload: SignupModel): Observable<void> {
    return this._httpClient.post<DataResponse<UserModel>>('/auth/signup', payload).pipe(
      tap(({ data }) => {
        this.user.set(data);
        localStorage.setItem('user', JSON.stringify(data));
      }),
      map(noop),
    );
  }

  login(payload: LoginModel): Observable<void> {
    return this._httpClient.post<DataResponse<UserModel>>('/auth/login', payload).pipe(
      tap(({ data }) => {
        this.user.set(data);
        localStorage.setItem('user', JSON.stringify(data));
      }),
      map(noop),
    );
  }

  logout(): void {
    this.user.set(null);
    localStorage.removeItem('user');
    this._router.navigate(['/login']);
  }
}
