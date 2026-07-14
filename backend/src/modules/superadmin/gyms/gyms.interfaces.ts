import { TenantStatus } from '../superadmin.constants';
export { TenantStatus };

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
