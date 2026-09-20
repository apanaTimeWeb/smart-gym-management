import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { attendanceApi } from '@/app/manager/attendance/attendance_api/ManagerAttendanceApi';
import ManagerAttendanceMain from '@/app/manager/attendance/attendance_components/ManagerAttendanceMain/ManagerAttendanceMain';
import { managerMswServer } from '@/app/manager/manager_mocks/ManagerMswTestServer';
import { ManagerTestProviders } from '@/app/manager/manager_mocks/ManagerTestProviders';

beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => managerMswServer.resetHandlers());
afterAll(() => managerMswServer.close());

describe('Manager Attendance user-visible behavior', () => {
  it('renders the real feature UI against module MSW handlers', async () => {
    render(<ManagerTestProviders><ManagerAttendanceMain /></ManagerTestProviders>);
    expect(await screen.findByText('Attendance')).toBeInTheDocument();
    expect(await screen.findByText('Rahul Sharma')).toBeInTheDocument();
  });

  it('proves module MSW supplies non-placeholder API data', async () => {
    const response = await attendanceApi.fetchAttendanceRecords({ page: '1', limit: '10' });
    expect(response.success).toBe(true);
    expect(response.data?.attendances?.length ?? 0).toBeGreaterThan(0);
  });
it('renders the attendance empty state from an MSW response', async () => {
    managerMswServer.use(
      http.get('/api/v1/manager/attendance', () => HttpResponse.json({ success: true, message: 'Empty result', data: { attendances: [], total: 0, page: 1, limit: 10 } }))
    );
    render(<ManagerTestProviders><ManagerAttendanceMain /></ManagerTestProviders>);
    expect(await screen.findByText('No attendance records')).toBeInTheDocument();
  });

  it('renders the attendance error state from an MSW failure', async () => {
    managerMswServer.use(
      http.get('/api/v1/manager/attendance', () => HttpResponse.json({ success: false, message: 'Simulated failure', data: null }, { status: 500 }))
    );
    render(<ManagerTestProviders><ManagerAttendanceMain /></ManagerTestProviders>);
    expect(await screen.findByText('Failed to load attendance records.')).toBeInTheDocument();
  });

  it('proves attendance search changes the rendered dataset through the real UI', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<ManagerTestProviders><ManagerAttendanceMain /></ManagerTestProviders>);
    expect(await screen.findByText('Rahul Sharma')).toBeInTheDocument();
    const search = await screen.findByPlaceholderText('Search Member...');
    await user.clear(search);
    await user.type(search, 'ZZZ-No-Such-Member');
    expect(await screen.findByText('No attendance records')).toBeInTheDocument();
    expect(screen.queryByText('Rahul Sharma')).not.toBeInTheDocument();
  });

});
