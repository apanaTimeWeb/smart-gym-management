// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/ManagerHttpStatus';
import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { managerMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl';
import { managerMswServer } from '@/app/frontend_manager/manager_mocks/ManagerMswTestServer';
import { ManagerTestProviders } from '@/app/frontend_manager/manager_mocks/ManagerTestProviders';
import { ManagerScheduleApi } from '@/app/frontend_manager/manager_schedule/manager_schedule_api/ManagerScheduleApi';
import ManagerScheduleMain from '@/app/frontend_manager/manager_schedule/manager_schedule_components/manager_schedule_main/ManagerScheduleMain';
import { ManagerScheduleUrlConfig } from '@/app/frontend_manager/manager_schedule/manager_schedule_url_config';

beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => managerMswServer.resetHandlers());
afterAll(() => managerMswServer.close());

describe('Manager Schedule user-visible behavior', () => {
  it('renders the real feature UI against module MSW handlers', async () => {
    render(<ManagerTestProviders><ManagerScheduleMain /></ManagerTestProviders>);
    expect(await screen.findByText('Trainer Schedule')).toBeInTheDocument();
    expect(await screen.findByText('Vikram Singh')).toBeInTheDocument();
  });

  it('proves module MSW supplies non-placeholder API data', async () => {
    const response = await ManagerScheduleApi.fetchSchedule({ page: '1', limit: '10' });
    expect(response.success).toBe(true);
    expect(response.data?.trainers?.length ?? 0).toBeGreaterThan(0);
  });
it('renders the schedule empty search state from an MSW response', async () => {
    managerMswServer.use(
      http.get(managerMockApiUrl(ManagerScheduleUrlConfig.BACKEND_API.BASE), () => HttpResponse.json({ success: true, message: 'Empty result', data: { trainers: [], kpis: { totalTrainers: 0, trainersOnDutyToday: 0, trainersOnLeaveToday: 0, totalShiftsThisWeek: 0, totalClassesThisWeek: 0, avgOccupancyRate: 0, totalEnrolledMembers: 0 } } }))
    );
    render(<ManagerTestProviders><ManagerScheduleMain /></ManagerTestProviders>);
    expect(await screen.findByText('No trainers found')).toBeInTheDocument();
  });

  it('renders the schedule error state from an MSW failure', async () => {
    managerMswServer.use(
      http.get(managerMockApiUrl(ManagerScheduleUrlConfig.BACKEND_API.BASE), () => HttpResponse.json({ success: false, message: 'Simulated failure', data: null }, { status: MANAGER_HTTP_STATUS.SERVER_ERROR }))
    );
    render(<ManagerTestProviders><ManagerScheduleMain /></ManagerTestProviders>);
    expect(await screen.findByText('Failed to load schedule')).toBeInTheDocument();
  });

  it('proves schedule search changes the rendered trainer cards', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<ManagerTestProviders><ManagerScheduleMain /></ManagerTestProviders>);
    expect(await screen.findByText('Vikram Singh')).toBeInTheDocument();
    const search = await screen.findByPlaceholderText('Search trainer...');
    await user.clear(search);
    await user.type(search, 'ZZZ-No-Such-Trainer');
    expect(await screen.findByText('No trainers match your search.')).toBeInTheDocument();
  });

});
