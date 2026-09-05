// RESPONSIBILITY: Provides the implementation for AdminFinanceTabs.tsx functionality within its module.
'use client';

import { useState, useEffect } from 'react';
import { useAdminFinanceLogic } from '@/app/admin/finance/finance_context/useAdminFinanceLogic';
import { useAdminFinanceStore } from '@/app/admin/finance/finance_store/useAdminFinanceStore';
import { FINANCE_TABS } from '@/app/admin/finance/finance_utils/AdminFinanceSharedConstants';
import { RefreshCw, Plus, Search } from 'lucide-react';
import AdminFinancePaymentsTable from '@/app/admin/finance/finance_components/AdminFinancePaymentsTable/AdminFinancePaymentsTable';
import AdminFinanceRevenueSummary from '@/app/admin/finance/finance_components/AdminFinanceRevenueSummary/AdminFinanceRevenueSummary';

export default function AdminFinanceTabs() {
  const [tab, setTab] = useState(FINANCE_TABS[0]);
  const { payments, summary, totalPayments, fetchState, saving, error, loadAll, search, setSearch, currentPage, setCurrentPage, savePayment, methodFilter, setMethodFilter } = useAdminFinanceLogic();
  const { showModal, setShowModal, toast, showToast, hideToast } = useAdminFinanceStore();

  const [localSearch, setLocalSearch] = useState(search);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setLocalSearch(search);
  }, [search]);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== search) {
        setSearch(localSearch);
        
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch, search, setSearch, setCurrentPage]);

 return (
 <div className="rounded-xl shadow-sm border overflow-hidden bg-card border-border">
 <div className="border-b border-border flex justify-between items-center">
 <div className="flex">
 {FINANCE_TABS.map(t => (
 <button 
 key={t} 
 onClick={() => setTab(t)}
 className={`px-5 py-3.5 text-sm font-medium transition-colors border-b-2 ${tab === t ? 'text-primary border-primary bg-primary/5' : 'text-secondary border-transparent hover:opacity-80 bg-transparent'}`}
 >
 {t}
 </button>
 ))}
 </div>
  <div className="px-4 flex flex-wrap gap-3 items-center">
    <div className="relative">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
      <input 
        value={localSearch} 
        onChange={e => setLocalSearch(e.target.value)} 
        placeholder="Search payments..." 
        className="pl-9 pr-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-card text-primary w-40 sm: w-full sm:w-64 "
      />
    </div>
    <div className="flex flex-wrap gap-2">
 <button 
 onClick={loadAll} 
 className="flex items-center gap-2 px-3 py-2 text-sm border border-border text-secondary rounded-lg hover:opacity-80 transition-opacity"
 >
 <RefreshCw size={14} />
 </button>
 <button 
 onClick={() => setShowModal(true)} 
 className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-primary-foreground bg-primary rounded-lg hover:opacity-90 transition-opacity"
 >
 <Plus size={14} /> Add Payment
 </button>
  </div>
  </div>
 </div>

 <div className="p-5">
 {tab === 'Payments' && <AdminFinancePaymentsTable />}
 {tab === 'Summary' && <AdminFinanceRevenueSummary />}
 </div>
 </div>
 );
}



