import { formatDate } from '@/lib/formatters';
import React from 'react';
import { Printer } from 'lucide-react';
import ManagerPagination from '@/app/manager/manager_components/ManagerShared/ManagerPagination';
import { useFinanceContext } from '@/app/manager/finance/finance_context/ManagerFinanceContext';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/manager/manager_utils/ManagerSharedConstants';

const fmt = (v: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);

const METHOD_STYLES: Record<string, { bg: string; text: string }> = {
  UPI:        { bg: 'bg-primary/10',   text: 'text-primary'   },
  Cash:       { bg: 'bg-success/10',   text: 'text-success'   },
  Card:       { bg: 'bg-warning/10',   text: 'text-warning'   },
  NetBanking: { bg: 'bg-secondary/10', text: 'text-secondary' },
};

export default function ManagerFinanceTable() {
  const { payments, totalPayments, currentPage, setCurrentPage, printReceipt } = useFinanceContext();
  const totalPages = Math.ceil(totalPayments / MANAGER_ITEMS_PER_PAGE);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-primary/5">
            <tr>
              {['Invoice #', 'Member', 'Plan', 'Amount', 'Method', 'Status', 'Date', 'Actions'].map(h => (
                <th key={`th-${h}`} className="text-left text-xs font-semibold text-secondary uppercase tracking-wider px-5 py-3 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {payments.map(p => {
              const ms = METHOD_STYLES[p.method] ?? { bg: 'bg-input', text: 'text-secondary' };
              return (
                <tr key={p.id} className="hover:bg-primary/5 motion-safe:transition-colors">
                  <td className="px-5 py-3.5 text-sm font-bold text-primary whitespace-nowrap">{p.invoiceNumber}</td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <p className="text-sm font-semibold text-foreground">{p.member?.name ?? '—'}</p>
                    <p className="text-xs text-secondary">{p.member?.email ?? ''}</p>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-secondary whitespace-nowrap">{p.member?.plan?.name ?? '—'}</td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-success whitespace-nowrap">{fmt(p.amount)}</td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${ms.bg} ${ms.text}`}>{p.method}</span>
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      p.status === 'PAID' ? 'bg-success/10 text-success' :
                      p.status === 'REFUNDED' ? 'bg-warning/10 text-warning' : 'bg-danger/10 text-danger'
                    }`}>{p.status}</span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-secondary whitespace-nowrap">
                    {formatDate(p.paidAt)}
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <button 
                      onClick={() => printReceipt(p.id)}
                      className="p-1.5 rounded-lg bg-input text-secondary hover:bg-primary-subtle transition-all duration-200" 
                      title="Print Receipt"
                    >
                      <Printer size={14} />
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
