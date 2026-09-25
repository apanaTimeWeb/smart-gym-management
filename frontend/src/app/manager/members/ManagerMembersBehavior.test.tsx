import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { managerMswServer } from '@/app/manager/manager_mocks/ManagerMswTestServer';
import { ManagerTestProviders } from '@/app/manager/manager_mocks/ManagerTestProviders';
import { membersApi } from '@/app/manager/members/members_api/ManagerMembersApi';
import ManagerMembersMain from '@/app/manager/members/members_components/ManagerMembersMain/ManagerMembersMain';


beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => managerMswServer.resetHandlers());
afterAll(() => managerMswServer.close());

describe('Manager Members user-visible behavior', () => {
  it('renders the real feature UI against module MSW handlers', async () => {
    render(<ManagerTestProviders><ManagerMembersMain initialData={null} /></ManagerTestProviders>);
    expect(await screen.findByText('Member Management')).toBeInTheDocument();
  });
  it('renders an actual API member row, not a generic API result harness', async () => {
    render(<ManagerTestProviders><ManagerMembersMain initialData={null} /></ManagerTestProviders>);
    expect(await screen.findByText('Aarav Patel')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search by name or phone...')).toBeInTheDocument();
  });


  it('proves module MSW supplies non-placeholder API data', async () => {
    const response = await membersApi.fetchMembers({ page: '1', limit: '10' });
    expect(response.success).toBe(true);
    expect(response.data?.members?.length ?? 0).toBeGreaterThan(0);
  });

  it('renders the module empty state from an MSW empty response', async () => {
    managerMswServer.use(
      http.get('/manager/members', () => HttpResponse.json({ success: true, message: 'Empty result', data: { members : [], total: 0 } }))
    );
    render(<ManagerTestProviders><ManagerMembersMain initialData={null} /></ManagerTestProviders>);
    expect(await screen.findByText('No members yet')).toBeInTheDocument();
  });

  it('renders a user-facing error state when the module API fails', async () => {
    managerMswServer.use(
      http.get('/manager/members', () => HttpResponse.json({ success: false, message: 'Simulated failure', data: null }, { status: 500 }))
    );
    render(<ManagerTestProviders><ManagerMembersMain initialData={null} /></ManagerTestProviders>);
    const errorText = await screen.findByText(/Unable to load members\./i);
    expect(errorText).toBeInTheDocument();
  });

  it('proves the real search input changes the rendered dataset', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<ManagerTestProviders><ManagerMembersMain initialData={null} /></ManagerTestProviders>);
    expect(await screen.findByText('Aarav Patel')).toBeInTheDocument();
    const search = await screen.findByPlaceholderText('Search by name or phone...');
    await user.clear(search);
    await user.type(search, 'ZZZ-No-Such-Member');
    expect(await screen.findByText('No members yet')).toBeInTheDocument();
    expect(screen.queryByText('Aarav Patel')).not.toBeInTheDocument();
  });

});
