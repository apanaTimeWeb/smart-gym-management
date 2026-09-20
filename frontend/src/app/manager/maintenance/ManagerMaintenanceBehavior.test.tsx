import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import ManagerMaintenanceMain from '@/app/manager/maintenance/maintenance_components/ManagerMaintenanceMain';
import { managerMswServer } from '@/app/manager/manager_mocks/ManagerMswTestServer';
import { ManagerTestProviders } from '@/app/manager/manager_mocks/ManagerTestProviders';


beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => managerMswServer.resetHandlers());
afterAll(() => managerMswServer.close());

describe('ManagerMaintenanceMain behavior', () => {
  it('creates an issue and exposes the resulting record', async () => {
    const user = userEvent.setup();
    render(<ManagerTestProviders><ManagerMaintenanceMain /></ManagerTestProviders>);

    await waitFor(() => expect(screen.getByText('Treadmill 4 Belt')).toBeInTheDocument());
    await user.click(screen.getByRole('button', { name: 'Log Issue' }));
    await user.type(screen.getByLabelText('Issue Title'), 'Behavior Maintenance Issue');
    await user.type(screen.getByLabelText('Equipment / Area'), 'Behavior Test Area');
    const submitButtons = screen.getAllByRole('button', { name: 'Log Issue' });
    await user.click(submitButtons[submitButtons.length - 1]!);

    await waitFor(() => expect(screen.getByText('Behavior Maintenance Issue')).toBeInTheDocument());
  });

  it('resolves an open issue and updates the visible status', async () => {
    const user = userEvent.setup();
    render(<ManagerTestProviders><ManagerMaintenanceMain /></ManagerTestProviders>);

    await waitFor(() => expect(screen.getByRole('button', { name: 'Mark as Resolved' })).toBeInTheDocument());
    await user.click(screen.getByRole('button', { name: 'Mark as Resolved' }).first());

    await waitFor(() => expect(screen.getAllByText('RESOLVED').length).toBeGreaterThan(0));
  });
});
