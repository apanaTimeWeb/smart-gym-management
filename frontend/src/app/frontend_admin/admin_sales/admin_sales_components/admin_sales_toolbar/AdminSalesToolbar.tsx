"use client";
// RESPONSIBILITY: Renders the date filter dropdown (with Custom date range pickers), search input, and export button for the Sales module. Reads/writes state via useAdminSalesLogic state.
import { useTranslations } from 'next-intl';

import { Download, Search } from 'lucide-react';
import { useAdminSalesLogic } from '@/app/frontend_admin/admin_sales/admin_sales_hooks/useAdminSalesLogic';
import { AdminSalesDateFilterDropdown } from '@/app/frontend_admin/admin_sales/admin_sales_components/admin_sales_date_filter/AdminSalesDateFilterDropdown';
import { useAdminSalesToolbarSearch } from '@/app/frontend_admin/admin_sales/admin_sales_components/admin_sales_toolbar/useAdminSalesToolbarSearch';

/**
 * AdminSalesToolbar renders the admin sales toolbar UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSalesToolbar: Renders the date filter dropdown (with Custom date range pickers), search input, and export button for the Sales module. Reads/writes state via useAdminSalesLogic state.
 * @dependencies Consumes useAdminSalesLogic, AdminSalesDateFilterDropdown.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminSalesToolbar() {
  const t = useTranslations();

  const { search, setSearch, overviewData } = useAdminSalesLogic();
  const { localSearch, setLocalSearch } = useAdminSalesToolbarSearch(search, setSearch);



  return (
    <div className="bg-card rounded-xl shadow-card border border-border p-4 space-y-3 mb-5">
      <div className="flex flex-wrap gap-3 items-center justify-between">
        {/* Date Filter Dropdown */}
        <div className="flex items-center gap-3 flex-wrap">
          <AdminSalesDateFilterDropdown />
        </div>

        {/* Search + Export */}
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center"><Search size={18} className="text-secondary"  strokeWidth={2}/></span>
            <input
              value={localSearch}
              onChange={e => setLocalSearch(e.target.value)}
              placeholder={t('sales.admin_sales_toolbar.text_6d7a30a931')}
              className="pl-9 pr-3 py-2 border border-border rounded-lg text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary w-40 sm:w-56 bg-input text-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11"
             data-testid="admin_sales-admin_sales-toolbar-control"/>
          </div>
          <button
            type="button"
            onClick={() => {
              const header = t('sales.admin_sales_toolbar.remaining_csvHeader');
              const rows = overviewData.map((item) => `${item.date},${item.revenue},${item.newMembers}`);
              const csv = [header, ...rows].join('\n');
              const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
              const url = URL.createObjectURL(blob);
              const anchor = document.createElement('a');
              anchor.href = url;
              anchor.download = 'admin_sales-overview.csv';
              anchor.click();
              URL.revokeObjectURL(url);
            }}
            className="flex items-center gap-1.5 px-3 py-2 text-sm border border-border rounded-lg hover:bg-primary-subtle text-secondary motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95"
           data-testid="admin_sales-admin_sales-toolbar-click">
            <Download size={18}  strokeWidth={2}/> {t('sales.admin_sales_toolbar.text_f3e4fadb9e')}</button>
        </div>
      </div>
    </div>
  );
}
