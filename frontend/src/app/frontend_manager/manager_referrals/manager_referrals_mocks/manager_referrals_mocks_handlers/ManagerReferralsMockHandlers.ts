import { http, HttpResponse } from 'msw';
import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/ManagerHttpStatus';
import { managerMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl';
import { MANAGER_REFERRALS_STATUS_VALUES } from '@/app/frontend_manager/manager_referrals/manager_referrals_constants/ManagerReferralsConstants';
import { MANAGER_REFERRAL_REWARD_STATUS_CLAIMED } from '@/app/frontend_manager/manager_referrals/manager_referrals_constants/ManagerReferralsConstants';
import { MOCK_REFERRALS, MOCK_REFERRALS_KPIS } from '@/app/frontend_manager/manager_referrals/manager_referrals_mocks/manager_referrals_mocks_fixtures/ManagerReferralsMockData';
import { ManagerReferralsUrlConfig } from '@/app/frontend_manager/manager_referrals/manager_referrals_url_config';
import type { ManagerReferral, CreateReferralDto } from '@/app/frontend_manager/manager_referrals/manager_referrals_types/ManagerReferralsTypes';


let mockReferralIdCounter = 1000;
let mockReferrals = [...MOCK_REFERRALS];

/**
 * @description Provides the ManagerReferralsMockHandlers implementation for the referrals module.
 * @dependencies @/app/frontend_manager/manager_infrastructure/ManagerHttpStatus; @/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl; @/app/frontend_manager/manager_referrals/manager_referrals_mocks/manager_referrals_mocks_fixtures/ManagerReferralsMockData; @/app/frontend_manager/manager_referrals/manager_referrals_url_config; @/app/frontend_manager/manager_referrals/manager_referrals_types/ManagerReferralsTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export function resetManagerReferralsMockState(): void {
  mockReferralIdCounter = 1000;
  mockReferrals = [...MOCK_REFERRALS];
}

export const managerReferralsHandlers = [
  http.get(managerMockApiUrl(ManagerReferralsUrlConfig.BACKEND_API.KPIS), () => {
    return HttpResponse.json({
      success: true,
      message: 'KPIs fetched',
      data: MOCK_REFERRALS_KPIS
    });
  }),

  http.get(managerMockApiUrl(ManagerReferralsUrlConfig.BACKEND_API.BASE), ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || '1');
    const limit = Number(url.searchParams.get('limit') || '10');
    const search = (url.searchParams.get('search') || '').toLowerCase();
    const status = url.searchParams.get('status') || '';
    const filtered = mockReferrals.filter((ref) => {
      const matchesSearch = !search || `${ref.referrerName} ${ref.refereeName}`.toLowerCase().includes(search);
      const matchesStatus = !status || ref.status === status;
      return matchesSearch && matchesStatus;
    });
    const start = (page - 1) * limit;
    return HttpResponse.json({
      success: true,
      message: 'Referrals fetched',
      data: filtered.slice(start, start + limit),
      meta: { page, limit, total: filtered.length, totalPages: Math.max(1, Math.ceil(filtered.length / limit)) }
    });
  }),

  http.post(managerMockApiUrl(ManagerReferralsUrlConfig.BACKEND_API.BASE), async ({ request }) => {
    const dto = await request.json() as CreateReferralDto;
    const newRef: ManagerReferral = {
      id: `ref-${mockReferralIdCounter++}`,
      referrerName: dto.referrerName,
      referrerId: dto.referrerId,
      refereeName: dto.refereeName,
      refereePhone: dto.refereePhone,
      dateReferred: new Date().toISOString().split('T')[0] || '',
      status: MANAGER_REFERRALS_STATUS_VALUES.PENDING,
      rewardStatus: 'N/A',
      rewardAmount: 50000,
      rewardType: 'CASH' };
    mockReferrals = [newRef, ...mockReferrals];
    return HttpResponse.json({
      success: true,
      message: 'Referral logged successfully!',
      data: newRef
    });
  }),

  http.post(managerMockApiUrl(ManagerReferralsUrlConfig.BACKEND_API.CLAIM(':id')), ({ params }) => {
    const { id } = params;
    const idx = mockReferrals.findIndex(r => r.id === id);
    if (idx === -1) {
      return HttpResponse.json({ success: false, message: 'Referral not found' }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    }
    
    mockReferrals[idx] = { ...mockReferrals[idx]!, rewardStatus: MANAGER_REFERRAL_REWARD_STATUS_CLAIMED } as ManagerReferral;
    return HttpResponse.json({
      success: true,
      message: 'Reward claimed successfully!',
      data: mockReferrals[idx]
    });
  })
];
