import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputText } from '@openng/optimus-ui/inputtext';
import { FloatLabelModule } from '@openng/optimus-ui/floatlabel';
import { InputTextModule } from '@openng/optimus-ui/inputtext';

@Component({
  imports: [FormsModule, FloatLabelModule, InputTextModule],
  selector: 'app-customer-form',
  template: `
    <form #customerForm="ngForm">
      <p-floatlabel>
        <input pInputText id="over_label" [ngModel]="name()" autocomplete="off" />
        <label for="over_label">Name</label>
      </p-floatlabel>
    </form>
  `,
})
export class CustomerForm {
  name = signal<string>('');
}
