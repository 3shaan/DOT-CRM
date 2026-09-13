import { inject, Injectable } from '@angular/core';
import { AuthService } from '@api/index';
import { LoginRequest, RegisterRequest } from '@api/model';
import { AuthState } from './auth-state';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private readonly authService = inject(AuthService);

  private readonly authState = inject(AuthState);

  login(loginRequest: LoginRequest) {
    return this.authService.postApiAuthLogin(loginRequest);
  }

  register(registerRequest: RegisterRequest) {
    return this.authService.postApiAuthRegister(registerRequest);
  }

  //restore session
  restoreSession() {
    return this.authService.postApiAuthRefresh(
      {},
      {
        withCredentials: true,
      },
    );
  }
 async initialize(): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.authService.postApiAuthRefresh({}),
      );

      if (response.accessToken) {
        this.authState.setAccessToken(response.accessToken);
      }
    } catch {
      // No valid refresh cookie/session.
      this.authState.clear();
    } finally {
      this.authState.markInitialized();
    }
  }
}