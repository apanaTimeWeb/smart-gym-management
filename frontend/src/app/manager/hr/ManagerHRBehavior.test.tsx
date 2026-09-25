import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { hrApi } from '@/app/manager/hr/hr_api/ManagerHrApi';
import ManagerHRMain from '@/app/manager/hr/hr_components/ManagerHrMain/ManagerHrMain';
import { managerMswServer } from '@/app/manager/manager_mocks/ManagerMswTestServer';
import { ManagerTestProviders } from '@/app/manager/manager_mocks/ManagerTestProviders';


beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => managerMswServer.resetHandlers());
afterAll(() => managerMswServer.close());

describe('Manager HR user-visible behavior', () => {
  it('renders the real feature UI against module MSW handlers', async () => {
    render(<ManagerTestProviders><ManagerHRMain initialData={null} /></ManagerTestProviders>);
    expect(await screen.findByText('Trainer Management')).toBeInTheDocument();
  });

  it('proves module MSW supplies non-placeholder API data', async () => {
    const response = await hrApi.fetchStaff({ page: '1', limit: '10' });
    expect(response.success).toBe(true);
    expect(response.data?.staff?.length ?? 0).toBeGreaterThan(0);
  });

  it('renders the module empty state from an MSW empty response', async () => {
    managerMswServer.use(
      http.get('/manager/hr/staff', () => HttpResponse.json({ success: true, message: 'Empty result', data: { staff: [], total: 0 } }))
    );
    render(<ManagerTestProviders><ManagerHRMain initialData={null} /></ManagerTestProviders>);
    expect(await screen.findByText('No staff members yet')).toBeInTheDocument();
  });

  it('renders a user-facing error state when the module API fails', async () => {
    managerMswServer.use(
      http.get('/manager/hr/staff', () => HttpResponse.json({ success: false, message: 'Simulated failure', data: null }, { status: 500 }))
    );
    render(<ManagerTestProviders><ManagerHRMain initialData={null} /></ManagerTestProviders>);
    const errorText = await screen.findByText(/Unable to load HR data\./i);
    expect(errorText).toBeInTheDocument();
  });

  it('proves the real staff search input changes the rendered dataset', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<ManagerTestProviders><ManagerHRMain initialData={null} /></ManagerTestProviders>);
    expect(await screen.findByText('Rahul Verma')).toBeInTheDocument();
    const search = await screen.findByPlaceholderText(/Search trainer list/i);
    await user.clear(search);
    await user.type(search, 'ZZZ-No-Such-Staff');
    expect(await screen.findByText('No staff members yet')).toBeInTheDocument();
    expect(screen.queryByText('Rahul Verma')).not.toBeInTheDocument();
  });

});
