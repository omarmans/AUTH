import { Component, inject, OnInit, signal } from '@angular/core';
import { Blogs } from '../../../models/bolgs.interface';
import { BlogsService } from '../../../services/Bolgs/blogs.service';

@Component({
  selector: 'app-blogs',
  imports: [],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
})
export class BlogsComponent implements OnInit {
  ngOnInit(): void {
    this.getAllBlogs();
  }
  blogs = signal<Blogs[]>([]);
  blogService = inject(BlogsService);

  getAllBlogs() {
    this.blogService.getBlogs().subscribe((res: any) => {
      const blogsArray: Blogs[] = [];

      for (const key in res) {
        blogsArray.push({
          id: key,
          ...res[key],
        });
      }

      this.blogs.set(blogsArray);
    });
  }
}
