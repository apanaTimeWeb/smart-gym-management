import { describe, expect, it, vi } from 'vitest';

import { TrainerEarningsApi } from '@/app/frontend_trainer/trainer_earnings/trainer_earnings_api/TrainerEarningsApi';

import { TRAINER_EARNINGS_MOCK_EARNINGS_DATA } from '@/app/frontend_trainer/trainer_earnings/trainer_earnings_mocks/trainer_earnings_fixtures/TrainerEarningsMockData';




const apiFetch = vi.hoisted(() => vi.fn());
vi.mock('@/lib/api', () => ({ apiFetch }));

describe('Trainer earnings API behavior', () => {
  it('forwards the selected earnings date window and returns server data', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, message: 'OK', data: TRAINER_EARNINGS_MOCK_EARNINGS_DATA });
    const result = await TrainerEarningsApi.fetchEarningsData('2026-09-01', '2026-09-17');
    expect(apiFetch.mock.calls[0][0]).toContain('startDate=2026-09-01');
    expect(apiFetch.mock.calls[0][0]).toContain('endDate=2026-09-17');
    expect(result.kpis.totalEarnings).toBe(4550000);
  });
});
