import { Injectable, signal } from '@angular/core';
import { PAYMENTS } from '../payment-table/payments';
import { Payment, PaymentStatus } from '../../shared/Payment';
import { BehaviorSubject } from 'rxjs';
import { NotFoundError } from '@angular/core/primitives/di';
import { Moment } from 'moment';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  private allPayments: Payment[] = PAYMENTS;
  private allPaymentStatusToSum: Record<PaymentStatus, number> =
    this.getPaymentsStatusToSum(this.allPayments);
  private payments = new BehaviorSubject<Payment[]>(this.allPayments);
  payments$ = this.payments.asObservable();
  private selectedPayment = new BehaviorSubject<Payment>(
    this.payments.value[0]
  );
  selectedPayment$ = this.selectedPayment.asObservable();

  private paymentStatusToSum = new BehaviorSubject<
    Record<PaymentStatus, number>
  >(this.allPaymentStatusToSum);
  paymentStatusToSum$ = this.paymentStatusToSum.asObservable();

  constructor() {}

  getPaymentsStatusToSum(payments: Payment[]) {
    return payments.reduce((acc, payment) => {
      // If the status does not exist in the accumulator, initialize it
      if (!acc[payment.status]) {
        acc[payment.status] = 0;
      }

      // Add the amount to the existing sum for the corresponding status
      acc[payment.status] += 1;

      return acc;
    }, {} as Record<PaymentStatus, number>);
  }

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
    const oldStatus = payment.status;
    this.cycleStatus(payment);
    const newStatus = payment.status;

    if (oldStatus === newStatus) return; // No change

    // 3. Get the current status summary object
    const currentSums = { ...this.paymentStatusToSum.value };

    // 4. Decrement old status and increment new status
    if (currentSums[oldStatus]) currentSums[oldStatus]--;
    if (!currentSums[newStatus]) currentSums[newStatus] = 0;
    currentSums[newStatus]++;

    // 5. Emit the updated status counts
    this.paymentStatusToSum.next(currentSums);
  }

  private cycleStatus(payment: Payment): void {
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

  private isTextMatch(input: string, searchText: string): boolean {
    if (!searchText) {
      return true;
    }
    return input.toLowerCase().includes(searchText.toLowerCase());
  }
  private isPaymentMatchesSearch(
    payment: Payment,
    searchText: string,
    startDate: Moment,
    endDate: Moment
  ): boolean {
    const isTextMatch =
      this.isTextMatch(payment.supplier, searchText) ||
      this.isTextMatch(payment.description, searchText);
    if (isTextMatch) {
      return true;
    }
    const dateMoment = moment(payment.date);
    const isDateMatch = dateMoment.isBetween(startDate, endDate, 'day', '[]'); //including edges, match by date.

    return isDateMatch;
  }
  filterPayments(searchText: string, startDate: Moment, endDate: Moment) {
    if (!searchText && !startDate && !endDate) {
      this.payments.next(this.allPayments);
      this.paymentStatusToSum.next(
        this.getPaymentsStatusToSum(this.allPayments)
      );
      return;
    }
    const filteredPayments: Payment[] = this.allPayments.filter((payment) =>
      this.isPaymentMatchesSearch(payment, searchText, startDate, endDate)
    );
    this.payments.next(filteredPayments);
    this.paymentStatusToSum.next(this.getPaymentsStatusToSum(filteredPayments));
  }
}
