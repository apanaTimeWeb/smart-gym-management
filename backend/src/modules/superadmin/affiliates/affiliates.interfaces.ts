export enum AffiliateStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}
export interface IAffiliate {
  id: string;
  name: string;
  email: string;
  referralCode: string;
  totalReferred: number;
  commissionEarned: number;
  status: AffiliateStatus;
  joinedAt: Date;
}
