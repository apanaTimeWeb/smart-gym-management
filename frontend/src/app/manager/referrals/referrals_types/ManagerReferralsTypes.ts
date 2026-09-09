// RESPONSIBILITY: TypeScript types for the Manager Referrals module.
// HIGHLY RECOMMENDED additions: rewardType, rewardExpiryDate, conversionDate, planJoined,
// conversionRate, totalRewardsPaidOut.

export type ReferralStatus = 'PENDING' | 'JOINED' | 'REJECTED';
export type RewardStatus = 'PENDING' | 'CLAIMED' | 'N/A';
export type RewardType = 'CASH' | 'DISCOUNT' | 'CREDIT';

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
  // HIGHLY RECOMMENDED — needed for complete referral tracking
  rewardType: RewardType;
  rewardExpiryDate?: string;    // when the reward expires if unclaimed
  conversionDate?: string;      // date the referee actually joined
  planJoined?: string;          // which plan the referee enrolled in
}

export interface ManagerReferralsKPIs {
  totalReferrals: number;
  totalConverted: number;
  pendingRewards: number;
  claimedRewards: number;
  // HIGHLY RECOMMENDED — key SaaS metrics
  conversionRate: number;       // percentage e.g. 42.5
  totalRewardsPaidOut: number;  // total INR paid out as rewards
}

export interface CreateReferralDto {
  referrerName: string;
  referrerId: string;
  refereeName: string;
  refereePhone: string;
}
