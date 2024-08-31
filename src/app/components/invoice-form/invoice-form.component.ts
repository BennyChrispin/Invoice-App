import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceFormComponent implements OnInit {
  invoiceForm!: FormGroup;
  trackByFn(index: number, item: any): number {
    return index;
  }

  constructor(private fb: FormBuilder) {}

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
      invoiceDate: ['', Validators.required],
      paymentTerms: ['', Validators.required],
      projectDescription: ['', Validators.required],
      items: this.fb.array([]),
    });
  }

  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  addItem(): void {
    this.items.push(
      this.fb.group({
        itemName: ['', Validators.required],
        qty: [1, [Validators.required, Validators.min(1)]],
        price: [0, [Validators.required, Validators.min(0)]],
      })
    );
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  onSubmit(isDraft: boolean): void {
    if (this.invoiceForm.valid) {
      const formData = {
        ...this.invoiceForm.value,
        status: isDraft ? 'Draft' : 'Sent',
      };
      console.log('Form Submitted', formData);
    } else {
      this.invoiceForm.markAllAsTouched(); // Mark all fields as touched to show validation errors
    }
  }

  closeForm(): void {
    console.log('Form closed');
    this.invoiceForm.reset(); // Reset the form when closing
  }

  // Method to get error messages for a form control
  getErrorMessage(controlName: string): string | null {
    const control = this.invoiceForm.get(controlName);
    if (control && control.touched) {
      if (control.errors?.['required']) {
        return 'This field is required.';
      } else if (control.errors?.['email']) {
        return 'Invalid email format.';
      }
    }
    return null;
  }
}
