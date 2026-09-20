import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { managerMswServer } from '@/app/manager/manager_mocks/ManagerMswTestServer';
import { ManagerTestProviders } from '@/app/manager/manager_mocks/ManagerTestProviders';
import { plansApi } from '@/app/manager/plans/plans_api/ManagerPlansApi';
import ManagerPlansMain from '@/app/manager/plans/plans_components/ManagerPlansMain/ManagerPlansMain';

beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => managerMswServer.resetHandlers());
afterAll(() => managerMswServer.close());

describe('Manager Plans user-visible behavior', () => {
  it('renders the real feature UI against module MSW handlers', async () => {
    render(<ManagerTestProviders><ManagerPlansMain /></ManagerTestProviders>);
    expect(await screen.findByText('Membership / Plans')).toBeInTheDocument();
  });
  it('renders API-backed renewal data from the membership overview endpoint', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<ManagerTestProviders><ManagerPlansMain /></ManagerTestProviders>);
    await user.click(await screen.findByRole('button', { name: 'Membership Renew' }));
    expect(await screen.findByText('Priya Singh')).toBeInTheDocument();
  });


  it('proves module MSW supplies non-placeholder API data', async () => {
    const response = await plansApi.fetchPlans();
    expect(response.success).toBe(true);
    expect(response.data?.plans?.length ?? 0).toBeGreaterThan(0);
  });
it('renders the plans empty state from an MSW response', async () => {
    managerMswServer.use(
      http.get('/api/v1/manager/plans', () => HttpResponse.json({ success: true, message: 'Empty result', data: { plans: [], total: 0 } }))
    );
    render(<ManagerTestProviders><ManagerPlansMain /></ManagerTestProviders>);
    expect(await screen.findByRole('button', { name: 'View Plans' })).toBeInTheDocument();
    expect(await screen.findByText('No plans available')).toBeInTheDocument();
  });

  it('renders the plans error state from an MSW failure', async () => {
    managerMswServer.use(
      http.get('/api/v1/manager/plans', () => HttpResponse.json({ success: false, message: 'Simulated failure', data: null }, { status: 500 }))
    );
    render(<ManagerTestProviders><ManagerPlansMain /></ManagerTestProviders>);
    expect(await screen.findByText('Failed to load plans')).toBeInTheDocument();
  });

  it('proves the real plan search changes the rendered dataset', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<ManagerTestProviders><ManagerPlansMain /></ManagerTestProviders>);
    const search = await screen.findByPlaceholderText('Search plans...');
    await user.clear(search);
    await user.type(search, 'ZZZ-No-Such-Plan');
    expect(await screen.findByText(/No plans found for/)).toBeInTheDocument();
  });

});
