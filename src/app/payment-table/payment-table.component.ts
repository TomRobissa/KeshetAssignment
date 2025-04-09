import { Component, input, output, signal } from '@angular/core';
import { ReceiptsViewMode } from '../../shared/ReceiptViewMode';
import { PAYMENTS } from './payments';
import { Payment } from '../../shared/Payment';
import { NotFoundError } from '@angular/core/primitives/di';
import { PaymentsService } from '../services/payments.service';

@Component({
  selector: 'app-payment-table',
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.css'],
})
export class PaymentTableComponent {
  viewMode = input.required<ReceiptsViewMode>();
  selectedPaymentId = signal<number>(0);
  PaymentSelected = output<string>({ alias: 'payment-selected' });
  payments = signal<Payment[]>([]);
  constructor(private paymentsService: PaymentsService) {}

  ngOnInit() {
    this.paymentsService.payments$.subscribe((newPayments) => {
      this.payments.set(newPayments);
    });
    if (this.viewMode() === 'table-only') {
      this.selectedPaymentId.set(0);
    } else {
      this.onPaymentSelected(1);
    }
  }

  getStatusIcon(payment: Payment): string {
    let selectedRowSVGColor = '';
    if (payment.id === this.selectedPaymentId()) {
      selectedRowSVGColor = '_white';
    }
    return `../../assets/${payment.status}-status${selectedRowSVGColor}.svg`;
  }

  cycleStatus(payment: Payment): void {
    switch (payment.status) {
      case 'pending':
        payment.status = 'approved';
        break;
      case 'approved':
        payment.status = 'rejected';
        break;
      case 'rejected':
        payment.status = 'pending';
        break;
    }
  }

  onPaymentSelected(paymentId: number) {
    if (this.viewMode() === 'table-only') {
      return;
    }
    const paymentSelected = this.paymentsService.findPayment(paymentId);
    if (!paymentSelected) {
      throw new NotFoundError(`Payment Id missing: ${paymentId}`);
    }
    this.selectedPaymentId.set(paymentId);
    if (!paymentSelected.pdfUrl) {
      throw new NotFoundError(`Pdf missing for payment ${paymentId}`);
    }
    this.PaymentSelected.emit(paymentSelected.pdfUrl);
  }
}
