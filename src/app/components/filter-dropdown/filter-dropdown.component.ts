import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-dropdown',
  templateUrl: './filter-dropdown.component.html',
  styleUrls: ['./filter-dropdown.component.css'],
})
export class FilterDropdownComponent {
  @Input() isDropdownOpen = false;
  @Output() statusChange = new EventEmitter<any>();

  status = {
    draft: false,
    paid: false,
    pending: false,
  };

  onStatusChange() {
    this.statusChange.emit(this.status);
  }
}
