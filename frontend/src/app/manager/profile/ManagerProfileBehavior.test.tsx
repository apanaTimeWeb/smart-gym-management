import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ManagerProfileMain from '@/app/manager/profile/profile_components/ManagerProfileMain/ManagerProfileMain';
import { managerMswServer } from '@/app/manager/manager_mocks/ManagerMswTestServer';
import { ManagerTestProviders } from '@/app/manager/manager_mocks/ManagerTestProviders';

beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => managerMswServer.resetHandlers());
afterAll(() => managerMswServer.close());

describe('Manager Profile user-visible behavior', () => {
  it('renders the real feature UI against module MSW handlers', async () => {
    render(<ManagerTestProviders><ManagerProfileMain /></ManagerTestProviders>);
    expect(await screen.findByText('My Profile')).toBeInTheDocument();
  });
  it('loads profile data and submits the RHF profile form through MSW', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<ManagerTestProviders><ManagerProfileMain /></ManagerTestProviders>);
    const name = await screen.findByLabelText('Full Name *');
    await user.clear(name);
    await user.type(name, 'Updated Manager');
    await user.click(screen.getByRole('button', { name: 'Save Changes' }));
    expect(await screen.findByText('Updated Manager')).toBeInTheDocument();
  });

});
