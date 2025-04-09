import { Injectable, signal } from '@angular/core';
import { PAYMENTS } from '../payment-table/payments';
import { Payment, PaymentStatus } from '../../shared/Payment';
import { BehaviorSubject } from 'rxjs';
import { NotFoundError } from '@angular/core/primitives/di';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  private payments = new BehaviorSubject<Payment[]>(PAYMENTS);
  payments$ = this.payments.asObservable();
  private selectedPayment = new BehaviorSubject<Payment>(
    this.payments.value[0]
  );
  selectedPayment$ = this.selectedPayment.asObservable();

  private paymentStatusToSum = new BehaviorSubject<
    Record<PaymentStatus, number>
  >(
    PAYMENTS.reduce((acc, payment) => {
      // If the status does not exist in the accumulator, initialize it
      if (!acc[payment.status]) {
        acc[payment.status] = 0;
      }

      // Add the amount to the existing sum for the corresponding status
      acc[payment.status] += 1;

      return acc;
    }, {} as Record<PaymentStatus, number>)
  );
  paymentStatusToSum$ = this.paymentStatusToSum.asObservable();

  constructor() {}

  findPayment(paymentId: number) {
    return this.payments.value.find((p) => p.id === paymentId);
  }
  selectPayment(paymentId: number) {
    const paymentSelected = this.findPayment(paymentId);
    if (!paymentSelected) {
      throw new NotFoundError(`Payment Id missing: ${paymentId}`);
    }
    this.selectedPayment.next(paymentSelected);
  }
  changePaymentStatus(paymentId: number) {
    const payment = this.findPayment(paymentId);
    if (!payment) {
      return;
    }
    const previousStatus = payment.status;
    this.cycleStatus(payment);

    this.paymentStatusToSum.value[payment.status] += 1;
    this.paymentStatusToSum.value[previousStatus] -= 1;
  }

  private cycleStatus(payment: Payment): void {
    console.log(payment.status);
    switch (payment.status) {
      case 'pending':
        payment.status = 'pending-approval';
        break;
      case 'pending-approval':
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
}
