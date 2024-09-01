import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { InvoiceService } from '../../core/service/invoice.service';
import { Invoice } from '../../core/models/invoice.model';

@Component({
  selector: 'app-edit-invoice-form',
  templateUrl: './edit-invoice-form.component.html',
  styleUrls: ['./edit-invoice-form.component.css'],
})
export class EditInvoiceFormComponent implements OnInit {
  invoiceForm!: FormGroup;
  dropdownOpen = false;
  selectedOption = 'Net 1 Day';
  paymentOptions = ['Net 1 Day', 'Net 7 Days', 'Net 14 Days', 'Net 30 Days'];
  invoiceId!: string;
  @Output() closeForm: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {
    console.log('Initializing form...');
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
      paymentDue: ['', Validators.required],
      paymentTerms: [this.selectedOption, Validators.required],
      description: ['', Validators.required],
      items: this.fb.array([this.createItem()]),
    });

    console.log('Form initialized:', this.invoiceForm);

    this.route.paramMap.subscribe((params) => {
      this.invoiceId = params.get('id')!;
      this.loadInvoiceData(this.invoiceId);
    });
  }

  loadInvoiceData(invoiceId: string): void {
    if (this.invoiceForm) {
      this.invoiceService.getInvoices().subscribe((invoices) => {
        const invoice = invoices.find((inv) => inv.id === invoiceId);
        if (invoice) {
          this.populateForm(invoice);
        }
      });
    } else {
      console.error('Form is not initialized');
    }
  }

  populateForm(invoice: Invoice): void {
    if (this.invoiceForm) {
      this.invoiceForm.patchValue({
        clientName: invoice.clientName,
        clientEmail: invoice.clientEmail,
        clientAddress: {
          streetAddress: invoice.clientAddress.street,
          city: invoice.clientAddress.city,
          postCode: invoice.clientAddress.postCode,
          country: invoice.clientAddress.country,
        },
        senderAddress: {
          streetAddress: invoice.senderAddress.street,
          city: invoice.senderAddress.city,
          postCode: invoice.senderAddress.postCode,
          country: invoice.senderAddress.country,
        },
        paymentDue: invoice.paymentDue,
        paymentTerms: invoice.paymentTerms,
        description: invoice.description,
      });

      // Patch the form array items
      const itemsFormArray = this.invoiceForm.get('items') as FormArray;
      itemsFormArray.clear();
      invoice.items.forEach((item) =>
        itemsFormArray.push(this.createItemWithValues(item))
      );
    } else {
      console.error('Form is not initialized');
    }
  }

  createItem(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      total: [{ value: 0, disabled: true }],
    });
  }

  createItemWithValues(item: any): FormGroup {
    return this.fb.group({
      name: [item.name, Validators.required],
      quantity: [item.quantity, [Validators.required, Validators.min(1)]],
      price: [item.price, [Validators.required, Validators.min(0)]],
      total: [{ value: item.total, disabled: true }],
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

  closeModal() {
    this.closeForm.emit();
  }

  onSubmit(): void {
    if (this.invoiceForm.valid) {
      this.invoiceService
        .updateInvoice(this.invoiceId, this.invoiceForm.value)
        .subscribe(() => {
          // Navigate back or show a success message
        });
    }
  }
}
