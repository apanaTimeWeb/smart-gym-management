"use client";

import { Package, ShoppingCart, TrendingUp, AlertTriangle } from 'lucide-react';
import { useStoreContext } from '@/app/erp/store/store_context/StoreContext';
import { formatCurrency } from '@/app/erp/store/store_utils/StoreSharedConstants';

export default function StoreKPIs() {
 const { summary } = useStoreContext();

 const kpis = [
 { label: 'Total Products', value: summary?.totalProducts || 0, icon: Package, color: 'text-[var(--info)]', bg: 'bg-[var(--info-bg)] dark:bg-[var(--info-bg)]' },
 { label: 'Total Orders', value: summary?.totalOrders || 0, icon: ShoppingCart, color: 'text-[var(--success)]', bg: 'bg-[var(--success-bg)] dark:bg-[var(--success-bg)]' },
 { label: 'Store Revenue', value: formatCurrency(summary?.totalRevenue || 0), icon: TrendingUp, color: 'text-[var(--warning)]', bg: 'bg-[var(--warning-bg)] dark:bg-[var(--warning-bg)]' },
 { label: 'Low Stock', value: summary?.lowStockProducts?.length || 0, icon: AlertTriangle, color: 'text-[var(--danger)]', bg: 'bg-[var(--danger-bg)] dark:bg-[var(--danger-bg)]' },
 ];

 return (
 <div className="space-y-5">
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
 {kpis.map((s, i) => (
 <div key={i} className="bg-[var(--store-bg-card)] rounded-xl p-4 shadow-sm border border-[var(--store-border)] flex items-center gap-3">
 <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
 <s.icon size={19} className={s.color} />
 </div>
 <div>
 <p className="text-xs text-[var(--store-text-secondary)] font-medium">{s.label}</p>
 <p className="text-xl font-bold text-[var(--store-text-primary)]">{s.value}</p>
 </div>
 </div>
 ))}
 </div>

 {(summary?.lowStockProducts?.length ?? 0) > 0 && (
 <div className="bg-[var(--danger-bg)] dark:bg-[var(--danger-bg)] border border-red-200 rounded-xl p-4 flex items-center gap-3">
 <AlertTriangle size={18} className="text-[var(--danger)] flex-shrink-0" />
 <p className="text-sm text-[var(--danger)] dark:text-[var(--danger)] font-medium">
 Low stock alert: {summary!.lowStockProducts.map(p => p.name).join(', ')}
 </p>
 </div>
 )}
 </div>
 );
}
