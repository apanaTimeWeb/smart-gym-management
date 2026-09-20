'use client';
// RESPONSIBILITY: Orchestrates the documented HR staff, attendance, payroll, ledger, advance, and due views without embedding business API logic.
import { useState } from 'react';
import { Plus, RefreshCw, Search } from 'lucide-react';
import { useManagerHrLogic } from '@/app/manager/hr/hr_hooks/ManagerUseManagerHrLogic';
import { HR_TABS } from '@/app/manager/hr/hr_utils/ManagerHrSharedConstants';
import ManagerSearchableDropdown from '@/app/manager/manager_components/ManagerShared/ManagerSearchableDropdown';
import ManagerHrStaffTable from '@/app/manager/hr/hr_components/ManagerHrStaffTable/ManagerHrStaffTable';
import ManagerHrPayrollTable from '@/app/manager/hr/hr_components/ManagerHrPayrollTable/ManagerHrPayrollTable';
import ManagerHrAdvanceTable from '@/app/manager/hr/hr_components/ManagerHrAdvanceTable/ManagerHrAdvanceTable';
import ManagerHrDueTable from '@/app/manager/hr/hr_components/ManagerHrDueTable/ManagerHrDueTable';
import ManagerHrLedgerTable from '@/app/manager/hr/hr_components/ManagerHrLedgerTable/ManagerHrLedgerTable';
import ManagerHrAttendanceHistory from '@/app/manager/hr/hr_components/ManagerHrAttendanceHistory/ManagerHrAttendanceHistory';

export default function ManagerHrTabs() {
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
    <section className="overflow-hidden rounded-xl border border-border bg-card shadow-card" aria-label="HR workspace">
      <div className="flex flex-col gap-4 border-b border-border p-3 lg:flex-row lg:items-center lg:justify-between">
        <div role="tablist" aria-label="HR sections" className="flex max-w-full overflow-x-auto">
          {HR_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => {
                setActiveTab(tab);
                setSearch('');
              }}
              className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium motion-safe:transition-colors ${
                activeTab === tab
                  ? 'border-primary bg-primary-subtle text-primary'
                  : 'border-transparent text-secondary hover:text-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          {isStaffTab && (
            <>
              <div className="relative w-full sm:w-64">
                <Search size={18} aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
                <label htmlFor="manager-hr-staff-search" className="sr-only">Search staff</label>
                <input
                  id="manager-hr-staff-search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search staff..."
                  className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-3 text-sm text-primary focus:outline-none focus:ring-2"
                />
              </div>
              <div className="w-full sm:w-40">
                <ManagerSearchableDropdown
                  value={roleFilter}
                  onChange={(value) => setRoleFilter(String(value))}
                  options={[
                    { value: 'All', label: 'All Roles' },
                    { value: 'Manager', label: 'Manager' },
                    { value: 'Trainer', label: 'Trainer' },
                  ]}
                  placeholder="Filter role"
                />
              </div>
              <button
                type="button"
                onClick={openAdd}
                className="flex min-w-32 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary motion-safe:transition-opacity hover:opacity-90"
              >
                <Plus size={18} aria-hidden="true" />
                Add Trainer
              </button>
            </>
          )}

          {isPayrollTab && (
            <>
              <label htmlFor="manager-hr-payroll-month" className="sr-only">Payroll month</label>
              <input
                id="manager-hr-payroll-month"
                type="month"
                value={payrollMonth}
                onChange={(event) => setPayrollMonth(event.target.value)}
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-primary sm:w-auto"
              />
              <button
                type="button"
                onClick={openAddPayroll}
                className="flex min-w-32 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary motion-safe:transition-opacity hover:opacity-90"
              >
                <Plus size={18} aria-hidden="true" />
                Add Payroll
              </button>
            </>
          )}

          <button
            type="button"
            onClick={() => { void loadAll(); }}
            aria-label="Refresh HR data"
            className="flex min-w-10 items-center justify-center rounded-lg border border-border px-3 py-2 text-sm text-secondary motion-safe:transition-opacity hover:opacity-80"
          >
            <RefreshCw size={18} aria-hidden="true" />
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
