import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ManagerLibraryMain from '@/app/manager/library/library_components/ManagerLibraryMain/ManagerLibraryMain';
import { managerMswServer } from '@/app/manager/manager_mocks/ManagerMswTestServer';
import { libraryApi } from '@/app/manager/library/library_api/ManagerLibraryApi';
import { ManagerTestProviders } from '@/app/manager/manager_mocks/ManagerTestProviders';

import { http, HttpResponse } from 'msw';
beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => managerMswServer.resetHandlers());
afterAll(() => managerMswServer.close());

describe('Manager Library user-visible behavior', () => {
  it('renders the real feature UI against module MSW handlers', async () => {
    render(<ManagerTestProviders><ManagerLibraryMain initialData={null} /></ManagerTestProviders>);
    expect(await screen.findByText('Diet Management')).toBeInTheDocument();
    expect(await screen.findByText('Lean Weight Loss')).toBeInTheDocument();
  });

  it('proves module MSW supplies non-placeholder API data', async () => {
    const response = await libraryApi.fetchDietPlans({ page: '1', limit: '10' });
    expect(response.success).toBe(true);
    expect(response.data?.dietPlans?.length ?? 0).toBeGreaterThan(0);
  });
it('renders the diet-plan empty state from an MSW response', async () => {
    managerMswServer.use(
      http.get('/api/v1/manager/library/diet-plans', () => HttpResponse.json({ success: true, message: 'Empty result', data: { dietPlans: [], total: 0 } }))
    );
    render(<ManagerTestProviders><ManagerLibraryMain initialData={null} /></ManagerTestProviders>);
    expect(await screen.findByText('No diet plans found for the current search.')).toBeInTheDocument();
  });

  it('renders the library error state from an MSW failure', async () => {
    managerMswServer.use(
      http.get('/api/v1/manager/library/diet-plans', () => HttpResponse.json({ success: false, message: 'Simulated failure', data: null }, { status: 500 }))
    );
    render(<ManagerTestProviders><ManagerLibraryMain initialData={null} /></ManagerTestProviders>);
    expect(await screen.findByText(/Unable to load|Failed to load/i)).toBeInTheDocument();
  });

  it('proves the real diet-plan search input changes the rendered dataset', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<ManagerTestProviders><ManagerLibraryMain initialData={null} /></ManagerTestProviders>);
    expect(await screen.findByText('Lean Weight Loss')).toBeInTheDocument();
    const search = await screen.findByPlaceholderText('Search diet plans...');
    await user.clear(search);
    await user.type(search, 'ZZZ-No-Such-Diet');
    expect(await screen.findByText('No diet plans found for the current search.')).toBeInTheDocument();
  });

});
