import { Component, OnInit, signal } from '@angular/core';
import { PaymentsService } from '../services/payments.service';
import { PaymentStatus } from '../../shared/Payment';

@Component({
    selector: 'app-payment-status-summary',
    imports: [],
    templateUrl: './payment-status-summary.component.html',
    styleUrl: './payment-status-summary.component.css',
})
export class PaymentStatusSummaryComponent implements OnInit {
    paymentStatusToSum = signal<[string, number][]>([]);
    paymentStatusToDisplayText: Record<string, string> = {
        pending: 'ממתינות לאישור',
        approved: 'אושרו',
        rejected: 'נדחו',
        'pending-approval': 'בתהליך',
    };

    getPaymentStatusText(statusAndSum: [string, number]) {
        return this.paymentStatusToDisplayText[statusAndSum[0]];
    }

    constructor(private paymentsService: PaymentsService) {}

    ngOnInit() {
        this.paymentsService.paymentStatusToSum$.subscribe(
            (newPaymentStatusToSum) => {
                const paymentStatusToSumArray = Object.entries(
                    newPaymentStatusToSum
                );
                this.paymentStatusToSum.set(paymentStatusToSumArray);
            }
        );
    }
}
