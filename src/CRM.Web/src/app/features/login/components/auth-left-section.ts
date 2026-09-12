import { Component } from '@angular/core';

@Component({
  selector: 'auth-left-section',
  template: `
    <section class="hidden lg:flex flex-col justify-between p-12 xl:p-20 border-r border-white/10">
      <div>
        <div class="text-xl font-bold mt-5 tracking-tight">CRM System</div>
      </div>

      <!-- Main message -->
      <div class="max-w-lg">
        <div
          class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border  text-xs font-medium mb-6"
        >
          <i class="pi pi-sparkles text-xs"></i>
          Your CRM system, reimagined
        </div>

        <h1 class="text-4xl xl:text-5xl font-bold tracking-tight leading-tight">
          Everything you need.
          <span class="block text-primary mt-2"> All in one place. </span>
        </h1>

        <p class=" text-base leading-relaxed mt-6 max-w-md">
          Manage your projects, collaborate with your team, and turn your ideas into reality with a
          workspace designed for you.
        </p>

        <div class="flex flex-col gap-4 mt-10">
          <div class="flex items-center gap-3 text-sm ">
            <span
              class="w-6 h-6 rounded-full bg-primary/15 text-primary flex items-center justify-center"
            >
              <i class="pi pi-check text-xs"></i>
            </span>
            Secure and reliable workspace
          </div>

          <div class="flex items-center gap-3 text-sm ">
            <span
              class="w-6 h-6 rounded-full bg-violet-500/15 text-violet-400 flex items-center justify-center"
            >
              <i class="pi pi-check text-xs"></i>
            </span>
            Simple tools for better productivity
          </div>
        </div>
      </div>

      <div class="flex items-center gap-3 text-xs ">
        <span>© 2026 CRM System</span>
        <span class="w-1 h-1 rounded-full "></span>
        <span>Built for your CRM system</span>
      </div>
    </section>
  `,
})
export class AuthLeftSectionComponent {}
