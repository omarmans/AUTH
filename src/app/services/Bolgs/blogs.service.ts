import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Blogs } from '../../models/bolgs.interface';
import { AuthService } from '../auth/auth.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);

  // private readonly baseUrl = signal<string>(
  //   'https://ogmholdinggroup-592cd-default-rtdb.firebaseio.com/blogs.json',
  // );
  private readonly baseUrl = signal<string>(
    'https://ogmholdinggroup-592cd-default-rtdb.firebaseio.com/blogs',
  );

  getBlogs() {
    const token = this.auth.getToken;
    return this.http.get<Blogs>(`${this.baseUrl()}.json`);
  }
  deleteAllBlogs() {
    return this.http.delete(`${this.baseUrl()}.json`);
  }
  deleteBlog(id: string) {
    return this.http.delete(`${this.baseUrl()}/${id}.json`);
  }
  addBlogs(blog: Blogs) {
    const token = this.auth.getToken;
    return this.http.post<Blogs>(`${this.baseUrl()}.json`, blog);
  }

  getBlogById(id: string): Observable<Blogs> {
    return this.http
      .get<Blogs>(`${this.baseUrl()}/${id}.json`)
      .pipe(map((blog) => ({ ...blog, id })));
  }
  constructor() {}
}
