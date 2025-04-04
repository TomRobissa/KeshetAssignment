import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';
import { register } from 'swiper/element/bundle';

type SwiperPage = {
  page: number;
  isSelected: boolean;
};

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
  totalPagesArray = signal<SwiperPage[]>([]);
  activePage = 0;

  onPdfLoadComplete(pdf: PDFDocumentProxy) {
    this.totalPagesArray.set(
      Array.from({ length: pdf.numPages }, (_, i) => {
        return { page: i, isSelected: i === 0 };
      })
    );
  }

  onSlideChange(event: any) {
    const swiper = event.target.swiper; // Get Swiper instance
    console.dir(swiper);
    this.activePage = swiper.activeIndex + 1; // Update active page
    console.log(`Slide changed to: ${this.activePage}`);
  }
}
