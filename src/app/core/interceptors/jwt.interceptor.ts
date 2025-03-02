import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { environment } from '../../../environments/environment';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const isRequestAuthorized =
    authService.isAuthenticated && req.url.startsWith(environment.baseUrl);

  if (isRequestAuthorized) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.user?.token}`,
      },
    });

    return next(clonedRequest);
  }

  return next(req);
};
