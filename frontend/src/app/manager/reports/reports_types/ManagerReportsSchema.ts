// RESPONSIBILITY: Runtime API schema for the Manager Reports summary response.
import { z } from 'zod';

export const managerReportSummarySchema = z.object({
  kpis: z.object({ totalRevenue: z.number(), totalMembers: z.number(), avgAttendanceRate: z.number(), totalExpenses: z.number(), netProfit: z.number(), newMembersThisMonth: z.number(), churnRate: z.number(), activeMembers: z.number() }),
  revenueData: z.array(z.object({ month: z.string(), revenue: z.number(), expenses: z.number(), profit: z.number() })),
  attendanceData: z.array(z.object({ date: z.string(), present: z.number(), absent: z.number(), rate: z.number() })),
  memberChurnData: z.array(z.object({ month: z.string(), newMembers: z.number(), churned: z.number(), active: z.number() })),
  expenseBreakdown: z.array(z.object({ category: z.string(), amount: z.number(), percentage: z.number() })),
});
