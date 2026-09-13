import { Injectable, signal } from '@angular/core';
import { UserResponse } from '@api/model';

@Injectable({
  providedIn: 'root',
})
export class AuthState {
  readonly accessToken = signal<string | null>(null);
  readonly user = signal<UserResponse | null>(null);
  readonly initialized = signal(false);

  setAccessToken(token: string): void {
    this.accessToken.set(token);
  }

  setUser(user: UserResponse): void {
    this.user.set(user);
  }

  clear(): void {
    this.accessToken.set(null);
    this.user.set(null);
  }

  markInitialized(): void {
    this.initialized.set(true);
  }

  getToken(): string | null {
    return this.accessToken();
  }
}