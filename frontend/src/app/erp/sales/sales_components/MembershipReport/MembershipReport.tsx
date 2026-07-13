// RESPONSIBILITY: MembershipReport.tsx handles the logic and UI for its corresponding feature.
"use client";


import { useSalesContext } from '@/app/erp/sales/sales_context/SalesContext';
import ErpPagination from '@/app/erp/erp_components/ErpShared/ErpPagination';

export default function MembershipReport() {
  const { search, currentPage, setCurrentPage, membershipReport, membershipTotals, loading } = useSalesContext();
  
  const filtered = membershipReport.filter((r: any) => 
    (r.plan || '').toLowerCase().includes(search.toLowerCase())
  );

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="w-8 h-8 border-4 border-t-transparent border-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
  <>
 <div className="overflow-x-auto">
 <table className="w-full">
 <thead className="bg-input">
 <tr>
 {['Plan', 'Total Receivable', 'Amount Received', 'Remaining', 'Refund'].map(h => (
 <th key={h} className="text-left text-xs font-semibold text-secondary uppercase tracking-wider px-4 py-3">
 {h}
 </th>
 ))}
 </tr>
 </thead>
  <tbody className="divide-y divide-border">
  {paginated.map((r, i) => (
  <tr key={i} className="hover:bg-primary-subtle transition-colors">
  <td className="px-4 py-3 text-sm font-medium text-foreground">{r.plan || ''}</td>
  <td className="px-4 py-3 text-sm text-secondary">₹{(r.receivable || 0).toLocaleString()}</td>
  <td className="px-4 py-3 text-sm font-medium text-success dark:text-success">₹{(r.received || 0).toLocaleString()}</td>
  <td className="px-4 py-3 text-sm font-medium text-warning dark:text-warning">₹{(r.remaining || 0).toLocaleString()}</td>
  <td className="px-4 py-3 text-sm text-destructive">₹{(r.refund || 0).toLocaleString()}</td>
  </tr>
  ))}
 <tr className="bg-input font-semibold border-t-2 border-border">
 <td className="px-4 py-3 text-sm text-foreground">Total</td>
 <td className="px-4 py-3 text-sm text-foreground">₹{(membershipTotals.totalReceivable || 0).toLocaleString()}</td>
 <td className="px-4 py-3 text-sm text-success dark:text-success">₹{(membershipTotals.totalReceived || 0).toLocaleString()}</td>
 <td className="px-4 py-3 text-sm text-warning dark:text-warning">₹{(membershipTotals.remaining || 0).toLocaleString()}</td>
 <td className="px-4 py-3 text-sm text-destructive dark:text-destructive">₹{(membershipTotals.refunds || 0).toLocaleString()}</td>
 </tr>
  </tbody>
  </table>
  </div>
  {totalPages > 1 && (
    <div className="mt-4 pt-4 border-t border-border">
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
