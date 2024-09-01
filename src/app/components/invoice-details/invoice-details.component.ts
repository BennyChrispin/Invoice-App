import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { selectInvoiceById } from '../../store/invoice.selectors';
import { Invoice } from '../../core/models/invoice.model';
import { Location } from '@angular/common';
import * as InvoiceActions from '../../store/invoice.action';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css'],
})
export class InvoiceDetailsComponent implements OnInit, OnDestroy {
  [x: string]: any;
  invoice!: Invoice | null;
  showDeleteModal = false;
  isFormOpen = false;
  private subscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.store.dispatch(InvoiceActions.loadInvoices());

    this.subscription = this.store
      .select(selectInvoiceById(id))
      .subscribe((invoice) => {
        this.invoice = invoice;
        if (!invoice) {
          this.store.dispatch(InvoiceActions.loadInvoice({ id }));
        }
      });
  }

  markAsPaid(): void {
    if (this.invoice) {
      this.store.dispatch(
        InvoiceActions.updateInvoiceStatus({
          id: this.invoice.id,
          status: 'Paid',
        })
      );
    }
  }

  deleteInvoice(id: string): void {
    this.showDeleteModal = true;
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleDeleteConfirmed(): void {
    if (this.invoice) {
      this.store.dispatch(
        InvoiceActions.deleteInvoice({ id: this.invoice.id })
      );
    }
    this.showDeleteModal = false;
  }

  handleDeleteCancelled(): void {
    this.showDeleteModal = false;
  }
  editInvoice(): void {
    if (this.invoice) {
      this.router.navigate(['/invoice/edit', this.invoice.id]);
    }
  }
  openInvoiceForm() {
    this.isFormOpen = true;
  }

  closeInvoiceForm() {
    this.isFormOpen = false;
  }
}
