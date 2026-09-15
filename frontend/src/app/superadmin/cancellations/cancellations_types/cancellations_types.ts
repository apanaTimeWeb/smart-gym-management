import { z } from 'zod';
// RESPONSIBILITY: TypeScript types for the Superadmin Cancellations Alerts module.

export type CancellationsRiskLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type CancellationsActionStatus = 'PENDING' | 'CONTACTED' | 'RESOLVED' | 'CANCELLATIONSED';

export interface CancellationsAlert {
  id: string;
  tenantId: string;
  gymName: string;
  ownerName: string;
  adminEmail: string;
  phone: string;
  plan: string;
  riskLevel: CancellationsRiskLevel;
  actionStatus: CancellationsActionStatus;
  riskScore: number; // 0–100
  lastLoginDays: number;
  memberDrop: number; // % drop in last 30 days
  paymentFailures: number;
  renewalDaysLeft: number;
  mrrAtRisk: number;
  contractEndDate?: string;
  lastPaymentDate?: string;
  notes: string;
  flaggedAt: string; // ISO 8601 UTC
}

export interface CancellationsKpiData {
  totalAtRisk: number;
  criticalCount: number;
  highCount: number;
  estimatedMrrAtRisk: number;
}

export interface CancellationsActionPayload {
  alertId: string;
  status: CancellationsActionStatus;
  notes: string;
}

export type CancellationsFilterStatus = 'ALL' | CancellationsRiskLevel | CancellationsActionStatus;


export const CancellationsAlertSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  tenantName: z.string(),
  riskScore: z.number(),
  riskLevel: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  reasons: z.array(z.string()),
  lastContactDate: z.string(),
  status: z.enum(['OPEN', 'IN_PROGRESS', 'RESOLVED']),
  assignedTo: z.string().optional(),
  createdAt: z.string()
});

export const CancellationsKpiDataSchema = z.object({
  totalAtRisk: z.number(),
  highRiskCount: z.number(),
  averageRiskScore: z.number(),
  resolvedThisMonth: z.number()
});
