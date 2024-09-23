import {
  Component,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Blog, BlogsService, detailData } from '../blogs.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-blogs-detail',
  templateUrl: './blogs-detail.component.html',
  styleUrls: ['./blogs-detail.component.scss'],
})
export class BlogsDetailComponent implements OnInit {
  fetchedData: Blog[] = [];
  blogId!: number;
  specificData!: any | Blog[];

  loading: boolean = true;
  constructor(
    private blogService: BlogsService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      this.blogId = Number(params.get('id'));
    });
    this.blogService.fetchBlogDetail().subscribe(
      (data: detailData) => {
        this.fetchedData = data['blogs'];
        this.specificData = this.fetchedData[this.blogId];
        console.log(this.specificData);

        this.loading = false;
      },
      (error) => {
        this.loading = true;
        console.log('Error fetching data', error);
      }
    );
  }
}
