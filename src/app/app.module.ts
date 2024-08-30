import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';
import { EditInvoiceFormComponent } from './components/edit-invoice-form/edit-invoice-form.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SharedModule } from './shared/components/header/shared.module';
import { FilterDropdownComponent } from './components/filter-dropdown/filter-dropdown.component';
import { FormsModule } from '@angular/forms';
import { invoiceReducer } from './store/invoice.reducer';
import { InvoiceEffects } from './store/invoice.effects';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    InvoiceListComponent,
    InvoiceDetailsComponent,
    InvoiceFormComponent,
    EditInvoiceFormComponent,
    FilterDropdownComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ invoices: invoiceReducer }),
    EffectsModule.forRoot([InvoiceEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    FormsModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
