// RESPONSIBILITY: Renders the Manager FinanceTable presentation layer for the Manager module.
'use client';
import { Printer } from 'lucide-react';
import { formatCurrency } from '@/app/manager/manager_layout/manager_utils/ManagerFormatCurrency';
import { displayValue, formatDate } from '@/lib/formatters';
import ManagerFinanceEmptyState from '@/app/manager/finance/finance_components/ManagerFinanceMain/ManagerFinanceEmptyState';
import { useManagerFinanceLogic } from '@/app/manager/finance/finance_hooks/ManagerUseManagerFinanceLogic';
import { PAYMENTS_TABLE_HEADERS } from '@/app/manager/finance/finance_utils/ManagerFinanceSharedConstants';
import ManagerPagination from '@/app/manager/manager_components/ManagerShared/ManagerPagination';
import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/manager/manager_infrastructure/ManagerPaginationDefaults';
import { useLocale } from "next-intl";

const METHOD_STYLES: Record<string, { bg: string; text: string }> = {
  UPI:        { bg: "bg-primary-subtle",   text: 'text-primary'   },
  Cash:       { bg: "bg-success-bg",   text: 'text-success'   },
  Card:       { bg: "bg-warning-bg",   text: 'text-warning'   },
  NetBanking: { bg: 'bg-input', text: 'text-secondary' } };

export default function ManagerFinanceTable() {
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
            {payments.length === 0 ? (
              <tr><td colSpan={PAYMENTS_TABLE_HEADERS.length}><ManagerFinanceEmptyState /></td></tr>
            ) : payments.map(p => {
              const ms = METHOD_STYLES[p.method] ?? { bg: 'bg-input', text: 'text-secondary' };
              return (
                <tr key={p.id} className="hover:bg-primary-subtle motion-safe:transition-colors">
                  <td className="px-5 py-3.5 text-sm font-bold text-primary whitespace-nowrap">{p.invoiceNumber}</td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <p className="text-sm font-semibold text-primary">{displayValue(p.member?.name)}</p>
                    <p className="text-xs text-secondary">{displayValue(p.member?.email)}</p>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-secondary whitespace-nowrap">{displayValue(p.member?.plan?.name)}</td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-success whitespace-nowrap">{formatCurrency(p.amount, ManagerEnvConfig.currencyCode, locale)}</td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${ms.bg} ${ms.text}`}>{p.method}</span>
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      p.status === 'PAID' ? 'bg-success-bg text-success' :
                      p.status === 'REFUNDED' ? 'bg-warning-bg text-warning' : 'bg-danger-bg text-danger'
                    }`}>{p.status}</span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-secondary whitespace-nowrap">
                    {formatDate(p.paidAt)}
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <button 
                      onClick={(event) => { event.stopPropagation(); printReceipt(p.id); }}
                      className="p-1.5 rounded-lg bg-input text-secondary hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-base" 
                      title="Print Receipt" aria-label={`Print receipt ${p.invoiceNumber}`}
                    >
                      <Printer size={18} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ManagerPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalPayments}
        itemsPerPage={MANAGER_ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
