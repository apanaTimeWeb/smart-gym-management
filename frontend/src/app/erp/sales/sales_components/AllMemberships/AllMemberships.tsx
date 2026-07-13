// RESPONSIBILITY: Provides the implementation for AllMemberships.tsx functionality within its module.
"use client";

import { useState } from 'react';

import { useSalesContext } from '@/app/erp/sales/sales_context/SalesContext';
import ErpPagination from '@/app/erp/erp_components/ErpShared/ErpPagination';
import { Loader2 } from 'lucide-react';
import { ERP_ITEMS_PER_PAGE } from '@/app/erp/erp_utils/ErpSharedConstants';

export default function AllMemberships() {
  const [filter, setFilter] = useState('All');
  const { currentPage, setCurrentPage, allMemberships, allMembershipsTotal, fetchState } = useSalesContext();
  
  
  const totalPages = Math.ceil(allMembershipsTotal / ERP_ITEMS_PER_PAGE) || 1;

  if (fetchState === 'loading') {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

 return (
 <div>
 <div className="flex flex-wrap gap-2 mb-4">
 {['All', 'Active', 'Expiring Soon', 'Expired'].map(f => (
 <button 
 key={f} 
 onClick={() => setFilter(f)}
 className={`px-3 py-1.5 text-xs rounded-full font-medium border transition-colors ${
  f === filter 
  ? 'bg-primary text-primary-foreground border-transparent' 
  : 'border-border text-secondary hover:text-foreground'
 }`}
 >
 {f}
 </button>
 ))}
 </div>
 <div className="overflow-x-auto">
 <table className="w-full">
 <thead className="bg-input">
 <tr>
 {['Member', 'Plan', 'Start', 'End Date', 'Status', 'Amount', 'Days Left'].map(h => (
 <th key={h} className="text-left text-xs font-semibold text-secondary uppercase tracking-wider px-4 py-3">
 {h}
 </th>
 ))}
 </tr>
 </thead>
 <tbody className="divide-y divide-border">
        {allMemberships.map((r: any, i: number) => (
          <tr key={i} className="hover:bg-primary-subtle transition-colors">
            <td className="px-4 py-3 text-sm font-medium text-foreground">{r.name}</td>
            <td className="px-4 py-3 text-sm text-secondary">{r.plan}</td>
            <td className="px-4 py-3 text-sm text-secondary">{new Date(r.joinDate).toLocaleDateString()}</td>
            <td className="px-4 py-3 text-sm text-secondary">{new Date(r.expiryDate).toLocaleDateString()}</td>
            <td className="px-4 py-3">
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                r.status === 'ACTIVE' 
                ? 'bg-success-bg text-success dark:bg-success-bg dark:text-success' 
                : 'bg-danger-bg text-destructive dark:bg-danger-bg dark:text-destructive'
              }`}>
                {r.status}
              </span>
            </td>
            <td className="px-4 py-3 text-sm font-medium text-foreground">₹{r.paidAmount?.toLocaleString() || 0}</td>
            <td className="px-4 py-3 text-sm font-medium" style={{ 
              color: r.daysLeft === 0 ? '#ef4444' : r.daysLeft <= 7 ? '#ef4444' : r.daysLeft <= 30 ? '#f59e0b' : '#22c55e' 
            }}>
              {r.daysLeft === 0 ? 'Expired' : `${r.daysLeft} days`}
            </td>
          </tr>
        ))}
        {allMemberships.length === 0 && (
          <tr>
            <td colSpan={7} className="text-center py-8 text-secondary">
              No memberships found.
            </td>
          </tr>
        )}
 </tbody>
      </table>
      </div>
      {totalPages > 1 && (
        <div className="mt-4 pt-4 border-t border-border">
          <ErpPagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
