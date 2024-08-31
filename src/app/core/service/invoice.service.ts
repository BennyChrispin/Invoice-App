import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Invoice } from '../models/invoice.model';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private dataUrl = 'assets/data/data.json';
  private invoicesSubject = new BehaviorSubject<Invoice[]>([]);
  invoices$ = this.invoicesSubject.asObservable();

  constructor(private http: HttpClient) {
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
    return new Observable<Invoice>((observer) => {
      observer.next(newInvoice);
      observer.complete();
    });
  }

  // Implement deleteInvoice method
  deleteInvoice(id: string): Observable<void> {
    const currentInvoices = this.invoicesSubject.getValue();
    const updatedInvoices = currentInvoices.filter(
      (invoice: { id: string }) => invoice.id !== id
    );
    this.invoicesSubject.next(updatedInvoices);

    return new Observable<void>((observer) => {
      observer.next();
      observer.complete();
    });
  }
}
