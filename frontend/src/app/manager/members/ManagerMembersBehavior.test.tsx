import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ManagerMembersMain from '@/app/manager/members/members_components/ManagerMembersMain/ManagerMembersMain';
import { managerMswServer } from '@/app/manager/manager_mocks/ManagerMswTestServer';
import { ManagerTestProviders } from '@/app/manager/manager_mocks/ManagerTestProviders';

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

});
