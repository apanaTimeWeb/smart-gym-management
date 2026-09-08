// RESPONSIBILITY: TypeScript types for the Manager Referrals module.

export type ReferralStatus = 'PENDING' | 'JOINED' | 'REJECTED';
export type RewardStatus = 'PENDING' | 'CLAIMED' | 'N/A';

export interface ManagerReferral {
  id: string;
  referrerName: string;
  referrerId: string;
  refereeName: string;
  refereePhone: string;
  dateReferred: string;
  status: ReferralStatus;
  rewardStatus: RewardStatus;
  rewardAmount: number;
}

export interface ManagerReferralsKPIs {
  totalReferrals: number;
  totalConverted: number;
  pendingRewards: number;
  claimedRewards: number;
}

export interface CreateReferralDto {
  referrerName: string;
  referrerId: string;
  refereeName: string;
  refereePhone: string;
}
