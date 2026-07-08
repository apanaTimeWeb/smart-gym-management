"use client";

import { useState } from 'react';
import { useFinanceContext } from '../../finance_context/FinanceContext';
import { FINANCE_TABS } from '../../finance_utils/FinanceSharedConstants';
import { RefreshCw, Plus } from 'lucide-react';
import PaymentsTable from '../PaymentsTable/PaymentsTable';
import RevenueSummary from '../RevenueSummary/RevenueSummary';

export default function FinanceTabs() {
  const [tab, setTab] = useState(FINANCE_TABS[0]);
  const { loadAll, setShowModal } = useFinanceContext();

  return (
    <div className="rounded-xl shadow-sm border overflow-hidden finance-module" style={{ backgroundColor: 'var(--finance-bg-card)', borderColor: 'var(--finance-border)' }}>
      <div className="border-b flex justify-between items-center" style={{ borderColor: 'var(--finance-border)' }}>
        <div className="flex">
          {FINANCE_TABS.map(t => (
            <button 
              key={t} 
              onClick={() => setTab(t)}
              className={`px-5 py-3.5 text-sm font-medium transition-colors border-b-2 ${tab === t ? '' : 'border-transparent hover:opacity-80'}`}
              style={{
                color: tab === t ? 'var(--finance-highlight)' : 'var(--finance-text-secondary)',
                borderBottomColor: tab === t ? 'var(--finance-highlight)' : 'transparent',
                backgroundColor: tab === t ? 'var(--finance-highlight-subtle)' : 'transparent'
              }}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="px-4 flex gap-2">
          <button 
            onClick={loadAll} 
            className="flex items-center gap-2 px-3 py-2 text-sm border rounded-lg hover:opacity-80 transition-opacity"
            style={{ borderColor: 'var(--finance-border)', color: 'var(--finance-text-secondary)' }}
          >
            <RefreshCw size={14} />
          </button>
          <button 
            onClick={() => setShowModal(true)} 
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-lg hover:opacity-90 transition-opacity" 
            style={{ backgroundColor: 'var(--finance-highlight)' }}
          >
            <Plus size={14} /> Add Payment
          </button>
        </div>
      </div>

      <div className="p-5">
        {tab === 'Payments' && <PaymentsTable />}
        {tab === 'Summary' && <RevenueSummary />}
      </div>
    </div>
  );
}
