// RESPONSIBILITY: Owns static UI configuration for the Admin Sales module.
export const DATE_FILTERS = ['Today', 'This Week', 'This Month', 'This Year', 'Custom'] as const;
export type DateFilter = typeof DATE_FILTERS[number];

export const SALES_TABS = ['Overview', 'Membership Report', 'Pending Payments', 'All Memberships', 'Store Sales'] as const;
export type SalesTab = typeof SALES_TABS[number];


export const SALES_ITEMS_PER_PAGE = 10;
