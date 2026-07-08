"use client";

import { Printer } from 'lucide-react';
import { useStoreContext } from '../../store_context/StoreContext';
import { formatCurrency } from '../../store_utils/StoreSharedConstants';

export default function OrderTable() {
  const { orders, loading, setPrintData } = useStoreContext();

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-black/5 dark:bg-white/5">
          <tr>
            {['Order ID', 'Total', 'Method', 'Status', 'Date', 'Receipt'].map(h => (
              <th key={h} className="text-left text-xs font-semibold text-[var(--store-text-secondary)] uppercase tracking-wider px-4 py-3">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--store-border)]">
          {orders.map(o => (
            <tr key={o.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              <td className="px-4 py-3 text-sm font-mono text-[var(--store-text-primary)]">
                ORD-{String(o.id).padStart(4, '0')}
              </td>
              <td className="px-4 py-3 text-sm font-bold text-green-700 dark:text-green-500">
                {formatCurrency(o.total)}
              </td>
              <td className="px-4 py-3 text-sm text-[var(--store-text-primary)]">
                {o.method}
              </td>
              <td className="px-4 py-3">
                <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300">
                  {o.status}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-[var(--store-text-secondary)]">
                {new Date(o.createdAt).toLocaleDateString('en-IN')}
              </td>
              <td className="px-4 py-3">
                <button 
                  onClick={() => {
                    setPrintData({ 
                      gymName: 'GymSmart Store', 
                      gymPhone: '+91 83479 77566', 
                      receiptNo: `ORD-${o.id}`, 
                      date: new Date(o.createdAt).toLocaleDateString('en-IN'), 
                      customerName: 'Customer', 
                      items: (o.items || []).map(i => ({ 
                        name: i.product?.name || '', 
                        price: i.price, 
                        amount: i.price * i.qty 
                      })), 
                      total: o.total, 
                      paymentMethod: o.method 
                    });
                    setTimeout(() => window.print(), 100);
                  }} 
                  className="p-1.5 rounded-lg bg-black/5 dark:bg-white/5 text-[var(--store-text-secondary)] hover:text-[var(--store-text-primary)] transition-colors"
                >
                  <Printer size={14} />
                </button>
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-10 text-[var(--store-text-secondary)]">
                No orders yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
