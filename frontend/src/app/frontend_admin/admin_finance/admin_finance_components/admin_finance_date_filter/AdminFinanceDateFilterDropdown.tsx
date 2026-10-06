"use client";
// RESPONSIBILITY: A unified Date Filter dropdown used across Admin pages (Dashboard, Finance, Reports, Sales).
import { useTranslations } from 'next-intl';
// It syncs the selected preset directly to the URL query parameters (range, startDate, endDate), allowing SSR/hooks to fetch data accordingly.

import { useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { AdminLayoutSearchableDropdown } from '@/app/frontend_admin/admin_layout/admin_layout_shared/admin_layout_searchable_dropdown/AdminLayoutSearchableDropdown';
import type { AdminFinanceDateFilterRange } from '@/app/frontend_admin/admin_finance/admin_finance_types/AdminFinanceDateFilterTypes';


/**
 * AdminFinanceDateFilterDropdown renders the admin finance date filter dropdown UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinanceDateFilterDropdown: A unified Date Filter dropdown used across Admin pages (Dashboard, Finance, Reports, Sales).
 * @dependencies Consumes AdminLayoutSearchableDropdown, AdminFinanceDateFilterTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export function AdminFinanceDateFilterDropdown() {
  const t = useTranslations();

  const options = [
    { value: 'this_month', label: t('finance.AdminAuditRepair.thisMonth') },
    { value: 'last_month', label: t('finance.AdminAuditRepair.lastMonth') },
    { value: 'last_3_months', label: t('finance.AdminAuditRepair.last3Months') },
    { value: 'last_6_months', label: t('finance.AdminAuditRepair.last6Months') },
    { value: 'this_year', label: t('finance.AdminAuditRepair.thisYear') },
    { value: 'monthly', label: t('finance.AdminAuditRepair.monthlyAllTime') }, // Keep compatibility with dashboard
    { value: 'yearly', label: t('finance.AdminAuditRepair.yearlyAllTime') },   // Keep compatibility with dashboard
    { value: 'custom', label: t('finance.AdminAuditRepair.customRange') },
  ];

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const value = (searchParams.get('range') as AdminFinanceDateFilterRange) ?? 'this_month';

  const handlePresetChange = useCallback((preset: string) => {
    const today = new Date();
    let from = '';
    let to = '';

    switch (preset) {
      case 'this_month':
        from = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0] || '';
        to = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0] || '';
        break;
      case 'last_month':
        from = new Date(today.getFullYear(), today.getMonth() - 1, 1).toISOString().split('T')[0] || '';
        to = new Date(today.getFullYear(), today.getMonth(), 0).toISOString().split('T')[0] || '';
        break;
      case 'last_3_months':
        from = new Date(today.getFullYear(), today.getMonth() - 3, 1).toISOString().split('T')[0] || '';
        to = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0] || '';
        break;
      case 'last_6_months':
        from = new Date(today.getFullYear(), today.getMonth() - 6, 1).toISOString().split('T')[0] || '';
        to = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0] || '';
        break;
      case 'this_year':
        from = new Date(today.getFullYear(), 0, 1).toISOString().split('T')[0] || '';
        to = new Date(today.getFullYear(), 11, 31).toISOString().split('T')[0] || '';
        break;
      default:
        break;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set('range', preset);
    if (preset !== 'custom' && preset !== 'monthly' && preset !== 'yearly') {
      params.set('startDate', from);
      params.set('endDate', to);
    } else if (preset !== 'custom') {
      params.delete('startDate');
      params.delete('endDate');
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [router, searchParams, pathname]);

  return (
    <div className="w-48 bg-input border border-border rounded-lg shadow-card">
      <AdminLayoutSearchableDropdown
        options={options}
        value={value}
        onChange={(val) => handlePresetChange(String(val))}
        placeholder={t('finance.AdminFinanceDateFilterDropdown.text_12e1289bac')}
       testId="admin_finance-admin_finance-date-filter-dropdown-filter"/>
    </div>
  );
}