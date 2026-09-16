import { z } from 'zod';
// RESPONSIBILITY: TypeScript types for the Superadmin Cancellations Alerts module.

export type CancellationsRiskLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type CancellationsActionStatus = 'PENDING' | 'CONTACTED' | 'RESOLVED' | 'CANCELLED';

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
  gymName: z.string(),
  ownerName: z.string(),
  adminEmail: z.string(),
  phone: z.string(),
  plan: z.string(),
  riskLevel: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  actionStatus: z.enum(['PENDING', 'CONTACTED', 'RESOLVED', 'CANCELLED']),
  riskScore: z.number(),
  lastLoginDays: z.number(),
  memberDrop: z.number(),
  paymentFailures: z.number(),
  renewalDaysLeft: z.number(),
  mrrAtRisk: z.number(),
  contractEndDate: z.string().optional(),
  lastPaymentDate: z.string().optional(),
  notes: z.string(),
  flaggedAt: z.string(),
});

export const CancellationsKpiDataSchema = z.object({
  totalAtRisk: z.number(),
  criticalCount: z.number(),
  highCount: z.number(),
  estimatedMrrAtRisk: z.number()
});
