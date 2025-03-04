import { Component, inject } from '@angular/core';
import { ToggleThemeComponent } from '../toggle-theme/toggle-theme.component';
import { RouterLink } from '@angular/router';
import { AvatarComponent } from '../avatar/avatar.component';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [ToggleThemeComponent, RouterLink, AvatarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  authService = inject(AuthService);

  get isAuthenticated() {
    return this.authService.isAuthenticated;
  }
}
