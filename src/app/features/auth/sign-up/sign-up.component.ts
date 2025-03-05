import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { ToastService } from '../../../core/services/toast/toast.service';
import { catchError, throwError } from 'rxjs';
// import { passwordMatchValidator } from '../../../core/utils/validation/password-match.validator';

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
  visibleConfirm = false;

  registerForm = new FormGroup(
    {
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    },
    this.passwordMatch('password', 'confirmPassword')
  );

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

  passwordMatch(password: string, confirmPassword: string): ValidatorFn {
    return (formGroup: AbstractControl) => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors['passwordMismatch']
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        confirmPasswordControl.setErrors(null);
        return null;
      }
    };
  }
}
