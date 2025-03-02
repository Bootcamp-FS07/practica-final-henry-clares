import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../../../core/services/toast/toast.service';

@Component({
  selector: 'app-sign-in',
  imports: [RouterLink, NgIcon, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  authService = inject(AuthService);
  toastService = inject(ToastService);
  visible = false;

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);

    if (!control || !control.errors || !control.touched) return '';

    const errors = control.errors;
    const messages: string[] = [];

    if (errors['required']) messages.push('This field is required.');
    if (errors['minlength'])
      messages.push(
        `Must be at least ${errors['minlength'].requiredLength} characters.`
      );

    return messages.join(' ');
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    if (this.loginForm.value.username && this.loginForm.value.password) {
      this.authService
        .login({
          username: this.loginForm.value.username,
          password: this.loginForm.value.password,
        })
        .pipe(
          catchError(error => {
            this.toastService.showToast('Sign in failed', 'error');
            return throwError(() => new Error(error));
          })
        )
        .subscribe(() => {
          this.authService.profile();
          this.toastService.showToast('User logged in successfully', 'success');
          this.loginForm.reset();
        });
    }
  }
}
