import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { exhaustMap, take } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return authService.user$.pipe(
    take(1),
    exhaustMap((user) => {
      const token = user?.token;

      if (token) {
        const clonedRequest = req.clone({
          setParams: {
            auth: token,
          },
        });
        return next(clonedRequest);
      }

      return next(req);
    })
  );
};
