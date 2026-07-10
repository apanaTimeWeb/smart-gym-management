"use client";

import { Printer } from 'lucide-react';
import { useStoreContext } from '@/app/(erp)/store/store_context/StoreContext';
import { formatCurrency } from '@/app/(erp)/store/store_utils/StoreSharedConstants';

import ErpPagination from '@/app/(erp)/erp_components/ErpPagination';

export default function OrderTable() {
  const { orders, loading, search, currentPage, setCurrentPage, setPrintData } = useStoreContext();

  const filtered = orders.filter(o => {
    const idMatch = `ORD-${String(o.id).padStart(4, '0')}`.toLowerCase().includes(search.toLowerCase());
    const methodMatch = o.method.toLowerCase().includes(search.toLowerCase());
    return idMatch || methodMatch;
  });

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const currentData = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="w-8 h-8 border-4 border-[var(--warning)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-[400px]">
      <div className="overflow-x-auto flex-1">
        <table className="w-full">
          <thead className="bg-[var(--bg-input)]">
            <tr>
              {['Order ID', 'Total', 'Method', 'Status', 'Date', 'Receipt'].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-[var(--store-text-secondary)] uppercase tracking-wider px-4 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--store-border)]">
            {currentData.map(o => (
              <tr key={o.id} className="hover:bg-[var(--primary-subtle)] transition-colors">
                <td className="px-4 py-3 text-sm font-mono text-[var(--store-text-primary)]">
                  ORD-{String(o.id).padStart(4, '0')}
                </td>
                <td className="px-4 py-3 text-sm font-bold text-[var(--success)] dark:text-[var(--success)]">
                  {formatCurrency(o.total)}
                </td>
                <td className="px-4 py-3 text-sm text-[var(--store-text-primary)]">
                  {o.method}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[var(--success-bg)] text-[var(--success)] dark:bg-[var(--success-bg)] dark:text-[var(--success)]">
                    {o.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-[var(--store-text-secondary)]">
                  {new Date(o.createdAt).toLocaleDateString('en-IN')}
                </td>
                <td className="px-4 py-3">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
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
                    className="p-1.5 rounded-lg bg-[var(--bg-input)] text-[var(--store-text-secondary)] hover:text-[var(--store-text-primary)] transition-colors"
                  >
                    <Printer size={14} />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-10 text-[var(--store-text-secondary)]">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ErpPagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        totalItems={filtered.length} 
        itemsPerPage={ITEMS_PER_PAGE} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
}
