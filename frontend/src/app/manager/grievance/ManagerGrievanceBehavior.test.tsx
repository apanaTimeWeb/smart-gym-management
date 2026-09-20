import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import ManagerGrievanceMain from '@/app/manager/grievance/grievance_components/ManagerGrievanceMain';
import { managerMswServer } from '@/app/manager/manager_mocks/ManagerMswTestServer';
import { ManagerTestProviders } from '@/app/manager/manager_mocks/ManagerTestProviders';


beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => managerMswServer.resetHandlers());
afterAll(() => managerMswServer.close());

describe('ManagerGrievanceMain behavior', () => {
  it('creates a complaint and exposes the resulting record', async () => {
    const user = userEvent.setup();
    render(<ManagerTestProviders><ManagerGrievanceMain /></ManagerTestProviders>);

    await waitFor(() => expect(screen.getByText('Aarav Patel')).toBeInTheDocument());
    await user.click(screen.getByRole('button', { name: 'Log Complaint' }));
    await user.type(screen.getByLabelText('Member Name'), 'Behavior Grievance Member');
    await user.type(screen.getByLabelText('Issue Description'), 'Behavioral regression complaint');
    const submitButtons = screen.getAllByRole('button', { name: 'Log Complaint' });
    await user.click(submitButtons[submitButtons.length - 1]!);

    await waitFor(() => expect(screen.getByText('Behavior Grievance Member')).toBeInTheDocument());
  });

  it('resolves an open complaint and updates the visible status', async () => {
    const user = userEvent.setup();
    render(<ManagerTestProviders><ManagerGrievanceMain /></ManagerTestProviders>);

    await waitFor(() => expect(screen.getByRole('button', { name: 'Resolve' })).toBeInTheDocument());
    await user.click(screen.getByRole('button', { name: 'Resolve' }).first());
    await user.type(screen.getByLabelText('Resolution Note'), 'Resolved in behavior test');
    await user.click(screen.getByRole('button', { name: 'Submit Resolution' }));

    await waitFor(() => expect(screen.getByText('CLOSED')).toBeInTheDocument());
  });

  it('keeps the search flow user-visible and returns the empty state for a non-match', async () => {
    const user = userEvent.setup();
    render(<ManagerTestProviders><ManagerGrievanceMain /></ManagerTestProviders>);

    await waitFor(() => expect(screen.getByText('Aarav Patel')).toBeInTheDocument());
    await user.type(screen.getByPlaceholderText('Search by member name or issue...'), 'ZZZ-No-Match');

    expect(screen.getByText('No complaints found')).toBeInTheDocument();
    expect(screen.queryByText('Aarav Patel')).not.toBeInTheDocument();
  });

});
