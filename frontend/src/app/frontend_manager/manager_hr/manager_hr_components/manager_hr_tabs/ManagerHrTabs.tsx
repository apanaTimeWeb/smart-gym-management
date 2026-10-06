// RESPONSIBILITY: Renders ManagerHrTabs's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useState } from 'react';
import { Plus, RefreshCw, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';
import ManagerHrAdvanceTable from '@/app/frontend_manager/manager_hr/manager_hr_components/manager_hr_advance_table/ManagerHrAdvanceTable';
import ManagerHrAttendanceHistory from '@/app/frontend_manager/manager_hr/manager_hr_components/manager_hr_attendance_history/ManagerHrAttendanceHistory';
import ManagerHrDueTable from '@/app/frontend_manager/manager_hr/manager_hr_components/manager_hr_due_table/ManagerHrDueTable';
import ManagerHrLedgerTable from '@/app/frontend_manager/manager_hr/manager_hr_components/manager_hr_ledger_table/ManagerHrLedgerTable';
import ManagerHrPayrollTable from '@/app/frontend_manager/manager_hr/manager_hr_components/manager_hr_payroll_table/ManagerHrPayrollTable';
import ManagerHrStaffTable from '@/app/frontend_manager/manager_hr/manager_hr_components/manager_hr_staff_table/ManagerHrStaffTable';
import { HR_TABS } from '@/app/frontend_manager/manager_hr/manager_hr_constants/ManagerHrSharedConstants';
import { useManagerHrLogic } from '@/app/frontend_manager/manager_hr/manager_hr_hooks/useManagerHrLogic';


/** @description Renders the ManagerHrTabs component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (9 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerHrTabs() {
  const t = useTranslations('MANAGER_HR');

  const [activeTab, setActiveTab] = useState<typeof HR_TABS[number]>(HR_TABS[0]);
  const {
    loadAll,
    openAdd,
    openAddPayroll,
    search,
    setSearch,
    roleFilter,
    setRoleFilter,
    payrollMonth,
    setPayrollMonth,
  } = useManagerHrLogic();

  const isStaffTab = activeTab === 'Trainer List';
  const isPayrollTab = activeTab === 'Salary & Payments';

  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card shadow-card motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1" aria-label={t("COPY_HR_WORKSPACE")}>
      <div className="flex flex-col gap-4 border-b border-border p-3 lg:flex-row lg:items-center lg:justify-between">
        <div data-testid="manager_hr-managerhrtabs-tablist"role="tablist" aria-label={t("COPY_HR_SECTIONS")} className="flex max-w-full overflow-x-auto">
          {HR_TABS.map((tab, mapIndex) => (
            <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium motion-safe:transition-all ${
                activeTab === tab
                  ? 'border-primary bg-primary-subtle text-primary'
                  : 'border-transparent text-secondary hover:text-primary'
              } motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110`)].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_hr-hr-managerhrtabs-button-hr-sections-${mapIndex}`}
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => {
                setActiveTab(tab);
                setSearch('');
              }}
              
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          {isStaffTab && (
            <>
              <div className="relative w-full sm:w-64">
                <Search size={18} strokeWidth={2} aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary"/>
                <label htmlFor="manager-hr-staff-search" className="sr-only">{t("COPY_SEARCH_STAFF_2")}</label>
                <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "w-full rounded-lg border border-border bg-card py-2 pl-9 pr-3 text-sm text-primary focus-visible:outline-none focus-visible:ring-2"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_hr-manager-hr-tabs-manager-hr-staff-search"
                  id="manager-hr-staff-search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={t("COPY_SEARCH_STAFF_1")}
                  
                />
              </div>
              <div className="w-full sm:w-40">
                <ManagerSearchableDropdown dataTestId="manager_hr-managerhrtabs-managersearchabledropdown-1"
                  value={roleFilter}
                  onChange={(value) => setRoleFilter(String(value))}
                  options={[
                    { value: 'All', label: t("COPY_ALL_ROLES") },
                    { value: 'Manager', label: t("COPY_MANAGER") },
                    { value: 'Trainer', label: t("COPY_TRAINER") },
                  ]}
                  placeholder={t("COPY_FILTER_ROLE")}
                 data-testid="manager_hr-managerhrtabs-searchable-dropdown-1"/>
              </div>
              <button data-testid="manager_hr-manager-hr-tabs-add"
                type="button"
                onClick={openAdd}
                className="flex min-w-32 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary motion-safe:transition-all hover:opacity-90 motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"
              >
                <Plus size={18} strokeWidth={2} aria-hidden="true" />{t("COPY_ADD_TRAINER")}</button>
            </>
          )}

          {isPayrollTab && (
            <>
              <label htmlFor="manager-hr-payroll-month" className="sr-only">{t("COPY_PAYROLL_MONTH")}</label>
              <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-primary sm:w-auto"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_hr-manager-hr-tabs-manager-hr-payroll-month"
                id="manager-hr-payroll-month"
                type="month"
                value={payrollMonth}
                onChange={(event) => setPayrollMonth(event.target.value)}
                
              />
              <button data-testid="manager_hr-manager-hr-tabs-add-payroll"
                type="button"
                onClick={openAddPayroll}
                className="flex min-w-32 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary motion-safe:transition-all hover:opacity-90 motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"
              >
                <Plus size={18} strokeWidth={2} aria-hidden="true" />{t("COPY_ADD_PAYROLL")}</button>
            </>
          )}

          <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "flex min-w-10 items-center justify-center rounded-lg border border-border px-3 py-2 text-sm text-secondary motion-safe:transition-all hover:opacity-80 motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_hr-manager-hr-tabs-button-refresh"
            type="button"
            onClick={() => { void loadAll(); }}
            aria-label={t("COPY_REFRESH_HR_DATA")}
            
          >
            <RefreshCw size={18} strokeWidth={2} aria-hidden="true"/>
          </button>
        </div>
      </div>

      <div className="p-5">
        {activeTab === 'Trainer List' && <ManagerHrStaffTable />}
        {activeTab === 'Trainer Attendance' && <ManagerHrAttendanceHistory />}
        {activeTab === 'Salary & Payments' && <ManagerHrPayrollTable />}
        {activeTab === 'Staff Ledger' && <ManagerHrLedgerTable />}
        {activeTab === 'Give Advance' && <ManagerHrAdvanceTable />}
        {activeTab === 'Pay Due' && <ManagerHrDueTable />}
      </div>
    </section>
  );
}
