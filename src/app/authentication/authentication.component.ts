import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService, data } from './auth.service';
import { map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

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
  isLoggedIn: boolean = false;
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
        .login()
        .pipe(
          map((user) => {
            return Object.values(user);
          })
        )
        .subscribe((user) => {
          this.fetched = user;

          for (let i of user) {
            if (value.email === i.email && value.password === i.password) {
              this.isLoggedIn = true;
              this.authService.authenticated.next(true);
              if (this.authService.authenticated.value) {
                this.router.navigate(['/blogs'], { relativeTo: this.route });
              }
            }
          }
        });
    } else {
      this.authService
        .signup({
          fname: value.fname,
          lname: value.lname,
          email: value.email,
          password: value.password,
        })
        .subscribe(
          (sample) => {
            console.log(sample, 'added successfully');
          },
          (error) => {
            console.log('Cannot fulfil request', error);
          }
        );
    }
  }
}
