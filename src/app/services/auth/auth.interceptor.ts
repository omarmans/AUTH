import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // private authService=inject(AuthService) no private key in method
  const authService = inject(AuthService);

  const token = authService.getToken;

  if (!token) {
    return next(req);
  }
  const modifiedReq = req.clone({
    params: req.params.set('auth', token), // Firebase style
    // headers: req.headers.set('Authorization', `Bearer ${token}`), //any Project
  });

  return next(modifiedReq);
};
