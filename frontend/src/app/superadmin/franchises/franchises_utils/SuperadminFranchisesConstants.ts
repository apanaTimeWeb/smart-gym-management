// RESPONSIBILITY: Constants and mock data for the Superadmin Franchises module.
import type { SuperadminFranchise } from '@/app/superadmin/franchises/franchises_types/superadmin_franchises_types';
export const FRANCHISES_PAGE_SIZE = 10;
export const FRANCHISE_STATUS_STYLES: Record<string, string> = {
    ACTIVE: 'bg-success-bg text-success border border-success/20',
    INACTIVE: 'bg-input text-secondary border border-border',
    SUSPENDED: 'bg-danger-bg text-danger border border-danger/20',
};
