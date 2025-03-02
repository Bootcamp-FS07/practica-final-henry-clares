import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { User } from './auth.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUrl = `${environment.baseUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(user: User) {
    return this.http.post(`${this.authUrl}/login`, user);
  }

  register(user: User) {
    return this.http.post<User>(`${this.authUrl}/signup`, user);
  }
}
