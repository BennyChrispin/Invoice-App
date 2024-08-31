import { createReducer, on } from '@ngrx/store';
import * as InvoiceActions from './invoice.action';

export interface InvoiceState {
  invoices: any[];
  error: any;
}

export const initialState: InvoiceState = {
  invoices: [],
  error: null,
};

export interface Error {
  message: string;
  code?: number;
}

export const invoiceReducer = createReducer(
  initialState,
  on(InvoiceActions.loadInvoicesSuccess, (state, { invoices }) => ({
    ...state,
    invoices,
    error: null,
  })),
  on(InvoiceActions.loadInvoicesFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(InvoiceActions.addInvoiceSuccess, (state, { invoice }) => ({
    ...state,
    invoices: [...state.invoices, invoice],
    error: null,
  })),
  on(InvoiceActions.addInvoiceFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(InvoiceActions.updateInvoiceSuccess, (state, { invoice }) => ({
    ...state,
    invoices: state.invoices.map((i) => (i.id === invoice.id ? invoice : i)),
    error: null,
  })),
  on(InvoiceActions.updateInvoiceFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(InvoiceActions.deleteInvoiceSuccess, (state, { id }) => ({
    ...state,
    invoices: state.invoices.filter((i) => i.id !== id),
    error: null,
  })),

  on(InvoiceActions.deleteInvoice, (state, { id }) => ({
    ...state,
    invoices: state.invoices.filter((invoice) => invoice.id !== id),
  })),

  on(InvoiceActions.deleteInvoiceFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
