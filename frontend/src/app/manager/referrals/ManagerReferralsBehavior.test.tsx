import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { managerMswServer } from '@/app/manager/manager_mocks/ManagerMswTestServer';
import { ManagerTestProviders } from '@/app/manager/manager_mocks/ManagerTestProviders';
import { ManagerReferralsApi } from '@/app/manager/referrals/referrals_api/ManagerReferralsApi';
import ManagerReferralsMain from '@/app/manager/referrals/referrals_components/ManagerReferralsMain/ManagerReferralsMain';

beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => managerMswServer.resetHandlers());
afterAll(() => managerMswServer.close());

describe('Manager Referrals user-visible behavior', () => {
  it('renders the real feature UI against module MSW handlers', async () => {
    render(<ManagerTestProviders><ManagerReferralsMain /></ManagerTestProviders>);
    expect(await screen.findByText('Referrals & Rewards')).toBeInTheDocument();
    expect(await screen.findByText('Arjun Sharma')).toBeInTheDocument();
  });

  it('proves module MSW supplies non-placeholder API data', async () => {
    const response = await ManagerReferralsApi.fetchReferrals({ page: 1, limit: 10 });
    expect(response.success).toBe(true);
    expect(response.data?.length ?? 0).toBeGreaterThan(0);
  });
it('renders the referrals empty state from an MSW response', async () => {
    managerMswServer.use(
      http.get('/manager/referrals', () => HttpResponse.json({ success: true, message: 'Empty result', data: [], meta: { totalPages: 1, total: 0 } }))
    );
    render(<ManagerTestProviders><ManagerReferralsMain /></ManagerTestProviders>);
    expect(await screen.findByText('No referrals found')).toBeInTheDocument();
  });

  it('renders the referrals error state from an MSW failure', async () => {
    managerMswServer.use(
      http.get('/manager/referrals', () => HttpResponse.json({ success: false, message: 'Simulated failure', data: null }, { status: 500 }))
    );
    render(<ManagerTestProviders><ManagerReferralsMain /></ManagerTestProviders>);
    expect(await screen.findByText(/Unable to load|Failed to load/i)).toBeInTheDocument();
  });

  it('proves referral search changes the rendered dataset', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<ManagerTestProviders><ManagerReferralsMain /></ManagerTestProviders>);
    expect(await screen.findByText('Arjun Sharma')).toBeInTheDocument();
    const search = await screen.findByPlaceholderText('Search Referrer or Referee...');
    await user.clear(search);
    await user.type(search, 'ZZZ-No-Such-Referral');
    expect(await screen.findByText('No referrals found')).toBeInTheDocument();
  });

});
