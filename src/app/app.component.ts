import {
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  signal,
} from '@angular/core';
import { register } from 'swiper/element/bundle';
import { PdfSwiperComponent } from './pdf-swiper/pdf-swiper.component';
import { PaymentTableComponent } from './payment-table/payment-table.component';
import { ReceiptsViewMode } from '../shared/ReceiptViewMode';
import { ViewModeComponent } from './view-mode/view-mode.component';

register();

@Component({
  selector: 'app-root',
  imports: [PdfSwiperComponent, PaymentTableComponent, ViewModeComponent],
  templateUrl: './app.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './app.component.css',
})
export class AppComponent {
  receiptsViewMode = signal<ReceiptsViewMode>('table-only');
  pdfFileName = signal<string>('');
  pdfPath = computed(() => `../assets/${this.pdfFileName()}`);

  onPaymentSelected(selectedPaymentFileName: string) {
    this.pdfFileName.set(selectedPaymentFileName);
  }
  onViewModeChanged(viewMode: ReceiptsViewMode) {
    this.receiptsViewMode.set(viewMode);
  }
}
