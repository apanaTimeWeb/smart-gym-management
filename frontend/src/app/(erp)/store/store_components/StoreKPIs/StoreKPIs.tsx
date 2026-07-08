"use client";

import { Package, ShoppingCart, TrendingUp, AlertTriangle } from 'lucide-react';
import { useStoreContext } from '../../store_context/StoreContext';
import { formatCurrency } from '../../store_utils/StoreSharedConstants';

export default function StoreKPIs() {
  const { summary } = useStoreContext();

  const kpis = [
    { label: 'Total Products', value: summary?.totalProducts || 0, icon: Package,      color: 'text-blue-600',   bg: 'bg-blue-50 dark:bg-blue-900/20'   },
    { label: 'Total Orders',   value: summary?.totalOrders || 0,   icon: ShoppingCart, color: 'text-green-600',  bg: 'bg-green-50 dark:bg-green-900/20'  },
    { label: 'Store Revenue',  value: formatCurrency(summary?.totalRevenue || 0), icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/20' },
    { label: 'Low Stock',      value: summary?.lowStockProducts?.length || 0, icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20' },
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
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl p-4 flex items-center gap-3">
          <AlertTriangle size={18} className="text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-700 dark:text-red-400 font-medium">
            Low stock alert: {summary!.lowStockProducts.map(p => p.name).join(', ')}
          </p>
        </div>
      )}
    </div>
  );
}
