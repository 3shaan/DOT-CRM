import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { LayoutState } from '../layout-state';
import { Sidebar } from '../sidebar/sidebar';
import { Topbar } from '../topbar/topbar';

@Component({
  imports: [RouterOutlet, Sidebar, Topbar],
  selector: 'app-app-layout',
  styleUrl: './app-layout.css',
  templateUrl: './app-layout.html',
  host: {
    class: 'block h-svh',
    '(document:keydown.escape)': 'onEscape()',
  },
})
export class AppLayout {
  protected readonly layout = inject(LayoutState);
  private readonly router = inject(Router);

  constructor() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => this.layout.closeMobile());
  }

  protected onEscape(): void {
    this.layout.closeMobile();
  }
}
