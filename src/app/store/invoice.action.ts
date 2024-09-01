import { createAction, props } from '@ngrx/store';
import { Invoice } from '../core/models/invoice.model';

// Load Invoices Actions
export const loadInvoices = createAction('[Invoice List] Load Invoices');

export const loadInvoicesSuccess = createAction(
  '[Invoice List] Load Invoices Success',
  props<{ invoices: Invoice[] }>()
);

export const loadInvoicesFailure = createAction(
  '[Invoice List] Load Invoices Failure',
  props<{ error: any }>()
);

// Add Invoice Actions
export const addInvoice = createAction(
  '[Invoice List] Add Invoice',
  props<{ invoice: Invoice }>()
);

export const addInvoiceSuccess = createAction(
  '[Invoice List] Add Invoice Success',
  props<{ invoice: Invoice }>()
);

export const addInvoiceFailure = createAction(
  '[Invoice List] Add Invoice Failure',
  props<{ error: any }>()
);

// Update Invoice Actions
export const updateInvoice = createAction(
  '[Invoice List] Update Invoice',
  props<{ invoice: Invoice }>()
);

export const updateInvoiceSuccess = createAction(
  '[Invoice List] Update Invoice Success',
  props<{ invoice: Invoice }>()
);

export const updateInvoiceFailure = createAction(
  '[Invoice List] Update Invoice Failure',
  props<{ error: any }>()
);

// Update Invoice Status Actions
export const updateInvoiceStatus = createAction(
  '[Invoice] Update Invoice Status',
  props<{ id: string; status: string }>()
);

export const updateInvoiceStatusSuccess = createAction(
  '[Invoice] Update Invoice Status Success',
  props<{ invoice: Invoice }>()
);

export const updateInvoiceStatusFailure = createAction(
  '[Invoice] Update Invoice Status Failure',
  props<{ error: any }>()
);

// Delete Invoice Actions
export const deleteInvoice = createAction(
  '[Invoice] Delete Invoice',
  props<{ id: string }>()
);

export const deleteInvoiceSuccess = createAction(
  '[Invoice List] Delete Invoice Success',
  props<{ id: string }>()
);

export const deleteInvoiceFailure = createAction(
  '[Invoice List] Delete Invoice Failure',
  props<{ error: any }>()
);
export function loadInvoice(arg0: { id: string }): any {
  throw new Error('Function not implemented.');
}
