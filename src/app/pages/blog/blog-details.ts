import { Component, Input, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { BlogService } from '../../services/blog.service';
import { BlogCard } from '../../shared/blog-card/blog-card';
import { Post } from '../../models/post';

interface Section { heading?: string; text: string; }

@Component({
  selector: 'app-blog-details',
  imports: [RouterLink, BlogCard],
  templateUrl: './blog-details.html',
})
export class BlogDetails {
  @Input() slug = '';

  scrollToParagraph(event: MouseEvent, index: number): void {
    event.preventDefault();
    const paragraphId = `paragraph-${index + 1}`;
    if (window.location.hash !== `#${paragraphId}`) {
      window.history.pushState(window.history.state, '', `#${paragraphId}`);
    }
    document.getElementById(`paragraph-${index + 1}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private blog = inject(BlogService);
  private data = toSignal(this.blog.getData());
  loaded = computed(() => !!this.data());
  post = computed<Post | undefined>(() => this.data()?.posts.find(p => p.slug === this.slug));

  intro = computed(() => {
    const blocks = this.post()?.content.split('\n\n') ?? [];
    return blocks[0]?.startsWith('## ') ? '' : blocks[0];
  });

  sections = computed<Section[]>(() => {
    const blocks = this.post()?.content.split('\n\n') ?? [];
    const result: Section[] = [];
    let current: Section | null = null;
    for (const b of blocks) {
      if (b.startsWith('## ')) {
        current = { heading: b.slice(3), text: '' };
        result.push(current);
      } else if (current) {
        current.text = current.text ? current.text + ' ' + b : b;
      }
    }
    return result;
  });

  related = computed(() => {
    const p = this.post();
    const all = this.data()?.posts ?? [];
    if (!p) return [];
    const sameCategory = all.filter(x => x.id !== p.id && x.category === p.category);
    const rest = all.filter(x => x.id !== p.id && x.category !== p.category);
    return [...sameCategory, ...rest].slice(0, 3);
  });

}
