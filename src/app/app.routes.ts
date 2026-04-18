import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth/auth.component';
import { authGuard } from './services/auth/auth.guard';
import { noAuthGuard } from './services/auth/no-auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent, canActivate: [noAuthGuard] },
  {
    path: 'blogs',
    loadComponent: () =>
      import('./components/blogs-Components/blogs/blogs.component').then(
        (m) => m.BlogsComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'add-blog',
    loadComponent: () =>
      import('./components/blogs-Components/add-blogs/add-blogs.component').then(
        (m) => m.AddBlogsComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'delete-blog',
    loadComponent: () =>
      import('./components/blogs-Components/delete-blog/delete-blog.component').then(
        (m) => m.DeleteBlogComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'blog/:id',
    loadComponent: () =>
      import('./components/blogs-Components/blog-detail/blog-detail.component').then(
        (m) => m.BlogDetailComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./components/auth/forgot-password/forgot-password.component').then(
        (m) => m.ForgotPasswordComponent,
      ),
    canActivate: [noAuthGuard],
  },
  {
    path: 'change-password',
    loadComponent: () =>
      import('./components/auth/change-password/change-password.component').then(
        (m) => m.ChangePasswordComponent,
      ),
    canActivate: [authGuard],
  },
];
