import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-about',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './about.html',
})
export class About {
  authors$;
  stats = [
    { value: '15+', label: 'تصنيف' }, { value: '50+', label: 'كاتب خبير' },
    { value: '500+', label: 'مقالة منشورة' }, { value: '+2مليون', label: 'قارئ شهرياً' },
  ];
  values = [
    { icon: 'fa-bullseye', title: 'الجودة أولاً', desc: 'محتوى موثوق وعميق' },
    { icon: 'fa-bolt', title: 'تركيز عملي', desc: 'تعلّم المهارة وطبقها اليوم' },
    { icon: 'fa-handshake', title: 'المجتمع', desc: 'نتعلم مع أفضل المصورين' },
    { icon: 'fa-rotate', title: 'دائماً محدث', desc: 'نواكب أحدث التقنيات' },
  ];
  constructor(private blog: BlogService) {
    this.authors$ = this.blog.getPosts().pipe(map(ps => ps.map(p => p.author)));
  }
}
