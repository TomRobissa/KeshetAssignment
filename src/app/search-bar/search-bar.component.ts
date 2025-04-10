import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import moment from 'moment';
import {
  DaterangepickerComponent,
  DaterangepickerDirective,
  NgxDaterangepickerMd,
} from 'ngx-daterangepicker-material';

@Component({
  selector: 'app-search-bar',
  imports: [NgxDaterangepickerMd, FormsModule, CommonModule],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  @ViewChild(DaterangepickerDirective, { static: false })
  pickerDirective!: DaterangepickerDirective;
  dropdownOpen = false;
  filters = { supplier: true, invoice: false };
  searchText = '';

  selectedDateRange = {
    startDate: moment(),
    endDate: moment(),
  };

  openDatePicker() {
    this.pickerDirective.open();
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  enforceCheckboxRule() {
    if (!this.filters.supplier && !this.filters.invoice) {
      this.filters.supplier = true;
    }
  }

  isSearchEnabled(): boolean {
    return this.filters.supplier || this.filters.invoice;
  }

  onSearch() {
    if (!this.isSearchEnabled()) return;

    const filtersApplied = {
      searchText: this.searchText,
      filterBySupplier: this.filters.supplier,
      filterByInvoice: this.filters.invoice,
      startDate: this.selectedDateRange.startDate.toDate(),
      endDate: this.selectedDateRange.endDate.toDate(),
    };
  }

  onDateRangeChange(event: any) {
    this.selectedDateRange = {
      startDate: event.startDate,
      endDate: event.endDate,
    };
    this.onSearch(); // trigger search automatically if needed
  }

  get dateRangeDisplay(): string {
    if (
      !this.selectedDateRange?.startDate ||
      !this.selectedDateRange?.endDate
    ) {
      return 'בחר טווח תאריכים';
    }

    return `${this.selectedDateRange.startDate.format(
      'DD.MM.YYYY'
    )} - ${this.selectedDateRange.endDate.format('DD.MM.YYYY')}`;
  }
}
