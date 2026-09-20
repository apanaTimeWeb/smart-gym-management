// RESPONSIBILITY: Owns static role navigation configuration for the Superadmin SaaS Billing surface.
import { CreditCard, Receipt, Tag } from 'lucide-react';
import { PlansUrlConfig } from '@/app/superadmin/saas-billing/plans/superadmin_plans_url_config';
import { InvoicesUrlConfig } from '@/app/superadmin/saas-billing/invoices/superadmin_invoices_url_config';
import { CouponsUrlConfig } from '@/app/superadmin/saas-billing/coupons/superadmin_coupons_url_config';

export const SUPERADMIN_SAAS_BILLING_NAVIGATION_ITEMS = [
  { name: 'Subscriptions & Tiers', href: PlansUrlConfig.PAGES.MAIN, icon: CreditCard, routeMatch: '/plans' },
  { name: 'Tenant Invoices', href: InvoicesUrlConfig.PAGES.MAIN, icon: Receipt, routeMatch: '/invoices' },
  { name: 'Platform Coupons', href: CouponsUrlConfig.PAGES.MAIN, icon: Tag, routeMatch: '/coupons' },
] as const;
