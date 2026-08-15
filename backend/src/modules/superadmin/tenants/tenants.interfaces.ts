// Removed SaaSPlanTier enum
export enum TenantStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  TRIAL = 'TRIAL',
  CANCELLED = 'CANCELLED'
}
export interface ITenant {
  id: string;
  name: string;
  ownerName: string;
  adminEmail: string;
}
export interface ITenant {
  id: string;
  name: string;
  ownerName: string;
  adminEmail: string;
  phone: string;
  status: TenantStatus;
  plan: string;
  createdAt: Date;
  memberCount: number;
  monthlyRevenue: number;
  databaseVersion: string;
}

export interface TenantResponse {
  success: boolean;
  message: string;
  data: ITenant | ITenant[] | any | null;
}
