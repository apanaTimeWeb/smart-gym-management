export interface IAffiliate {
  id: string;
  name: string;
  email: string;
  referralCode: string;
  totalReferred: number;
  commissionEarned: number;
  status: 'ACTIVE' | 'INACTIVE';
  joinedAt: string;
}

export interface IAffiliateListResponse {
  data: IAffiliate[];
  meta: { total: number; page: number; limit: number };
  message: string;
}
