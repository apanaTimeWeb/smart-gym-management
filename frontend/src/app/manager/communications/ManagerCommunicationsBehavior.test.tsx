import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ManagerCommunicationsMain from '@/app/manager/communications/communications_components/ManagerCommunicationsMain/ManagerCommunicationsMain';
import { managerMswServer } from '@/app/manager/manager_mocks/ManagerMswTestServer';
import { ManagerTestProviders } from '@/app/manager/manager_mocks/ManagerTestProviders';

beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => managerMswServer.resetHandlers());
afterAll(() => managerMswServer.close());

describe('Manager Communications user-visible behavior', () => {
  it('renders the real feature UI against module MSW handlers', async () => {
    render(<ManagerTestProviders><ManagerCommunicationsMain /></ManagerTestProviders>);
    expect(await screen.findByText('Communications')).toBeInTheDocument();
  });
  it('renders the real composer and recipient summary from module queries', async () => {
    render(<ManagerTestProviders><ManagerCommunicationsMain /></ManagerTestProviders>);
    expect(await screen.findByText('Quick Templates')).toBeInTheDocument();
    expect(await screen.findByText(/recipient/)).toBeInTheDocument();
  });

});
