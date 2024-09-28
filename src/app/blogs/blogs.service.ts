import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

export interface responseData {
  userId: number;
  id: number;
  body: string;
  title: string;
}

export interface Blog {
  category: string;
  content_text: string;
  created_at: Date;
  description: string;
  id: number;
  photo_url: string;
  title: string;
  updated_at: Date;
  user_id: number;
}

export interface detailData {
  blogs: Blog[];
}

@Injectable({ providedIn: 'root' })
export class BlogsService {
  constructor(private http: HttpClient) {}

  fetchBlogDetail(offset: number = 0): Observable<detailData> {
    if (offset !== 0) {
      return this.http
        .get<detailData>(
          `https://api.slingacademy.com/v1/sample-data/blog-posts?offset=${offset}&limit=10`
        )
        .pipe(
          tap((data) => {
            return data;
          })
        );
    }
    return this.http
      .get<detailData>(
        'https://api.slingacademy.com/v1/sample-data/blog-posts?offset=0&limit=10'
      )
      .pipe(
        tap((data) => {
          return data;
        })
      );
  }
  getDataById(id: number) {
    return this.http.get(
      `https://api.slingacademy.com/v1/sample-data/blog-posts/${id}`
    );
  }
}
