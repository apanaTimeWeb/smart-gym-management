"use client";
// RESPONSIBILITY: Renders the Sales module's store-order summary and paginated order list; it owns only presentation and row expansion state.
// DATA FLOW: Store Sales UI → useAdminSalesLogic → AdminSalesApi → module-owned MSW/backend → TanStack Query → visible list/summary.
import { useState } from 'react';
import { Package, ShoppingCart, IndianRupee, TrendingUp, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters';
import { useAdminSalesLogic } from '@/app/admin/sales/sales_context/useAdminSalesLogic';
import AdminSalesEmptyState from '@/app/admin/sales/sales_components/AdminSalesEmptyState/AdminSalesEmptyState';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function getPaymentClasses(method: string): string {
  switch (method) {
    case 'Cash': return 'bg-success text-success';
    case 'UPI': return 'bg-info text-info';
    case 'Card': return 'bg-warning text-warning';
    default: return 'bg-input text-secondary';
  }
}

export default function AdminSalesStoreSales() {
  const { storeOrders, storeOrdersTotal, storeSummary, storeStatus, storeError, setCurrentPage, currentPage, loadAll } = useAdminSalesLogic();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const totalPages = Math.max(1, Math.ceil(storeOrdersTotal / 10));

  if (storeStatus === 'pending') {
    return (
      <div className="space-y-4" aria-label="Loading store sales" aria-busy="true">
        {['store-skeleton-1', 'store-skeleton-2', 'store-skeleton-3', 'store-skeleton-4'].map((key) => <div key={key} className="h-14 bg-skeleton-base rounded-lg motion-safe:animate-pulse motion-safe:duration-base" />)}
      </div>
    );
  }

  if (storeStatus === 'error') {
    return (
      <div role="alert" className="rounded-xl border border-danger bg-danger p-5 flex items-center justify-between gap-4">
        <p className="text-sm text-danger">{storeError || 'Store sales could not be loaded.'}</p>
        <button type="button" onClick={() => void loadAll()} className="min-h-11 inline-flex items-center gap-2 px-4 rounded-md border border-danger text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger">
          <RefreshCw size={16} aria-hidden="true" /> Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {storeSummary && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-card rounded-lg p-4 border border-border shadow-card"><div className="flex items-center gap-2 text-secondary text-xs font-medium mb-2"><Package size={14} aria-hidden="true" /> Total Products</div><div className="text-2xl font-bold text-primary">{storeSummary.totalProducts}</div></div>
          <div className="bg-card rounded-lg p-4 border border-border shadow-card"><div className="flex items-center gap-2 text-secondary text-xs font-medium mb-2"><ShoppingCart size={14} aria-hidden="true" /> Total Orders</div><div className="text-2xl font-bold text-primary">{storeSummary.totalOrders}</div></div>
          <div className="bg-card rounded-lg p-4 border border-border shadow-card sm:col-span-2"><div className="flex items-center gap-2 text-secondary text-xs font-medium mb-2"><IndianRupee size={14} aria-hidden="true" /> Total Store Revenue</div><div className="text-2xl font-bold text-primary">{formatCurrency(storeSummary.totalRevenue)}</div></div>
        </div>
      )}

      <section aria-labelledby="store-orders-heading">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <h3 id="store-orders-heading" className="font-semibold text-primary flex items-center gap-2"><TrendingUp size={16} className="text-primary" aria-hidden="true" /> Recent Store Orders</h3>
          <span className="text-xs text-secondary">{storeOrdersTotal} total orders</span>
        </div>

        {storeOrders.length === 0 ? (
          <AdminSalesEmptyState message="No store orders found" subtext="No store orders match the current Sales scope." />
        ) : (
          <div className="space-y-2">
            {storeOrders.map((order) => (
              <article key={order.id} className="bg-card border border-border rounded-lg overflow-hidden shadow-card">
                <button
                  type="button"
                  onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  className="w-full min-h-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 text-left hover:bg-surface-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset motion-safe:duration-base"
                  aria-expanded={expandedOrder === order.id}
                  aria-controls={`store-order-${order.id}`}
                >
                  <span className="flex items-center gap-4 min-w-0">
                    <span className="w-9 h-9 rounded-lg bg-primary-subtle flex items-center justify-center shrink-0"><ShoppingCart size={16} className="text-primary" aria-hidden="true" /></span>
                    <span className="min-w-0"><span className="block font-medium text-primary text-sm truncate">Order #{order.id.toUpperCase()}</span><span className="block text-xs text-secondary">{formatDate(order.createdAt)}</span></span>
                  </span>
                  <span className="flex items-center gap-3 sm:gap-4 justify-end"><span className={`text-xs font-bold px-2.5 py-1 rounded-full ${getPaymentClasses(order.method)}`}>{order.method}</span><span className="font-bold text-primary">{formatCurrency(order.total)}</span>{expandedOrder === order.id ? <ChevronUp size={16} className="text-secondary" aria-hidden="true" /> : <ChevronDown size={16} className="text-secondary" aria-hidden="true" />}</span>
                </button>

                {expandedOrder === order.id && (
                  <div id={`store-order-${order.id}`} className="border-t border-border bg-input px-4 py-3">
                    <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2">Items</p>
                    <div className="space-y-1.5">
                      {(order.items ?? []).map((item) => <div key={item.id} className="flex items-center justify-between gap-4 text-sm"><span className="text-primary min-w-0 truncate">{item.product.name} <span className="text-secondary">× {item.qty}</span></span><span className="text-secondary font-medium shrink-0">{formatCurrency(item.price * item.qty)}</span></div>)}
                    </div>
                    <div className="flex justify-between mt-3 pt-2 border-t border-border"><span className="text-sm font-semibold text-primary">Total</span><span className="text-sm font-bold text-primary">{formatCurrency(order.total)}</span></div>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}

        {storeOrders.length > 0 && totalPages > 1 && (
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
            <span className="text-sm text-secondary">Showing {(currentPage - 1) * 10 + 1}–{Math.min(currentPage * 10, storeOrdersTotal)} of {storeOrdersTotal}</span>
            <div className="flex gap-2">
              <button type="button" disabled={currentPage <= 1} onClick={() => setCurrentPage(currentPage - 1)} className="min-h-11 px-4 rounded-md border border-border text-primary disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Previous</button>
              <button type="button" disabled={currentPage >= totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="min-h-11 px-4 rounded-md border border-border text-primary disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Next</button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
