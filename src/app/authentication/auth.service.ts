import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {}

  signup(user: {
    fname: string;
    lname: string;
    email: string;
    password: string;
  }) {
    this.http.post(
      'https://blog-spot-539da-default-rtdb.firebaseio.com/',
      user
    );
    this.isLoggedIn.next(true);
  }
  login() {
    this.isLoggedIn.next(true);
  }
  isAuthenticated() {
    return this.isLoggedIn.value;
  }
}
