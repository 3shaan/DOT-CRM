import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from '@openng/optimus-ui/button';
import { CheckboxModule } from '@openng/optimus-ui/checkbox';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { PasswordModule } from '@openng/optimus-ui/password';
import { RippleModule } from '@openng/optimus-ui/ripple';
import { AuthLeftSectionComponent } from '../../components/auth-left-section';

@Component({
  imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AuthLeftSectionComponent],
  selector: 'app-login',
  templateUrl: './login.html',
})
export class Login {
  email: string = '';
  password: string = '';
  checked: boolean = false;

  isLoading: boolean = false;
  onSignIn() {
    console.log(this.email, this.password);
  }
}
