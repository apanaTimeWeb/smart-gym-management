// Type contract owned by this module; kept outside implementation files for AI isolation.

import type { AdminPayoutsSortDirection } from '@/app/frontend_admin/admin_payouts/admin_payouts_types/AdminPayoutsSortTypes';
export interface AdminPayoutsQueryParams { month?: string; gymId?: string; status?: string; page?: number; limit?: number; sortKey?: string; sortDir?: AdminPayoutsSortDirection; }
