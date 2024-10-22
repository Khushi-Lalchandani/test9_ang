import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './authentication/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'test9';
  constructor(private router: Router, private authService: AuthService) {
    this.checkAuthentication();
  }

  private checkAuthentication() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/blogs']);
    } else {
      this.router.navigate(['/auth']);
    }
  }
}
