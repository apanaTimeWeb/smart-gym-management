// RESPONSIBILITY: OrderTable.tsx handles the logic and UI for its corresponding feature.
"use client";

import { Printer } from 'lucide-react';
import { useStoreContext } from '@/app/erp/store/store_context/StoreContext';
import { formatCurrency } from '@/app/erp/store/store_utils/StoreSharedConstants';
import { GYM_DETAILS } from '@/app/erp/erp_utils/ErpSharedConstants';
import { SearchableDropdown } from '@/app/erp/erp_components/ErpShared/SearchableDropdown';

import ErpPagination from '@/app/erp/erp_components/ErpShared/ErpPagination';

export default function OrderTable() {
  const { 
    orders, totalOrders, loading, currentPage, setCurrentPage, setPrintData,
    startDate, setStartDate, endDate, setEndDate, sortOrder, setSortOrder
  } = useStoreContext();

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(totalOrders / ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="w-8 h-8 border-4 border-warning border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-[400px]">
      {/* Filter and Sort Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card p-4 rounded-xl border border-border mb-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex flex-col">
            <label className="text-[10px] text-secondary uppercase font-semibold mb-1">Start Date</label>
            <input 
              type="date" 
              value={startDate} 
              onChange={e => setStartDate(e.target.value)} 
              className="text-sm px-3 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[10px] text-secondary uppercase font-semibold mb-1">End Date</label>
            <input 
              type="date" 
              value={endDate} 
              onChange={e => setEndDate(e.target.value)} 
              className="text-sm px-3 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
        <div className="flex flex-col w-full sm:w-auto">
          <label className="text-[10px] text-secondary uppercase font-semibold mb-1">Sort By Date</label>
          <SearchableDropdown
            value={sortOrder}
            onChange={(val) => setSortOrder(String(val) as 'ASC' | 'DESC')}
            options={[
              { label: 'Newest First', value: 'DESC' },
              { label: 'Oldest First', value: 'ASC' }
            ]}
          />
        </div>
      </div>

      <div className="overflow-x-auto flex-1 bg-card rounded-xl border border-border">
        <table className="w-full">
          <thead className="bg-input">
            <tr>
              {['Order ID', 'Total', 'Method', 'Status', 'Date', 'Receipt'].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-secondary uppercase tracking-wider px-4 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders.map(o => (
              <tr 
                key={o.id} 
                className="hover:bg-primary-subtle transition-colors cursor-pointer"
                onClick={() => {
                  setPrintData({ 
                    gymName: GYM_DETAILS.name, 
                    gymPhone: GYM_DETAILS.phone, 
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
              >
                <td className="px-4 py-3 text-sm font-mono text-foreground">
                  ORD-{String(o.id).padStart(4, '0')}
                </td>
                <td className="px-4 py-3 text-sm font-bold text-success dark:text-success">
                  {formatCurrency(o.total)}
                </td>
                <td className="px-4 py-3 text-sm text-foreground">
                  {o.method}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-success-bg text-success dark:bg-success-bg dark:text-success">
                    {o.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-secondary">
                  {new Date(o.createdAt).toLocaleDateString('en-IN')}
                </td>
                <td className="px-4 py-3">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setPrintData({ 
                        gymName: GYM_DETAILS.name, 
                        gymPhone: GYM_DETAILS.phone, 
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
                    className="p-1.5 rounded-lg bg-input text-secondary hover:text-foreground transition-colors"
                    aria-label={`Print Receipt ORD-${o.id}`}
                  >
                    <Printer size={14} />
                  </button>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-10 text-secondary">
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
        totalItems={totalOrders} 
        itemsPerPage={ITEMS_PER_PAGE} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
}
