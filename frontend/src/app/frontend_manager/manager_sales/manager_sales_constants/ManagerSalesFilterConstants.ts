/**
 * @description Provides the ManagerSalesFilterConstants implementation for the sales module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MANAGER_MEMBERSHIP_FILTERS = ['All', 'Active', 'Expiring Soon', 'Expired'] as const;

export const MANAGER_SALES_MEMBERSHIP_FILTER_VALUES = { ALL: 'All', ACTIVE: 'Active', EXPIRING_SOON: 'Expiring Soon', EXPIRED: 'Expired' } as const;
