"use client";

import { membershipReport } from '@/app/(erp)/sales/sales_utils/SalesSharedConstants';
import { useSalesContext } from '@/app/(erp)/sales/sales_context/SalesContext';
import ErpPagination from '@/app/(erp)/erp_components/ErpShared/ErpPagination';

export default function MembershipReport() {
  const { search, currentPage, setCurrentPage } = useSalesContext();
  
  const filtered = membershipReport.filter(r => 
    r.plan.toLowerCase().includes(search.toLowerCase())

  );

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
  <>
 <div className="overflow-x-auto">
 <table className="w-full">
 <thead className="bg-[var(--bg-input)]">
 <tr>
 {['Plan', 'Total Receivable', 'Amount Received', 'Remaining', 'Refund'].map(h => (
 <th key={h} className="text-left text-xs font-semibold text-[var(--sales-text-secondary)] uppercase tracking-wider px-4 py-3">
 {h}
 </th>
 ))}
 </tr>
 </thead>
  <tbody className="divide-y divide-[var(--sales-border)]">
  {paginated.map((r, i) => (
  <tr key={i} className="hover:bg-[var(--primary-subtle)] transition-colors">
  <td className="px-4 py-3 text-sm font-medium text-[var(--sales-text-primary)]">{r.plan}</td>
  <td className="px-4 py-3 text-sm text-[var(--sales-text-secondary)]">₹{r.receivable.toLocaleString()}</td>
  <td className="px-4 py-3 text-sm font-medium text-[var(--success)] dark:text-[var(--success)]">₹{r.received.toLocaleString()}</td>
  <td className="px-4 py-3 text-sm font-medium text-[var(--warning)] dark:text-[var(--warning)]">₹{r.remaining.toLocaleString()}</td>
  <td className="px-4 py-3 text-sm text-[var(--danger)]">₹{r.refund.toLocaleString()}</td>
  </tr>
  ))}
 <tr className="bg-[var(--bg-input)] font-semibold border-t-2 border-[var(--sales-border)]">
 <td className="px-4 py-3 text-sm text-[var(--sales-text-primary)]">Total</td>
 <td className="px-4 py-3 text-sm text-[var(--sales-text-primary)]">₹4,82,500</td>
 <td className="px-4 py-3 text-sm text-[var(--success)] dark:text-[var(--success)]">₹4,53,600</td>
 <td className="px-4 py-3 text-sm text-[var(--warning)] dark:text-[var(--warning)]">₹28,900</td>
 <td className="px-4 py-3 text-sm text-[var(--danger)] dark:text-[var(--danger)]">₹5,200</td>
 </tr>
  </tbody>
  </table>
  </div>
  {totalPages > 1 && (
    <div className="mt-4 pt-4 border-t border-[var(--sales-border)]">
      <ErpPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        colors={{
          text: 'var(--sales-text-secondary)',
          textActive: 'white',
          bgActive: 'var(--sales-highlight)',
          border: 'var(--sales-border)',
          hoverBg: 'var(--sales-highlight-subtle)'
        }}
      />
    </div>
  )}
  </>
  );
}
