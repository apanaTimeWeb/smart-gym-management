import { z } from 'zod';
// RESPONSIBILITY: TypeScript types for the Superadmin Churn Alerts module.

export type ChurnRiskLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type ChurnActionStatus = 'PENDING' | 'CONTACTED' | 'RESOLVED' | 'CHURNED';

export interface ChurnAlert {
  id: string;
  tenantId: string;
  gymName: string;
  ownerName: string;
  adminEmail: string;
  phone: string;
  plan: string;
  riskLevel: ChurnRiskLevel;
  actionStatus: ChurnActionStatus;
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

export interface ChurnKpiData {
  totalAtRisk: number;
  criticalCount: number;
  highCount: number;
  estimatedMrrAtRisk: number;
}

export interface ChurnActionPayload {
  alertId: string;
  status: ChurnActionStatus;
  notes: string;
}

export type ChurnFilterStatus = 'ALL' | ChurnRiskLevel | ChurnActionStatus;


export const ChurnAlertSchema = z.object({
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

export const ChurnKpiDataSchema = z.object({
  totalAtRisk: z.number(),
  highRiskCount: z.number(),
  averageRiskScore: z.number(),
  resolvedThisMonth: z.number()
});
