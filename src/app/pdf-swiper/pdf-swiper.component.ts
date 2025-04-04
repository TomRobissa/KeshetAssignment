import { Component, CUSTOM_ELEMENTS_SCHEMA, input, signal } from '@angular/core';
import { PDFDocumentProxy, PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-pdf-swiper',
  imports: [PdfViewerModule], //chose ng2-pdf-viewer for simplicity
  schemas: [CUSTOM_ELEMENTS_SCHEMA], //required for swiper.js elements naming
  templateUrl: './pdf-swiper.component.html',
  styleUrl: './pdf-swiper.component.css'
})
export class PdfSwiperComponent {
  pdfUrl = input.required<string>();
  totalPages = signal<number[]>([1]);

  //required for pagination pages iteration
  onPdfLoadComplete(pdf: PDFDocumentProxy) { 
    this.totalPages.set(Array.from({ length: pdf.numPages }, (_, i) => i)); 
  }
}
