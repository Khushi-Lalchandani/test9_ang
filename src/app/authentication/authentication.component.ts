import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService, data } from './auth.service';
import { map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  isPasswordVisible: any;
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  form!: FormGroup;
  isLoginMode = true;
  fetched!: data[];
  error!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      fname: new FormControl(null),
      lname: new FormControl(null),
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
      this.authService
        .logInFirebase({
          email: value.email,
          password: value.password,
        })

        .subscribe(
          (data) => {
            this.error = '';
            this.authService.loggedIn = true;
            this.router.navigate(['/blogs']);
          },
          (error) => {
            this.error = error.error.error.message;
            this.router.navigate(['/auth']);
            console.log(error);
          }
        );
    } else {
      this.authService
        .signUpFirebase({
          email: value.email,
          password: value.password,
        })
        .subscribe(
          (data) => {
            this.authService
              .signup({
                fname: value.fname,
                lname: value.lname,
                email: value.email,
                password: value.password,
              })
              .subscribe((sample) => {
                console.log(sample, 'added successfully');
                window.location.reload();
              });
          },
          (error) => {
            if (error) {
              this.error = error.error.error.message;
              console.log(this.error);
            }
          }
        );
    }
    this.form.reset();
  }
}
