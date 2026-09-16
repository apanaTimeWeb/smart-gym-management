"use client";
// RESPONSIBILITY: Renders the expenses table with branch filter, category filter, and pagination for Admin Finance.

import { useMemo, useState } from 'react';
import { useAdminFinanceLogic } from '@/app/admin/finance/finance_context/useAdminFinanceLogic';
import { useAdminGlobalStore } from '@/app/admin/admin_store/useAdminGlobalStore';
import { formatCurrency } from '@/lib/formatters';
import type { Expense } from '@/app/admin/finance/finance_types/AdminFinanceTypes';
import AdminPagination from '@/app/admin/admin_components/AdminShared/AdminPagination';

const ITEMS_PER_PAGE = 8;

const CATEGORY_COLORS: Record<string, string> = {
  Rent: 'bg-info-bg text-info',
  Salaries: 'bg-warning-bg text-warning',
  Utilities: 'bg-primary/20 text-primary',
  Equipment: 'bg-purple-bg text-purple',
  Marketing: 'bg-success-bg text-success',
  Maintenance: 'bg-danger-bg text-danger',
  Supplies: 'bg-info-bg text-info',
  Other: 'bg-input text-secondary',
};

export default function AdminFinanceExpensesTable() {
  const { selectedBranchId } = useAdminGlobalStore();
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const { expenses = [] } = useAdminFinanceLogic();

  const filtered = useMemo(() => {
    return expenses.filter((e: Expense) => {
      const matchesBranch = selectedBranchId === 'all' || e.branchId === selectedBranchId;
      const matchesCategory = categoryFilter === 'All' || e.category === categoryFilter;
      return matchesBranch && matchesCategory;
    });
  }, [selectedBranchId, categoryFilter, expenses]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const totalAmount = filtered.reduce((sum: number, e: Expense) => sum + e.amount, 0);

  const categories = ['All', ...Array.from(new Set(expenses.map((e: Expense) => e.category)))];

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <select
            value={categoryFilter}
            onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
            className="px-3 py-2 border border-border rounded-xl text-sm bg-input text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {categories.map((c) => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
          </select>
          <span className="text-sm text-secondary">
            Total: <span className="font-bold text-danger">{formatCurrency(totalAmount)}</span>
          </span>
        </div>
        <span className="text-xs text-secondary">Read-only analytics</span>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary/5 border-b border-border">
                {['Date', 'Category', 'Branch', 'Amount', 'Notes', 'Recorded By'].map((h) => (
                  <th key={h} className="px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-sm text-secondary">No expenses found.</td>
                </tr>
              ) : paginated.map((e: Expense) => (
                <tr key={e.id} className="hover:bg-primary/5 motion-safe:transition-colors">
                  <td className="px-4 py-3 text-sm text-foreground whitespace-nowrap">{new Date(e.date).toLocaleDateString('en-IN')}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[e.category as string] ?? 'bg-input text-secondary'}`}>{e.category}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">{e.branchName}</td>
                  <td className="px-4 py-3 text-sm font-bold text-danger">{formatCurrency(e.amount)}</td>
                  <td className="px-4 py-3 text-sm text-secondary max-w-xs truncate">{e.notes || '—'}</td>
                  <td className="px-4 py-3 text-sm text-secondary">{e.recordedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-border">
          <AdminPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} totalItems={filtered.length} itemsPerPage={ITEMS_PER_PAGE} />
        </div>
      </div>

    </div>
  );
}