"use client";

import { useState } from 'react';
import { allMemberships } from '../../sales_utils/SalesSharedConstants';
import { useSalesContext } from '../../sales_context/SalesContext';
import ErpPagination from '../../../erp_components/ErpPagination';

export default function AllMemberships() {
  const [filter, setFilter] = useState('All');
  const { search, currentPage, setCurrentPage } = useSalesContext();
  
  const filtered = allMemberships.filter(r => {
    const matchFilter = filter === 'All' ? true : r.status === filter || (filter === 'Expiring Soon' && r.days > 0 && r.days <= 30);
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.plan.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

 return (
 <div>
 <div className="flex flex-wrap gap-2 mb-4">
 {['All', 'Active', 'Expiring Soon', 'Expired'].map(f => (
 <button 
 key={f} 
 onClick={() => setFilter(f)}
 className="px-3 py-1.5 text-xs rounded-full font-medium border transition-colors" 
 style={f === filter 
 ? { background: 'var(--sales-highlight)', color: 'white', borderColor: 'transparent' } 
 : { borderColor: 'var(--sales-border)', color: 'var(--sales-text-secondary)' }
 }
 >
 {f}
 </button>
 ))}
 </div>
 <div className="overflow-x-auto">
 <table className="w-full">
 <thead className="bg-[var(--bg-input)]">
 <tr>
 {['Member', 'Plan', 'Start', 'End Date', 'Status', 'Amount', 'Days Left'].map(h => (
 <th key={h} className="text-left text-xs font-semibold text-[var(--sales-text-secondary)] uppercase tracking-wider px-4 py-3">
 {h}
 </th>
 ))}
 </tr>
 </thead>
 <tbody className="divide-y divide-[var(--sales-border)]">
        {paginated.map((r, i) => (
          <tr key={i} className="hover:bg-[var(--primary-subtle)] transition-colors">
            <td className="px-4 py-3 text-sm font-medium text-[var(--sales-text-primary)]">{r.name}</td>
            <td className="px-4 py-3 text-sm text-[var(--sales-text-secondary)]">{r.plan}</td>
            <td className="px-4 py-3 text-sm text-[var(--sales-text-secondary)]">{r.start}</td>
            <td className="px-4 py-3 text-sm text-[var(--sales-text-secondary)]">{r.end}</td>
            <td className="px-4 py-3">
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                r.status === 'Active' 
                ? 'bg-[var(--success-bg)] text-[var(--success)] dark:bg-[var(--success-bg)] dark:text-[var(--success)]' 
                : 'bg-[var(--danger-bg)] text-[var(--danger)] dark:bg-[var(--danger-bg)] dark:text-[var(--danger)]'
              }`}>
                {r.status}
              </span>
            </td>
            <td className="px-4 py-3 text-sm font-medium text-[var(--sales-text-primary)]">{r.amount}</td>
            <td className="px-4 py-3 text-sm font-medium" style={{ 
              color: r.days < 0 ? '#ef4444' : r.days <= 7 ? '#ef4444' : r.days <= 30 ? '#f59e0b' : '#22c55e' 
            }}>
              {r.days < 0 ? `${Math.abs(r.days)}d ago` : `${r.days} days`}
            </td>
          </tr>
        ))}
        {paginated.length === 0 && (
          <tr>
            <td colSpan={7} className="text-center py-8 text-[var(--sales-text-secondary)]">
              No memberships found.
            </td>
          </tr>
        )}
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
    </div>
  );
}
