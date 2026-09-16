// RESPONSIBILITY: Runtime schema for the Manager Dashboard aggregate response.
import { z } from 'zod';

const growthSchema = z.object({ month: z.string(), count: z.number() });
const revenueSchema = z.object({ month: z.string(), revenue: z.number() });
const recentMemberSchema = z.object({ id: z.string(), name: z.string(), plan: z.union([z.string(), z.object({ name: z.string() })]), status: z.string(), joinDate: z.string(), paidAmount: z.number() });
const recentPaymentSchema = z.object({ id: z.string(), invoiceNumber: z.string(), amount: z.number(), method: z.string(), paidAt: z.string(), member: z.object({ name: z.string() }) });
const pendingPaymentSchema = z.object({ id: z.string(), name: z.string(), pendingAmount: z.number(), expiryDate: z.string() });

export const dashboardStatsSchema = z.object({
  totalMembers: z.number(), activeMembers: z.number(), newMembersThisMonth: z.number(), totalRevenue: z.number(), monthlyRevenue: z.number(), pendingPayments: z.number(), totalStaff: z.number(), activeStaff: z.number(), totalProducts: z.number(), lowStockCount: z.number(), totalInquiries: z.number(), newInquiries: z.number(), todayAttendance: z.number(), trainerAttendance: z.object({ present: z.number(), total: z.number() }), memberGrowth: z.array(growthSchema), revenueChart: z.array(revenueSchema), membersByPlan: z.array(z.object({ plan: z.string(), count: z.number() })), membersByStatus: z.object({ active: z.number(), pending: z.number(), expired: z.number() }), recentMembers: z.array(recentMemberSchema), recentPayments: z.array(recentPaymentSchema), pendingPaymentsList: z.array(pendingPaymentSchema), expiringMemberships: z.array(pendingPaymentSchema), churnRate: z.number(), revenueGrowthPercent: z.number(), todayCollection: z.number(), frozenMembershipsCount: z.number(), totalPTRevenue: z.number(),
});
