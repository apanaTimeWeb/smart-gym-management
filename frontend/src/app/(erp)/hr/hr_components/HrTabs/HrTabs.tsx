"use client";

import { useState } from 'react';
import { useHrContext } from '@/app/(erp)/hr/hr_context/HrContext';
import { HR_TABS } from '@/app/(erp)/hr/hr_utils/HrSharedConstants';
import { RefreshCw, Plus, Search } from 'lucide-react';
import StaffTable from '@/app/(erp)/hr/hr_components/StaffTable/StaffTable';
import PayrollTable from '@/app/(erp)/hr/hr_components/PayrollTable/PayrollTable';

export default function HrTabs() {
  const [activeTab, setActiveTab] = useState(HR_TABS[0]);
  const { loadAll, openAdd, loading, search, setSearch, setCurrentPage } = useHrContext();

  return (
    <div className="rounded-xl shadow-sm border overflow-hidden hr-module" style={{ backgroundColor: 'var(--hr-bg-card)', borderColor: 'var(--hr-border)' }}>
      <div className="border-b flex flex-wrap gap-4 justify-between items-center p-2 sm:p-0" style={{ borderColor: 'var(--hr-border)' }}>
        <div className="flex overflow-x-auto">
          {HR_TABS.map(t => (
            <button 
              key={t} 
              onClick={() => { setActiveTab(t); setCurrentPage(1); setSearch(''); }}
              className={`px-5 py-3.5 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === t ? '' : 'border-transparent hover:opacity-80'}`}
              style={{
                color: activeTab === t ? 'var(--hr-highlight)' : 'var(--hr-text-secondary)',
                borderBottomColor: activeTab === t ? 'var(--hr-highlight)' : 'transparent',
                backgroundColor: activeTab === t ? 'var(--hr-highlight-subtle)' : 'transparent'
              }}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="px-4 flex flex-wrap gap-3 items-center">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
            <input 
              value={search} 
              onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} 
              placeholder={`Search ${activeTab.toLowerCase()}...`} 
              className="pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 w-40 sm:w-64"
              style={{ 
                backgroundColor: 'var(--hr-bg-input)', 
                borderColor: 'var(--hr-border)', 
                color: 'var(--hr-text-primary)' 
              }} 
            />
          </div>
  <div className="px-4 flex gap-2">
    <button 
      onClick={loadAll} 
      className="flex items-center gap-2 px-3 py-2 text-sm border rounded-lg hover:opacity-80 transition-opacity"
      style={{ borderColor: 'var(--hr-border)', color: 'var(--hr-text-secondary)' }}
    >
      <RefreshCw size={14} />
    </button>
    {activeTab === 'Staff' && (
      <button 
        onClick={openAdd} 
        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-lg hover:opacity-90 transition-opacity" 
        style={{ backgroundColor: 'var(--hr-highlight)' }}
      >
        <Plus size={14} /> Add Staff
      </button>
    )}
  </div>
</div>
</div>

 <div className="p-5">
 {loading ? (
 <div className="flex justify-center py-10">
 <div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--hr-highlight)', borderTopColor: 'transparent' }} />
 </div>
 ) : activeTab === 'Staff' ? (
 <StaffTable />
 ) : (
 <PayrollTable />
 )}
 </div>
 </div>
 );
}
