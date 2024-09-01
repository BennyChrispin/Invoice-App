import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';
import { EditInvoiceFormComponent } from './components/edit-invoice-form/edit-invoice-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/invoice-list', pathMatch: 'full' },
  { path: 'invoice-list', component: InvoiceListComponent },
  { path: 'invoice/:id', component: InvoiceDetailsComponent },
  { path: 'invoice/edit/:id', component: EditInvoiceFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
