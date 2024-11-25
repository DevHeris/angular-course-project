import { Component, inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  /**
   * { static : false } for querying during ngAfterViewInit lifecycle hook.
   * { static : true } for querying during ngOnInit lifecycle hook.
   */
  @ViewChild('authForm', { static: false }) authForm: NgForm;
  private authService = inject(AuthService);
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string | null = null;

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(): void {
    if (this.authForm.invalid) return;

    this.isLoading = true;
    if (this.isLoginMode) {
      // ,,,
    } else {
      this.authService.signup(this.authForm.value).subscribe({
        next: (resData) => {
          console.log(resData);
          this.isLoading = false;
        },
        error: (errMessage) => {
          console.log(errMessage);
          this.isLoading = false;
          this.error = errMessage;
        },
      });
    }
  }
}
