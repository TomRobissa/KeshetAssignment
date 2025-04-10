import {
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  signal,
} from '@angular/core';
import { register } from 'swiper/element/bundle';
import { PdfSwiperComponent } from './pdf-swiper/pdf-swiper.component';
import { PaymentTableComponent } from './payment-table/payment-table.component';
import { ReceiptsViewMode } from '../shared/ReceiptViewMode';
import { ViewModeComponent } from './view-mode/view-mode.component';
import { PaymentStatusSummaryComponent } from './payment-status-summary/payment-status-summary.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

register();

@Component({
  selector: 'app-root',
  imports: [
    PdfSwiperComponent,
    PaymentTableComponent,
    ViewModeComponent,
    PaymentStatusSummaryComponent,
    SearchBarComponent,
  ],
  templateUrl: './app.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './app.component.css',
})
export class AppComponent {
  receiptsViewMode = signal<ReceiptsViewMode>('table-only');

  onViewModeChanged(viewMode: ReceiptsViewMode) {
    this.receiptsViewMode.set(viewMode);
  }
}
