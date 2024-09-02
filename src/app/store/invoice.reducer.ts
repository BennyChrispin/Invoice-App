import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { Invoice } from '../core/models/invoice.model';
import * as InvoiceActions from './invoice.action';

export interface InvoiceState extends EntityState<Invoice> {
  error: any;
}

export const adapter: EntityAdapter<Invoice> = createEntityAdapter<Invoice>();

export const initialState: InvoiceState = adapter.getInitialState({
  error: null,
});

export const invoiceReducer = createReducer(
  initialState,
  on(InvoiceActions.loadInvoicesSuccess, (state, { invoices }) =>
    adapter.setAll(invoices, { ...state, error: null })
  ),
  on(InvoiceActions.addInvoiceSuccess, (state, { invoice }) =>
    adapter.addOne(invoice, { ...state, error: null })
  ),
  on(InvoiceActions.updateInvoiceSuccess, (state, { invoice }) =>
    adapter.updateOne(
      { id: invoice.id, changes: invoice },
      { ...state, error: null }
    )
  ),
  on(InvoiceActions.deleteInvoiceSuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, error: null })
  ),
  on(
    InvoiceActions.loadInvoicesFailure,
    InvoiceActions.addInvoiceFailure,
    (state, { error }) => ({
      ...state,
      error,
    })
  )
);
