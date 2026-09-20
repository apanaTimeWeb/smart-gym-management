import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { expensesApi } from '@/app/manager/expenses/expenses_api/ManagerExpensesApi';
import ManagerExpensesMain from '@/app/manager/expenses/expenses_components/ManagerExpensesMain/ManagerExpensesMain';
import { managerMswServer } from '@/app/manager/manager_mocks/ManagerMswTestServer';
import { ManagerTestProviders } from '@/app/manager/manager_mocks/ManagerTestProviders';

beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => managerMswServer.resetHandlers());
afterAll(() => managerMswServer.close());

describe('Manager Expenses user-visible behavior', () => {
  it('renders the real feature UI against module MSW handlers', async () => {
    render(<ManagerTestProviders><ManagerExpensesMain /></ManagerTestProviders>);
    expect(await screen.findByText('Expenses')).toBeInTheDocument();
    expect(await screen.findByText('Electricity Bill - August')).toBeInTheDocument();
  });

  it('proves module MSW supplies non-placeholder API data', async () => {
    const response = await expensesApi.fetchExpenses({ page: '1', limit: '10' });
    expect(response.success).toBe(true);
    expect(response.data?.expenses?.length ?? 0).toBeGreaterThan(0);
  });
it('renders the expenses empty state from an MSW response', async () => {
    managerMswServer.use(
      http.get('/api/v1/manager/expenses', () => HttpResponse.json({ success: true, message: 'Empty result', data: { expenses: [], total: 0, page: 1, limit: 10 } }))
    );
    render(<ManagerTestProviders><ManagerExpensesMain /></ManagerTestProviders>);
    expect(await screen.findByText('No expenses found')).toBeInTheDocument();
  });

  it('renders the expenses error state from an MSW failure', async () => {
    managerMswServer.use(
      http.get('/api/v1/manager/expenses', () => HttpResponse.json({ success: false, message: 'Simulated failure', data: null }, { status: 500 }))
    );
    render(<ManagerTestProviders><ManagerExpensesMain /></ManagerTestProviders>);
    expect(await screen.findByText(/Unable to load expenses|Failed to load expenses/i)).toBeInTheDocument();
  });

  it('proves the real expenses search input changes the rendered dataset', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<ManagerTestProviders><ManagerExpensesMain /></ManagerTestProviders>);
    expect(await screen.findByText('Electricity Bill - August')).toBeInTheDocument();
    const search = await screen.findByPlaceholderText('Search expenses...');
    await user.clear(search);
    await user.type(search, 'ZZZ-No-Such-Expense');
    expect(await screen.findByText('No expenses found')).toBeInTheDocument();
  });

});
