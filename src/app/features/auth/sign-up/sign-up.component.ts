import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { ToastService } from '../../../core/services/toast/toast.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  imports: [RouterLink, ReactiveFormsModule, NgIcon],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  authService = inject(AuthService);
  toastService = inject(ToastService);
  visible = false;

  registerForm = new FormGroup({
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
    const control = this.registerForm.get(field);

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
    if (this.registerForm.invalid) {
      return;
    }
    if (this.registerForm.value.username && this.registerForm.value.password) {
      this.authService
        .register({
          username: this.registerForm.value.username,
          password: this.registerForm.value.password,
        })
        .pipe(
          catchError(error => {
            this.toastService.showToast('User registration failed', 'error');
            return throwError(() => new Error(error));
          })
        )
        .subscribe(() => {
          this.toastService.showToast(
            'User registered successfully',
            'success'
          );
          this.registerForm.reset();
        });
    }
  }
}
