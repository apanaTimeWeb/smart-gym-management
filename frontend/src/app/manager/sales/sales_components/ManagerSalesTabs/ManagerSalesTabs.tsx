'use client';
// RESPONSIBILITY: Provides the implementation for ManagerSalesTabs.tsx functionality within its module.
import { useManagerSalesLogic } from '@/app/manager/sales/sales_hooks/ManagerUseManagerSalesLogic';
import { SALES_TABS } from '@/app/manager/sales/sales_utils/ManagerSalesSharedConstants';

export default function ManagerSalesTabs() {
 const { tab, setTab } = useManagerSalesLogic();

 return (
 <div className="border-b border-border flex overflow-x-auto bg-card">
 {SALES_TABS.map(t => (
 <button 
 key={t} 
 onClick={() => setTab(t)}
 className={`px-5 py-3.5 text-sm font-medium motion-safe:transition-colors border-b-2 whitespace-nowrap ${
 tab === t 
 ? 'text-on-primary bg-primary/5 border-primary' 
 : 'border-transparent text-secondary hover:text-primary'
 }`}
 >
 {t}
 </button>
 ))}
 </div>
 );
}
