"use client";
import { formatCurrency } from '@/lib/formatters';
// RESPONSIBILITY: Provides the implementation for AdminSalesMembershipReport.tsx functionality within its module.


import { useAdminSalesLogic } from '@/app/admin/sales/sales_context/useAdminSalesLogic';
import AdminPagination from '@/app/admin/admin_components/AdminShared/AdminPagination';
import { ChevronDown, ChevronUp, ChevronsUpDown, Loader2 } from 'lucide-react';
import type { AdminSalesMembershipSortKey } from '@/app/admin/sales/sales_types/AdminSalesUiTypes';
import type { AdminSortDirection } from '@/app/admin/admin_types/AdminSortTypes';
import { useMemo, useState } from 'react';
import { ADMIN_ITEMS_PER_PAGE } from '@/app/admin/admin_url_config';
import type { MembershipReportItem } from '@/app/admin/sales/sales_types/AdminSalesTypes';

export default function AdminSalesMembershipReport() {
  const { search, currentPage, setCurrentPage, membershipReport, membershipTotals, status } = useAdminSalesLogic();
  
  const [sortKey, setAdminSalesMembershipSortKey] = useState<AdminSalesMembershipSortKey>('receivable');
  const [sortDir, setSortDir] = useState<AdminSortDirection>('desc');
  const filtered = membershipReport.filter((r: MembershipReportItem) => 
    (r.plan || '').toLowerCase().includes(search.toLowerCase())
  );

  
  const sorted = useMemo(() => [...filtered].sort((a,b)=>{const av=a[sortKey],bv=b[sortKey]; const result=typeof av==='number'&&typeof bv==='number'?av-bv:String(av??'').localeCompare(String(bv??''),undefined,{numeric:true}); return sortDir==='asc'?result:-result;}), [filtered,sortKey,sortDir]);
  const handleSort=(key:AdminSalesMembershipSortKey)=>{if(sortKey===key)setSortDir(d=>d==='asc'?'desc':'asc');else{setAdminSalesMembershipSortKey(key);setSortDir('desc');}};
  const totalPages = Math.ceil(sorted.length / ADMIN_ITEMS_PER_PAGE) || 1;
  const paginated = sorted.slice((currentPage - 1) * ADMIN_ITEMS_PER_PAGE, currentPage * ADMIN_ITEMS_PER_PAGE);

  if (status === 'pending') {
    return (
      <div className="overflow-x-auto">
        <table data-admin-responsive-table className="w-full">
          <thead className="bg-input">
            <tr>
              {['Plan', 'Total Receivable', 'Amount Received', 'Remaining', 'Refund'].map((h,index) => { const keys: AdminSalesMembershipSortKey[]=['plan','receivable','received','remaining','refund']; const key=keys[index] as AdminSalesMembershipSortKey; return <th role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.currentTarget.click(); } }}  key={h} onClick={()=>handleSort(key)} className="text-left text-xs font-semibold text-secondary uppercase tracking-wider px-4 py-3 cursor-pointer select-none" aria-sort={sortKey===key?(sortDir==='asc'?'ascending':'descending'):'none'}><div className="flex items-center gap-1.5">{h}{sortKey===key?(sortDir==='asc'?<ChevronUp size={13} className="text-primary"/>:<ChevronDown size={13} className="text-primary"/>):<ChevronsUpDown size={13} className="text-disabled"/>}</div></th>; })}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {[...Array(5)].map((_, i) => (
              <tr key={`skeleton-${i}`} className="motion-safe:animate-pulse bg-card">
                <td className="px-4 py-4"><div className="h-4 bg-muted rounded w-24"></div></td>
                <td className="px-4 py-4"><div className="h-4 bg-muted rounded w-20"></div></td>
                <td className="px-4 py-4"><div className="h-4 bg-muted rounded w-20"></div></td>
                <td className="px-4 py-4"><div className="h-4 bg-muted rounded w-20"></div></td>
                <td className="px-4 py-4"><div className="h-4 bg-muted rounded w-16"></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="text-center py-16 bg-card rounded-2xl border border-danger/30">
        <p className="text-danger font-medium">Failed to load membership report.</p>
        <p className="text-sm mt-1 text-secondary">Please check your connection and try again.</p>
      </div>
    );
  }

  return (
  <>
 <div className="overflow-x-auto">
 <table data-admin-responsive-table className="w-full">
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
  {paginated.map((r) => (
  <tr key={r.plan} className="hover:bg-primary-subtle motion-safe:transition-colors">
  <td className="px-4 py-3 text-sm font-medium text-foreground">{r.plan || ''}</td>
  <td className="px-4 py-3 text-sm text-secondary">{formatCurrency(r.receivable || 0)}</td>
  <td className="px-4 py-3 text-sm font-medium text-success dark:text-success">{formatCurrency(r.received || 0)}</td>
  <td className="px-4 py-3 text-sm font-medium text-warning dark:text-warning">{formatCurrency(r.remaining || 0)}</td>
  <td className="px-4 py-3 text-sm text-danger">{formatCurrency(r.refund || 0)}</td>
  </tr>
  ))}
 <tr className="bg-input font-semibold border-t-2 border-border">
 <td className="px-4 py-3 text-sm text-foreground">Total</td>
 <td className="px-4 py-3 text-sm text-foreground">{formatCurrency(membershipTotals.totalReceivable || 0)}</td>
 <td className="px-4 py-3 text-sm text-success dark:text-success">{formatCurrency(membershipTotals.totalReceived || 0)}</td>
 <td className="px-4 py-3 text-sm text-warning dark:text-warning">{formatCurrency(membershipTotals.remaining || 0)}</td>
 <td className="px-4 py-3 text-sm text-danger dark:text-danger">{formatCurrency(membershipTotals.refunds || 0)}</td>
 </tr>
  </tbody>
  </table>
  </div>
  <div className="mt-4 pt-4 border-t border-border">
      <AdminPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  </>
  );
}
