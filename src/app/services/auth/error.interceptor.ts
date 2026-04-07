import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  return next(req).pipe(
    catchError((err) => {
      const errorMessage = err.error?.error?.message;

      if (errorMessage === 'USER_DISABLED') {
        auth.logout(); // 🔥 يخرجه فورًا
      }

      return throwError(() => err);
    }),
  );
};
