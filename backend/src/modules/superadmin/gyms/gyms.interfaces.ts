export type SaaSPlanTier = 'BASIC' | 'PRO' | 'ENTERPRISE';
export type TenantStatus = 'ACTIVE' | 'SUSPENDED' | 'TRIAL' | 'CANCELLED';
export interface ITenant {
  id: string;
  name: string;
  ownerName: string;
  adminEmail: string;
  phone: string;
  status: TenantStatus;
  plan: SaaSPlanTier;
  createdAt: Date;
  memberCount: number;
  monthlyRevenue: number;
  databaseVersion: string;
}
