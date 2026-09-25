import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import SuperadminGymsTable from '@/app/superadmin/gyms/gyms_components/SuperadminGymsTable/SuperadminGymsTable';
import { resetSuperadminGymsMockState } from '@/app/superadmin/gyms/gyms_mocks/handlers/SuperadminGymsMockHandlers';
import { useSuperadminGymsTable } from '@/app/superadmin/gyms/gyms_components/SuperadminGymsTable/useSuperadminGymsTable';

vi.mock('@/app/superadmin/gyms/gyms_components/SuperadminGymsTable/useSuperadminGymsTable');
vi.mock('@/app/superadmin/gyms/gyms_components/SuperadminGymsTable/SuperadminGymsTableSortIcon', () => ({ default: () => null }));
vi.mock('@/app/superadmin/gyms/gyms_components/SuperadminGymsEmptyState/SuperadminGymsEmptyState', () => ({ default: () => <div>No gyms</div> }));
vi.mock('@/components/ui/Pagination', () => ({ default: () => null }));
vi.mock('@/components/ui/CopyButton', () => ({ default: () => null }));
vi.mock('@/app/superadmin/gyms/gyms_components/SuperadminGymEditModal/SuperadminGymEditModal', () => ({ default: () => null }));
vi.mock('@/app/superadmin/gyms/gyms_components/SuperadminGymWhatsappModal/SuperadminGymWhatsappModal', () => ({ default: () => null }));
vi.mock('@/app/superadmin/gyms/gyms_components/SuperadminGymDeleteModal/SuperadminGymDeleteModal', () => ({ default: () => null }));
vi.mock('next-intl', () => ({ useLocale: () => 'en-IN' }));

const mockedUseGymsTable = vi.mocked(useSuperadminGymsTable);
const baseGym = {
  id: 't1', name: 'Iron Paradise', ownerName: 'John Doe', adminEmail: 'john@iron.com', phone: '9876543210',
  status: 'ACTIVE' as const, plan: 'Pro', createdAt: '2026-08-01', memberCount: 200, monthlyRevenue: 5000,
  databaseVersion: 'v1.2', city: 'Mumbai', state: 'MH', staffCount: 15, currency: 'INR', databaseName: 'gym_db', lastActiveAt: '2026-09-17T09:15:00Z',
};
const setSortOrder = vi.fn();
const setSortBy = vi.fn();
let defaultHookReturn: ReturnType<typeof useSuperadminGymsTable>;

beforeEach(() => {
  resetSuperadminGymsMockState();
  defaultHookReturn = {
    filteredGyms: [baseGym], isPending: false, isError: false, error: null, total: 1, actionLoadingId: null,
    handleRowClick: vi.fn(), onGhostLoginClick: vi.fn(), onSuspendClick: vi.fn(), onDeleteClick: vi.fn(),
    openWhatsappModal: vi.fn(), currentPage: 1, pageLimit: 20, sortBy: 'memberCount', sortOrder: 'asc', segmentId: '',
    setCurrentPage: vi.fn(), setSortBy, setSortOrder, refetch: vi.fn(),
  };
  mockedUseGymsTable.mockReturnValue(defaultHookReturn);
});

describe('SuperadminGymsTable', () => {
  it('uses native buttons for every sortable header and exposes aria-sort', () => {
    render(<SuperadminGymsTable />);
    expect(screen.getByRole('columnheader', { name: /Members/i })).toHaveAttribute('aria-sort', 'ascending');
    expect(screen.getByRole('columnheader', { name: /MRR/i })).toHaveAttribute('aria-sort', 'none');
    expect(screen.getByRole('columnheader', { name: /Last Active/i })).toHaveAttribute('aria-sort', 'none');

    const membersButton = screen.getByRole('button', { name: /sort gyms by member count/i });
    fireEvent.click(membersButton);
    expect(setSortOrder).toHaveBeenCalledWith('desc');
  });

  it('supports keyboard activation on tenant rows', () => {
    const handleRowClick = vi.fn();
    mockedUseGymsTable.mockReturnValue({ ...defaultHookReturn, handleRowClick });
    render(<SuperadminGymsTable />);
    const row = screen.getByRole('row', { name: /Iron Paradise/i });
    fireEvent.keyDown(row, { key: 'Enter' });
    expect(handleRowClick).toHaveBeenCalledWith(baseGym);
  });
});
