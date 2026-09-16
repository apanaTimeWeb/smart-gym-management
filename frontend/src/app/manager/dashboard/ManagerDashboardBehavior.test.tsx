import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ManagerDashboardMain from '@/app/manager/dashboard/dashboard_components/ManagerDashboardMain/ManagerDashboardMain';
import { managerMswServer } from '@/app/manager/manager_mocks/ManagerMswTestServer';
import { dashboardApi } from '@/app/manager/dashboard/dashboard_api/ManagerDashboardApi';
import { ManagerTestProviders } from '@/app/manager/manager_mocks/ManagerTestProviders';

import { http, HttpResponse } from 'msw';
beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => managerMswServer.resetHandlers());
afterAll(() => managerMswServer.close());

describe('Manager Dashboard user-visible behavior', () => {
  it('renders the real feature UI against module MSW handlers', async () => {
    render(<ManagerTestProviders><ManagerDashboardMain initialData={null} /></ManagerTestProviders>);
    expect(await screen.findByText('Dashboard')).toBeInTheDocument();
    expect(await screen.findByText('John Doe')).toBeInTheDocument();
  });

  it('proves module MSW supplies non-placeholder API data', async () => {
    const response = await dashboardApi.fetchDashboardStats({ range: 'this_month' });
    expect(response.success).toBe(true);
    expect(response.data?.totalMembers).toBeGreaterThan(0);
  });
it('renders dashboard empty collection states from an MSW empty response', async () => {
    const { MOCK_DASHBOARD_STATS } = await import('@/app/manager/dashboard/dashboard_fixtures/ManagerDashboardMockData');
    managerMswServer.use(
      http.get('/api/v1/manager/dashboard/stats', () => HttpResponse.json({
        success: true,
        message: 'Empty dashboard collections',
        data: { ...MOCK_DASHBOARD_STATS, recentMembers: [], recentPayments: [], pendingPaymentsList: [], expiringMemberships: [], memberGrowth: [], revenueChart: [], membersByPlan: [] },
      }))
    );
    render(<ManagerTestProviders><ManagerDashboardMain initialData={null} /></ManagerTestProviders>);
    expect(await screen.findByText('No members yet. Add your first member!')).toBeInTheDocument();
  });

  it('renders the dashboard error state from an MSW failure', async () => {
    managerMswServer.use(
      http.get('/api/v1/manager/dashboard/stats', () => HttpResponse.json({ success: false, message: 'Simulated failure', data: null }, { status: 500 }))
    );
    render(<ManagerTestProviders><ManagerDashboardMain initialData={null} /></ManagerTestProviders>);
    expect(await screen.findByText('Failed to load dashboard')).toBeInTheDocument();
  });

  it('proves the dashboard recent-member search changes rendered results', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<ManagerTestProviders><ManagerDashboardMain initialData={null} /></ManagerTestProviders>);
    expect(await screen.findByText('John Doe')).toBeInTheDocument();
    const search = await screen.findByPlaceholderText('Search members...');
    await user.clear(search);
    await user.type(search, 'ZZZ-No-Such-Member');
    expect(await screen.findByText('No members matching "ZZZ-No-Such-Member"')).toBeInTheDocument();
  });

});
