import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegistrationService } from '../../services/registrationService/registration-service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  serverError: string | null = null;
  isSubmitting = false;

  constructor(private registerService: RegistrationService, private route: Router) { }

  loginData: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  getControl(controlName: string): AbstractControl | null {
    return this.loginData.get(controlName);
  }

  getFieldError(controlName: string): string | null {
    const control = this.getControl(controlName);

    if (!control || !control.touched || !control.invalid) {
      return null;
    }

    if (control.hasError('required')) {
      return 'This field is required.';
    }

    if (control.hasError('email')) {
      return 'Please enter a valid email address.';
    }

    return null;
  }

  getErrorMessage(error: unknown): string {
    if (error && typeof error === 'object' && 'error' in error) {
      const errPayload = (error as any).error;
      if (typeof errPayload === 'string') {
        return errPayload;
      }
      if (errPayload?.message) {
        return errPayload.message;
      }
      if (errPayload?.errors) {
        const firstError = Object.values(errPayload.errors)[0];
        if (Array.isArray(firstError) && firstError.length) {
          return firstError[0] as string;
        }
        if (typeof firstError === 'string') {
          return firstError;
        }
      }
    }

    if (typeof error === 'string') {
      return error;
    }

    if (typeof error === 'object' && error !== null) {
      const err = error as { message?: string };
      if (err.message) {
        return err.message;
      }
    }

    return 'Login failed. Please try again.';
  }

  verifyUser() {
    this.serverError = null;
    this.loginData.markAllAsTouched();

    if (this.loginData.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.registerService.verifyUser(this.loginData.value).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        debugger;
        localStorage.setItem('token', response.message);
        this.route.navigate(['/dashboard']);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.serverError = this.getErrorMessage(error);
      }
    });
  }
}
