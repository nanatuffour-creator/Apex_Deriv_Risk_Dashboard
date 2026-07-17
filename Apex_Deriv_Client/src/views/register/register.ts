import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegistrationService } from '../../services/registrationService/registration-service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  serverError: string | null = null;
  isSubmitting = false;

  constructor(private router: Router, private registerService: RegistrationService, private cdr: ChangeDetectorRef) { }

  // 1. UPDATED KEYS: Changed property names to match your ASP.NET Backend parameters exactly
  userData: FormGroup = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    passwordHash: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(100), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$')]),
    confirmPasswordHash: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(100), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$')]),
  }, { validators: this.passwordMatchValidation });

  // 2. UPDATED KEYS: Changed control lookups to use passwordHash and confirmPasswordHash
  passwordMatchValidation(control: AbstractControl): ValidationErrors | null {
    const password = control.get('passwordHash')?.value;
    const confirmPassword = control.get('confirmPasswordHash')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  getControl(controlName: string): AbstractControl | null {
    return this.userData.get(controlName);
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

    if (control.hasError('minlength')) {
      const requiredLength = control.getError('minlength').requiredLength;
      return `Minimum length is ${requiredLength} characters.`;
    }

    if (control.hasError('maxlength')) {
      return 'Maximum length exceeded.';
    }

    if (control.hasError('pattern')) {
      return 'Password must include uppercase, lowercase, number, and a special character.';
    }

    return null;
  }

  getPasswordMismatchError(): string | null {
    if (this.userData.touched && this.userData.hasError('passwordMismatch')) {
      return 'Passwords do not match.';
    }

    return null;
  }

  getErrorMessage(error: unknown): string {
    // If the error object contains a plain text string payload (like your backend "Email already exists" warning)
    if (error && typeof error === 'object' && 'error' in error) {
      const errPayload = (error as any).error;
      if (typeof errPayload === 'string') {
        return errPayload;
      }
    }

    if (typeof error === 'string') {
      return error;
    }

    if (typeof error === 'object' && error !== null) {
      const err = error as { error?: { message?: string; errors?: Record<string, unknown> }; message?: string };

      if (err.error?.message) {
        return err.error.message;
      }

      if (err.error?.errors) {
        const firstError = Object.values(err.error.errors)[0];
        if (Array.isArray(firstError) && firstError.length) {
          return firstError[0] as string;
        }
        if (typeof firstError === 'string') {
          return firstError;
        }
      }

      if (err.message) {
        return err.message;
      }
    }

    return 'Registration failed. Please try again.';
  }

  register(): void {
    this.serverError = null;
    this.userData.markAllAsTouched();

    if (this.userData.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.registerService.registerUser(this.userData.getRawValue()).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.cdr.detectChanges();
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.serverError = this.getErrorMessage(error);
        this.cdr.detectChanges();
      }
    });
  }
}
