import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { selectInvoiceById } from '../../store/invoice.selectors';
import { Invoice } from '../../core/models/invoice.model';
import { Location } from '@angular/common';
import * as InvoiceActions from '../../store/invoice.action';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css'],
})
export class InvoiceDetailsComponent implements OnInit {
  invoice!: Invoice | null;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.store.select(selectInvoiceById(id)).subscribe((invoice) => {
      if (invoice) {
        this.invoice = invoice;
      } else {
        // Dispatch action to load invoice from data source
        this.store.dispatch(InvoiceActions.loadInvoice({ id }));
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
