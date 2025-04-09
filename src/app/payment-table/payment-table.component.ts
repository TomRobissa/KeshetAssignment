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
  selectedPaymentId = signal<number>(1);
  payments = signal<Payment[]>([]);
  constructor(private paymentsService: PaymentsService) {}

  ngOnInit() {
    this.paymentsService.payments$.subscribe((newPayments) => {
      this.payments.set(newPayments);
    });
    this.paymentsService.selectedPayment$.subscribe((newSelectedPayment) => {
      this.selectedPaymentId.set(newSelectedPayment.id);
    });
  }

  getStatusIcon(payment: Payment): string {
    let selectedRowSVGColor = '';
    if (
      this.viewMode() === 'table-pdf-preview-split' &&
      payment.id === this.selectedPaymentId()
    ) {
      selectedRowSVGColor = '_white';
    }
    const svgPath = `../../assets/${payment.status}-status${selectedRowSVGColor}.svg`;
    return svgPath;
  }

  cycleStatus(payment: Payment): void {
    this.paymentsService.changePaymentStatus(payment.id);
  }

  onPaymentSelected(paymentId: number) {
    if (this.viewMode() === 'table-only') {
      return;
    }
    this.paymentsService.selectPayment(paymentId);
  }
}
