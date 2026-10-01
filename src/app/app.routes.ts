import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Blog } from './pages/blog/blog';
import { BlogDetails } from './pages/blog-details/blog-details';
import { About } from './pages/about/about';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: '', component: Home, title: 'عدسة | الرئيسية' },
  { path: 'home', component: Home, title: 'عدسة | الرئيسية' },
  { path: 'blog', component: Blog, title: 'عدسة | المدونة' },
  { path: 'blog/:slug', component: BlogDetails, title: 'عدسة | تفاصيل المقال' },
  { path: 'about', component: About, title: 'عدسة | من نحن' },
  { path: '**', component: NotFound, title: '404 | الصفحة غير موجودة' },
];
