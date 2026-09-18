import { Component, computed, input } from '@angular/core';
import type { FieldTree } from '@angular/forms/signals';
import { MessageModule } from '@openng/optimus-ui/message';

@Component({
  selector: 'app-field-error',
  imports: [MessageModule],
  template: `
    @if (message(); as text) {
      <p-message severity="error" size="small" variant="simple">{{ text }}</p-message>
    }
  `,
})
export class FieldError {
  readonly field = input.required<FieldTree<unknown>>();

  protected readonly message = computed(() => {
    const state = this.field()();
    if (!state.touched() || !state.invalid()) {
      return undefined;
    }

    return state.errors()[0]?.message;
  });
}
