import { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService, getApiCompanyResource } from '@api/index';
import type { ProblemDetails } from '@api/model';
import { FormField, form, submit, validateStandardSchema } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
import { ButtonModule } from '@openng/optimus-ui/button';
import { CardModule } from '@openng/optimus-ui/card';
import { FloatLabelModule } from '@openng/optimus-ui/floatlabel';
import { MessageModule } from '@openng/optimus-ui/message';
import { SelectButtonModule } from '@openng/optimus-ui/selectbutton';
import { FieldError } from '@shared/forms/field-error';
import { SelectField } from '@shared/forms/select-field';
import { TextField } from '@shared/forms/text-field';
import { CUSTOMER_STATUS_OPTIONS, CUSTOMER_TYPE_OPTIONS } from './customer-options';
import {
  customerFormSchema,
  customerRequestSchema,
  type AddressFormValue,
  type ContactFormValue,
  type CustomerFormValue,
} from '../schema/customer-form.schema';

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
    FieldError,
    SelectField,
    TextField,
    ButtonModule,
    CardModule,
    FloatLabelModule,
    MessageModule,
    SelectButtonModule,
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

  protected readonly customerForm = form(this.model, (customer) =>
    validateStandardSchema(customer, customerFormSchema),
  );

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
        await firstValueFrom(
          this.customerService.postApiCustomer(customerRequestSchema.parse(this.model())),
        );
        await this.router.navigate(['/customer']);
        return;
      } catch (error) {
        console.error('Error:', error);
        const message = this.readError(error);
        this.submitError.set(message);
        return { kind: 'server', message };
      }
    });
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
