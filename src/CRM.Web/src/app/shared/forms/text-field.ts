import { Component, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { FormValueControl } from '@angular/forms/signals';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { TextareaModule } from '@openng/optimus-ui/textarea';

@Component({
  selector: 'app-text-field',
  imports: [FormsModule, InputTextModule, TextareaModule],
  host: { class: 'contents' },
  template: `
    @if (rows() > 0) {
      <textarea
        pTextarea
        [id]="inputId()"
        [ngModel]="value()"
        (ngModelChange)="value.set($event ?? '')"
        (blur)="touch.emit()"
        [invalid]="invalid() && touched()"
        [fluid]="fluid()"
        [rows]="rows()"
        [disabled]="disabled()"
      ></textarea>
    } @else {
      <input
        pInputText
        [id]="inputId()"
        [type]="type()"
        [ngModel]="value()"
        (ngModelChange)="value.set($event ?? '')"
        (blur)="touch.emit()"
        [invalid]="invalid() && touched()"
        [fluid]="fluid()"
        [autocomplete]="autocomplete()"
        [disabled]="disabled()"
      />
    }
  `,
})
export class TextField implements FormValueControl<string> {
  readonly value = model.required<string>();
  readonly disabled = input(false);
  readonly invalid = input(false);
  readonly touched = input(false);
  readonly touch = output<void>();

  readonly inputId = input<string | undefined>(undefined);
  readonly type = input('text');
  readonly autocomplete = input<string | undefined>(undefined);
  readonly fluid = input(true);
  readonly rows = input(0);
}
