// RESPONSIBILITY: Renders the tabbed view switching between the Staff and Payroll tables in the HR module.
'use client';

import { useState } from 'react';
import { useHrContext } from '@/app/manager/hr/hr_context/HrContext';
import { HR_TABS } from '@/app/manager/hr/hr_utils/HrSharedConstants';
import { RefreshCw, Plus, Search } from 'lucide-react';
import ManagerHrStaffTable from '@/app/manager/hr/hr_components/ManagerHrStaffTable/ManagerHrStaffTable';
import ManagerHrPayrollTable from '@/app/manager/hr/hr_components/ManagerHrPayrollTable/ManagerHrPayrollTable';

export default function ManagerHrTabs() {
  const [activeTab, setActiveTab] = useState(HR_TABS[0]);
  const { loadAll, openAdd, openAddPayroll, fetchState, search, setSearch, roleFilter, setRoleFilter, setCurrentPage, payrollMonth, setPayrollMonth } = useHrContext();

  return (
    <div className="rounded-xl shadow-sm border overflow-hidden bg-card border-border">
      <div className="border-b border-border flex flex-wrap gap-4 justify-between items-center p-2 sm:p-0">
        <div className="flex overflow-x-auto">
          {HR_TABS.map(t => (
            <button 
              key={t} 
              onClick={() => { setActiveTab(t); setCurrentPage(1); setSearch(''); }}
              className={`px-5 py-3.5 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === t ? 'text-primary border-primary bg-primary/5' : 'text-secondary border-transparent hover:opacity-80 bg-transparent'}`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="px-4 flex flex-wrap gap-3 items-center">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <input 
              value={search} 
              onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} 
              placeholder={`Search ${activeTab.toLowerCase()}...`} 
              className="pl-9 pr-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 w-40 sm: w-full sm:w-64  bg-card text-foreground"
            />
          </div>
          {activeTab === 'Staff' && (
            <select
              value={roleFilter}
              onChange={e => { setRoleFilter(e.target.value); setCurrentPage(1); }}
              className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 bg-card text-foreground"
            >
              <option value="All">All Roles</option>
              <option value="Manager">Manager</option>
              <option value="Trainer">Trainer</option>
            </select>
          )}
          {activeTab === 'Payroll' && (
            <input 
              type="month"
              value={payrollMonth}
              onChange={e => { setPayrollMonth(e.target.value); setCurrentPage(1); }}
              className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 bg-card text-foreground"
            />
          )}
  <div className="px-4 flex gap-2">
    <button 
      onClick={loadAll} 
      className="flex items-center gap-2 px-3 py-2 text-sm border border-border text-secondary rounded-lg hover:opacity-80 transition-opacity"
    >
      <RefreshCw size={14} />
    </button>
    {activeTab === 'Staff' && (
      <button 
        onClick={openAdd} 
        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-primary-foreground bg-primary rounded-lg hover:opacity-90 transition-opacity" 
      >
        <Plus size={14} /> Add Staff
      </button>
    )}
    {activeTab === 'Payroll' && (
      <button 
        onClick={openAddPayroll} 
        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-primary-foreground bg-primary rounded-lg hover:opacity-90 transition-opacity" 
      >
        <Plus size={14} /> Add Payroll
      </button>
    )}
  </div>
</div>
</div>

 <div className="p-5">
 {fetchState === 'loading' ? (
 <div className="flex justify-center py-10">
 <div className="w-8 h-8 border-4 border-t-transparent rounded-full motion-safe:animate-spin" style={{ borderColor: 'var(--hr-highlight)', borderTopColor: 'transparent' }} />
 </div>
 ) : activeTab === 'Staff' ? (
 <ManagerHrStaffTable />
 ) : (
 <ManagerHrPayrollTable />
 )}
 </div>
 </div>
 );
}
