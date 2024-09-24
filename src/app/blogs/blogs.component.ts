import { Component, OnInit } from '@angular/core';
import { Blog, BlogsService, Image, responseData } from './blogs.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
})
export class BlogsComponent implements OnInit {
  responseData: responseData[] = [];
  imageData!: Image[];
  constructor(private bservice: BlogsService, private route: Router) {}
  error!: string;
  ngOnInit(): void {
    this.bservice.fetchData().subscribe(
      (data) => {
        this.responseData = data;
        console.log(this.responseData);
      },
      (error) => {
        if (error.message) {
          this.error = error.message;
        } else {
          this.error = 'An unknown error occurred';
        }
      }
    );
    this.bservice.getImages().subscribe(
      (data: Image[]) => {
        this.imageData = data;
        console.log(this.imageData);
      },
      (error) => {
        console.log(error.message);
      }
    );
  }

  navigateTo(id: number) {
    this.route.navigate([`blogs-detail/${id}`]);
    console.log(id);
  }
}
