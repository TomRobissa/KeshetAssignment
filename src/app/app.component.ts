import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';
import { register } from 'swiper/element/bundle';
import { PdfSwiperComponent } from './pdf-swiper/pdf-swiper.component';

register();

@Component({
  selector: 'app-root',
  imports: [PdfSwiperComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'keshet-assignment-receipts';
}
