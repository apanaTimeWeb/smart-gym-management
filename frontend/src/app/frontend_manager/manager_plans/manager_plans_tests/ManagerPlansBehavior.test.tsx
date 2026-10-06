// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/ManagerHttpStatus';
import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { managerMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl';
import { managerMswServer } from '@/app/frontend_manager/manager_mocks/ManagerMswTestServer';
import { ManagerTestProviders } from '@/app/frontend_manager/manager_mocks/ManagerTestProviders';
import { ManagerPlansApi } from '@/app/frontend_manager/manager_plans/manager_plans_api/ManagerPlansApi';
import ManagerPlansMain from '@/app/frontend_manager/manager_plans/manager_plans_components/manager_plans_main/ManagerPlansMain';
import { ManagerPlansUrlConfig } from '@/app/frontend_manager/manager_plans/manager_plans_url_config';

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
    const response = await ManagerPlansApi.fetchPlans();
    expect(response.success).toBe(true);
    expect(response.data?.plans?.length ?? 0).toBeGreaterThan(0);
  });
it('renders the plans empty state from an MSW response', async () => {
    managerMswServer.use(
      http.get(managerMockApiUrl(ManagerPlansUrlConfig.BACKEND_API.BASE), () => HttpResponse.json({ success: true, message: 'Empty result', data: { plans: [], total: 0 } }))
    );
    render(<ManagerTestProviders><ManagerPlansMain /></ManagerTestProviders>);
    expect(await screen.findByRole('button', { name: 'View Plans' })).toBeInTheDocument();
    expect(await screen.findByText('No plans available')).toBeInTheDocument();
  });

  it('renders the plans error state from an MSW failure', async () => {
    managerMswServer.use(
      http.get(managerMockApiUrl(ManagerPlansUrlConfig.BACKEND_API.BASE), () => HttpResponse.json({ success: false, message: 'Simulated failure', data: null }, { status: MANAGER_HTTP_STATUS.SERVER_ERROR }))
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
