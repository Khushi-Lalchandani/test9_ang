import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  data: any = {};
  compare: any[] = [];
  name: { fname: string; lname: string } = { fname: '', lname: '' };
  ngOnInit(): void {
    const stored = localStorage.getItem('userName');

    if (stored) {
      this.name = JSON.parse(stored);
    }
    this.authService.fetchUserDetails().subscribe((data) => {
      this.compare = [data];
    });

    this.authService.dataToCompare.subscribe((data) => {
      this.data = data;
      // console.log(this.compare, this.data);
      this.compare.forEach((i: any) => {
        // console.log(Object.keys(i));
        const keys = Object.keys(i);

        keys.forEach((key) => {
          if (
            i[key].email === this.data.email &&
            i[key].password === this.data.password
          ) {
            this.name.fname = i[key].fname;
            this.name.lname = i[key].lname;

            if (this.name.fname !== '' && this.name.lname !== '') {
              localStorage.setItem('userName', JSON.stringify(this.name));
            }
          }
        });
      });
    });
  }
  constructor(private router: Router, private authService: AuthService) {}
  logout() {
    this.authService.logout();
    localStorage.removeItem('userName');
    this.name.fname = '';
    this.name.lname = '';
    this.router.navigate(['/auth']);
  }
}
