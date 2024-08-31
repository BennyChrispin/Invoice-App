import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import * as InvoiceActions from '../../store/invoice.action';
import { Invoice } from '../../core/models/invoice.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css'],
})
export class InvoiceFormComponent implements OnInit {
  invoiceForm!: FormGroup;
  dropdownOpen = false;
  selectedOption = 'Net 1 Day';
  paymentOptions = ['Net 1 Day', 'Net 7 Days', 'Net 14 Days', 'Net 30 Days'];
  @Output() closeForm: EventEmitter<void> = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.invoiceForm = this.fb.group({
      clientName: ['', Validators.required],
      clientEmail: ['', [Validators.required, Validators.email]],
      clientAddress: this.fb.group({
        streetAddress: ['', Validators.required],
        city: ['', Validators.required],
        postCode: ['', Validators.required],
        country: ['', Validators.required],
      }),
      senderAddress: this.fb.group({
        streetAddress: ['', Validators.required],
        city: ['', Validators.required],
        postCode: ['', Validators.required],
        country: ['', Validators.required],
      }),
      invoiceDate: ['', Validators.required],
      paymentTerms: [this.selectedOption],
      projectDescription: ['', Validators.required],
      items: this.fb.array([this.createItem()]),
    });
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.invoiceForm.get('paymentTerms')?.setValue(option);
    this.dropdownOpen = false;
  }

  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  createItem(): FormGroup {
    return this.fb.group({
      itemName: ['', Validators.required],
      qty: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      total: [{ value: 0, disabled: true }],
    });
  }

  addItem(): void {
    this.items.push(this.createItem());
  }

  removeItem(index: number): void {
    if (this.items.length > 1) {
      this.items.removeAt(index);
    }
  }

  trackByFn(index: number): number {
    return index;
  }

  getErrorMessage(controlName: string): string {
    const control = this.invoiceForm.get(controlName);
    if (control && control.hasError('required')) {
      return 'This field is required';
    }
    if (control && control.hasError('email')) {
      return 'Please enter a valid email address';
    }
    if (control && control.hasError('min')) {
      return `Minimum value is ${control.errors?.['min'].min}`;
    }
    return '';
  }

  generateInvoiceId(): string {
    const prefix = 'BE';
    const uuidPart = uuidv4().split('-')[0];
    const minLength = 4;
    const paddedUuidPart =
      uuidPart.length < minLength ? uuidPart.padEnd(minLength, '0') : uuidPart;

    return `${prefix}-${paddedUuidPart}`;
  }

  saveAsDraft(): void {
    console.log('Saving as draft:', this.invoiceForm.getRawValue());
  }
  saveAndSend(): void {
    if (this.invoiceForm.valid) {
      const newInvoice: Invoice = {
        ...this.invoiceForm.value,
        id: this.generateInvoiceId(),
      };
      this.store.dispatch(InvoiceActions.addInvoice({ invoice: newInvoice }));
    }

    console.log('Saving and sending:', this.invoiceForm.getRawValue());
  }

  closeModal() {
    this.closeForm.emit();
  }
}
