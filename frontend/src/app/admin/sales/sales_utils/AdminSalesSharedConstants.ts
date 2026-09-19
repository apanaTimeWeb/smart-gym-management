// RESPONSIBILITY: Provides the implementation for AdminSalesSharedConstants.ts functionality within its module.
export const DATE_FILTERS = ['Today', 'This Week', 'This Month', 'This Year', 'Custom'] as const;
export type DateFilter = typeof DATE_FILTERS[number];

export const SALES_TABS = ['Overview', 'Membership Report', 'Pending Payments', 'All Memberships', 'Store Sales'] as const;
export type SalesTab = typeof SALES_TABS[number];





export const SALES_MOCK_RANGE_MULTIPLIERS = {
  today: 0.2,
  this_week: 0.55,
  this_month: 1,
  this_year: 12,
  custom: 1.1,
} as const;

export const SALES_MOCK_SINGLE_BRANCH_MULTIPLIER = 0.75;

export const SALES_ITEMS_PER_PAGE = 10;
