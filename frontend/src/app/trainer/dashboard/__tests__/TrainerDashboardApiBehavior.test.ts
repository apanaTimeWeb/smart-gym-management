import { describe, expect, it, vi } from 'vitest';
import { dashboardApi } from '@/app/trainer/dashboard/dashboard_api/TrainerDashboard_api';
import { MOCK_DASHBOARD_STATS } from '@/app/trainer/dashboard/dashboard_fixtures/TrainerDashboardMockData';
const apiFetch = vi.hoisted(() => vi.fn());
vi.mock('@/lib/api', () => ({ apiFetch }));

describe('Trainer dashboard API behavior', () => {
  it('forwards the selected reporting range and date window', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, message: 'OK', data: MOCK_DASHBOARD_STATS });
    const result = await dashboardApi.fetchDashboardStats('custom', '2026-09-01', '2026-09-17');
    expect(apiFetch.mock.calls[0][0]).toContain('range=custom');
    expect(apiFetch.mock.calls[0][0]).toContain('startDate=2026-09-01');
    expect(apiFetch.mock.calls[0][0]).toContain('endDate=2026-09-17');
    expect(result.activeClientsCount).toBe(38);
  });
});
