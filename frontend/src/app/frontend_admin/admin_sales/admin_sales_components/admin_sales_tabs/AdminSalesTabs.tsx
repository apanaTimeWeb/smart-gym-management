"use client";
// RESPONSIBILITY: Provides the implementation for AdminSalesTabs.tsx functionality within its module.
import { useAdminSalesLogic } from '@/app/frontend_admin/admin_sales/admin_sales_hooks/useAdminSalesLogic';
import { SALES_TABS } from '@/app/frontend_admin/admin_sales/admin_sales_constants/AdminSalesConstants';
import { useTranslations } from 'next-intl';

/**
 * AdminSalesTabs renders the admin sales tabs UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSalesTabs: Provides the implementation for AdminSalesTabs.tsx functionality within its module.
 * @dependencies Consumes useAdminSalesLogic, AdminSalesConstants.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminSalesTabs() {
 const { tab, setTab } = useAdminSalesLogic();
 const t = useTranslations();
 const labels = {
   overview: t('sales.AdminSalesTabs.overview'),
   membership_report: t('sales.AdminSalesTabs.membershipReport'),
   pending_payments: t('sales.AdminSalesTabs.pendingPayments'),
   all_memberships: t('sales.AdminSalesTabs.allMemberships'),
   store_sales: t('sales.AdminSalesTabs.storeSales'),
 } as const;

 return (
 <div className="border-b border-border flex overflow-x-auto bg-card">
 {SALES_TABS.map((t, __testIdIndex19) => (
 <button type="button"
 key={t} 
 onClick={() => setTab(t)}
 className={`motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page px-5 py-3.5 text-sm font-medium motion-safe:transition-colors border-b-2 whitespace-nowrap ${
 tab === t 
 ? 'text-primary bg-surface-highlight border-focus' 
 : 'border-transparent text-secondary hover:text-primary'
 }`}
  data-testid={`admin_sales-admin_sales-tabs-click-map19-${__testIdIndex19}-1`}>
 {labels[t]}
 </button>
 ))}
 </div>
 );
}