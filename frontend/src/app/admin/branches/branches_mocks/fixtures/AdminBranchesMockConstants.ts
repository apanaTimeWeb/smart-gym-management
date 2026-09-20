// RESPONSIBILITY: Owns mock-only time-range scaling used by the Admin Branches MSW transport.
import type { AdminBranchesTimeRange } from '@/app/admin/branches/branches_types/AdminBranchesTimeRangeTypes';

export const BRANCH_TIME_RANGE_MULTIPLIERS: Record<AdminBranchesTimeRange, number> = {
  weekly: 0.25,
  monthly: 1,
  yearly: 12,
  custom: 0.5,
};
