import { describe, expect, it } from 'vitest';
import { sortAdminBranchPerformanceRows } from '@/app/frontend_admin/admin_dashboard/admin_dashboard_utils/AdminDashboardSortBranchPerformanceRows';
import type { BranchPerformance } from '@/app/frontend_admin/admin_dashboard/admin_dashboard_types/AdminDashboardTypes';

describe('sortAdminBranchPerformanceRows', () => {
  const rows: BranchPerformance[] = [
    { id: 'b2', name: 'Beta', revenue: 200, activeMembers: 20, trend: 'up' },
    { id: 'b1', name: 'Alpha', revenue: 100, activeMembers: 40, trend: 'down' },
  ];

  it('sorts numeric fields in the requested direction without mutating the input', () => {
    const sorted = sortAdminBranchPerformanceRows(rows, 'revenue', 'asc');
    expect(sorted.map((row) => row.id)).toEqual(['b1', 'b2']);
    expect(rows.map((row) => row.id)).toEqual(['b2', 'b1']);
  });

  it('sorts text fields in descending order', () => {
    expect(sortAdminBranchPerformanceRows(rows, 'name', 'desc').map((row) => row.name)).toEqual(['Beta', 'Alpha']);
  });
});
