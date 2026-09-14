import { http, HttpResponse } from 'msw';
import { MOCK_REFERRALS, MOCK_REFERRALS_KPIS } from '@/app/manager/referrals/referrals_utils/ManagerReferralsConstants';
import type { ManagerReferral, CreateReferralDto } from '@/app/manager/referrals/referrals_types/ManagerReferralsTypes';

let mockReferrals = [...MOCK_REFERRALS];

export const managerReferralsHandlers = [
  http.get('http://localhost:5000/api/v1/manager/referrals/kpis', () => {
    return HttpResponse.json({
      success: true,
      message: 'KPIs fetched',
      data: MOCK_REFERRALS_KPIS
    });
  }),

  http.get('http://localhost:5000/api/v1/manager/referrals', () => {
    return HttpResponse.json({
      success: true,
      message: 'Referrals fetched',
      data: mockReferrals
    });
  }),

  http.post('http://localhost:5000/api/v1/manager/referrals', async ({ request }) => {
    const dto = await request.json() as CreateReferralDto;
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
    return HttpResponse.json({
      success: true,
      message: 'Referral logged successfully!',
      data: newRef
    });
  }),

  http.post('http://localhost:5000/api/v1/manager/referrals/:id/claim', ({ params }) => {
    const { id } = params;
    const idx = mockReferrals.findIndex(r => r.id === id);
    if (idx === -1) {
      return HttpResponse.json({ success: false, message: 'Referral not found' }, { status: 404 });
    }
    
    mockReferrals[idx] = { ...mockReferrals[idx]!, rewardStatus: 'CLAIMED' } as ManagerReferral;
    return HttpResponse.json({
      success: true,
      message: 'Reward claimed successfully!',
      data: mockReferrals[idx]
    });
  })
];
