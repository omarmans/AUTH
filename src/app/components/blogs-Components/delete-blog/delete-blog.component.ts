import { Component, inject, OnInit, signal } from '@angular/core';
import Swal from 'sweetalert2';
import { BlogsService } from '../../../services/Bolgs/blogs.service';
import { Blogs } from '../../../models/bolgs.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-delete-blog',
  imports: [RouterLink],
  templateUrl: './delete-blog.component.html',
  styleUrl: './delete-blog.component.scss',
})
export class DeleteBlogComponent implements OnInit {
  ngOnInit(): void {
    this.getAllBlogs();
  }
  blogService = inject(BlogsService);
  blogs = signal<Blogs[]>([]);

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

  deleteBlog(id: string) {
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: 'مش هتقدر ترجع البيانات دي تاني!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'أيوه، امسح !',
      cancelButtonText: 'إلغاء',
    }).then((result) => {
      if (result.isConfirmed) {
        this.blogService.deleteBlog(id).subscribe({
          next: (res: any) => {
            console.log('deleteBlog', res);
            this.getAllBlogs();
            Swal.fire('تم الحذف!', 'تم مسح  المقالة بنجاح.', 'success');
          },
          error: (err) => {
            Swal.fire('خطأ!', 'حصلت مشكلة أثناء الحذف، حاول تاني.', 'error');
          },
        });
      }
    });
  }
  deleteAllBlogs() {
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: 'مش هتقدر ترجع البيانات دي تاني!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'أيوه، امسح الكل!',
      cancelButtonText: 'إلغاء',
    }).then((result) => {
      if (result.isConfirmed) {
        this.blogService.deleteAllBlogs().subscribe({
          next: (res: any) => {
            console.log('deleteAllBlogs', res);
            Swal.fire('تم الحذف!', 'تم مسح جميع المقالات بنجاح.', 'success');
          },
          error: (err) => {
            Swal.fire('خطأ!', 'حصلت مشكلة أثناء الحذف، حاول تاني.', 'error');
          },
        });
      }
    });
  }
}
