import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { BlogData, Post } from '../models/post';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private data$: Observable<BlogData>;

  constructor(private http: HttpClient) {
    this.data$ = this.http.get<BlogData>('/data/posts.json').pipe(shareReplay(1));
  }
  getData(): Observable<BlogData> { return this.data$; }
  getPosts(): Observable<Post[]> { return this.data$.pipe(map(d => d.posts)); }
  getPost(slug: string): Observable<Post | undefined> {
    return this.data$.pipe(map(d => d.posts.find(p => p.slug === slug)));
  }
}
