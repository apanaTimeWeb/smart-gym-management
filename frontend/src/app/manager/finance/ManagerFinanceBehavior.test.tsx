import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { financeApi } from '@/app/manager/finance/finance_api/ManagerFinanceApi';
import ManagerFinanceMain from '@/app/manager/finance/finance_components/ManagerFinanceMain/ManagerFinanceMain';
import { managerMswServer } from '@/app/manager/manager_mocks/ManagerMswTestServer';
import { ManagerTestProviders } from '@/app/manager/manager_mocks/ManagerTestProviders';


beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => managerMswServer.resetHandlers());
afterAll(() => managerMswServer.close());

describe('Manager Finance user-visible behavior', () => {
  it('renders the real feature UI against module MSW handlers', async () => {
    render(<ManagerTestProviders><ManagerFinanceMain /></ManagerTestProviders>);
    expect(await screen.findByText('Branch Finance')).toBeInTheDocument();
  });

  it('proves module MSW supplies non-placeholder API data', async () => {
    const response = await financeApi.fetchPayments({ page: '1', limit: '10' });
    expect(response.success).toBe(true);
    expect(response.data?.payments?.length ?? 0).toBeGreaterThan(0);
  });

  it('renders the module empty state from an MSW empty response', async () => {
    managerMswServer.use(
      http.get('/api/v1/manager/finance/payments', () => HttpResponse.json({ success: true, message: 'Empty result', data: { payments : [], total: 0 } }))
    );
    render(<ManagerTestProviders><ManagerFinanceMain /></ManagerTestProviders>);
    expect(await screen.findByText('No payments found')).toBeInTheDocument();
  });

  it('renders a user-facing error state when the module API fails', async () => {
    managerMswServer.use(
      http.get('/api/v1/manager/finance/payments', () => HttpResponse.json({ success: false, message: 'Simulated failure', data: null }, { status: 500 }))
    );
    render(<ManagerTestProviders><ManagerFinanceMain /></ManagerTestProviders>);
    const errorText = await screen.findByText(/Failed to load/i);
    expect(errorText).toBeInTheDocument();
  });



  it('updates the visible payment results from the search field', async () => {
    const user = userEvent.setup();
    render(<ManagerTestProviders><ManagerFinanceMain /></ManagerTestProviders>);
    const input = await screen.findByPlaceholderText('Search payments...');
    await user.type(input, 'Aarav');
    await new Promise(resolve => setTimeout(resolve, 350));
    expect(await screen.findByText('Aarav Patel')).toBeInTheDocument();
    expect(screen.queryByText('Priya Sharma')).not.toBeInTheDocument();
  });

});
