// RESPONSIBILITY: Runtime API schemas for Manager referral data.
import { z } from 'zod';

/**
 * @description Provides the ManagerReferralsSchema implementation for the referrals module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const managerReferralSchema = z.object({
  id: z.string(), referrerName: z.string(), referrerId: z.string(), refereeName: z.string(), refereePhone: z.string(), dateReferred: z.string(),
  status: z.enum(['PENDING', 'JOINED', 'REJECTED']), rewardStatus: z.enum(['PENDING', 'CLAIMED', 'N/A']), rewardAmount: z.number(),
  rewardType: z.enum(['CASH', 'DISCOUNT', 'CREDIT']), rewardExpiryDate: z.string().optional(), conversionDate: z.string().optional(), planJoined: z.string().optional() });
export const managerReferralsKpiSchema = z.object({ totalReferrals: z.number(), totalConverted: z.number(), pendingRewards: z.number(), claimedRewards: z.number(), conversionRate: z.number(), totalRewardsPaidOut: z.number() });
