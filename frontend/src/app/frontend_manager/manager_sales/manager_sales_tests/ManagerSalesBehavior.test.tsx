// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/ManagerHttpStatus';
import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { managerMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl';
import { managerMswServer } from '@/app/frontend_manager/manager_mocks/ManagerMswTestServer';
import { ManagerTestProviders } from '@/app/frontend_manager/manager_mocks/ManagerTestProviders';
import { ManagerSalesApi } from '@/app/frontend_manager/manager_sales/manager_sales_api/ManagerSalesApi';
import ManagerSalesMain from '@/app/frontend_manager/manager_sales/manager_sales_components/manager_sales_main/ManagerSalesMain';
import { ManagerSalesUrlConfig } from '@/app/frontend_manager/manager_sales/manager_sales_url_config';

beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => managerMswServer.resetHandlers());
afterAll(() => managerMswServer.close());

describe('Manager Sales user-visible behavior', () => {
  it('renders the real feature UI against module MSW handlers', async () => {
    render(<ManagerTestProviders><ManagerSalesMain initialData={null} /></ManagerTestProviders>);
    expect(await screen.findByText('Payment & Billing')).toBeInTheDocument();
  });

  it('proves module MSW supplies non-placeholder API data', async () => {
    const response = await ManagerSalesApi.fetchMembershipReport({ page: '1', limit: '10' });
    expect(response.success).toBe(true);
    expect(response.data?.report?.length ?? 0).toBeGreaterThan(0);
  });
it('renders the sales membership-report empty state from an MSW response', async () => {
    managerMswServer.use(
      http.get(managerMockApiUrl(ManagerSalesUrlConfig.BACKEND_API.MEMBERSHIP_REPORT), () => HttpResponse.json({ success: true, message: 'Empty result', data: { report: [], totals: {}, total: 0, page: 1, limit: 10 } }))
    );
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<ManagerTestProviders><ManagerSalesMain initialData={null} /></ManagerTestProviders>);
    await user.click(await screen.findByRole('button', { name: 'Membership Report' }));
    expect(await screen.findByText('No membership report data available.')).toBeInTheDocument();
  });

  it('renders the sales membership-report error state from an MSW failure', async () => {
    managerMswServer.use(
      http.get(managerMockApiUrl(ManagerSalesUrlConfig.BACKEND_API.MEMBERSHIP_REPORT), () => HttpResponse.json({ success: false, message: 'Simulated failure', data: null }, { status: MANAGER_HTTP_STATUS.SERVER_ERROR }))
    );
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<ManagerTestProviders><ManagerSalesMain initialData={null} /></ManagerTestProviders>);
    await user.click(await screen.findByRole('button', { name: 'Membership Report' }));
    expect(await screen.findByText('Failed to load membership report.')).toBeInTheDocument();
  });

  it('proves sales search changes the rendered membership-report dataset', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<ManagerTestProviders><ManagerSalesMain initialData={null} /></ManagerTestProviders>);
    await user.click(await screen.findByRole('button', { name: 'Membership Report' }));
    const search = await screen.findByPlaceholderText('Search...');
    await user.clear(search);
    await user.type(search, 'ZZZ-No-Such-Member');
    expect(await screen.findByText('No membership report data available.')).toBeInTheDocument();
  });

});
