import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupModel } from './models/signup.model';
import { Observable, map, noop, tap } from 'rxjs';
import { UserModel } from 'src/app/core/models/user.model';
import { DataResponse } from 'src/app/core/models/data-response.model';
import { LoginModel } from './models/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _httpClient = inject(HttpClient);

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
}
