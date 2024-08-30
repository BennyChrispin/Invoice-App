import { createSelector } from '@ngrx/store';
import { AppState } from './app.state';
import { Invoice } from '../core/models/invoice.model';

export const selectInvoiceState = (state: AppState) => state.invoices;

export const selectInvoices = createSelector(
  selectInvoiceState,
  (state) => state.invoices
);

export const selectInvoiceById = (id: string) =>
  createSelector(selectInvoices, (invoices: Invoice[]) =>
    invoices.find((invoice) => invoice.id === id)
  );
