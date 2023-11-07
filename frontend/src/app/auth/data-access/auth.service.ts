import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupModel } from './models/signup.model';
import { Observable, map, noop } from 'rxjs';

@Injectable()
export class AuthService {
  private readonly _httpClient = inject(HttpClient);

  signup(payload: SignupModel): Observable<void> {
    return this._httpClient.post('/api/auth/signup', payload).pipe(map(noop));
  }
}
