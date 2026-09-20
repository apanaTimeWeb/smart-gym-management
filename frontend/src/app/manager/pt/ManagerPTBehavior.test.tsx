import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { managerMswServer } from '@/app/manager/manager_mocks/ManagerMswTestServer';
import { ManagerTestProviders } from '@/app/manager/manager_mocks/ManagerTestProviders';
import { managerPtApi } from '@/app/manager/pt/pt_api/ManagerPtApi';
import ManagerPTMain from '@/app/manager/pt/pt_components/ManagerPtMain/ManagerPtMain';

beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => managerMswServer.resetHandlers());
afterAll(() => managerMswServer.close());

describe('Manager PT user-visible behavior', () => {
  it('renders the real feature UI against module MSW handlers', async () => {
    render(<ManagerTestProviders><ManagerPTMain /></ManagerTestProviders>);
    expect(await screen.findByText('Personal Training')).toBeInTheDocument();
    expect(await screen.findByText('Kickstarter PT')).toBeInTheDocument();
  });

  it('proves module MSW supplies non-placeholder API data', async () => {
    const response = await managerPtApi.fetchPackages();
    expect(response.success).toBe(true);
    expect(response.data?.length ?? 0).toBeGreaterThan(0);
  });
it('renders the PT package empty state from an MSW response', async () => {
    managerMswServer.use(
      http.get('/api/v1/manager/pt/packages', () => HttpResponse.json({ success: true, message: 'Empty result', data: [] }))
    );
    render(<ManagerTestProviders><ManagerPTMain /></ManagerTestProviders>);
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    await user.click(await screen.findByRole('button', { name: 'Packages' }));
    expect(await screen.findByText('No PT packages configured yet.')).toBeInTheDocument();
  });

  it('renders the PT error state from an MSW failure', async () => {
    managerMswServer.use(
      http.get('/api/v1/manager/pt/kpis', () => HttpResponse.json({ success: false, message: 'Simulated failure', data: null }, { status: 500 }))
    );
    render(<ManagerTestProviders><ManagerPTMain /></ManagerTestProviders>);
    expect(await screen.findByText('Unable to load PT data. Retry by refreshing this route.')).toBeInTheDocument();
  });

  it('proves PT assignment search changes the rendered dataset', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<ManagerTestProviders><ManagerPTMain /></ManagerTestProviders>);
    await user.click(await screen.findByRole('button', { name: 'Active Assignments' }));
    const search = await screen.findByPlaceholderText('Search...');
    await user.clear(search);
    await user.type(search, 'ZZZ-No-Such-Assignment');
    expect(await screen.findByText('No active assignments')).toBeInTheDocument();
  });

});
