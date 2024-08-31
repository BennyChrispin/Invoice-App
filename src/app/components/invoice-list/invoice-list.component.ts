import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as InvoiceActions from '../../store/invoice.action';
import { Invoice } from '../../core/models/invoice.model';
import { AppState } from '../../store/app.state';
import { selectInvoices } from '../../store/invoice.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css'],
})
export class InvoiceListComponent implements OnInit, OnDestroy {
  isFormOpen = false;
  isDropdownOpen = false;
  arrowIcon = 'assets/icons/icon-arrow-down.svg';
  invoices: Invoice[] = [];
  filteredInvoices: Invoice[] = [];
  invoicesSubscription!: Subscription;
  selectedStatuses: string[] = [];

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.store.dispatch(InvoiceActions.loadInvoices());
    this.invoicesSubscription = this.store
      .select(selectInvoices)
      .subscribe((invoices) => {
        this.invoices = invoices;
        this.filterInvoices();
      });
  }

  ngOnDestroy() {
    if (this.invoicesSubscription) {
      this.invoicesSubscription.unsubscribe();
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.arrowIcon = this.isDropdownOpen
      ? 'assets/icons/icon-arrow-up.svg'
      : 'assets/icons/icon-arrow-down.svg';
  }

  onStatusChange(selectedStatus: any) {
    this.selectedStatuses = [];
    if (selectedStatus.draft) this.selectedStatuses.push('Draft');
    if (selectedStatus.paid) this.selectedStatuses.push('Paid');
    if (selectedStatus.pending) this.selectedStatuses.push('Pending');
    this.filterInvoices();
  }

  filterInvoices() {
    if (this.selectedStatuses.length > 0) {
      this.filteredInvoices = this.invoices.filter((invoice) =>
        this.selectedStatuses.includes(invoice.status)
      );
    } else {
      this.filteredInvoices = this.invoices;
    }
  }

  viewInvoiceDetails(invoiceId: string) {
    this.router.navigate(['/invoice', invoiceId]);
  }

  deleteInvoice(id: string) {}
  openInvoiceForm() {
    this.isFormOpen = true;
  }

  closeInvoiceForm() {
    this.isFormOpen = false;
  }
}
