export interface ManagerFinancePaymentFormValues {
  memberId: string;
  amount: number;
  method: 'UPI' | 'Cash' | 'Card' | 'NetBanking' | 'Cheque' | 'Other';
  notes: string;
  paidAt: string;
}
