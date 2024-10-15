import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Blog, BlogsService, detailData } from './blogs.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
})
export class BlogsComponent implements OnInit {
  fetchedData!: Blog[];

  onScroll = () => {
    const offset = this.fetchedData[this.fetchedData.length - 1].id;
    this.bservice.fetchBlogDetail(offset).subscribe((data: detailData) => {
      this.fetchedData = [...this.fetchedData, ...data['blogs']];
    });
  };
  constructor(
    private bservice: BlogsService,
    private route: Router,
    private router: ActivatedRoute
  ) {}
  error!: string;

  ngOnInit(): void {
    this.bservice.fetchBlogDetail().subscribe(
      (data: detailData) => {
        this.fetchedData = data['blogs'];
      },
      (error) => {
        console.log('Error fetching data', error);
      }
    );
  }

  navigateTo(id: number) {
    this.route.navigate([`blogs-detail/${id}`]);
  }
}
