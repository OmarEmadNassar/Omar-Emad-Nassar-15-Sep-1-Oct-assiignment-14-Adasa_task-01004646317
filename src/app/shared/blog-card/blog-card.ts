import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Post } from '../../models/post';

@Component({
  selector: 'app-blog-card',
  imports: [RouterLink],
  templateUrl: './blog-card.html',
})
export class BlogCard {
  @Input({ required: true }) post!: Post;
  @Input() layout: 'grid' | 'list' = 'grid';
}
