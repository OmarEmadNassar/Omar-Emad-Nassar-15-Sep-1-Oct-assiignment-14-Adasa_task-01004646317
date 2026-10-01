import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { BlogCard } from '../../shared/blog-card/blog-card';
import { Post } from '../../models/post';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe, RouterLink, BlogCard],
  templateUrl: './home.html',
})
export class Home {
  data$;
  stats = [
    { icon: 'fa-file-lines', value: '50+', label: 'مقالة' },
    { icon: 'fa-users', value: '+10ألف', label: 'قارئ' },
    { icon: 'fa-folder', value: '4', label: 'تصنيفات' },
    { icon: 'fa-pen', value: '6', label: 'كتّاب' },
  ];
  constructor(private blog: BlogService) { this.data$ = this.blog.getData(); }
  featured(posts: Post[]) { return posts.filter(p => p.featured).slice(0, 3); }
  latest(posts: Post[]) { return posts.slice(3, 6); }
}
