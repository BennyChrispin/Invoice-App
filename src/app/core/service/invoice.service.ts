import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Invoice } from '../models/invoice.model';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private dataUrl = 'assets/data/data.json';
  private invoicesSubject = new BehaviorSubject<Invoice[]>([]);
  invoices$ = this.invoicesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.http.get<Invoice[]>(this.dataUrl).subscribe((data) => {
      this.invoicesSubject.next(data);
    });
  }

  getInvoices(): Observable<Invoice[]> {
    return this.invoices$;
  }

  addInvoice(newInvoice: Invoice): Observable<Invoice> {
    const currentInvoices = this.invoicesSubject.getValue();
    const updatedInvoices = [...currentInvoices, newInvoice];
    this.invoicesSubject.next(updatedInvoices);
    return of(newInvoice);
  }

  updateStatus(id: string, status: string): Observable<Invoice> {
    const currentInvoices = this.invoicesSubject.getValue();
    const updatedInvoices = currentInvoices.map((invoice) =>
      invoice.id === id ? { ...invoice, status } : invoice
    );
    this.invoicesSubject.next(updatedInvoices);
    const updatedInvoice = updatedInvoices.find(
      (inv) => inv.id === id
    ) as Invoice;
    return of(updatedInvoice);
  }

  deleteInvoice(id: string): Observable<void> {
    const currentInvoices = this.invoicesSubject.getValue();
    const updatedInvoices = currentInvoices.filter(
      (invoice) => invoice.id !== id
    );
    this.invoicesSubject.next(updatedInvoices);
    return of();
  }
  updateInvoice(
    id: string,
    updatedData: Partial<Invoice>
  ): Observable<Invoice> {
    const currentInvoices = this.invoicesSubject.getValue();
    const updatedInvoices = currentInvoices.map((invoice) =>
      invoice.id === id ? { ...invoice, ...updatedData } : invoice
    );
    this.invoicesSubject.next(updatedInvoices);

    const updatedInvoice = updatedInvoices.find(
      (inv) => inv.id === id
    ) as Invoice;
    return of(updatedInvoice);
  }
}
