import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogsService } from '../../../services/Bolgs/blogs.service';
import { Blogs } from '../../../models/bolgs.interface';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';

@Component({
  selector: 'app-blog-detail',
  imports: [SpinnerComponent],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss',
})
export class BlogDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private blogService = inject(BlogsService);
  blog = signal<Blogs | null>(null);
  loading = signal(true);
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.blogService.getBlogById(id).subscribe({
        next: (blog) => {
          this.blog.set(blog);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.router.navigate(['/blogs']);
        },
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/blogs']);
  }
}
