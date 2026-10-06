// Type contract owned by this module; kept outside implementation files for AI isolation.

import type { AdminHrSortDirection } from '@/app/frontend_admin/admin_hr/admin_hr_types/AdminHrSortTypes';
export interface AdminHrStaffSortIndicatorProps {
  active: boolean;
  direction: AdminHrSortDirection;
}
