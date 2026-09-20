"use client";
// RESPONSIBILITY: Provides the implementation for AdminSalesTabs.tsx functionality within its module.

import { useAdminSalesLogic } from '@/app/admin/sales/sales_context/useAdminSalesLogic';
import { SALES_TABS } from '@/app/admin/sales/sales_utils/AdminSalesUiConstants';

export default function AdminSalesTabs() {
 const { tab, setTab } = useAdminSalesLogic();

 return (
 <div className="border-b border-border flex overflow-x-auto bg-card">
 {SALES_TABS.map(t => (
 <button 
 key={t} 
 onClick={() => setTab(t)}
 className={`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page px-5 py-3.5 text-sm font-medium motion-safe:transition-colors border-b-2 whitespace-nowrap ${
 tab === t 
 ? 'text-primary bg-surface-highlight border-primary' 
 : 'border-transparent text-secondary hover:text-primary'
 }`}
 >
 {t}
 </button>
 ))}
 </div>
 );
}