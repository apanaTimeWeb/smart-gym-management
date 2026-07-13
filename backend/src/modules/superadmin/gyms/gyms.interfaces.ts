// TenantStatus is the canonical enum — imported from superadmin.constants.ts (single source of truth)
export { TenantStatus } from '../superadmin.constants';

export interface ITenant {
  id: string;
  name: string;
  ownerName: string;
  adminEmail: string;
  phone: string;
  status: string;
  plan: string;
  createdAt: Date;
  memberCount: number;
  monthlyRevenue: number;
  databaseVersion: string;
}
