import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';

export interface data {
  fname: string;
  lname: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  loggedIn: boolean = this.lStorage();
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signup(user: {
    fname: string;
    lname: string;
    email: string;
    password: string;
  }) {
    return this.http.post(
      'https://blog-spot-539da-default-rtdb.firebaseio.com/.json',
      user
    );
  }

  private lStorage(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  isAuthenticated(): boolean {
    localStorage.setItem('isLoggedIn', `${this.loggedIn}`);
    return this.loggedIn;
  }
  logout() {
    this.loggedIn = false;
    this.router.navigate(['/auth']);
    localStorage.removeItem('isLoggedIn');
  }

  signUpFirebase(user: { email: string; password: string }) {
    return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBeBysRqu5nJa_wSdI1OHFiXcN15dSBjZo',
      user
    );
  }

  logInFirebase(user: { email: string; password: string }) {
    return this.http
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBeBysRqu5nJa_wSdI1OHFiXcN15dSBjZo',
        user
      )
      .pipe(
        map((response) => {
          const expiresIn = 3600000;
          // console.log(expiresIn);
          this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
          }, expiresIn);
          return response;
        })
      );
  }
}
