import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import moment from 'moment';
import {
  DaterangepickerComponent,
  DaterangepickerDirective,
  NgxDaterangepickerMd,
} from 'ngx-daterangepicker-material';
import { PaymentsService } from '../services/payments.service';

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
  searchText = '';
  selectedDateRange = {
    startDate: moment(),
    endDate: moment(),
  };

  constructor(private paymentsService: PaymentsService) {}

  openDatePicker() {
    this.pickerDirective.open();
  }

  onSearch(event: any) {
    this.paymentsService.filterPayments(
      this.searchText,
      this.selectedDateRange.startDate,
      this.selectedDateRange.endDate
    );
    event.preventDefault();
  }

  onDateRangeChange(event: any) {
    this.selectedDateRange = {
      startDate: event.startDate,
      endDate: event.endDate,
    };
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
