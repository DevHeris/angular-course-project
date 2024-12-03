import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, BehaviorSubject, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { LocalizedString } from '@angular/compiler';

export interface AuthResponseData {
  displayName?: string;
  email: string;
  expiresIn: string;
  idToken: string;
  localId: string;
  refreshToken: string;
  registered?: boolean;
  kind: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiKey: string = 'AIzaSyDpOCmdpOoLhwqivnQ3ifR_sG6o4LT4dBc';
  private http = inject(HttpClient);
  private router = inject(Router);

  user$ = new BehaviorSubject<User>(null);
  tokenExpirationTimer: any;

  signup(user: {
    email: string;
    password: string;
  }): Observable<AuthResponseData> {
    const bodyPayload = { ...user, returnSecureToken: true };

    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp',
        bodyPayload,
        {
          params: { key: this.apiKey },
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) =>
          this.handleAuthentication(
            resData.email,
            resData.localId,
            +resData.idToken,
            resData.expiresIn
          )
        )
      );
  }

  login(user: {
    email: string;
    password: string;
  }): Observable<AuthResponseData> {
    const bodyPayload = { ...user, returnSecureToken: true };

    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
        bodyPayload,
        {
          params: { key: this.apiKey },
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) =>
          this.handleAuthentication(
            resData.email,
            resData.idToken,
            +resData.expiresIn,
            resData.localId
          )
        )
      );
  }

  autoLogin(): void {
    const user: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!user) return;

    const { email, id, _token, _tokenExpirationDate } = user;

    const loadedUser = new User(
      email,
      id,
      _token,
      new Date(_tokenExpirationDate)
    );

    // i.e if the token isn't null from the User model
    if (loadedUser.token) {
      const expirationDuration =
        new Date(_tokenExpirationDate).getTime() - new Date().getTime();

      this.autoLogout(expirationDuration);
      this.user$.next(loadedUser);
    }
  }

  logout(): void {
    this.user$.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) clearTimeout(this.tokenExpirationTimer);

    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    email: string,
    token: string,
    expiresIn: number,
    uid: string
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, uid, token, expirationDate);

    // * 1000 since auto logout needs the duration in milliseconds, not seconds...
    this.autoLogout(expiresIn * 1000);
    this.user$.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An error occurred!';
    if (!errorRes.error || !errorRes.error.error)
      return throwError(() => errorRes);
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage =
          'The email address is already in use by another account!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist!';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'This password is not correct!';
        break;
    }
    return throwError(() => errorMessage);
  }
}
