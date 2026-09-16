"use client";
import { formatCurrency } from '@/lib/formatters';
// RESPONSIBILITY: Renders the payroll records table with pay status badges and mark-as-paid inline action.

import { useHrContext } from '@/app/admin/hr/hr_context/AdminHrContext';
import { useMemo, useState } from 'react';
import { PAYROLL_TABLE_HEADERS } from '@/app/admin/hr/hr_utils/AdminHrSharedConstants';
import AdminPagination from '@/app/admin/admin_components/AdminShared/AdminPagination';
import { CheckCircle2, Download, ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import { ADMIN_ITEMS_PER_PAGE } from '@/app/admin/admin_url_config';

export default function AdminHrPayrollTable() {
  const { payrolls, search, currentPage, setCurrentPage, setPaymentModal, setShowPayrollModal, status, payrollMonth, staff } = useHrContext();
  type PayrollSortKey = 'month' | 'amount' | 'paidAmount' | 'pendingAmount' | 'status';
  const [sortKey, setSortKey] = useState<PayrollSortKey>('month');
  const [sortDir, setSortDir] = useState<'asc'|'desc'>('desc');

  const filtered = payrolls.filter(p => {
    const nameMatch = (p.staff?.name || '').toLowerCase().includes(search.toLowerCase());
    const roleMatch = (p.staff?.role || '').toLowerCase().includes(search.toLowerCase());
    
    // payrollMonth is YYYY-MM
    let isTargetMonth = true;
    if (payrollMonth) {
      const [y, m] = payrollMonth.split('-');
      const d = new Date(Number(y), Number(m) - 1, 1);
      const targetStr = d.toLocaleString('en-US', { month: 'long', year: 'numeric' });
      isTargetMonth = (p.month === targetStr) || (p.month === payrollMonth);
    }
    
    return (nameMatch || roleMatch) && isTargetMonth;
  });

    const sorted = useMemo(() => [...filtered].sort((a,b)=>{const av=a[sortKey], bv=b[sortKey]; const result=typeof av==='number'&&typeof bv==='number'?av-bv:String(av??'').localeCompare(String(bv??''),undefined,{numeric:true}); return sortDir==='asc'?result:-result;}), [filtered,sortKey,sortDir]);
  const handleSort=(key:PayrollSortKey)=>{if(sortKey===key)setSortDir(d=>d==='asc'?'desc':'asc');else{setSortKey(key);setSortDir('asc');}};
  const totalPages = Math.ceil(sorted.length / ADMIN_ITEMS_PER_PAGE);
  const currentData = sorted.slice((currentPage - 1) * ADMIN_ITEMS_PER_PAGE, currentPage * ADMIN_ITEMS_PER_PAGE);

  if (status === 'pending') {
    return (
      <div className="flex flex-col h-full">
        <div className="overflow-x-auto flex-1">
          <table className="w-full">
            <thead className="bg-input text-secondary">
              <tr>
                {PAYROLL_TABLE_HEADERS.map(h => (
                  <th key={h} className="text-left text-xs font-semibold uppercase tracking-wider px-4 py-3">{h}</th>
                ))}
                <th className="text-right text-xs font-semibold uppercase tracking-wider px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[...Array(5)].map((_, i) => (
                <tr key={`skeleton-${i}`} className="motion-safe:animate-pulse bg-card">
                  <td className="px-4 py-4">
                    <div className="h-4 bg-muted rounded w-32 mb-2"></div>
                    <div className="h-3 bg-muted rounded w-20"></div>
                  </td>
                  <td className="px-4 py-4"><div className="h-4 bg-muted rounded w-16"></div></td>
                  <td className="px-4 py-4"><div className="h-4 bg-muted rounded w-24"></div></td>
                  <td className="px-4 py-4"><div className="h-5 bg-muted rounded-full w-16"></div></td>
                  <td className="px-4 py-4"><div className="h-4 bg-muted rounded w-20"></div></td>
                  <td className="px-4 py-4 text-right"><div className="h-8 bg-muted rounded-lg w-24 ml-auto"></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-end mb-4">
        <button onClick={() => setShowPayrollModal(true)} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 motion-safe:transition-colors">
          Bulk Generate Payroll
        </button>
      </div>
      <div className="overflow-x-auto flex-1">
        <table className="w-full">
          <thead className="bg-input text-secondary">
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
              <tr key={p.id} className="motion-safe:transition-colors hover:bg-primary/5 bg-card">
                <td className="px-4 py-3">
                  <p className="text-sm font-medium text-primary">
                    {p.staff?.name || `Staff #${p.staffId}`}
                  </p>
                  <div className="text-xs text-secondary">
                    {p.staff?.role}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-primary">{p.month}</td>
                <td className="px-4 py-3 text-sm font-medium text-right">
                  {formatCurrency((staff.find(s => String(s.id) === String(p.staffId))?.salary) || 0)}
                </td>
                <td className="px-4 py-3 text-sm font-bold text-foreground text-right">{formatCurrency(p.amount || 0)}</td>
                <td className="px-4 py-3 text-sm font-bold text-success text-right">{formatCurrency(p.paidAmount || 0)}</td>
                <td className="px-4 py-3 text-sm font-bold text-danger text-right">{formatCurrency(p.pendingAmount || 0)}</td>
                <td className="px-4 py-3">
                  <span 
                    className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      p.status.toLowerCase() === 'paid' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-secondary">
                  {p.paidAt ? new Date(p.paidAt).toLocaleDateString('en-IN') : '—'}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => { const csv = `Employee,Month,Amount,Status\n${p.staff?.name ?? p.staffId},${p.month},${p.amount},${p.status}`; const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' })); const anchor = document.createElement('a'); anchor.href = url; anchor.download = `payslip-${p.id}.csv`; anchor.click(); URL.revokeObjectURL(url); }} className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold text-secondary border border-border rounded-lg hover:bg-border motion-safe:transition-colors">
                      <Download size={16} /> Payslip
                    </button>
                    {p.status.toLowerCase() !== 'paid' && (
                      <button 
                        onClick={() => setPaymentModal({
                          payrollId: p.id,
                          staffName: p.staff?.name || `Staff #${p.staffId}`,
                          pendingAmount: p.pendingAmount
                        })}
                        className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 motion-safe:transition-colors"
                      >
                        <CheckCircle2 size={16} /> Pay
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {currentData.length === 0 && (
              <tr>
                <td colSpan={PAYROLL_TABLE_HEADERS.length + 1} className="text-center py-10 text-sm text-secondary">
                  No payroll records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <AdminPagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        totalItems={filtered.length} 
        itemsPerPage={ADMIN_ITEMS_PER_PAGE} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
}
