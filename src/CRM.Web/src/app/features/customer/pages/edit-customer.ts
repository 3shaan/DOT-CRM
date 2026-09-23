import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { getApiCustomerIdResource } from '@api/index';
import { PageContainer } from '@core/layout/page-container';
import { map } from 'rxjs';

@Component({
  imports: [PageContainer],
  selector: 'app-edit-customer',
  template: `
    <app-page-container [pageTitle]="'Edit Customer'" [pageDescription]="'Edit your customer'" />
  `,
})
export class EditCustomer {
  private readonly route = inject(ActivatedRoute);

  readonly customerId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('id') ?? undefined)),
    { initialValue: undefined },
  );

  readonly customer = getApiCustomerIdResource(computed(() => this.customerId() ?? ''));
}
