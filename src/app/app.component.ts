import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { PdfSwiperComponent } from './pdf-swiper/pdf-swiper.component';
import { PaymentTableComponent } from "./payment-table/payment-table.component";

register();

@Component({
  selector: 'app-root',
  imports: [PdfSwiperComponent, PaymentTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'keshet-assignment-receipts';
   receiptsViewMode: 'table-only' |  'table-pdf-preview-split' = 'table-only';
}
