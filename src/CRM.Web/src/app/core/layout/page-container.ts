// page-container.component.ts
import { Component, TemplateRef, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageSkeleton } from '@core/components/page-skeleton';

@Component({
  selector: 'app-page-container',
  standalone: true,
  imports: [CommonModule, PageSkeleton],
  template: `
    @if (!access()) {
      <div class="flex flex-1 items-center justify-center p-4 md:px-6">
        @if (accessFallback()) {
          <ng-container *ngTemplateOutlet="accessFallback()!" />
        } @else {
          <div class="text-muted-foreground text-center text-lg">
            You do not have access to this page.
          </div>
        }
      </div>
    } @else {
      <div class="flex flex-1 flex-col px-4 pt-2 pb-4 md:px-6 md:pt-4">
        @if (hasHeader()) {
          <div class="mb-4 flex items-start justify-between gap-4">
            <div>
                <div class='flex items-center gap-2'>
                <h2 class='text-3xl font-bold tracking-tight'>{{ pageTitle() ?? '' }}</h2>
                    
                </div>
                <p class='text-muted-foreground text-sm'>{{ pageDescription() ?? '' }}</p>

            </div>
            
            @if (pageHeaderAction()) {
              <div class="shrink-0">
                <ng-container *ngTemplateOutlet="pageHeaderAction()!" />
              </div>
            }
          </div>
        }

        @if (isLoading()) {
          <app-page-skeleton />
        } @else if (error()) {
          <div class="text-muted-foreground text-center text-lg">
            Error: {{ error()?.message }}
          </div>
        } @else {
          <ng-content />
        }
      </div>
    }
  `,
})
export class PageContainer {
  isLoading = input(false);
  error = input<Error>();
  access = input(true);
  pageTitle = input<string>();
  pageDescription = input<string>();
  accessFallback = input<TemplateRef<unknown>>();
  pageHeaderAction = input<TemplateRef<unknown>>();

  hasHeader = computed(() => !!(this.pageTitle() || this.pageHeaderAction()));
}