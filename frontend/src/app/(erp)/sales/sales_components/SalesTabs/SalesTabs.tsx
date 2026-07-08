"use client";

import { useSalesContext } from '../../sales_context/SalesContext';
import { SALES_TABS } from '../../sales_utils/SalesSharedConstants';

export default function SalesTabs() {
 const { tab, setTab } = useSalesContext();

 return (
 <div className="border-b border-[var(--sales-border)] flex overflow-x-auto bg-[var(--sales-bg-card)]">
 {SALES_TABS.map(t => (
 <button 
 key={t} 
 onClick={() => setTab(t)}
 className={`px-5 py-3.5 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
 tab === t 
 ? 'text-[var(--sales-highlight)] bg-[var(--sales-highlight-subtle)]' 
 : 'border-transparent text-[var(--sales-text-secondary)] hover:text-[var(--sales-text-primary)]'
 }`}
 style={tab === t ? { borderBottomColor: 'var(--sales-highlight)' } : {}}
 >
 {t}
 </button>
 ))}
 </div>
 );
}
