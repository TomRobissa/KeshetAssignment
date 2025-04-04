import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-root',
  imports: [NgxExtendedPdfViewerModule, PdfViewerModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'keshet-assignment-receipts';
  totalPages = signal<number[]>([1]);

  onPdfLoadComplete(pdf: PDFDocumentProxy) {
    this.totalPages.set(Array.from({ length: pdf.numPages }, (_, i) => i));
  }
}
