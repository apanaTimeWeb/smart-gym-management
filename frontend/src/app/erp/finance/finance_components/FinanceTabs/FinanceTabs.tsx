// RESPONSIBILITY: Provides the implementation for FinanceTabs.tsx functionality within its module.
'use client';

import { useState } from 'react';
import { useFinanceContext } from '@/app/erp/finance/finance_context/FinanceContext';
import { FINANCE_TABS } from '@/app/erp/finance/finance_utils/FinanceSharedConstants';
import { RefreshCw, Plus, Search } from 'lucide-react';
import PaymentsTable from '@/app/erp/finance/finance_components/PaymentsTable/PaymentsTable';
import RevenueSummary from '@/app/erp/finance/finance_components/RevenueSummary/RevenueSummary';

export default function FinanceTabs() {
  const [tab, setTab] = useState(FINANCE_TABS[0]);
  const { loadAll, setShowModal, search, setSearch, setCurrentPage } = useFinanceContext();

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
        value={search} 
        onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} 
        placeholder="Search payments..." 
        className="pl-9 pr-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-card text-primary w-40 sm:w-64"
      />
    </div>
    <div className="flex gap-2">
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
 {tab === 'Payments' && <PaymentsTable />}
 {tab === 'Summary' && <RevenueSummary />}
 </div>
 </div>
 );
}
