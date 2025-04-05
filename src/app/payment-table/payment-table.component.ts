import { Component } from '@angular/core';

@Component({
  selector: 'app-payment-table',
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.css']
})
export class PaymentTableComponent {
  payments = [
    { status: 'pending', description: 'יום צילום', supplier: 'ספק א', amount: 500 },
    { status: 'approved', description: 'יום צילום', supplier: 'ספק ב', amount: 500 },
    { status: 'rejected', description: 'יום צילום', supplier: 'ספק ג', amount: 500 },
    { status: 'pending', description: 'יום צילום', supplier: 'ספק ד', amount: 500 },
    { status: 'approved', description: 'יום צילום', supplier: 'ספק ה', amount: 500 },
    { status: 'rejected', description: 'יום צילום', supplier: 'ספק ו', amount: 500 }
  ];

  getStatusIcon(status: string): string {
    switch (status) {
      case 'approved': return '✅';
      case 'rejected': return '❌';
      default: return '⭕';
    }
  }

  cycleStatus(payment: any): void {
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
}
