import { inject, Injectable } from '@angular/core';
import { AuthService } from '@api/index';
import { LoginRequest, RegisterRequest } from '@api/model';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private readonly authService = inject(AuthService);

  login(loginRequest: LoginRequest) {
    return this.authService.postApiAuthLogin(loginRequest);
  }

  register(registerRequest: RegisterRequest) {
    return this.authService.postApiAuthRegister(registerRequest);
  }
}