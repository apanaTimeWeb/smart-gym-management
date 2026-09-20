import { describe, expect, it, vi } from 'vitest';
import { earningsApi } from '@/app/trainer/earnings/earnings_api/TrainerEarnings_api';
import { MOCK_EARNINGS_DATA } from '@/app/trainer/earnings/earnings_mocks/fixtures/TrainerEarningsMockData';
const apiFetch = vi.hoisted(() => vi.fn());
vi.mock('@/lib/api', () => ({ apiFetch }));

describe('Trainer earnings API behavior', () => {
  it('forwards the selected earnings date window and returns server data', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, message: 'OK', data: MOCK_EARNINGS_DATA });
    const result = await earningsApi.fetchEarningsData('2026-09-01', '2026-09-17');
    expect(apiFetch.mock.calls[0][0]).toContain('startDate=2026-09-01');
    expect(apiFetch.mock.calls[0][0]).toContain('endDate=2026-09-17');
    expect(result.kpis.totalEarnings).toBe(4550000);
  });
});
