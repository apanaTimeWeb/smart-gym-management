// RESPONSIBILITY: Renders the store order table and its feature-owned actions.
'use client';
import{ Printer, MessageCircle } from 'lucide-react';
import { formatCurrencyFromMinorUnits, displayValue , formatDate} from '@/lib/formatters';
import ManagerPagination from '@/app/manager/manager_components/ManagerShared/ManagerPagination';
import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';
import { MANAGER_GENERIC_ERROR_MESSAGE } from '@/app/manager/manager_infrastructure/ManagerErrorMessage';
import { GYM_DETAILS } from '@/app/manager/manager_infrastructure/ManagerGymIdentity';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/manager/manager_infrastructure/ManagerPaginationDefaults';
import { useManagerStoreLogic } from '@/app/manager/store/store_hooks/ManagerUseManagerStoreLogic';
import { ManagerStoreUrlConfig } from '@/app/manager/store/store_url_config';
import type { Order } from '@/app/manager/store/store_types/ManagerStoreTypes';


const STORE_ORDER_COLUMN_COUNT = 6;

export default function ManagerStoreOrderTable() {
  const { 
    orders, totalOrders, isPending, isError, errorMessage, currentPage, setCurrentPage, setPrintData
  } = useManagerStoreLogic();

  const handlePrint = (o: Order) => {
    setPrintData({ 
      gymName: GYM_DETAILS.name, 
      gymPhone: GYM_DETAILS.phone, 
      receiptNo: `ORD-${o.id}`, 
      date: formatDate(o.createdAt), 
      customerName: 'Customer', 
      items: (o.items || []).map((i) => ({ 
        name: i.product?.name ? (i.product?.unit ? `${i.product.name} (${i.product.unit})` : i.product.name) : '', 
        price: i.price, 
        amount: i.price * i.qty 
      })), 
      total: o.total, 
      paymentMethod: o.method 
    });
    setTimeout(() => window.print(), 100);
  };

  const handleWhatsApp = (o: Order) => {
    const itemsText = (o.items || []).map(i => {
      const name = i.product?.name ? (i.product?.unit ? `${i.product.name} (${i.product.unit})` : i.product.name) : '';
      return `- ${name}\n  ${i.qty} x ${formatCurrencyFromMinorUnits(i.price, ManagerEnvConfig.currencyCode)} = ${formatCurrencyFromMinorUnits(i.qty * i.price, ManagerEnvConfig.currencyCode)}`;
    }).join('\n');

    const text = `*${GYM_DETAILS.name.toUpperCase()}*\nPh: ${GYM_DETAILS.phone}\n\n*PAYMENT RECEIPT*\nReceipt No: ORD-${o.id}\nDate: ${formatDate(o.createdAt)}\n\n*ITEMS:*\n${itemsText}\n\n*TOTAL: ${formatCurrencyFromMinorUnits(o.total, ManagerEnvConfig.currencyCode)}*\nPaid via: ${o.method}\n\nThank You!`;
    const url = `${ManagerStoreUrlConfig.INTEGRATIONS.WHATSAPP_WEB_BASE}/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  
  const totalPages = Math.ceil(totalOrders / MANAGER_ITEMS_PER_PAGE);

  if (isPending) {
    return (
      <div className="motion-safe:animate-pulse bg-card rounded-xl border border-border mt-4">
        {[...Array(5)].map((_, i) => (
          <div key={`skeleton-${i}`} className="h-16 border-b border-border flex items-center px-4 gap-4">
            <div className="h-4 bg-input rounded w-16"></div>
            <div className="h-4 bg-input rounded w-24"></div>
            <div className="h-4 bg-input rounded w-20"></div>
            <div className="h-6 bg-input rounded-full w-20"></div>
            <div className="h-6 bg-input rounded-full w-20"></div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-16 bg-card rounded-2xl border border-danger mt-4">
        <p className="text-danger font-medium">{errorMessage || MANAGER_GENERIC_ERROR_MESSAGE}</p>
        <span className="text-sm text-secondary">Retry the request.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-96">

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
                className="hover:bg-primary-subtle motion-safe:transition-colors cursor-pointer"
                tabIndex={0}
                role="button"
                aria-label={`Open order ORD-${o.id}`}
                onClick={() => handlePrint(o)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    handlePrint(o);
                  }
                }}
              >
                <td className="px-4 py-3 text-sm font-mono text-primary">
                  ORD-{String(o.id).padStart(4, '0')}
                </td>
                <td className="px-4 py-3 text-sm font-bold text-success dark:text-success">
                  {formatCurrencyFromMinorUnits(o.total, ManagerEnvConfig.currencyCode)}
                </td>
                <td className="px-4 py-3 text-sm text-primary">
                  {o.method}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-success text-on-success dark:bg-success-bg dark:text-success">
                    {o.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-secondary">
                  {formatDate(o.createdAt)}
                </td>
                <td className="px-4 py-3 flex items-center gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWhatsApp(o);
                    }}
                    className="p-1.5 rounded-lg bg-success text-on-success hover:bg-success motion-safe:transition-colors"
                    aria-label={`WhatsApp Receipt ORD-${o.id}`}
                    title="Send via WhatsApp"
                  >
                    <MessageCircle size={18} />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrint(o);
                    }}
                    className="p-1.5 rounded-lg bg-input text-secondary hover:text-primary motion-safe:transition-colors"
                    aria-label={`Print Receipt ORD-${o.id}`}
                    title="Print Receipt"
                  >
                    <Printer size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={STORE_ORDER_COLUMN_COUNT} className="text-center py-10 text-secondary">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ManagerPagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        totalItems={totalOrders} 
        itemsPerPage={MANAGER_ITEMS_PER_PAGE} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
}
