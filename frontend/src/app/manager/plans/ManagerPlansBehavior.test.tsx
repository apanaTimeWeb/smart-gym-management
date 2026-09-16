import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ManagerPlansMain from '@/app/manager/plans/plans_components/ManagerPlansMain/ManagerPlansMain';
import { managerMswServer } from '@/app/manager/manager_mocks/ManagerMswTestServer';
import { ManagerTestProviders } from '@/app/manager/manager_mocks/ManagerTestProviders';

beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => managerMswServer.resetHandlers());
afterAll(() => managerMswServer.close());

describe('Manager Plans user-visible behavior', () => {
  it('renders the real feature UI against module MSW handlers', async () => {
    render(<ManagerTestProviders><ManagerPlansMain /></ManagerTestProviders>);
    expect(await screen.findByText('Membership / Plans')).toBeInTheDocument();
  });
  it('renders API-backed renewal data from the membership overview endpoint', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<ManagerTestProviders><ManagerPlansMain /></ManagerTestProviders>);
    await user.click(await screen.findByRole('button', { name: 'Membership Renew' }));
    expect(await screen.findByText('Priya Singh')).toBeInTheDocument();
  });

});
