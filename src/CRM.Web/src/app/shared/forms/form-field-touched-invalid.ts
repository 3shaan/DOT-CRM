import { Directive, ElementRef, afterRenderEffect, inject } from '@angular/core';
import { FormField } from '@angular/forms/signals';

@Directive({
  selector: 'input[formField], textarea[formField]',
})
export class FormFieldTouchedInvalid {
  private readonly formField = inject(FormField, { self: true });
  private readonly element = inject(ElementRef<HTMLElement>);

  constructor() {
    afterRenderEffect(() => {
      const state = this.formField.state();
      const showInvalid = state.touched() && state.invalid();
      this.element.nativeElement.classList.toggle('p-invalid', showInvalid);
    });
  }
}
