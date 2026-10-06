// RESPONSIBILITY: Canonical feature-owned static constants and business UI configuration for this Admin feature.
import type { PlanRevenueRecord, RevenuePeriod } from '@/app/frontend_admin/admin_plans/admin_plans_types/AdminPlansRevenueTypes';


export const REVENUE_PERIOD_OPTIONS: { labelKey: string; value: RevenuePeriod }[] = [
  { labelKey: 'plans.static.this_month', value: 'THIS_MONTH' },
  { labelKey: 'plans.static.last_month', value: 'LAST_MONTH' },
  { labelKey: 'plans.static.this_quarter', value: 'THIS_QUARTER' },
  { labelKey: 'plans.static.this_year', value: 'THIS_YEAR' },
];

export const REVENUE_TABLE_HEADERS = [
  { key: 'planName', labelKey: 'plans.static.plan_name', sortable: true },
  { key: 'tier', labelKey: 'plans.static.tier', sortable: true },
  { key: 'activeSubscriptions', labelKey: 'plans.static.active_subs', sortable: true },
  { key: 'newSignups', labelKey: 'plans.static.new_signups', sortable: true },
  { key: 'renewalRate', labelKey: 'plans.static.renewal_rate', sortable: true },
  { key: 'totalRevenue', labelKey: 'plans.static.total_revenue', sortable: true },
];

export const TIERS = ['Bronze', 'Silver', 'Gold'] as const;



export const EMPTY_PLAN_FORM: import('@/app/frontend_admin/admin_plans/admin_plans_types/AdminPlansTypes').PlanFormValues = { 
 name: '', 
 tier: 'Gold', 
 price1Month: '', 
 price3Month: '', 
 price6Month: '', 
 price12Month: '', 
 priceCustom: '', 
 features: '' 
};

export const PLANS_ITEMS_PER_PAGE = 10;
