import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, noop } from 'rxjs';
import { DataResponse } from 'src/app/core/models/data-response.model';
import { UserModel } from 'src/app/core/models/user.model';

@Injectable()
export class ProfileService {
  private readonly _http = inject(HttpClient);

  updateAccountSettings(
    id: string,
    user: Omit<UserModel, 'id'>,
  ): Observable<Omit<UserModel, 'id'>> {
    return this._http
      .put<DataResponse<UserModel>>('/profile/account-settings', {
        id,
        ...user,
      })
      .pipe(
        map((it) => ({
          firstName: it.data.firstName,
          lastName: it.data.lastName,
          email: it.data.email,
        })),
      );
  }

  changePassword(id: string, oldPassword: string, newPassword: string): Observable<void> {
    return this._http
      .put('/profile/change-password', {
        id,
        oldPassword,
        newPassword,
      })
      .pipe(map(noop));
  }
}
