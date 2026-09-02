// RESPONSIBILITY: Provides the implementation for SalesSharedConstants.ts functionality within its module.
export const DATE_FILTERS = ['Today', 'This Week', 'This Month', 'This Year'] as const;
export type DateFilter = typeof DATE_FILTERS[number];

export const SALES_TABS = ['Overview', 'Membership Report', 'Pending Payments', 'All Memberships', 'Store Sales'] as const;
export type SalesTab = typeof SALES_TABS[number];


