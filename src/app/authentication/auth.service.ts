import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

export interface data {
  fname: string;
  lname: string;
  email: string;
  password: string;
}

export interface responseData {
  email: string;
  password: string;
  returnSecureToken: boolean;
}
@Injectable({ providedIn: 'root' })
export class AuthService {
  loggedIn: boolean = this.lStorage();
  constructor(private http: HttpClient) {}

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

  login() {
    return this.http
      .get('https://blog-spot-539da-default-rtdb.firebaseio.com/.json')
      .pipe(
        map((user) => {
          if (user) {
            this.loggedIn = true;
          }
          return user;
        })
      );
  }
  isAuthenticated(): boolean {
    localStorage.setItem('isLoggedIn', `${this.loggedIn}`);
    return this.loggedIn;
  }
  logout() {
    this.loggedIn = false;
    localStorage.removeItem('isLoggedIn');
  }

  signUpFirebase(user: { email: string; password: string }) {
    return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBeBysRqu5nJa_wSdI1OHFiXcN15dSBjZo',
      user
    );
  }

  logInFirebase(user: {
    email: string;
    password: string;
    returnSecureToken: true;
  }) {
    return this.http.post<responseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBeBysRqu5nJa_wSdI1OHFiXcN15dSBjZo',
      user
    );
  }
}
