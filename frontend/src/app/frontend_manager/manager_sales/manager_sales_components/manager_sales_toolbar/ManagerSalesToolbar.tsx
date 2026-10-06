// RESPONSIBILITY: Renders ManagerSalesToolbar's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useState } from 'react';
import { useManagerDebouncedValueCommit } from '@/app/frontend_manager/manager_infrastructure/useManagerDebouncedValueCommit';
import { Download, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ManagerSalesDateFilterDropdown from '@/app/frontend_manager/manager_sales/manager_sales_components/manager_sales_date_filter_dropdown/ManagerSalesDateFilterDropdown';
import { useManagerSalesLogic } from '@/app/frontend_manager/manager_sales/manager_sales_hooks/useManagerSalesLogic';


/** @description Renders the ManagerSalesToolbar component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (2 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerSalesToolbar() {
  const t = useTranslations('MANAGER_SALES');

  const { 
    tab, search, setSearch, setCurrentPage,
    overviewData, membershipReport, pendingPayments, allMemberships
  } = useManagerSalesLogic();
  const [prevSearch, setPrevSearch] = useState(search);
  const [localSearch, setLocalSearch] = useState(search);

  if (search !== prevSearch) {
    setPrevSearch(search);
    setLocalSearch(search);
  }


  useManagerDebouncedValueCommit(localSearch, search, setSearch, 300);

  return (
  <div className="bg-card rounded-xl shadow-card border border-border p-4 flex flex-wrap gap-3 items-center justify-between mb-5 motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
  <div className="flex gap-2 flex-wrap items-center">
    <ManagerSalesDateFilterDropdown  data-testid="manager_sales-managersalestoolbar-sales-date-filter-dropdown-1"/>
  </div>
  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
  <div className="relative">
    <Search size={18} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary"/>
    <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "pl-9 pr-3 py-1.5 border border-border rounded-lg text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary w-40 sm:w-full sm:w-64  bg-input text-primary"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_sales-manager-sales-toolbar-input-value" 
      value={localSearch} 
      onChange={e => setLocalSearch(e.target.value)} 
      placeholder={t("COPY_SEARCH")} 
      
    />
  </div>
  <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "flex items-center gap-1.5 px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-primary-subtle text-secondary motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_sales-manager-sales-toolbar-button-export" 
    onClick={() => {
      let csv = '';
      let filename = 'sales_report.csv';
      
      if (tab === 'Revenue Overview') {
        csv = 'Month,Revenue\n' + overviewData.map(d => `${d.month},${d.revenue}`).join('\n');
        filename = 'revenue_overview.csv';
      } else if (tab === 'Membership Report') {
        csv = 'Plan,Receivable,Received,Remaining,Refund\n' + membershipReport.map(r => `${r.plan},${r.receivable},${r.received},${r.remaining},${r.refund}`).join('\n');
        filename = 'membership_report.csv';
      } else if (tab === 'Pending Payments') {
        csv = 'Name,Phone,Pending Amount,Days Overdue\n' + pendingPayments.map(p => `${p.name},${p.phone},${p.pendingAmount},${p.daysOverdue}`).join('\n');
        filename = 'pending_payments.csv';
      } else if (tab === 'All Memberships') {
        csv = 'Name,Phone,Plan,Join Date\n' + allMemberships.map(m => `${m.name},${m.phone},${m.planId},${m.joinDate}`).join('\n');
        filename = 'all_memberships.csv';
      }

      if (!csv) {
        return;
      }

      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
    }}
    
  >
    <Download size={18} strokeWidth={2} />{t("COPY_EXPORT")}</button>
 </div>
 </div>
 );
}
