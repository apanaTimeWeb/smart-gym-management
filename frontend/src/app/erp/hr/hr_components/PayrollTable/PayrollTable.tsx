// RESPONSIBILITY: PayrollTable.tsx handles the logic and UI for its corresponding feature.
"use client";

import { useHrContext } from '@/app/erp/hr/hr_context/HrContext';
import { PAYROLL_TABLE_HEADERS } from '@/app/erp/hr/hr_utils/HrSharedConstants';
import ErpPagination from '@/app/erp/erp_components/ErpShared/ErpPagination';
import { CheckCircle2, Loader2 } from 'lucide-react';

const fmt = (n: number) => '₹' + (n || 0).toLocaleString('en-IN');

export default function PayrollTable() {
  const { payrolls, search, currentPage, setCurrentPage, markPayrollPaid, loading } = useHrContext();

  const filtered = payrolls.filter(p => {
    const nameMatch = (p.staff?.name || '').toLowerCase().includes(search.toLowerCase());
    const roleMatch = (p.staff?.role || '').toLowerCase().includes(search.toLowerCase());
    const monthMatch = p.month.toLowerCase().includes(search.toLowerCase());
    return nameMatch || roleMatch || monthMatch;
  });

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const currentData = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="overflow-x-auto flex-1">
        <table className="w-full">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              {PAYROLL_TABLE_HEADERS.map(h => (
                <th key={h} className="text-left text-xs font-semibold uppercase tracking-wider px-4 py-3">
                  {h}
                </th>
              ))}
              <th className="text-right text-xs font-semibold uppercase tracking-wider px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {currentData.map(p => (
              <tr key={p.id} className="transition-colors hover:bg-muted/50 bg-card">
                <td className="px-4 py-3">
                  <p className="text-sm font-medium text-foreground">
                    {p.staff?.name || `Staff #${p.staffId}`}
                  </p>
                  <div className="text-xs text-muted-foreground">
                    {p.staff?.role}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-foreground">{p.month}</td>
                <td className="px-4 py-3 text-sm font-bold text-emerald-600">{fmt(p.amount)}</td>
                <td className="px-4 py-3">
                  <span 
                    className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      p.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {p.paidAt ? new Date(p.paidAt).toLocaleDateString('en-IN') : '—'}
                </td>
                <td className="px-4 py-3 text-right">
                  {p.status !== 'Paid' && (
                    <button 
                      onClick={() => markPayrollPaid(p.id)}
                      className="flex items-center justify-end w-full gap-1 px-3 py-1.5 text-xs font-semibold text-primary-foreground bg-primary rounded-lg hover:opacity-90 transition-opacity"
                    >
                      <CheckCircle2 size={14} /> Mark Paid
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {currentData.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-10 text-sm text-muted-foreground">
                  No payroll records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ErpPagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        totalItems={filtered.length} 
        itemsPerPage={ITEMS_PER_PAGE} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
}
