import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Blog, BlogsService, detailData } from '../blogs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-blogs-detail',
  templateUrl: './blogs-detail.component.html',
  styleUrls: ['./blogs-detail.component.scss'],
})
export class BlogsDetailComponent implements OnInit {
  fetchedData: any | Blog[] = [];
  blogId!: number;

  loading: boolean = true;
  constructor(
    private blogService: BlogsService,
    private router: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      this.blogId = Number(params.get('id'));
    });

    this.blogService.getDataById(this.blogId).subscribe(
      (data: any) => {
        this.fetchedData = data['blog'];
        this.loading = false;
      },
      (error) => {
        this.loading = true;
        alert(error);
      }
    );
  }
  back() {
    this.route.navigate(['/blogs']);
  }
}
