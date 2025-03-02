import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideIcons, provideNgIconsConfig } from '@ng-icons/core';

import {
  heroSun,
  heroMoon,
  heroEye,
  heroEyeSlash,
} from '@ng-icons/heroicons/outline';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideIcons({ heroSun, heroMoon, heroEye, heroEyeSlash }),
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
};
