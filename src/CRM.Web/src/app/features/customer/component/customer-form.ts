import { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService, getApiCompanyResource } from '@api/index';
import type { CustomerAddRequestDto, ProblemDetails } from '@api/model';
import {
  applyEach,
  email,
  FormField,
  form,
  required,
  submit,
} from '@angular/forms/signals';
import type { FieldTree } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
import { ButtonModule } from '@openng/optimus-ui/button';
import { CardModule } from '@openng/optimus-ui/card';
import { FloatLabelModule } from '@openng/optimus-ui/floatlabel';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { MessageModule } from '@openng/optimus-ui/message';
import { SelectModule } from '@openng/optimus-ui/select';
import { SelectButtonModule } from '@openng/optimus-ui/selectbutton';
import { TextareaModule } from '@openng/optimus-ui/textarea';
import { CUSTOMER_STATUS_OPTIONS, CUSTOMER_TYPE_OPTIONS } from './customer-options';

type ContactFormValue = {
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  notes: string;
};

type AddressFormValue = {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

type CustomerFormValue = {
  name: string;
  code: string;
  type: number;
  status: number;
  source: string;
  companyId: string | null;
  contacts: ContactFormValue[];
  addresses: AddressFormValue[];
};

const emptyContact = (): ContactFormValue => ({
  name: '',
  email: '',
  phone: '',
  position: '',
  department: '',
  notes: '',
});

const emptyAddress = (): AddressFormValue => ({
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  zip: '',
  country: '',
});

@Component({
  imports: [
    FormField,
    FormsModule,
    ButtonModule,
    CardModule,
    FloatLabelModule,
    InputTextModule,
    MessageModule,
    SelectModule,
    SelectButtonModule,
    TextareaModule,
  ],
  selector: 'app-customer-form',
  templateUrl: './customer-form.html',
})
export class CustomerForm {
  private readonly customerService = inject(CustomerService);
  private readonly router = inject(Router);

  protected readonly typeOptions = CUSTOMER_TYPE_OPTIONS;
  protected readonly statusOptions = CUSTOMER_STATUS_OPTIONS;
  protected readonly companies = getApiCompanyResource();
  protected readonly submitError = signal<string | null>(null);

  protected readonly companyOptions = computed(() =>
    (this.companies.value() ?? []).map((company) => ({
      label: company.name,
      value: company.id,
    })),
  );

  protected readonly model = signal<CustomerFormValue>({
    name: '',
    code: '',
    type: 0,
    status: 0,
    source: '',
    companyId: null,
    contacts: [],
    addresses: [],
  });

  protected readonly customerForm = form(this.model, (customer) => {
    required(customer.name, { message: 'Name is required' });
    required(customer.code, { message: 'Code is required' });

    applyEach(customer.contacts, (contact) => {
      required(contact.name, { message: 'Name is required' });
      required(contact.email, { message: 'Email is required' });
      email(contact.email, { message: 'Enter a valid email address' });
      required(contact.phone, { message: 'Phone is required' });
      required(contact.position, { message: 'Position is required' });
      required(contact.department, { message: 'Department is required' });
    });

    applyEach(customer.addresses, (address) => {
      required(address.addressLine1, { message: 'Address line 1 is required' });
      required(address.city, { message: 'City is required' });
      required(address.state, { message: 'State is required' });
      required(address.zip, { message: 'ZIP is required' });
      required(address.country, { message: 'Country is required' });
    });
  });

  protected errorMessage<T>(field: FieldTree<T>): string | undefined {
    const state = field();
    if (!state.touched() || !state.invalid()) {
      return undefined;
    }

    return state.errors()[0]?.message ?? 'This field is required.';
  }

  protected setStatus(value: number): void {
    this.customerForm.status().value.set(value);
    this.customerForm.status().markAsDirty();
    this.customerForm.status().markAsTouched();
  }

  protected setCompanyId(value: string | null | undefined): void {
    this.customerForm.companyId().value.set(value ?? null);
    this.customerForm.companyId().markAsDirty();
    this.customerForm.companyId().markAsTouched();
  }

  protected addContact(): void {
    this.model.update((current) => ({
      ...current,
      contacts: [...current.contacts, emptyContact()],
    }));
  }

  protected removeContact(index: number): void {
    this.model.update((current) => ({
      ...current,
      contacts: current.contacts.filter((_, contactIndex) => contactIndex !== index),
    }));
  }

  protected addAddress(): void {
    this.model.update((current) => ({
      ...current,
      addresses: [...current.addresses, emptyAddress()],
    }));
  }

  protected removeAddress(index: number): void {
    this.model.update((current) => ({
      ...current,
      addresses: current.addresses.filter((_, addressIndex) => addressIndex !== index),
    }));
  }

  protected cancel(): void {
    void this.router.navigate(['/customer']);
  }

  protected async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    this.submitError.set(null);

    await submit(this.customerForm, async () => {
      try {
        await firstValueFrom(this.customerService.postApiCustomer(this.toRequest(this.model())));
        await this.router.navigate(['/customer']);
        return;
      } catch (error) {
        const message = this.readError(error);
        this.submitError.set(message);
        return { kind: 'server', message };
      }
    });
  }

  private toRequest(model: CustomerFormValue): CustomerAddRequestDto {
    const source = model.source.trim();
    const contacts = model.contacts.map((contact) => ({
      name: contact.name.trim(),
      email: contact.email.trim(),
      phone: contact.phone.trim(),
      position: contact.position.trim(),
      department: contact.department.trim(),
      notes: contact.notes.trim(),
    }));
    const addresses = model.addresses.map((address) => ({
      addressLine1: address.addressLine1.trim(),
      addressLine2: address.addressLine2.trim(),
      city: address.city.trim(),
      state: address.state.trim(),
      zip: address.zip.trim(),
      country: address.country.trim(),
    }));

    return {
      name: model.name.trim(),
      code: model.code.trim(),
      type: model.type,
      status: model.status,
      source: source.length > 0 ? source : null,
      companyId: model.companyId || null,
      ...(contacts.length > 0 ? { contacts } : {}),
      ...(addresses.length > 0 ? { addresses } : {}),
    };
  }

  private readError(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      const body = error.error;
      if (typeof body === 'string' && body.trim().length > 0) {
        return body;
      }

      if (body && typeof body === 'object') {
        const problem = body as ProblemDetails;
        if (typeof problem.detail === 'string' && problem.detail.trim().length > 0) {
          return problem.detail;
        }
        if (typeof problem.title === 'string' && problem.title.trim().length > 0) {
          return problem.title;
        }
      }

      if (error.status === 0) {
        return 'Unable to reach the server. Please try again.';
      }

      return error.statusText || 'Failed to save customer.';
    }

    return 'Failed to save customer.';
  }
}
