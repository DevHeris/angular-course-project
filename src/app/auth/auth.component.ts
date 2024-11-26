import { Component, inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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
  private router = inject(Router);
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string | null = null;

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(): void {
    if (this.authForm.invalid) return;
    this.isLoading = true;

    // Storing the observable in authObs helps prevent code duplication
    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.login(this.authForm.value);
    } else {
      authObs = this.authService.signup(this.authForm.value);
    }
    authObs.subscribe({
      next: (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error: (errMessage) => {
        console.log(errMessage);
        this.isLoading = false;
        this.error = errMessage;
      },
    });
  }
}
