import { createAction, props } from '@ngrx/store';
import { Invoice } from '../core/models/invoice.model';

export const loadInvoices = createAction('[Invoice List] Load Invoices');

export const loadInvoice = createAction(
  '[Invoice Details] Load Invoice',
  props<{ id: string }>()
);

export const loadInvoicesSuccess = createAction(
  '[Invoice List] Load Invoices Success',
  props<{ invoices: any[] }>()
);
export const loadInvoicesFailure = createAction(
  '[Invoice List] Load Invoices Failure',
  props<{ error: any }>()
);

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

export const updateInvoice = createAction(
  '[Invoice List] Update Invoice',
  props<{ invoice: any }>()
);
export const updateInvoiceSuccess = createAction(
  '[Invoice List] Update Invoice Success',
  props<{ invoice: any }>()
);
export const updateInvoiceFailure = createAction(
  '[Invoice List] Update Invoice Failure',
  props<{ error: any }>()
);

export const deleteInvoice = createAction(
  '[Invoice List] Delete Invoice',
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
