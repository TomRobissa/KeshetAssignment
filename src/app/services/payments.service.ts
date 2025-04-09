import { Injectable, signal } from '@angular/core';
import { PAYMENTS } from '../payment-table/payments';
import { Payment } from '../../shared/Payment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  private payments = new BehaviorSubject<Payment[]>(PAYMENTS);
  payments$ = this.payments.asObservable();

  constructor() {}

  findPayment(paymentId: number) {
    return this.payments.value.find((p) => p.id === paymentId);
  }
}
