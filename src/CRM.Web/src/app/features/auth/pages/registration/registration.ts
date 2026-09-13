import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from '@openng/optimus-ui/button';
import { CheckboxModule } from '@openng/optimus-ui/checkbox';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { PasswordModule } from '@openng/optimus-ui/password';
import { RippleModule } from '@openng/optimus-ui/ripple';
import { AuthLeftSectionComponent } from '../../components/auth-left-section';
import { Auth } from '@core/auth/auth';

@Component({
imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AuthLeftSectionComponent],
  selector: 'app-registration',
  templateUrl: './registration.html',
})
export class Registration {
  private readonly auth = inject(Auth);

  name = '';
  email = '';
  password = '';
  checked = false;

  isLoading = false;

  onSignIn() {
    this.isLoading = true;

    this.auth.register({
      firstName: this.name,
      email: this.email,
      password: this.password,
    }).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Registration failed:', error);
        this.isLoading = false;
      }
    });
  }
}
