import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface data {
  fname: string;
  lname: string;
  email: string;
  password: string;
}
@Injectable({ providedIn: 'root' })
export class AuthService {
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
  login() {
    return this.http.get(
      'https://blog-spot-539da-default-rtdb.firebaseio.com/.json'
    );
  }
}
