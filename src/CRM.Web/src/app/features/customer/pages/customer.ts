import { Component } from '@angular/core';
import { getApiCustomerResource } from '@api/index';
import { TableRowDirective } from '@core/table/table-row';
import { TableModule } from '@openng/optimus-ui/table';
import { PageContainer } from '@core/layout/page-container';
import { ButtonModule } from '@openng/optimus-ui/button';
import { RouterLink } from '@angular/router';
import { CustomerTableRowActionComponent } from '../component/customer-table-row-action.component';

@Component({
  imports: [
    TableModule,
    TableRowDirective,
    PageContainer,
    ButtonModule,
    RouterLink,
    CustomerTableRowActionComponent,
  ],
  selector: 'app-customer',
  template: `
    <app-page-container
      [pageTitle]="'Customers'"
      [pageDescription]="'Manage your customers'"
      [isLoading]="customers.isLoading()"
      [error]="customers.error()"
      [pageHeaderAction]="headerAction"
    >
      <ng-template #headerAction>
        <p-button label="Add Customer" icon="pi pi-plus" [routerLink]="['/customer/add']" />
      </ng-template>

      <p-table
        [value]="customers.value() ?? []"
        [tableStyle]="{ 'min-width': '50rem' }"
        showGridlines
      >
        <ng-template #header>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Status</th>
            <th>Type</th>
            <th>Source</th>
            <th>Actions</th>
          </tr>
        </ng-template>

        <ng-template #body let-customer [tableRow]="customers.value() ?? []">
          <tr>
            <td>{{ customer.name }}</td>
            <td>{{ customer.companyName }}</td>
            <td>{{ customer.status }}</td>
            <td>{{ customer.type }}</td>
            <td>{{ customer.source }}</td>
            <td>
              <app-customer-table-row-action [customer]="customer" (deleted)="customers.reload()" />
            </td>
          </tr>
        </ng-template>
      </p-table>
    </app-page-container>
  `,
})
export class Customer {
  readonly customers = getApiCustomerResource();
}
