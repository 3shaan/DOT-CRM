import { Component, inject, input, output } from '@angular/core';
import { CustomerResponseDto } from '@api/model';
import { MenuItem, MessageService } from '@openng/optimus-ui/api';
import { ButtonModule } from '@openng/optimus-ui/button';
import { MenuModule } from '@openng/optimus-ui/menu';
import { ConfirmDialogModule } from '@openng/optimus-ui/confirmdialog';
import { ConfirmationService } from '@openng/optimus-ui/api';
import { CustomerService, getApiCustomerResource } from '@api/index';
import { firstValueFrom } from 'rxjs';
import { ToastModule } from '@openng/optimus-ui/toast';
@Component({
  imports: [MenuModule, ButtonModule, ConfirmDialogModule, ToastModule],
  selector: 'app-customer-table-row-action',
  template: `
    <div class="card flex justify-center">
      <p-menu #menu [model]="items" [popup]="true" [appendTo]="'body'" />
      <p-button
        (click)="menu.toggle($event)"
        icon="pi pi-ellipsis-v"
        variant="outlined"
        size="small"
      />
      <p-confirm-dialog appendTo="body" />
      <p-toast />
    </div>
  `,
  providers: [ConfirmationService, MessageService],
})
export class CustomerTableRowActionComponent {
  private readonly customerService = inject(CustomerService);
  public readonly customer = input<CustomerResponseDto>();
  private readonly confirmDialog = inject(ConfirmationService);
  private messageService = inject(MessageService);

  readonly deleted = output<void>();

  items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.items = [
      {
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-pencil',
            // command: () => this.editCustomer(),
          },
          {
            label: 'Delete',
            icon: 'pi pi-trash',
            iconClass: 'text-red-500!',
            labelClass: 'text-red-500!',
            command: () => this.deleteCustomer(),
          },
        ],
      },
    ];
  }

  private deleteCustomer(): void {
    this.confirmDialog.confirm({
      message: 'Are you sure you want to delete this customer?',
      header: 'Delete Customer',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Delete',
      rejectLabel: 'Cancel',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: async () => {
        try {
          const response = await firstValueFrom(
            this.customerService.deleteApiCustomerId(this.customer()?.id ?? ''),
          );
          if (response) {
            this.deleted.emit();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Customer deleted successfully',
            });
          }
        } catch (error: unknown) {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete customer',
          });
        }
      },
    });
  }
}
