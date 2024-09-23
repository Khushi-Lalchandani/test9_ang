import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  form!: FormGroup;
  isLoginMode = true;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    console.log(this.isLoginMode);

    this.form = new FormGroup({
      fname: new FormControl(null, [Validators.required]),
      lname: new FormControl(null, [Validators.required]),

      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit() {
    const value = this.form.value;
    if (this.isLoginMode) {
    } else {
      this.authService.signup({
        fname: value.fname,
        lname: value.lname,
        email: value.email,
        password: value.password,
      });
    }
  }
}
// https://blog-spot-539da-default-rtdb.firebaseio.com/
