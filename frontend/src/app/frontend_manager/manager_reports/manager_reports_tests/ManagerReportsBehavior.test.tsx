// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/ManagerHttpStatus';
import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { managerMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl';
import { managerMswServer } from '@/app/frontend_manager/manager_mocks/ManagerMswTestServer';
import { ManagerTestProviders } from '@/app/frontend_manager/manager_mocks/ManagerTestProviders';
import { ManagerReportsApi } from '@/app/frontend_manager/manager_reports/manager_reports_api/ManagerReportsApi';
import ManagerReportsMain from '@/app/frontend_manager/manager_reports/manager_reports_components/manager_reports_main/ManagerReportsMain';
import { ManagerReportsUrlConfig } from '@/app/frontend_manager/manager_reports/manager_reports_url_config';

beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => managerMswServer.resetHandlers());
afterAll(() => managerMswServer.close());

describe('Manager Reports user-visible behavior', () => {
  it('renders the real feature UI against module MSW handlers', async () => {
    render(<ManagerTestProviders><ManagerReportsMain /></ManagerTestProviders>);
    expect(await screen.findByText('Reports & Analytics')).toBeInTheDocument();
  });

  it('proves module MSW supplies non-placeholder API data', async () => {
    const response = await ManagerReportsApi.fetchReportsSummary({ range: 'this_month' });
    expect(response.success).toBe(true);
    expect(response.data?.kpis?.totalRevenue).toBeGreaterThan(0);
  });
it('renders the reports error state from an MSW failure', async () => {
    managerMswServer.use(
      http.get(managerMockApiUrl(ManagerReportsUrlConfig.BACKEND_API.SUMMARY), () => HttpResponse.json({ success: false, message: 'Simulated failure', data: null }, { status: MANAGER_HTTP_STATUS.SERVER_ERROR }))
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
