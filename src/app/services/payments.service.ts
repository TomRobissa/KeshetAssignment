import { Injectable, signal } from '@angular/core';
import { PAYMENTS } from '../payment-table/payments';
import { Payment } from '../../shared/Payment';
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
}
