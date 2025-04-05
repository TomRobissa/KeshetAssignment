import { Component } from '@angular/core';

type PaymentStatus = 'pending' | 'approved' | 'rejected';

interface Payment {
  id : number,
  status : PaymentStatus,
  description: string,
  supplier : string,
  amount : number
};


interface PaymentSelection extends Payment {
  isSelected : boolean
}

@Component({
  selector: 'app-payment-table',
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.css']
})
export class PaymentTableComponent {
  payments  : PaymentSelection[]= [
    { id: 1, status: 'pending', description: 'יום צילום', supplier: 'ספק א', amount: 500,isSelected : true },
    {  id: 2, status: 'approved', description: 'יום צילום', supplier: 'ספק ב', amount: 500,isSelected : false },
    { id: 3,  status: 'rejected', description: 'יום צילום', supplier: 'ספק ג', amount: 500,isSelected : false },
    {  id: 4, status: 'pending', description: 'יום צילום', supplier: 'ספק ד', amount: 500,isSelected : false },
    {  id: 5, status: 'approved', description: 'יום צילום', supplier: 'ספק ה', amount: 500,isSelected : false },
    {  id: 6, status: 'rejected', description: 'יום צילום', supplier: 'ספק ו', amount: 500,isSelected : false },
    { id: 7, status: 'pending', description: 'יום צילום', supplier: 'ספק א', amount: 500,isSelected : true },
    {  id: 8, status: 'approved', description: 'יום צילום', supplier: 'ספק ב', amount: 500,isSelected : false },
    { id: 9,  status: 'rejected', description: 'יום צילום', supplier: 'ספק ג', amount: 500,isSelected : false },
    {  id: 10, status: 'pending', description: 'יום צילום', supplier: 'ספק ד', amount: 500,isSelected : false },
    {  id: 11, status: 'approved', description: 'יום צילום', supplier: 'ספק ה', amount: 500,isSelected : false },
    {  id: 12, status: 'rejected', description: 'יום צילום', supplier: 'ספק ו', amount: 500,isSelected : false },
    { id: 13, status: 'pending', description: 'יום צילום', supplier: 'ספק א', amount: 500,isSelected : true },
    {  id: 14, status: 'approved', description: 'יום צילום', supplier: 'ספק ב', amount: 500,isSelected : false },
    { id: 15,  status: 'rejected', description: 'יום צילום', supplier: 'ספק ג', amount: 500,isSelected : false },
  ];

  getStatusIcon(payment: PaymentSelection): string {
    let selectedRowSVGColor = '';
    if (payment.isSelected){
      selectedRowSVGColor = '_white';
    }
    return `../../assets/${payment.status}-status${selectedRowSVGColor}.svg`;
  }
  

  cycleStatus(payment: PaymentSelection): void {
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
