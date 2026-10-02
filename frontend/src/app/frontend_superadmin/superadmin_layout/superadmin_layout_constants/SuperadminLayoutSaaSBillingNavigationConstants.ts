/**
 * @description Role-owned SaaS Billing navigation configuration.
 * @dependencies lucide-react only.
 * @edge-case Route labels/paths are navigation metadata, not business logic; feature implementations remain isolated.
 */
import { CreditCard, Receipt, Tag } from 'lucide-react';

import { MODULE_URLS as SUPERADMIN_COUPONS_URLS } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_url_config';
import { MODULE_URLS as SUPERADMIN_INVOICES_URLS } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_url_config';
import { MODULE_URLS as SUPERADMIN_PLANS_URLS } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_url_config';

export const SUPERADMIN_SAAS_BILLING_NAVIGATION_ITEMS = [
  { nameKey: 'subscriptions_and_tiers', href: SUPERADMIN_PLANS_URLS.PAGES.MAIN, icon: CreditCard, routeMatch: '/saas-billing/plans' },
  { nameKey: 'tenant_invoices', href: SUPERADMIN_INVOICES_URLS.PAGES.MAIN, icon: Receipt, routeMatch: '/saas-billing/invoices' },
  { nameKey: 'platform_coupons', href: SUPERADMIN_COUPONS_URLS.PAGES.MAIN, icon: Tag, routeMatch: '/saas-billing/coupons' },
] as const;
