import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from '@openng/optimus-ui/button';
import { CheckboxModule } from '@openng/optimus-ui/checkbox';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { PasswordModule } from '@openng/optimus-ui/password';
import { RippleModule } from '@openng/optimus-ui/ripple';
import { AuthLeftSectionComponent } from '../../components/auth-left-section';
import { Auth } from '@core/auth/auth';
import { AuthState } from '@core/auth/auth-state';

@Component({
  imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AuthLeftSectionComponent],
  selector: 'app-login',
  templateUrl: './login.html',
})
export class Login {

  private readonly auth = inject(Auth);
  private readonly authState = inject(AuthState);
  private readonly router = inject(Router);


  email: string = '';
  password: string = '';
  checked: boolean = false;

  isLoading: boolean = false;
  onSignIn() {
    this.isLoading = true;

    this.auth.login({
      email: this.email,
      password: this.password,
    }).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        if(response.accessToken) {
          this.authState.setAccessToken(response.accessToken);
        }
        if (response.user) {
          this.authState.setUser(response.user);
        }
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Registration failed:', error);
        this.isLoading = false;
      }
    });
  }
}
