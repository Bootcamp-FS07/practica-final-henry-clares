import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { provideIcons, provideNgIconsConfig } from '@ng-icons/core';

import {
  heroSun,
  heroMoon,
  heroEye,
  heroEyeSlash,
  heroEllipsisVertical,
  heroTrash,
  heroPencilSquare,
} from '@ng-icons/heroicons/outline';
import { serverErrorInterceptor } from './core/interceptors/server-error.interceptor';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([serverErrorInterceptor, jwtInterceptor])
    ),
    provideIcons({
      heroSun,
      heroMoon,
      heroEye,
      heroEyeSlash,
      heroEllipsisVertical,
      heroTrash,
      heroPencilSquare,
    }),
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
};
