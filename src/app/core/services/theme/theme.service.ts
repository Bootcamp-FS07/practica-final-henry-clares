import {
  inject,
  Injectable,
  OnDestroy,
  PLATFORM_ID,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { AppTheme, Theme } from './theme.type';
import { storage } from '../../utils/storage/storage.util';

@Injectable({
  providedIn: 'root',
})
export class ThemeService implements OnDestroy {
  private _platformId = inject(PLATFORM_ID);
  private _renderer: Renderer2;
  private _document = inject(DOCUMENT);
  private _theme$ = new ReplaySubject<AppTheme>(1);
  public theme$ = this._theme$.asObservable();
  private _destroyed$ = new Subject<void>();

  constructor(rendererFactory: RendererFactory2) {
    this._renderer = rendererFactory.createRenderer(null, null);
    this.syncThemeFromStorage();
    this.toggleClassOnThemeChanges();
  }

  private syncThemeFromStorage(): void {
    if (isPlatformBrowser(this._platformId)) {
      this._theme$.next(
        storage.getItem('appTheme') === Theme.dark ? Theme.dark : Theme.light
      );
    }
  }

  private toggleClassOnThemeChanges(): void {
    this.theme$.pipe(takeUntil(this._destroyed$)).subscribe(theme => {
      if (theme === Theme.dark) {
        this._renderer.addClass(this._document.documentElement, Theme.dark);
      } else {
        if (this._document.documentElement.className.includes(Theme.dark)) {
          this._renderer.removeClass(
            this._document.documentElement,
            Theme.dark
          );
        }
      }
    });
  }

  public toggleDarkMode(): void {
    const newTheme =
      storage.getItem('appTheme') === Theme.dark ? Theme.light : Theme.dark;

    storage.setItem('appTheme', newTheme);
    this._theme$.next(newTheme);
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }
}
