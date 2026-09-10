// RESPONSIBILITY: Mock API client for Manager Referrals.
import type { ManagerReferral, ManagerReferralsKPIs, CreateReferralDto } from '@/app/manager/referrals/referrals_types/ManagerReferralsTypes';
import { MOCK_REFERRALS, MOCK_REFERRALS_KPIS } from '@/app/manager/referrals/referrals_utils/ManagerReferralsConstants';

let mockReferrals = [...MOCK_REFERRALS];

export const ManagerReferralsApi = {
  fetchKPIs: async (): Promise<ManagerReferralsKPIs> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_REFERRALS_KPIS;
  },

  fetchReferrals: async (): Promise<ManagerReferral[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockReferrals;
  },

  createReferral: async (dto: CreateReferralDto): Promise<ManagerReferral> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const newRef: ManagerReferral = {
      id: `ref-${Date.now()}`,
      referrerName: dto.referrerName,
      referrerId: dto.referrerId,
      refereeName: dto.refereeName,
      refereePhone: dto.refereePhone,
      dateReferred: new Date().toISOString().split('T')[0] || '',
      status: 'PENDING',
      rewardStatus: 'N/A',
      rewardAmount: 500,
      rewardType: 'CASH',
    };
    mockReferrals = [newRef, ...mockReferrals];
    return newRef;
  },

  claimReward: async (referralId: string): Promise<ManagerReferral> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const idx = mockReferrals.findIndex(r => r.id === referralId);
    if (idx === -1) throw new Error('Referral not found');
    
    mockReferrals[idx] = { ...mockReferrals[idx]!, rewardStatus: 'CLAIMED' } as ManagerReferral;
    return mockReferrals[idx]!;
  },
};
