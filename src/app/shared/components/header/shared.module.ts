import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@NgModule({
  declarations: [HeaderComponent, ConfirmationModalComponent],
  imports: [CommonModule],
  exports: [HeaderComponent, ConfirmationModalComponent],
})
export class SharedModule {}
