// page-skeleton.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-page-skeleton',
  standalone: true,
  template: `
    <div class="flex flex-1 animate-pulse flex-col gap-4 p-4 md:px-6">
      <div class="flex items-center justify-between">
        <div>
          <div class="bg-muted mb-2 h-8 w-48 rounded"></div>
          <div class="bg-muted h-4 w-96 rounded"></div>
        </div>
      </div>
      <div class="bg-muted mt-6 h-40 w-full rounded-lg"></div>
      <div class="bg-muted h-40 w-full rounded-lg"></div>
    </div>
  `,
})
export class PageSkeleton {}