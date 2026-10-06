// RESPONSIBILITY: Renders ManagerStoreOrderTable's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { Printer, MessageCircle } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import ManagerPagination from '@/components/ui/manager_pagination/ManagerPagination';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig';
import { GYM_DETAILS } from '@/app/frontend_manager/manager_infrastructure/ManagerGymIdentity';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/frontend_manager/manager_infrastructure/ManagerPaginationDefaults';
import { useManagerStoreLogic } from '@/app/frontend_manager/manager_store/manager_store_hooks/useManagerStoreLogic';
import { ManagerStoreUrlConfig } from '@/app/frontend_manager/manager_store/manager_store_url_config';
import { ManagerStoreFormatCurrency, ManagerStoreFormatDate } from '@/app/frontend_manager/manager_store/manager_store_utils/ManagerStoreFormatters';
import type { Order } from '@/app/frontend_manager/manager_store/manager_store_types/ManagerStoreTypes';


/**
 * @description Renders/orchestrates the ManagerStoreOrderTable user interface for the store module without owning sibling business logic.
 * @dependencies @/app/frontend_manager/manager_store/manager_store_utils/ManagerStoreFormatters; @/components/ui/manager_pagination/ManagerPagination; @/app/frontend_manager/manager_infrastructure/ManagerEnvConfig; @/app/frontend_manager/manager_infrastructure/ManagerGymIdentity; @/app/frontend_manager/manager_infrastructure/ManagerPaginationDefaults
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const STORE_ORDER_COLUMN_COUNT = 6;

/** @description Renders the ManagerStoreOrderTable component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (9 documented module/import dependencies).. @edge-case Preserves error state. */
export default function ManagerStoreOrderTable() {
  const t = useTranslations('MANAGER_STORE');
  const locale = useLocale();

  const { 
    orders, totalOrders, isPending, isError, errorMessage, currentPage, setCurrentPage, setPrintData
  } = useManagerStoreLogic();

  const handlePrint = (o: Order) => {
    setPrintData({ 
      gymName: GYM_DETAILS.name, 
      gymPhone: GYM_DETAILS.phone, 
      receiptNo: `ORD-${o.id}`, 
      date: ManagerStoreFormatDate(o.createdAt), 
      customerName: 'Customer', 
      items: (o.items || []).map((i) => ({ 
        name: (() => { if (i.product?.name) { return (i.product?.unit ? `${i.product.name} (${i.product.unit})` : i.product.name); } return ''; })(), 
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
      const name = (() => { if (i.product?.name) { return (i.product?.unit ? `${i.product.name} (${i.product.unit})` : i.product.name); } return ''; })();
      return `- ${name}\n  ${i.qty} x ${ManagerStoreFormatCurrency(i.price, ManagerEnvConfig.currencyCode, locale)} = ${ManagerStoreFormatCurrency(i.qty * i.price, ManagerEnvConfig.currencyCode, locale)}`;
    }).join('\n');

    const text = `*${GYM_DETAILS.name.toUpperCase()}*\nPh: ${GYM_DETAILS.phone}\n\n*PAYMENT RECEIPT*\nReceipt No: ORD-${o.id}\nDate: ${ManagerStoreFormatDate(o.createdAt)}\n\n*ITEMS:*\n${itemsText}\n\n*TOTAL: ${ManagerStoreFormatCurrency(o.total, ManagerEnvConfig.currencyCode, locale)}*\nPaid via: ${o.method}\n\nThank You!`;
    const url = `${ManagerStoreUrlConfig.INTEGRATIONS.WHATSAPP_WEB_BASE}/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  
  const totalPages = Math.ceil(totalOrders / MANAGER_ITEMS_PER_PAGE);

  if (isPending) {
    return (
      <div className="motion-safe:animate-pulse bg-card rounded-xl border border-border mt-4 motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
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
      <div className="text-center py-16 bg-card rounded-2xl border border-danger mt-4 motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
        <p className="text-danger font-medium">{errorMessage || t("TEXT_GENERIC_ERROR")}</p>
        <span className="text-sm text-secondary">{t("COPY_RETRY_REQUEST_2")}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-96">

      <div className="overflow-x-auto flex-1 bg-card rounded-xl border border-border motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
        <table className="w-full">
          <thead className="bg-input">
            <tr>
              {[t('COPY_ORDER_ID'), t('COPY_TOTAL_1'), t('COPY_METHOD'), t('COPY_STATUS'), t('COPY_DATE_2'), t('COPY_RECEIPT')].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-secondary uppercase tracking-wider px-4 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders.map((o, mapIndex) => (
              <tr
                data-testid={`manager_store-store-managerstoreordertable-row-${o.id}`}
                key={o.id} 
                className="hover:bg-primary-subtle motion-safe:transition-all cursor-pointer motion-safe:duration-base ease-in-out"
                tabIndex={0}
                role="button"
                aria-label={t("TEXT_OPEN_ORDER", { value: `ORD-${o.id}` })}
                onClick={() => handlePrint(o)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    handlePrint(o);
                  }
                }}
              >
                <td className="px-4 py-3 text-sm font-mono text-primary">{t("COPY_ORD")}{String(o.id).padStart(4, '0')}
                </td>
                <td className="px-4 py-3 text-sm font-bold text-success ">
                  {ManagerStoreFormatCurrency(o.total, ManagerEnvConfig.currencyCode, locale)}
                </td>
                <td className="px-4 py-3 text-sm text-primary">
                  {o.method}
                </td>
                <td className="px-4 py-3">
                  <span data-testid={`manager_store-store-managerstoreordertable-status-primary-${mapIndex}`} className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-success text-on-success ">
                    {o.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-secondary">
                  {ManagerStoreFormatDate(o.createdAt)}
                </td>
                <td className="px-4 py-3 flex items-center gap-2">
                  <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "p-1.5 rounded-lg bg-success text-on-success hover:bg-success motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_store-store-managerstoreordertable-button-whatsapp-receipt-${mapIndex}`} 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWhatsApp(o);
                    }}
                    
                    aria-label={t("TEXT_WHATSAPP_RECEIPT_ORDER", { value: `ORD-${o.id}` })}
                    title={t("COPY_SEND_VIA_WHATSAPP")}
                  >
                    <MessageCircle size={18} strokeWidth={2}/>
                  </button>
                  <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "p-1.5 rounded-lg bg-input text-secondary hover:text-primary motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_store-store-managerstoreordertable-button-print-receipt-${mapIndex}`} 
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrint(o);
                    }}
                    
                    aria-label={t("TEXT_PRINT_RECEIPT_ORDER", { value: `ORD-${o.id}` })}
                    title={t("COPY_PRINT_RECEIPT")}
                  >
                    <Printer size={18} strokeWidth={2}/>
                  </button>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={STORE_ORDER_COLUMN_COUNT} className="text-center py-10 text-secondary">{t("COPY_NO_ORDERS_FOUND")}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ManagerPagination data-testid="manager_store-managerstoreordertable-managerpagination-1" 
        currentPage={currentPage} 
        totalPages={totalPages} 
        totalItems={totalOrders} 
        itemsPerPage={MANAGER_ITEMS_PER_PAGE} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
}
