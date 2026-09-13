import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { TooltipModule } from '@openng/optimus-ui/tooltip';
import { layoutConfig, NavItem } from '../layout.config';
import { LayoutState } from '../layout-state';

@Component({
  imports: [RouterLink, RouterLinkActive, TooltipModule],
  selector: 'app-sidebar',
  styleUrl: './sidebar.css',
  templateUrl: './sidebar.html',
  host: {
    role: 'navigation',
    'aria-label': 'Main',
    '[class]': 'hostClass()',
    '[attr.aria-hidden]': 'ariaHidden()',
    '[attr.inert]': 'ariaHidden() ? "" : null',
  },
})
export class Sidebar {
  private readonly router = inject(Router);
  protected readonly layout = inject(LayoutState);
  protected readonly config = layoutConfig;
  protected readonly expandedIds = signal<Set<string>>(new Set(['clerk']));
  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => this.router.url),
      startWith(this.router.url),
    ),
    { initialValue: this.router.url },
  );

  protected readonly compact = computed(
    () => this.layout.isDesktop() && this.layout.sidebarCollapsed(),
  );

  protected readonly hostClass = computed(() => {
    const compact = this.compact();
    const mobileOpen = this.layout.mobileOpen();

    return [
      'z-50 flex h-full shrink-0 flex-col overflow-hidden border-r border-zinc-200 bg-white motion-safe:transition-[width,transform] motion-safe:duration-200 dark:border-zinc-800 dark:bg-zinc-950',
      'fixed inset-y-0 left-0 w-64 lg:static lg:translate-x-0',
      compact ? 'lg:w-[4.5rem]' : 'lg:w-64',
      mobileOpen ? 'translate-x-0' : '-translate-x-full',
    ].join(' ');
  });

  protected readonly ariaHidden = computed(() =>
    !this.layout.isDesktop() && !this.layout.mobileOpen() ? 'true' : null,
  );

  protected isExpanded(id: string): boolean {
    return this.expandedIds().has(id);
  }

  protected toggleGroup(item: NavItem): void {
    if (this.compact()) {
      this.layout.sidebarCollapsed.set(false);
    }

    this.expandedIds.update((current) => {
      const next = new Set(current);
      if (next.has(item.id)) {
        next.delete(item.id);
      } else {
        next.add(item.id);
      }
      return next;
    });
  }

  protected isActive(item: NavItem): boolean {
    const url = this.currentUrl();
    if (item.route && this.matchesUrl(item.route, url)) {
      return true;
    }

    return item.children?.some((child) => this.isActive(child)) ?? false;
  }

  private matchesUrl(route: string, url: string | undefined): boolean {
    const current = (url ?? this.router.url).split('?')[0];
    return current === route;
  }

  protected groupButtonClass(item: NavItem): string {
    const active = this.isActive(item) && !this.compact();
    return [
      'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 dark:text-zinc-200 dark:hover:bg-zinc-800',
      this.compact() ? 'justify-center' : '',
      active ? 'bg-zinc-100 dark:bg-zinc-800' : '',
    ].join(' ');
  }

  protected readonly itemActiveClass = 'bg-zinc-100 font-medium dark:bg-zinc-800';
}
