import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

export interface responseData {
  userId: number;
  id: number;
  body: string;
  title: string;
}
export interface Image {
  author: string;
  download_url: string;
  height: number;
  id: string;
  url: string;
  width: number;
}
export interface Blog {
  category: string;
  content_text: string;
  created_at: Date;
  description: string;
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
  fetchData() {
    return this.http.get<responseData[]>(
      'https://jsonplaceholder.typicode.com/posts'
    );
  }

  fetchBlogDetail(): Observable<detailData> {
    return this.http
      .get<detailData>(
        'https://api.slingacademy.com/v1/sample-data/blog-posts?offset=0&limit=100'
      )
      .pipe(
        tap((data) => {
          return data;
        })
      );
  }
  getDataById(id: number) {
    return this.http.get<Blog>(
      `https://api.slingacademy.com/v1/sample-data/blog-posts/${id}`
    );
  }
  getImages() {
    return this.http.get<Image[]>(
      `https://picsum.photos/v2/list?page=2&limit=100`
    );
  }
}
