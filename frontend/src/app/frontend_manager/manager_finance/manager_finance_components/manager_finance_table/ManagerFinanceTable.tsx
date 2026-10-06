// RESPONSIBILITY: Renders ManagerFinanceTable's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { Printer } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import ManagerPagination from '@/components/ui/manager_pagination/ManagerPagination';
import ManagerFinanceEmptyState from '@/app/frontend_manager/manager_finance/manager_finance_components/manager_finance_empty_state/ManagerFinanceEmptyState';
import { MANAGER_FINANCE_PAYMENT_STATUS_PAID, MANAGER_FINANCE_PAYMENT_STATUS_REFUNDED } from '@/app/frontend_manager/manager_finance/manager_finance_constants/ManagerFinanceConstants';
import { PAYMENTS_TABLE_HEADERS } from '@/app/frontend_manager/manager_finance/manager_finance_constants/ManagerFinanceSharedConstants';
import { useManagerFinanceLogic } from '@/app/frontend_manager/manager_finance/manager_finance_hooks/useManagerFinanceLogic';
import { ManagerFinanceDisplayValue, ManagerFinanceFormatCurrency, ManagerFinanceFormatDate } from '@/app/frontend_manager/manager_finance/manager_finance_utils/ManagerFinanceFormatters';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/frontend_manager/manager_infrastructure/ManagerPaginationDefaults';
import { MANAGER_FINANCE_METHOD_STYLES } from '@/app/frontend_manager/manager_finance/manager_finance_constants/ManagerFinanceSharedConstants';


/**
 * @description Renders/orchestrates the ManagerFinanceTable user interface for the finance module without owning sibling business logic.
 * @dependencies @/app/frontend_manager/manager_finance/manager_finance_utils/ManagerFinanceFormatters; @/app/frontend_manager/manager_finance/manager_finance_components/manager_finance_empty_state/ManagerFinanceEmptyState; @/app/frontend_manager/manager_finance/manager_finance_hooks/useManagerFinanceLogic; @/app/frontend_manager/manager_finance/manager_finance_constants/ManagerFinanceSharedConstants; @/components/ui/manager_pagination/ManagerPagination
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */

/** @description Renders the ManagerFinanceTable component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (7 documented module/import dependencies).. @edge-case Preserves empty state. */
export default function ManagerFinanceTable() {
  const t = useTranslations('MANAGER_FINANCE');
  const locale = useLocale();

  const { payments, totalPayments, currentPage, setCurrentPage, printReceipt } = useManagerFinanceLogic();
  const totalPages = Math.ceil(totalPayments / MANAGER_ITEMS_PER_PAGE);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-primary-subtle">
            <tr>
              {PAYMENTS_TABLE_HEADERS.map(h => (
                <th key={`th-${h}`} className="text-left text-xs font-semibold text-secondary uppercase tracking-wider px-5 py-3 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {(() => { if (payments.length === 0) { return (
              <tr><td colSpan={PAYMENTS_TABLE_HEADERS.length}><ManagerFinanceEmptyState /></td></tr>
            ); } return payments.map((p, mapIndex) => {
              const ms = MANAGER_FINANCE_METHOD_STYLES[p.method] ?? { bg: 'bg-input', text: 'text-secondary' };
              return (
                <tr key={p.id} className="hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-base ease-in-out">
                  <td className="px-5 py-3.5 text-sm font-bold text-primary whitespace-nowrap">{p.invoiceNumber}</td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <p className="text-sm font-semibold text-primary">{ManagerFinanceDisplayValue(p.member?.name)}</p>
                    <p className="text-xs text-secondary">{ManagerFinanceDisplayValue(p.member?.email)}</p>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-secondary whitespace-nowrap">{ManagerFinanceDisplayValue(p.member?.plan?.name)}</td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-success whitespace-nowrap">{ManagerFinanceFormatCurrency(p.amount, ManagerEnvConfig.currencyCode, locale)}</td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${ms.bg} ${ms.text}`}>{p.method}</span>
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      (() => { if (p.status === MANAGER_FINANCE_PAYMENT_STATUS_PAID) return 'bg-success-bg text-success'; return (() => { if (p.status === MANAGER_FINANCE_PAYMENT_STATUS_REFUNDED) return 'bg-warning-bg text-warning'; return 'bg-danger-bg text-danger'; })(); })()
                    }`} data-testid="manager_finance-managerfinancetable-status-badge-1">{p.status}</span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-secondary whitespace-nowrap">
                    {ManagerFinanceFormatDate(p.paidAt)}
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "p-1.5 rounded-lg bg-input text-secondary hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_finance-finance-managerfinancetable-button-print-receipt-${mapIndex}`} 
                      onClick={(event) => { event.stopPropagation(); printReceipt(p.id); }}
                       
                      title={t("COPY_PRINT_RECEIPT")} aria-label={t("TEXT_PRINT_RECEIPT_FOR_INVOICE", { value: p.invoiceNumber })}
                    >
                      <Printer size={18} strokeWidth={2}/>
                    </button>
                  </td>
                </tr>
              );
            }); })()}
          </tbody>
        </table>
      </div>
      <ManagerPagination data-testid="manager_finance-managerfinancetable-managerpagination-1"
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalPayments}
        itemsPerPage={MANAGER_ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
