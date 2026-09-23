// RESPONSIBILITY: Defines domain/data transfer shapes for the reports feature without ORM leakage.
// FLOW: DTO -> ReportsInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';

export interface SuperadminReportsListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string; }
export interface SuperadminReportsCreateInput {
  kind?: string;
  payload?: unknown;
}
export interface SuperadminReportsUpdateInput extends SuperadminReportsCreateInput {}

export interface SuperadminReportsDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  kind: string;
  payload: unknown;
}

export interface SuperadminReportsRevenueRow { month: string | Date; mrr: string | number; new_revenue: string | number; cancelled_revenue: string | number; tenant_count: string | number; }
export interface SuperadminReportsCancellationRow { id: string; gym_name: string; owner_name: string; plan: string; cancelled_at: string | Date; reason: string; mrr: string | number; days_active: string | number; }
export interface SuperadminReportsHealthRow { id: string; gym_name: string; plan: string; score: string | number; grade: 'A' | 'B' | 'C' | 'D' | 'F'; member_count: string | number; last_login: string | Date | null; payment_health: 'GOOD' | 'AT_RISK' | 'OVERDUE'; feature_usage: string | number; support_tickets: string | number; }
