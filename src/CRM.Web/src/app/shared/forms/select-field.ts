import { Component, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { FormValueControl } from '@angular/forms/signals';
import { SelectModule } from '@openng/optimus-ui/select';

@Component({
  selector: 'app-select-field',
  imports: [FormsModule, SelectModule],
  host: { class: 'block w-full' },
  template: `
    <p-select
      [inputId]="inputId()"
      [ngModel]="value()"
      (ngModelChange)="onValueChange($event)"
      (onHide)="touch.emit()"
      (onBlur)="touch.emit()"
      [options]="options()"
      [optionLabel]="optionLabel()"
      [optionValue]="optionValue()"
      [placeholder]="placeholder()"
      [filter]="filter()"
      [showClear]="showClear()"
      [loading]="loading()"
      [appendTo]="appendTo()"
      [fluid]="fluid()"
      [disabled]="disabled()"
      [invalid]="invalid() && touched()"
    />
  `,
})
export class SelectField<T> implements FormValueControl<T> {
  readonly value = model.required<T>();
  readonly disabled = input(false);
  readonly invalid = input(false);
  readonly touched = input(false);
  readonly touch = output<void>();

  readonly options = input<unknown[]>([]);
  readonly optionLabel = input('label');
  readonly optionValue = input('value');
  readonly placeholder = input<string | undefined>(undefined);
  readonly filter = input(false);
  readonly showClear = input(false);
  readonly loading = input(false);
  readonly inputId = input<string | undefined>(undefined);
  readonly appendTo = input('body');
  readonly fluid = input(true);

  protected onValueChange(value: T | undefined): void {
    this.value.set(value === undefined ? (null as T) : value);
  }
}
