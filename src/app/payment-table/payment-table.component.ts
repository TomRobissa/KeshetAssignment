import { Component, input, output, signal } from '@angular/core';
import { ReceiptsViewMode } from '../../shared/ReceiptViewMode';
import { PAYMENTS } from './payments';
import { Payment } from '../../shared/Payment';
import { NotFoundError } from '@angular/core/primitives/di';

@Component({
  selector: 'app-payment-table',
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.css'],
})
export class PaymentTableComponent {
  payments = signal<Payment[]>(PAYMENTS);
  selectedPaymentId = signal<number>(0);
  viewMode = input.required<ReceiptsViewMode>();
  PaymentSelected = output<string>({alias: 'payment-selected'});

  ngOnInit() {
    if (this.viewMode() === 'table-only') {
      this.selectedPaymentId.set(0);
    } else {
      this.selectedPaymentId.set(1);
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
    if (this.viewMode() === 'table-only'){
        return;
    }
    const paymentSelected = this.payments().find(p => p.id === paymentId);
    if (!paymentSelected){
      throw new NotFoundError(`Payment Id missing: ${paymentId}`);
    }
    this.selectedPaymentId.set(paymentId);
    if (!paymentSelected.pdfUrl){
      throw new NotFoundError(`Pdf missing for payment ${paymentId}`);
    }
    this.PaymentSelected.emit(paymentSelected.pdfUrl)
  }
}
