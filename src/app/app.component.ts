import { Component, signal } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';


@Component({
  selector: 'app-root',
  imports: [NgxExtendedPdfViewerModule, PdfViewerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'keshet-assignment-receipts';
  totalPages = signal<number>(0);

  onPdfLoadComplete(pdf: PDFDocumentProxy) {
    console.log('pdf complete loaded');
    console.dir(pdf);
      this.totalPages.set(pdf.numPages);
  }

}

