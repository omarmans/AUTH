import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AuthResponse } from '../../models/auth-response.model';
import { AuthData } from '../../models/AuthData';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private token = new BehaviorSubject<string | null>(null);
  private router = inject(Router);
  private readonly baseUrl =
    'https://identitytoolkit.googleapis.com/v1/accounts:';
  private readonly apiKey = 'AIzaSyBWkyQtVOux4klJdlT3PQu6SOiLTOrzd34';
  tokenExTime = signal<any>(null);
  //SET TOKEN
  setToken(token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn);
    this.token.next(token);
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate.toISOString());
  }
  // GET TOKEN
  get getToken() {
    return localStorage.getItem('token');
  }

  //AUTO LOGIN
  autoLogin() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expirationDate');

    if (!token || !expirationDate) return;

    const expDate = new Date(expirationDate);
    const now = new Date();

    const remainingTime = expDate.getTime() - now.getTime();

    if (remainingTime <= 0) {
      this.logout();
      return;
    }

    // رجّع التوكن
    this.token.next(token);

    // رجّع التايمر
    this.autoLogout(remainingTime);
  }
  //LOGOUT
  logout() {
    this.token.next(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate'); // 🔥 مهم

    this.router.navigate(['/']);

    if (this.tokenExTime()) {
      clearTimeout(this.tokenExTime());
    }

    this.tokenExTime.set(null);
  }
  //AUTO LOGOUT
  autoLogout(exTime: number) {
    const timer = setTimeout(() => {
      this.logout();
    }, exTime);

    this.tokenExTime.set(timer);
  }

  //SIGN UP
  signUp(data: AuthData) {
    return this.http.post<AuthResponse>(
      `${this.baseUrl}signUp?key=${this.apiKey}`,
      data,
    );
  }
  //LOG IN
  logIn(data: AuthData) {
    return this.http.post<AuthResponse>(
      `${this.baseUrl}signInWithPassword?key=${this.apiKey}`,
      data,
    );
  }

  //CHECK STATUS
  checkUser() {
    const token = this.getToken;

    return this.http.post(`${this.baseUrl}lookup?key=${this.apiKey}`, {
      idToken: token,
    });
  }

  //resetORforgetPassword
  resetPassword(email: string) {
    return this.http.post(`${this.baseUrl}sendOobCode?key=${this.apiKey}`, {
      requestType: 'PASSWORD_RESET',
      email: email,
    });
  }
  //changePassword
  changePassword(newPassword: string) {
    const token = this.getToken;

    return this.http.post(`${this.baseUrl}update?key=${this.apiKey}`, {
      idToken: token,
      password: newPassword,
      returnSecureToken: true,
    });
  }

  //login by gmail
  googleLogin() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    return signInWithPopup(auth, provider);
  }
}
