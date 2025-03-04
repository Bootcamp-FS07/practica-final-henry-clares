import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { UpperCasePipe } from '@angular/common';
import { ClickOutsideDirective } from '../../../core/directives/click-outside.directive';

@Component({
  selector: 'app-avatar',
  imports: [UpperCasePipe, ClickOutsideDirective],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css',
})
export class AvatarComponent {
  openMenu = false;

  authService = inject(AuthService);

  get user() {
    return `@${this.authService.user?.username}`;
  }

  logout() {
    this.authService.logout();
  }
}
