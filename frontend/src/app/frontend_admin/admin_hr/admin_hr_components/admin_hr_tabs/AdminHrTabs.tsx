"use client";
// RESPONSIBILITY: Renders the tabbed view switching between the Staff and Payroll tables in the HR module.
import { useTranslations } from 'next-intl';

import { useState } from 'react';
import { useAdminHrViewModel } from '@/app/frontend_admin/admin_hr/admin_hr_hooks/useAdminHrViewModel';
import { HR_TABS } from '@/app/frontend_admin/admin_hr/admin_hr_constants/AdminHrConstants';
import { useAdminHrBranchReference } from '@/app/frontend_admin/admin_hr/admin_hr_hooks/useAdminHrBranchReference';
import type { AdminHrBranchReference } from '@/app/frontend_admin/admin_hr/admin_hr_types/AdminHrBranchReferenceTypes';
import { RefreshCw, Plus, Search } from 'lucide-react';
import AdminHrStaffTable from '@/app/frontend_admin/admin_hr/admin_hr_components/admin_hr_staff_table/AdminHrStaffTable';
import AdminHrPayrollTable from '@/app/frontend_admin/admin_hr/admin_hr_components/admin_hr_payroll_table/AdminHrPayrollTable';
import AdminHrAdvanceTable from '@/app/frontend_admin/admin_hr/admin_hr_components/admin_hr_advance_table/AdminHrAdvanceTable';
import AdminHrDueTable from '@/app/frontend_admin/admin_hr/admin_hr_components/admin_hr_due_table/AdminHrDueTable';
import AdminHrLedgerTable from '@/app/frontend_admin/admin_hr/admin_hr_components/admin_hr_ledger_table/AdminHrLedgerTable';
import AdminLayoutTableSkeleton from '@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutTableSkeleton';

