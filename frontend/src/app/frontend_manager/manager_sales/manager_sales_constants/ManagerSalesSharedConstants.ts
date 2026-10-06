// RESPONSIBILITY: Provides the implementation for ManagerSalesSharedConstants.ts functionality within its module.
/**
 * @description Provides the ManagerSalesSharedConstants implementation for the sales module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const DATE_FILTERS = ['Today', 'This Week', 'This Month', 'This Year', 'Custom'] as const;
export type DateFilter = typeof DATE_FILTERS[number];

export const SALES_TABS = ['Revenue Overview', 'Membership Report', 'Pending Payments', 'All Memberships'] as const;
export type SalesTab = typeof SALES_TABS[number];



export const SALES_ACTIVE_STATUS = ['ACTIVE'][0] as const;
