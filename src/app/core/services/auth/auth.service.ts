import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { User } from './auth.type';
import { BehaviorSubject, tap } from 'rxjs';
import { storage } from '../../utils/storage/storage.util';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUrl = `${environment.baseUrl}/auth`;
  isAuthenticated$ = new BehaviorSubject<boolean>(
    !!storage.getItem('appSession')
  );

  router = inject(Router);

  constructor(private http: HttpClient) {}

  get isAuthenticated(): boolean {
    return this.isAuthenticated$.getValue();
  }

  get user() {
    return storage.getItem('appSession');
  }

  logout(): void {
    storage.removeItem('appSession');
    storage.removeItem('idUser');
    this.isAuthenticated$.next(false);
    this.router.navigate(['/auth/sign-in']);
  }

  login(user: User) {
    return this.http
      .post<{ access_token: string }>(`${this.authUrl}/login`, user)
      .pipe(
        tap(resp => {
          storage.setItem('appSession', {
            username: user.username,
            token: resp.access_token,
          });

          this.isAuthenticated$.next(true);
          this.router.navigate(['/']);
        })
      );
  }

  register(user: User) {
    return this.http.post<User>(`${this.authUrl}/signup`, user);
  }

  profile() {
    return this.http
      .get<{
        _id: string;
        username: string;
      }>(`${environment.baseUrl}/user/profile`)
      .pipe(
        tap(resp => {
          storage.setItem('idUser', resp._id);
        })
      );
  }
}
