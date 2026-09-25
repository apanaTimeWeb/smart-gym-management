import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { managerMswServer } from '@/app/manager/manager_mocks/ManagerMswTestServer';
import { ManagerTestProviders } from '@/app/manager/manager_mocks/ManagerTestProviders';
import { salesApi } from '@/app/manager/sales/sales_api/ManagerSalesApi';
import ManagerSalesMain from '@/app/manager/sales/sales_components/ManagerSalesMain/ManagerSalesMain';

beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => managerMswServer.resetHandlers());
afterAll(() => managerMswServer.close());

describe('Manager Sales user-visible behavior', () => {
  it('renders the real feature UI against module MSW handlers', async () => {
    render(<ManagerTestProviders><ManagerSalesMain initialData={null} /></ManagerTestProviders>);
    expect(await screen.findByText('Payment & Billing')).toBeInTheDocument();
  });

  it('proves module MSW supplies non-placeholder API data', async () => {
    const response = await salesApi.fetchMembershipReport({ page: '1', limit: '10' });
    expect(response.success).toBe(true);
    expect(response.data?.report?.length ?? 0).toBeGreaterThan(0);
  });
it('renders the sales membership-report empty state from an MSW response', async () => {
    managerMswServer.use(
      http.get('/manager/sales/membership-report', () => HttpResponse.json({ success: true, message: 'Empty result', data: { report: [], totals: {}, total: 0, page: 1, limit: 10 } }))
    );
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<ManagerTestProviders><ManagerSalesMain initialData={null} /></ManagerTestProviders>);
    await user.click(await screen.findByRole('button', { name: 'Membership Report' }));
    expect(await screen.findByText('No membership report data available.')).toBeInTheDocument();
  });

  it('renders the sales membership-report error state from an MSW failure', async () => {
    managerMswServer.use(
      http.get('/manager/sales/membership-report', () => HttpResponse.json({ success: false, message: 'Simulated failure', data: null }, { status: 500 }))
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
