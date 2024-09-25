import { Component, OnInit } from '@angular/core';
import { Blog, BlogsService, Image, responseData } from './blogs.service';

import { Router } from '@angular/router';
import { PaginationDummyService } from './paginationDummy.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
})
export class BlogsComponent implements OnInit {
  responseData: responseData[] = [];
  imageData: Image[] = [];
  items: responseData[] = [];
  isLoading: boolean = false;
  currentPage = 1;
  itemsPerPage = 10;

  toggleLoading = () => (this.isLoading = !this.isLoading);
  loadData = () => {
    this.toggleLoading();
    this.pService
      .getItems(this.currentPage, this.itemsPerPage, this.responseData)
      .subscribe({
        next: (response) => {
          this.items = response;
        },
        error: (err) => console.log(err),
        complete: () => this.toggleLoading(),
      });
  };
  appendData = () => {
    this.toggleLoading();
    this.pService
      .getItems(this.currentPage, this.itemsPerPage, this.responseData)
      .subscribe({
        next: (response) => {
          this.items = [...this.items, ...response];
        },
        error: (err) => console.log(err),
        complete: () => this.toggleLoading(),
      });
  };
  onScroll = () => {
    this.currentPage += 1;
    this.appendData();
  };
  constructor(
    private bservice: BlogsService,
    private route: Router,
    private pService: PaginationDummyService
  ) {}
  error!: string;
  ngOnInit(): void {
    this.bservice.fetchData().subscribe(
      (data) => {
        this.responseData = data;
        console.log(this.responseData);
        this.loadData();
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
