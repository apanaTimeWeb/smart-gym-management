import { Payment } from '@/modules/finance/entities/payment.entity';

export interface FinanceResponse {
  message: string;
  data: Payment | Payment[] | FinanceSummary | any;
}

export interface FinanceSummary {
  totalRevenue: number;
  monthlyRevenue: number;
  pendingAmount: number;
  totalPayments: number;
  revenueByMethod: Record<string, number>;
  monthlyData: Array<{ month: string; revenue: number }>;
}
