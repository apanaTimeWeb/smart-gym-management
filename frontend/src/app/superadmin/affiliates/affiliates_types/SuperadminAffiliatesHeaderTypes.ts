// RESPONSIBILITY: Type contract extracted from SuperadminAffiliatesHeader.tsx; no business behavior.


export const SUPERADMIN_AFFILIATE_STATUS_FILTERS = ['ALL', 'ACTIVE', 'INACTIVE'] as const;
export type SuperadminAffiliateStatusFilter = typeof SUPERADMIN_AFFILIATE_STATUS_FILTERS[number];

export interface SuperadminAffiliatesHeaderProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    statusFilter: SuperadminAffiliateStatusFilter;
    onStatusFilterChange: (value: SuperadminAffiliateStatusFilter) => void;
    onAddClick: () => void;
    /** ISO date string for commission period start filter */
    startDate: string;
    onStartDateChange: (value: string) => void;
    /** ISO date string for commission period end filter */
    endDate: string;
    onEndDateChange: (value: string) => void;
}
