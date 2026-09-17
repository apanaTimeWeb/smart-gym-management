import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import ManagerStoreMain from '@/app/manager/store/store_components/ManagerStoreMain/ManagerStoreMain';
import { storeApi } from '@/app/manager/store/store_api/ManagerStoreApi';
import { managerMswServer } from '@/app/manager/manager_mocks/ManagerMswTestServer';
import { ManagerTestProviders } from '@/app/manager/manager_mocks/ManagerTestProviders';

beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => managerMswServer.resetHandlers());
afterAll(() => managerMswServer.close());

describe('Manager Store user-visible behavior', () => {
  it('renders the real feature UI against module MSW handlers', async () => {
    render(<ManagerTestProviders><ManagerStoreMain initialData={undefined} /></ManagerTestProviders>);
    expect(await screen.findByText('Store')).toBeInTheDocument();
    expect(await screen.findByText('Whey Protein (2kg)')).toBeInTheDocument();
  });

  it('proves module MSW supplies non-placeholder API data', async () => {
    const response = await storeApi.fetchProducts({ page: '1', limit: '10' });
    expect(response.success).toBe(true);
    expect(response.data?.products?.length ?? 0).toBeGreaterThan(0);
  });

  it('renders the module empty state from an MSW empty response', async () => {
    managerMswServer.use(
      http.get('/api/v1/manager/store/products', () => HttpResponse.json({ success: true, message: 'Empty result', data: { products : [], total: 0 } }))
    );
    render(<ManagerTestProviders><ManagerStoreMain initialData={undefined} /></ManagerTestProviders>);
    expect(await screen.findByText('No products added yet.')).toBeInTheDocument();
  });

  it('renders a user-facing error state when the module API fails', async () => {
    managerMswServer.use(
      http.get('/api/v1/manager/store/products', () => HttpResponse.json({ success: false, message: 'Simulated failure', data: null }, { status: 500 }))
    );
    render(<ManagerTestProviders><ManagerStoreMain initialData={undefined} /></ManagerTestProviders>);
    const errorText = await screen.findByText(/Failed to load/i);
    expect(errorText).toBeInTheDocument();
  });



  it('updates product search state from the toolbar', async () => {
    const user = userEvent.setup();
    render(<ManagerTestProviders><ManagerStoreMain initialData={undefined} /></ManagerTestProviders>);
    const input = await screen.findByPlaceholderText('Search...');
    await user.type(input, 'Whey');
    expect(await screen.findByText('Whey Protein (2kg)')).toBeInTheDocument();
    expect(screen.queryByText('Gym T-Shirt (L)')).not.toBeInTheDocument();
  });

});
