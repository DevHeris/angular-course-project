import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, BehaviorSubject, tap, throwError } from 'rxjs';
import { User } from './user.model';

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

  user$ = new BehaviorSubject<User>(null);

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

  private handleAuthentication(
    email: string,
    token: string,
    expiresIn: number,
    uid: string
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, uid, token, expirationDate);
    this.user$.next(user);
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
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct!';
        break;
    }
    return throwError(() => errorMessage);
  }
}
