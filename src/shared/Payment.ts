export type PaymentStatus = 'pending' | 'approved' | 'rejected';

export interface Payment {
  id: number;
  date: string;
  status: PaymentStatus;
  description: string;
  supplier: string;
  currentAmount: number;
  totalAmount: number;
  currentNumberOfPayments: number;
  totalNumberOfPayments: number;
  pdfUrl: string;
}
