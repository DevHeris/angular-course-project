import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface AuthResponseData {
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

  signup(user: {
    email: string;
    password: string;
  }): Observable<AuthResponseData> {
    const bodyPayload = { ...user, returnSecureToken: true };

    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp',
      bodyPayload,
      {
        params: { key: this.apiKey },
      }
    );
  }

  signin(user: {
    email: string;
    password: string;
  }): Observable<AuthResponseData> {
    const bodyPayload = { ...user, returnSecureToken: true };

    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
      bodyPayload,
      {
        params: { key: this.apiKey },
      }
    );
  }
}
