import { Injectable, Logger } from '@nestjs/common';
import { FinanceRepository } from '@/modules/erp/finance/finance.repository';
import { FINANCE_MESSAGES } from '@/modules/erp/finance/finance.constants';
import type {
  FinanceResponse,
  FinanceSummary,
} from '@/modules/erp/finance/finance.interfaces';

@Injectable()
export class FinanceSummaryService {
  private readonly logger = new Logger(FinanceSummaryService.name);

  constructor(private readonly financeRepository: FinanceRepository) {}

  async getSummary(): Promise<FinanceResponse> {
    this.logger.log('Fetching aggregated finance summary dashboard');

    const totalRevenue = await this.financeRepository.getTotalRevenue();
    const totalPayments = await this.financeRepository.getTotalPaymentsCount();
    const pendingAmount = await this.financeRepository.getTotalPendingAmount();

    // Dynamic Revenue by Method
    const methodAggregations =
      await this.financeRepository.getRevenueByMethod();
    const revenueByMethod: Record<string, number> = {
      UPI: 0,
      Cash: 0,
      Card: 0,
      NetBanking: 0,
    };

    for (const agg of methodAggregations) {
      if (agg.method) {
        revenueByMethod[agg.method] = agg.total;
      }
    }

    // Dynamic Monthly Data
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthlyRevenue =
      await this.financeRepository.getMonthlyRevenue(firstDayOfMonth);

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(now.getMonth() - 5);
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const recentPaymentsForChart =
      await this.financeRepository.getRecentPaymentsForChart(sixMonthsAgo);

    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const revenueMap = new Map<string, number>();

    // Initialize last 6 months
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(now.getMonth() - i);
      const mName = monthNames[d.getMonth()];
      revenueMap.set(mName, 0);
    }

    recentPaymentsForChart.forEach((p) => {
      if (p.paidAt) {
        const mName = monthNames[p.paidAt.getMonth()];
        if (revenueMap.has(mName)) {
          revenueMap.set(mName, revenueMap.get(mName)! + p.amount);
        }
      }
    });

    const monthlyData = Array.from(revenueMap.entries()).map(
      ([month, revenue]) => ({ month, revenue }),
    );

    const summary: FinanceSummary = {
      totalRevenue,
      monthlyRevenue,
      pendingAmount,
      totalPayments,
      revenueByMethod,
      monthlyData,
    };

    return {
      message: FINANCE_MESSAGES.SUMMARY_FETCHED_SUCCESS,
      data: summary,
    };
  }
}
