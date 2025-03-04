import { Component, inject } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { ThemeService } from '../../../core/services/theme/theme.service';

@Component({
  selector: 'app-toggle-theme',
  imports: [NgIcon],
  templateUrl: './toggle-theme.component.html',
  styleUrl: './toggle-theme.component.css',
})
export class ToggleThemeComponent {
  isChecked = false;
  themeName = '';
  private _themeService = inject(ThemeService);

  constructor() {
    this.isChecked = false;
    this.changeStatus();
  }

  private changeStatus() {
    this._themeService.theme$.subscribe(theme => {
      this.themeName = theme;
    });
    if (this.themeName === 'dark') {
      this.isChecked = true;
    } else {
      this.isChecked = false;
    }
  }

  public toggleTheme(): void {
    this._themeService.toggleDarkMode();
    this.changeStatus();
  }
}
