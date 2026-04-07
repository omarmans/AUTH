import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Blogs } from '../../../models/bolgs.interface';
import { CommonModule } from '@angular/common';
import { BlogsService } from '../../../services/Bolgs/blogs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-blogs',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-blogs.component.html',
  styleUrl: './add-blogs.component.scss',
})
export class AddBlogsComponent {
  blogForm: FormGroup;
  private blogService = inject(BlogsService);
  private router = inject(Router);
  constructor(private fb: FormBuilder) {
    this.blogForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      title: ['', [Validators.required, Validators.maxLength(100)]],
      data: ['', [Validators.required, Validators.minLength(10)]],
      date: [new Date().toISOString().split('T')[0], Validators.required],
    });
  }

  onSubmit() {
    if (this.blogForm.valid) {
      const newBlog: Blogs = this.blogForm.value;
      console.log('Blog Data:', newBlog);
      this.blogService.addBlogs(newBlog).subscribe((res: Blogs) => {
        console.log(res);
        this.router.navigate(['/blogs']);
      });

      this.blogForm.reset({ date: new Date().toISOString().split('T')[0] });
    }
  }
}
