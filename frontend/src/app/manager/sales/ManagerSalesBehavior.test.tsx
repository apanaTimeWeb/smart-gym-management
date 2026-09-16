import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ManagerSalesMain from '@/app/manager/sales/sales_components/ManagerSalesMain/ManagerSalesMain';
import { managerMswServer } from '@/app/manager/manager_mocks/ManagerMswTestServer';
import { ManagerTestProviders } from '@/app/manager/manager_mocks/ManagerTestProviders';

beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => managerMswServer.resetHandlers());
afterAll(() => managerMswServer.close());

describe('Manager Sales user-visible behavior', () => {
  it('renders the real feature UI against module MSW handlers', async () => {
    render(<ManagerTestProviders><ManagerSalesMain initialData={null} /></ManagerTestProviders>);
    expect(await screen.findByText('Payment & Billing')).toBeInTheDocument();
  });
});
