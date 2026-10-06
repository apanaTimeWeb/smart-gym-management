// RESPONSIBILITY: Runtime API schemas for Manager Sales read models.
import { z } from 'zod';

/**
 * @description Provides the ManagerSalesSchema implementation for the sales module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const overviewPointSchema = z.object({ month: z.string(), revenue: z.number(), storeRevenue: z.number().optional(), newMembers: z.number().optional() });
const salesMemberSnapshotSchema = z.object({ id: z.string(), name: z.string(), phone: z.string().optional(), email: z.string().optional(), plan: z.unknown().optional(), status: z.string().optional(), expiryDate: z.string().optional() }).passthrough();
const reportItemSchema = z.object({ id: z.number().optional(), name: z.string().optional(), totalMembers: z.number().optional(), activeMembers: z.number().optional(), revenue: z.number().optional(), plan: z.string().optional(), receivable: z.number().optional(), received: z.number().optional(), remaining: z.number().optional(), refund: z.number().optional() });
const totalsSchema = z.object({ activeCount: z.number().optional(), revenue: z.number().optional(), totalReceivable: z.number().optional(), totalReceived: z.number().optional(), remaining: z.number().optional(), refunds: z.number().optional() });
const pendingSchema = salesMemberSnapshotSchema.extend({ pendingAmount: z.number().optional(), daysOverdue: z.number().optional() });

export const managerSalesOverviewSchema = z.object({ monthlyRevenue: z.array(overviewPointSchema) });
export const managerSalesMembershipReportSchema = z.object({ report: z.array(reportItemSchema), totals: totalsSchema });
export const managerSalesPendingPaymentsSchema = z.object({ members: z.array(pendingSchema), total: z.number() });
export const managerSalesAllMembershipsSchema = z.object({ members: z.array(salesMemberSnapshotSchema), total: z.number() });
