export type SaaSPlanTier = 'BASIC' | 'PRO' | 'ENTERPRISE';
export type TenantStatus = 'ACTIVE' | 'SUSPENDED' | 'TRIAL' | 'CANCELLED';

export interface Tenant {
  id: string;
  name: string;
  ownerName: string;
  adminEmail: string;
  phone: string;
  status: TenantStatus;
  plan: SaaSPlanTier;
  createdAt: string;
  memberCount: number;
  monthlyRevenue: number;
  databaseVersion: string;
}

export interface AuditLog {
  id: string;
  tenantId: string;
  tenantName: string;
  actorEmail: string;
  actorRole: string;
  action: string;
  targetEntity: string;
  targetId: string;
  timestamp: string;
  details: string;
}

export interface SaaSDashboardMetrics {
  totalGyms: number;
  activeGyms: number;
  suspendedGyms: number;
  totalEndUsers: number;
  monthlyRecurringRevenue: number;
  recentOnboards: Tenant[];
}
