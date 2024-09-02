import { createSelector, createFeatureSelector } from '@ngrx/store';
import { InvoiceState } from './invoice.reducer';
import { adapter } from './invoice.reducer';

export const selectInvoiceState =
  createFeatureSelector<InvoiceState>('invoices');

export const selectInvoices = createSelector(
  selectInvoiceState,
  adapter.getSelectors().selectAll
);

export const selectInvoiceById = (id: string) =>
  createSelector(
    selectInvoiceState,
    (state: InvoiceState) => state.entities[id] || null
  );
