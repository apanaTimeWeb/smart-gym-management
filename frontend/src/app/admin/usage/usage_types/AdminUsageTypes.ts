// RESPONSIBILITY: TypeScript types for the Admin Usage & Subscription module.

export interface AdminUsageHistoryPoint {
  date: string;       // ISO date string e.g. '2025-01-15'
  membersUsed: number;
  storageUsedGb: number;
  smsUsed: number;
}

export interface AdminUsageData {
  tenantId: string;
  planName: string;
  planTier: 'Starter' | 'Growth' | 'Pro' | 'Enterprise';
  billingCycleEnd: string;
  monthlyPrice: number;
  smsSent: number;
  smsLimit: number;
  databaseGb: number;
  mediaGb: number;
  storageLimitGb: number;
  activeMembers: number;
  memberLimit: number;
  staffCount: number;
  staffLimit: number;
  branchCount: number;
  branchLimit: number;
  apiCallsToday: number;
  apiCallsLimit: number;
  usageHistory: AdminUsageHistoryPoint[];
}

export interface AdminUsageMetric {
  label: string;
  used: number;
  limit: number;
  unit: string;
  warningThreshold: number; // ratio at which amber warning state begins
  criticalThreshold: number; // ratio at which red critical state begins
}

export interface AdminUsagePlanTier {
  name: string;
  price: number;
  features: readonly string[];
  isCurrent: boolean;
}

export interface AdminUsagePlanCardProps {
  planTiers: readonly AdminUsagePlanTier[];
  onRequestUpgrade: (planName: string) => Promise<void>;
  pendingUpgradePlan: string | null;
}
