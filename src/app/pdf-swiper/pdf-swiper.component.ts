import {
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { PDFDocumentProxy, PdfViewerModule } from 'ng2-pdf-viewer';
import { PaymentsService } from '../services/payments.service';
@Component({
  selector: 'app-pdf-swiper',
  imports: [PdfViewerModule], //chose ng2-pdf-viewer for simplicity
  schemas: [CUSTOM_ELEMENTS_SCHEMA], //required for swiper.js elements naming
  templateUrl: './pdf-swiper.component.html',
  styleUrl: './pdf-swiper.component.css',
})
export class PdfSwiperComponent implements OnInit {
  pdfFileName = signal<string>('');
  pdfPath = computed(() => `../assets/${this.pdfFileName()}`);
  totalPages = signal<number[]>([1]);

  constructor(private PaymentsService: PaymentsService) {}
  ngOnInit() {
    this.PaymentsService.selectedPayment$.subscribe((newSelectedPayment) => {
      this.pdfFileName.set(newSelectedPayment.pdfUrl);
    });
  }

  //required for pagination pages iteration
  onPdfLoadComplete(pdf: PDFDocumentProxy) {
    this.totalPages.set(Array.from({ length: pdf.numPages }, (_, i) => i));
  }
}
