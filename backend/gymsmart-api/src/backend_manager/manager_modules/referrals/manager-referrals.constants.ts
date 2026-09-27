// RESPONSIBILITY: Centralized runtime enum/configuration for Manager referrals.
// FLOW: DTO/entity/query allowlists -> Referrals feature behavior.

export enum ReferralStatus {
  PENDING = 'PENDING',
  JOINED = 'JOINED',
  REJECTED = 'REJECTED',
}

export enum RewardType {
  CASH = 'CASH',
  DISCOUNT = 'DISCOUNT',
  CREDIT = 'CREDIT',
}

export enum ReferralsRecordStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export const ReferralsAllowedSortFields = ['createdAt', 'updatedAt', 'id'] as const;

export enum RewardStatus {
  PENDING = 'PENDING',
  CLAIMED = 'CLAIMED',
  N_A = 'N/A',
}
