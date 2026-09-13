import { Component, computed, inject, viewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AvatarModule } from '@openng/optimus-ui/avatar';
import { IconFieldModule } from '@openng/optimus-ui/iconfield';
import { InputIconModule } from '@openng/optimus-ui/inputicon';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { Menu, MenuModule } from '@openng/optimus-ui/menu';
import { MenuItem } from '@openng/optimus-ui/api';
import { Auth } from '@core/auth/auth';
import { AuthState } from '@core/auth/auth-state';
import { layoutConfig } from '../layout.config';
import { LayoutState } from '../layout-state';

@Component({
  imports: [
    AvatarModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    MenuModule,
    RouterLink,
    RouterLinkActive,
  ],
  selector: 'app-topbar',
  styleUrl: './topbar.css',
  templateUrl: './topbar.html',
  host: {
    class: 'block shrink-0',
  },
})
export class Topbar {
  private readonly auth = inject(Auth);
  private readonly authState = inject(AuthState);
  private readonly router = inject(Router);
  protected readonly layout = inject(LayoutState);
  protected readonly config = layoutConfig;
  private readonly userMenu = viewChild<Menu>('userMenu');

  protected readonly initials = computed(() => {
    const user = this.authState.user();
    if (!user) {
      return 'SN';
    }

    const first = user.firstName?.charAt(0) ?? '';
    const last = user.lastName?.charAt(0) ?? '';
    const value = `${first}${last}`.trim() || user.email.charAt(0);
    return (value || 'SN').toUpperCase();
  });

  protected readonly accountLabel = computed(() => {
    const user = this.authState.user();
    if (!user) {
      return 'Account menu';
    }

    const name = [user.firstName, user.lastName].filter(Boolean).join(' ');
    return name ? `${name} account menu` : 'Account menu';
  });

  protected readonly themeLabel = computed(() =>
    this.layout.theme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode',
  );

  protected readonly sidebarToggleLabel = computed(() => {
    if (!this.layout.isDesktop()) {
      return this.layout.mobileOpen() ? 'Close navigation menu' : 'Open navigation menu';
    }

    return this.layout.sidebarCollapsed() ? 'Expand sidebar' : 'Collapse sidebar';
  });

  protected readonly userMenuItems: MenuItem[] = [
    {
      label: 'Sign out',
      icon: 'pi pi-sign-out',
      command: () => {
        void this.signOut();
      },
    },
  ];

  constructor() {
    void this.hydrateUser();
  }

  protected toggleUserMenu(event: Event): void {
    this.userMenu()?.toggle(event);
  }

  private async hydrateUser(): Promise<void> {
    if (this.authState.user() || !this.authState.getToken()) {
      return;
    }

    try {
      const user = await firstValueFrom(this.auth.loadCurrentUser());
      this.authState.setUser(user);
    } catch {
      // Keep fallback initials when the profile request fails.
    }
  }

  private async signOut(): Promise<void> {
    try {
      await firstValueFrom(this.auth.logout());
    } catch {
      // Clear the local session even if the API call fails.
    } finally {
      this.authState.clear();
      await this.router.navigateByUrl('/auth/login');
    }
  }
}
