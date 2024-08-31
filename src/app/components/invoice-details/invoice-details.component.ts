import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { selectInvoiceById } from '../../store/invoice.selectors';
import { Invoice } from '../../core/models/invoice.model';
import { Location } from '@angular/common';
import * as InvoiceActions from '../../store/invoice.action';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css'],
})
export class InvoiceDetailsComponent implements OnInit, OnDestroy {
  invoice!: Invoice | null;
  private subscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.store.dispatch(InvoiceActions.loadInvoices());

    this.subscription = this.store
      .select(selectInvoiceById(id))
      .subscribe((invoice) => {
        this.invoice = invoice;
        if (!invoice) {
          // Dispatch action to load a single invoice if not found in state
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
    if (confirm('Are you sure you want to delete this invoice?')) {
      this.store.dispatch(InvoiceActions.deleteInvoice({ id }));
    }
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
