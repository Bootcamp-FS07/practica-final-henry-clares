import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { SignInComponent } from './features/auth/sign-in/sign-in.component';
import { SignUpComponent } from './features/auth/sign-up/sign-up.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    component: LayoutComponent,
    canMatch: [authGuard({ requiresAuthentication: false })],
    children: [
      {
        path: 'sign-in',
        component: SignInComponent,
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
      },
    ],
  },
  {
    path: '',
    component: LayoutComponent,
    canMatch: [authGuard({ requiresAuthentication: true })],
    loadChildren: async () => (await import('./features/home')).routes,
  },
];
