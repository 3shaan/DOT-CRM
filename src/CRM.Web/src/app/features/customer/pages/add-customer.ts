import { Component } from '@angular/core';
import { PageContainer } from '@core/layout/page-container';
import { CustomerForm } from '../component/customer-form';

@Component({
  imports: [PageContainer, CustomerForm],
  selector: 'app-add-customer',
  template: `
    <app-page-container pageTitle="Add Customer" pageDescription="Add a new customer">
      <app-customer-form />
    </app-page-container>
  `,
})
export class AddCustomer {}
