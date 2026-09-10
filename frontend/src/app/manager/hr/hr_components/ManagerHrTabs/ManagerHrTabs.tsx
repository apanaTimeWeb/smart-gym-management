// RESPONSIBILITY: Renders the tabbed view switching between the Staff and Payroll tables in the HR module.
'use client';

import { useState } from 'react';
import { useHrContext } from '@/app/manager/hr/hr_context/ManagerHrContext';
import { HR_TABS } from '@/app/manager/hr/hr_utils/ManagerHrSharedConstants';
import { RefreshCw, Plus, Search } from 'lucide-react';
import { SearchableDropdown } from '@/app/manager/manager_components/ManagerShared/SearchableDropdown';
import ManagerHrStaffTable from '@/app/manager/hr/hr_components/ManagerHrStaffTable/ManagerHrStaffTable';
import ManagerHrPayrollTable from '@/app/manager/hr/hr_components/ManagerHrPayrollTable/ManagerHrPayrollTable';
import ManagerHrAdvanceTable from '@/app/manager/hr/hr_components/ManagerHrAdvanceTable/ManagerHrAdvanceTable';
import ManagerHrDueTable from '@/app/manager/hr/hr_components/ManagerHrDueTable/ManagerHrDueTable';
import ManagerHrLedgerTable from '@/app/manager/hr/hr_components/ManagerHrLedgerTable/ManagerHrLedgerTable';

export default function ManagerHrTabs() {
  const [activeTab, setActiveTab] = useState(HR_TABS[0]);
  const { loadAll, openAdd, openAddPayroll, fetchState, search, setSearch, roleFilter, setRoleFilter, setCurrentPage, payrollMonth, setPayrollMonth, staff } = useHrContext();

  return (
    <div className="rounded-xl shadow-sm border overflow-hidden bg-card border-border">
      <div className="border-b border-border flex flex-wrap gap-4 justify-between items-center p-2 sm:p-0">
        <div className="flex overflow-x-auto">
          {HR_TABS.map(t => (
            <button 
              key={t} 
              onClick={() => { setActiveTab(t);  setSearch(''); }}
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
              onChange={e => { setSearch(e.target.value);  }} 
              placeholder={`Search ${(activeTab || '').toLowerCase()}...`} 
              className="pl-9 pr-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 w-40 sm: w-full sm:w-64  bg-card text-foreground"
            />
          </div>
          {activeTab === 'Trainer List' && (
            <div className="w-32">
              <SearchableDropdown
                value={roleFilter}
                onChange={(val) => setRoleFilter(val.toString())}
                options={[
                  { value: 'All', label: 'All Roles' },
                  { value: 'Manager', label: 'Manager' },
                  { value: 'Trainer', label: 'Trainer' },
                ]}
                className="bg-card"
              />
            </div>
          )}
          {activeTab === 'Salary & Payments' && (
            <input 
              type="month"
              value={payrollMonth}
              onChange={e => { setPayrollMonth(e.target.value);  }}
              className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 bg-card text-foreground"
            />
          )}
  <div className="px-4 flex flex-wrap gap-2">
    <button 
      onClick={loadAll} 
      className="flex items-center gap-2 px-3 py-2 text-sm border border-border text-secondary rounded-lg hover:opacity-80 transition-opacity"
    >
      <RefreshCw size={14} />
    </button>
    {activeTab === 'Trainer List' && (
      <button 
        onClick={openAdd} 
        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-primary-foreground bg-primary rounded-lg hover:opacity-90 transition-opacity" 
      >
        <Plus size={14} /> Add Trainer
      </button>
    )}
    {activeTab === 'Salary & Payments' && (
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
  ) : activeTab === 'Trainer List' ? (
    <ManagerHrStaffTable />
  ) : activeTab === 'Trainer Attendance' ? (
    <div className="bg-card p-6 border border-border rounded-xl">
      <h3 className="text-lg font-bold text-foreground mb-4">Mark Trainer Attendance (Today)</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="py-3 px-4 text-sm font-medium text-secondary">Trainer Name</th>
              <th className="py-3 px-4 text-sm font-medium text-secondary">Shift</th>
              <th className="py-3 px-4 text-sm font-medium text-secondary">Status</th>
              <th className="py-3 px-4 text-sm font-medium text-secondary text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {(!staff || staff.length === 0) ? (
              <tr><td colSpan={4} className="py-8 text-center text-secondary text-sm">No staff found</td></tr>
            ) : (
              staff.map(s => (
                <tr key={s.id}>
                  <td className="py-3 px-4 text-sm text-foreground">{s.name}</td>
                  <td className="py-3 px-4 text-sm text-secondary">Morning (6 AM - 2 PM)</td>
                  <td className="py-3 px-4 text-sm font-bold text-warning">Pending</td>
                  <td className="py-3 px-4 text-right flex justify-end gap-2">
                    <button className="px-3 py-1.5 text-xs font-semibold bg-success text-success-foreground rounded-lg hover:opacity-90 transition-opacity">Mark Present</button>
                    <button className="px-3 py-1.5 text-xs font-semibold bg-danger text-danger-foreground rounded-lg hover:opacity-90 transition-opacity">Mark Absent</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  ) : activeTab === 'Trainer-Member Assignment' ? (
    <div className="bg-card p-6 border border-border rounded-xl">
      <h3 className="text-lg font-bold text-foreground mb-4">Assign Members to Trainers</h3>
      <div className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium mb-1">Select Member</label>
          <SearchableDropdown value="" onChange={() => {}} options={[]} placeholder="Select a member..." className="bg-input" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Select Trainer</label>
          <SearchableDropdown value="" onChange={() => {}} options={(staff || []).map(s => ({ value: s.id, label: s.name }))} placeholder="Select a trainer..." className="bg-input" />
        </div>
        <button className="w-full py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity mt-2">
          Assign Member
        </button>
      </div>
    </div>
  ) : activeTab === 'Trainer Schedule' ? (
    <div className="bg-card p-6 border border-border rounded-xl">
      <h3 className="text-lg font-bold text-foreground mb-4">Today's Schedule</h3>
      <div className="space-y-3">
        {(!staff || staff.length === 0) ? (
          <div className="text-secondary text-sm text-center py-4">No trainers scheduled</div>
        ) : (
          staff.map(s => (
            <div key={s.id} className="p-4 bg-input rounded-lg flex justify-between items-center">
              <div>
                <p className="font-bold text-foreground">{s.name}</p>
                <p className="text-sm text-secondary">Scheduled Shift</p>
              </div>
              <span className="text-sm font-semibold text-primary">10:00 AM - 6:00 PM</span>
            </div>
          ))
        )}
      </div>
    </div>
  ) : activeTab === 'Trainer Performance' ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {(!staff || staff.length === 0) ? (
        <div className="col-span-full text-center text-secondary py-8">No trainer data available</div>
      ) : (
        staff.map(s => (
          <div key={s.id} className="bg-card p-6 border border-border rounded-xl">
            <h3 className="text-lg font-bold text-foreground mb-1">{s.name}</h3>
            <p className="text-sm text-secondary mb-4">N/A Average Rating</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm"><span>Sessions Completed</span><span className="font-bold">0</span></div>
              <div className="flex justify-between text-sm"><span>Member Renewals</span><span className="font-bold text-success">0%</span></div>
            </div>
          </div>
        ))
      )}
    </div>
  ) : (
    <div className="text-center text-secondary py-10">Coming soon</div>
  )}
  </div>
 </div>
 );
}

