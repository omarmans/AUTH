import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  message = '';
  error = '';
  loading = false;

  onSubmit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.error = '';
    this.message = '';

    this.auth.resetPassword(this.form.value.email).subscribe({
      next: () => {
        this.loading = false;
        this.message = 'Password reset email sent ✔';
        setTimeout(() => {
          this.auth.logout();
        }, 2000);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.error?.message || 'Something went wrong';
      },
    });
  }
}
