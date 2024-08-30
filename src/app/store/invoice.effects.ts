import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import * as InvoiceActions from './invoice.action';
import { InvoiceService } from '../core/service/invoice.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Invoice } from '../core/models/invoice.model';

@Injectable()
export class InvoiceEffects {
  private loadInvoicesSubscription: Subscription | null = null;

  constructor(
    private actions$: Actions,
    private invoiceService: InvoiceService,
    private store: Store
  ) {
    this.initializeLoadInvoicesEffect();
  }

  private initializeLoadInvoicesEffect() {
    this.actions$.subscribe((action) => {
      if (action.type === InvoiceActions.loadInvoices.type) {
        this.loadInvoices();
      }
    });
  }

  private loadInvoices() {
    if (this.loadInvoicesSubscription) {
      this.loadInvoicesSubscription.unsubscribe();
    }

    this.loadInvoicesSubscription = this.invoiceService
      .getInvoices()
      .subscribe({
        next: (invoices: Invoice[]) => {
          this.store.dispatch(InvoiceActions.loadInvoicesSuccess({ invoices }));
        },
        error: (error: any) => {
          this.store.dispatch(
            InvoiceActions.loadInvoicesFailure({ error: error.message })
          );
        },
      });
  }
}
