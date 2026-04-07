import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { AuthResponse } from '../../../models/auth-response.model';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { AuthData } from '../../../models/AuthData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule, SpinnerComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  isLoginMode = signal<boolean>(true);
  form!: FormGroup;
  fb = inject(FormBuilder);
  showSpinner = signal<boolean>(false);
  private auth = inject(AuthService);
  errMsg = signal<string>('');
  router = inject(Router);
  onSwitchMode() {
    this.isLoginMode.update((value) => !value);
    console.log(this.isLoginMode());
  }
  ngOnInit() {
    this.buildForm();
  }
  goToForget() {
    this.router.navigate(['/forgot-password']);
  }

  buildForm() {
    this.form = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  onSubmit() {
    this.showSpinner.set(true);
    const data: AuthData = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true,
    };
    if (this.isLoginMode()) {
      this.auth.logIn(data).subscribe(
        (res: AuthResponse) => {
          this.showSpinner.set(false);
          this.errMsg.set('');
          this.auth.setToken(res.idToken, +res.expiresIn * 1000);
          this.auth.autoLogout(+res.expiresIn * 1000);
          this.router.navigate(['/blogs']);
        },
        (err) => {
          const errorMessage = err.error?.error?.message;
          this.showSpinner.set(false);
          this.errMsg.set(errorMessage);
        },
      );
    } else {
      this.auth.signUp(data).subscribe(
        (res: AuthResponse) => {
          console.log(res.refreshToken);
          this.showSpinner.set(false);
          this.isLoginMode.set(true);
        },
        (err) => {
          const errorMessage = err.error?.error?.message;
          this.showSpinner.set(false);
          this.errMsg.set(errorMessage);
        },
      );
    }
    this.form.reset();
  }
}
