import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthState {
  readonly accessToken = signal<string | null>(null);
  readonly initialized = signal(false);

  setAccessToken(token: string): void {
    this.accessToken.set(token);
  }

  clear(): void {
    this.accessToken.set(null);
  }

  markInitialized(): void {
    this.initialized.set(true);
  }

  getToken(): string | null {
    return this.accessToken();
  }
}