/**
 * AdminHrTabs renders the admin hr tabs UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminHrTabs: Renders the tabbed view switching between the Staff and Payroll tables in the HR module.
 * @dependencies Consumes useAdminHrViewModel, AdminHrConstants, useAdminHrBranchReference, AdminHrBranchReferenceTypes, AdminHrStaffTable.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminHrTabs() {
  const t = useTranslations();

  const [activeTab, setActiveTab] = useState<typeof HR_TABS[number]>(HR_TABS[0]);
  const { loadAll, openAdd, openAddPayroll, status, search, setSearch, branchFilter, setBranchFilter, roleFilter, setRoleFilter, setCurrentPage, payrollMonth, setPayrollMonth } = useAdminHrViewModel();
  const { data: branches = [] } = useAdminHrBranchReference();

  return (
    <div className="rounded-xl shadow-card border overflow-hidden bg-card border-border">
      <div className="border-b border-border flex flex-wrap gap-4 justify-between items-center p-2 sm:p-0">
        <div className="flex overflow-x-auto">
          {HR_TABS.map((tab , __testIdIndex36) => (
            <button
              type="button"
              key={tab}
              onClick={() => { setActiveTab(tab);  setSearch(''); }}
              className={`focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95 px-5 py-3.5 text-sm font-medium motion-safe:transition-colors border-b-2 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${activeTab === tab ? 'text-primary border-focus bg-surface-highlight' : 'text-secondary border-transparent hover:opacity-80 bg-transparent'}`}
             data-testid={`admin_hr-admin_hr-tabs-click-map36-${__testIdIndex36}-1`}>
              {t(`hr.AdminHrTabs.tab_${String(tab).toLowerCase()}`)}
            </button>
          ))}
        </div>
        <div className="px-4 flex flex-wrap gap-3 items-center">
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center"><Search size={18} className="text-secondary"  strokeWidth={2}/></span>
            <input 
              value={search} 
              onChange={e => { setSearch(e.target.value);  }} 
              placeholder={t('hr.admin_hr_tabs.searchPlaceholder', { tab: t(`hr.AdminHrTabs.tab_${String(activeTab).toLowerCase()}`) })} 
              className="pl-9 pr-3 py-2 border border-border rounded-lg text-sm focus-visible:outline-none focus-visible:outline-none focus-visible:ring-2 w-40 sm:w-full sm:w-64  bg-card text-primary focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11"
             data-testid="admin_hr-admin_hr-tabs-control"/>
          </div>
          {activeTab === 'Staff' && (
            <>
              <select
                value={branchFilter}
                onChange={e => { setBranchFilter(e.target.value);  }}
                className="px-3 py-2 border border-border rounded-lg text-sm focus-visible:outline-none focus-visible:ring-2 bg-card text-primary motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11"
               data-testid="admin_hr-admin_hr-tabs-control-2">
                <option value="All" data-testid="admin_hr-admin_hr-tabs-control-3">{t('hr.admin_hr_tabs.text_0bf51d9a45')}</option>
                {(branches as AdminHrBranchReference[]).map((b, __testIdIndex65) => (
                  <option key={b.id} value={b.id} data-testid={`admin_hr-admin_hr-tabs-control-4-map65-${__testIdIndex65}-1`}>{b.name}</option>
                ))}
              </select>
              <select
                value={roleFilter}
                onChange={e => { setRoleFilter(e.target.value);  }}
                className="px-3 py-2 border border-border rounded-lg text-sm focus-visible:outline-none focus-visible:ring-2 bg-card text-primary motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11"
               data-testid="admin_hr-admin_hr-tabs-control-5">
                <option value="All" data-testid="admin_hr-admin_hr-tabs-control-6">{t('hr.admin_hr_tabs.text_c9c81e99d9')}</option>
                <option value="Admin" data-testid="admin_hr-admin_hr-tabs-control-7">{t('hr.admin_hr_tabs.text_4e7afebcfb')}</option>
                <option value="Trainer" data-testid="admin_hr-admin_hr-tabs-control-8">{t('hr.admin_hr_tabs.text_63deca910c')}</option>
              </select>
            </>
          )}
          {activeTab === 'Payroll' && (
            <input 
              type="month"
              value={payrollMonth}
              onChange={e => { setPayrollMonth(e.target.value);  }}
              className="px-3 py-2 border border-border rounded-lg text-sm focus-visible:outline-none focus-visible:ring-2 bg-card text-primary focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11"
             data-testid="admin_hr-admin_hr-tabs-control-9"/>
          )}
  <div className="px-4 flex flex-wrap gap-2">
    <button type="button" 
      onClick={loadAll} 
      className="flex items-center gap-2 px-3 py-2 text-sm border border-border text-secondary rounded-lg hover:opacity-80 motion-safe:transition-opacity motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95"
     aria-label={t('hr.admin_hr_tabs.refresh')} data-testid="admin_hr-admin_hr-tabs-click-2">
      <RefreshCw size={18} aria-hidden="true" strokeWidth={2}/>
    </button>
    {activeTab === 'Staff' && (
      <button type="button" 
        onClick={openAdd} 
        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-on-primary bg-primary rounded-lg hover:opacity-90 motion-safe:transition-opacity motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95" 
       data-testid="admin_hr-admin_hr-tabs-click-3">
        <Plus size={18}  strokeWidth={2}/> {t('hr.admin_hr_tabs.text_54e84de627')}</button>
    )}
    {activeTab === 'Payroll' && (
      <button type="button" 
        onClick={openAddPayroll} 
        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-on-primary bg-primary rounded-lg hover:opacity-90 motion-safe:transition-opacity motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95" 
       data-testid="admin_hr-admin_hr-tabs-click-4">
        <Plus size={18}  strokeWidth={2}/> {t('hr.admin_hr_tabs.text_582a937759')}</button>
    )}
  </div>
</div>
</div>

 <div className="p-5">
 {status === 'pending' ? (
 <AdminLayoutTableSkeleton rows={6} cols={6} />
 ) : activeTab === 'Staff' ? (
 <AdminHrStaffTable />
 ) : activeTab === 'Payroll' ? (
 <AdminHrPayrollTable />
 ) : activeTab === 'Advance' ? (
 <AdminHrAdvanceTable />
 ) : activeTab === 'Dues' ? (
 <AdminHrDueTable />
 ) : activeTab === 'Ledger' ? (
 <AdminHrLedgerTable />
 ) : null}
 </div>
 </div>
 );
}