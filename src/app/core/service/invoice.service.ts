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

  // Method to return invoices observable
  getInvoices(): Observable<Invoice[]> {
    return this.invoices$;
  }
}
