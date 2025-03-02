import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpStatusCode,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { catchError, throwError } from 'rxjs';

export const serverErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (
        [HttpStatusCode.Unauthorized, HttpStatusCode.Forbidden].includes(
          error.status
        )
      ) {
        authService.logout();
        router.navigateByUrl('/auth/sign-in');
      }

      return throwError(() => error);
    })
  );
};
