"use client";
// RESPONSIBILITY: Renders the search + status filter toolbar for the Coupons module.
import { useTranslations } from 'next-intl';

import { Search, Plus } from 'lucide-react';
import { useState } from 'react';
import { useAdminCouponsStore } from '@/app/frontend_admin/admin_coupons/admin_coupons_store/useAdminCouponsStore';
import { useAdminCouponsLogic } from '@/app/frontend_admin/admin_coupons/admin_coupons_hooks/useAdminCouponsLogic';
import { COUPON_STATUS_OPTIONS } from '@/app/frontend_admin/admin_coupons/admin_coupons_constants/AdminCouponsConstants';
import { AdminLayoutSearchableDropdown } from '@/app/frontend_admin/admin_layout/admin_layout_shared/admin_layout_searchable_dropdown/AdminLayoutSearchableDropdown';

/**
 * AdminCouponsToolbar renders the admin coupons toolbar UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminCouponsToolbar: Renders the search + status filter toolbar for the Coupons module.
 * @dependencies Consumes useAdminCouponsStore, useAdminCouponsLogic, AdminCouponsConstants, AdminLayoutSearchableDropdown.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminCouponsToolbar() {
  const t = useTranslations();

  const { statusFilter, setStatusFilter, setSearch, dateRange, setDateRange } = useAdminCouponsStore();
  const { openAdd } = useAdminCouponsLogic();
  const [localSearch, setLocalSearch] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value);
    setSearch(e.target.value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
      <div className="flex flex-wrap gap-3 items-center w-full sm:w-auto">
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center"><Search size={18} className="text-secondary"  strokeWidth={2}/></span>
          <input
            type="text"
            placeholder={t('coupons.admin_coupons_toolbar.text_9932ce7a96')}
            value={localSearch}
            onChange={handleSearchChange}
            className="pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary w-64 motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11"
            aria-label={t('coupons.admin_coupons_toolbar.text_eabec7e58d')}
           data-testid="admin_coupons-admin_coupons-toolbar-control"/>
        </div>
        <div className="w-40">
          <AdminLayoutSearchableDropdown
            options={COUPON_STATUS_OPTIONS.map((o) => ({ value: o.value, label: t(o.labelKey) }))}
            value={statusFilter}
            onChange={(v) => setStatusFilter(v as string)}
            placeholder={t('coupons.admin_coupons_toolbar.text_6b308de777')}
           testId="admin_coupons-admin_coupons-toolbar-change"/>
        </div>
        <div className="w-40 bg-input rounded-lg border-none">
          <AdminLayoutSearchableDropdown
            options={[
              { value: 'all_time', label: t('coupons.admin_coupons_toolbar.remaining_allTime') },
              { value: 'today', label: t('coupons.AdminAuditRepair.today') },
              { value: 'this_week', label: t('coupons.admin_coupons_toolbar.remaining_thisWeek') },
              { value: 'this_month', label: t('coupons.admin_coupons_toolbar.remaining_thisMonth') },
              { value: 'custom', label: t('coupons.admin_coupons_toolbar.remaining_customRange') },
            ]}
            value={dateRange}
            onChange={(v) => setDateRange(v as string)}
           testId="admin_coupons-admin_coupons-toolbar-change-2"/>
        </div>
      </div>
      <button type="button"
        onClick={openAdd}
        className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-semibold hover:bg-primary-hover motion-safe:transition-colors motion-safe:active:scale-95 whitespace-nowrap motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11 min-w-11"
       data-testid="admin_coupons-admin_coupons-toolbar-click">
        <Plus size={18}  strokeWidth={2}/>
        {t('coupons.admin_coupons_toolbar.text_521f58fd09')}</button>
    </div>
  );
}