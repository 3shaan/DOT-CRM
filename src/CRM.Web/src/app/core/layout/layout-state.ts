import { DOCUMENT, inject, Service, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'crm.theme';
const DESKTOP_QUERY = '(min-width: 1024px)';

@Service()
export class LayoutState {
  private readonly document = inject(DOCUMENT);

  readonly sidebarCollapsed = signal(false);
  readonly mobileOpen = signal(false);
  readonly theme = signal<Theme>(this.readStoredTheme());
  readonly isDesktop = signal(this.readIsDesktop());

  constructor() {
    this.applyTheme(this.theme());
    this.bindViewport();
  }

  toggleSidebar(): void {
    if (this.isDesktop()) {
      this.sidebarCollapsed.update((collapsed) => !collapsed);
      return;
    }

    this.mobileOpen.update((open) => !open);
  }

  closeMobile(): void {
    this.mobileOpen.set(false);
  }

  toggleTheme(): void {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(next);
    this.persistTheme(next);
    this.applyTheme(next);
  }

  private bindViewport(): void {
    const view = this.document.defaultView;
    if (!view) {
      return;
    }

    const media = view.matchMedia(DESKTOP_QUERY);
    this.isDesktop.set(media.matches);

    media.addEventListener('change', (event) => {
      this.isDesktop.set(event.matches);
      if (event.matches) {
        this.mobileOpen.set(false);
      }
    });
  }

  private readIsDesktop(): boolean {
    return this.document.defaultView?.matchMedia(DESKTOP_QUERY).matches ?? true;
  }

  private readStoredTheme(): Theme {
    const stored = this.document.defaultView?.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }

    return this.document.defaultView?.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  private persistTheme(theme: Theme): void {
    this.document.defaultView?.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }

  private applyTheme(theme: Theme): void {
    this.document.documentElement.classList.toggle('dark', theme === 'dark');
  }
}
