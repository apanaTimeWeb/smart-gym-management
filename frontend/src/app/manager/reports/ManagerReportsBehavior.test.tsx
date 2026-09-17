import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ManagerReportsMain from '@/app/manager/reports/reports_components/ManagerReportsMain/ManagerReportsMain';
import { managerMswServer } from '@/app/manager/manager_mocks/ManagerMswTestServer';
import { reportsApi } from '@/app/manager/reports/reports_api/ManagerReportsApi';
import { ManagerTestProviders } from '@/app/manager/manager_mocks/ManagerTestProviders';

import { http, HttpResponse } from 'msw';
beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => managerMswServer.resetHandlers());
afterAll(() => managerMswServer.close());

describe('Manager Reports user-visible behavior', () => {
  it('renders the real feature UI against module MSW handlers', async () => {
    render(<ManagerTestProviders><ManagerReportsMain /></ManagerTestProviders>);
    expect(await screen.findByText('Reports & Analytics')).toBeInTheDocument();
  });

  it('proves module MSW supplies non-placeholder API data', async () => {
    const response = await reportsApi.fetchSummary({ range: 'this_month' });
    expect(response.success).toBe(true);
    expect(response.data?.kpis?.totalRevenue).toBeGreaterThan(0);
  });
it('renders the reports error state from an MSW failure', async () => {
    managerMswServer.use(
      http.get('/api/v1/manager/reports/summary', () => HttpResponse.json({ success: false, message: 'Simulated failure', data: null }, { status: 500 }))
    );
    render(<ManagerTestProviders><ManagerReportsMain /></ManagerTestProviders>);
    expect(await screen.findByText('Failed to load report data')).toBeInTheDocument();
  });

  it('keeps the reports UI user-controllable through tab switching', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<ManagerTestProviders><ManagerReportsMain /></ManagerTestProviders>);
    const tabButtons = await screen.findAllByRole('button');
    expect(tabButtons.length).toBeGreaterThan(0);
    await user.click(tabButtons[0]);
    expect(await screen.findByText('Reports & Analytics')).toBeInTheDocument();
  });

});
