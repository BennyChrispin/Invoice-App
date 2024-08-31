import { createSelector, createFeatureSelector } from '@ngrx/store';
import { InvoiceState } from './invoice.reducer';

export const selectInvoiceState =
  createFeatureSelector<InvoiceState>('invoices');

export const selectInvoices = createSelector(
  selectInvoiceState,
  (state: InvoiceState) => state.invoices
);

export const selectInvoiceById = (id: string) =>
  createSelector(
    selectInvoices,
    (invoices) => invoices.find((invoice) => invoice.id === id) || null
  );
