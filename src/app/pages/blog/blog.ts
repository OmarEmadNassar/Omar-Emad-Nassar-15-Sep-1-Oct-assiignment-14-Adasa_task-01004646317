import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { BlogService } from '../../services/blog.service';
import { BlogCard } from '../../shared/blog-card/blog-card';

const ALL = 'جميع المقالات';

@Component({
  selector: 'app-blog',
  imports: [BlogCard],
  templateUrl: './blog.html',
})
export class Blog {
  ALL = ALL;
  private blog = inject(BlogService);
  private allPosts = toSignal(this.blog.getPosts(), { initialValue: [] });
  categories = toSignal(this.blog.getData().pipe(map(d => d.categories)), { initialValue: [] });

  view = signal<'grid' | 'list'>('grid');
  activeCategory = signal(ALL);
  search = signal('');

  filtered = computed(() => {
    let list = this.allPosts();
    if (this.activeCategory() !== ALL) list = list.filter(p => p.category === this.activeCategory());
    const q = this.search().trim();
    if (q) list = list.filter(p => p.title.includes(q) || p.excerpt.includes(q));
    return list;
  });

  setCategory(c: string) { this.activeCategory.set(c); }
  setSearch(v: string) { this.search.set(v); }
}
