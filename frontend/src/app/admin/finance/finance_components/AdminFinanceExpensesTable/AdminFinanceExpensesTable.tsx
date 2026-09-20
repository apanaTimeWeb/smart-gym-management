"use client";
import { format } from 'date-fns';
// RESPONSIBILITY: Renders Finance expense records from the module-owned server query, exposing documented category filtering and pagination.

import { displayValue } from '@/app/admin/admin_layout/admin_utils/AdminDisplayValue';
import { useAdminFinanceLogic } from '@/app/admin/finance/finance_context/useAdminFinanceLogic';
import { formatCurrency } from '@/lib/formatters';
import { EXPENSE_CATEGORIES } from '@/app/admin/finance/finance_utils/AdminFinanceSharedConstants';
import AdminPagination from '@/app/admin/admin_layout/AdminShared/AdminPagination';
import AdminFinanceEmptyState from '@/app/admin/finance/finance_components/AdminFinanceEmptyState/AdminFinanceEmptyState';

const ITEMS_PER_PAGE = 8;

const CATEGORY_COLORS: Record<string, string> = {
  Rent: 'bg-info text-on-info',
  Salaries: 'bg-warning-bg text-warning',
  Utilities: 'bg-primary-subtle text-primary',
  Equipment: 'bg-purple-bg text-purple',
  Marketing: 'bg-success-bg text-success',
  Maintenance: 'bg-danger-bg text-danger',
  Supplies: 'bg-info text-on-info',
  Other: 'bg-input text-secondary',
};

export default function AdminFinanceExpensesTable() {
  const {
    expenses,
    totalExpenses,
    totalExpenseAmount,
    expenseCategory,
    expensePage,
    setExpenseCategory,
    setExpensePage,
    status,
  } = useAdminFinanceLogic();

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <select
            value={expenseCategory}
            onChange={(e) => setExpenseCategory(e.target.value)}
            className="px-3 py-2 border border-border rounded-xl text-sm bg-input text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-11"
            aria-label="Expense category"
          >
            <option value="All">All Categories</option>
            {EXPENSE_CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}
          </select>
          <span className="text-sm text-secondary">
            Total: <span className="font-bold text-danger">{formatCurrency(totalExpenseAmount)}</span>
          </span>
        </div>
        <span className="text-xs text-secondary">Read-only analytics</span>
      </div>

      <div className="rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table data-admin-responsive-table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-highlight border-b border-border">
                {['Date', 'Category', 'Branch', 'Amount', 'Notes', 'Recorded By'].map((heading) => (
                  <th key={heading} className="px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {status === 'pending' ? (
                ['expense-row-1', 'expense-row-2', 'expense-row-3', 'expense-row-4', 'expense-row-5'].map((key) => (
                  <tr key={key} className="motion-safe:animate-pulse motion-safe:duration-base">
                    {['expense-a', 'expense-b', 'expense-c', 'expense-d', 'expense-e', 'expense-f'].map((cell) => <td key={`${key}-${cell}`} className="px-4 py-4"><div className="h-4 rounded bg-skeleton-base" /></td>)}
                  </tr>
                ))
              ) : expenses.length === 0 ? (
                <tr><td colSpan={6}><AdminFinanceEmptyState title="No expenses found" description="No expenses match the selected branch and category filters." /></td></tr>
              ) : (
                expenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-surface-hover motion-safe:transition-colors motion-safe:duration-base">
                    <td className="px-4 py-3 text-sm text-primary whitespace-nowrap">{format(new Date(expense.date), 'dd MMM yyyy')}</td>
                    <td className="px-4 py-3"><span className={`text-xs font-bold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[expense.category] ?? 'bg-input text-secondary'}`}>{expense.category}</span></td>
                    <td className="px-4 py-3 text-sm text-primary">{expense.branchName ?? expense.branchId}</td>
                    <td className="px-4 py-3 text-sm font-bold text-danger">{formatCurrency(expense.amount)}</td>
                    <td className="px-4 py-3 text-sm text-secondary max-w-xs truncate">{displayValue(expense.notes)}</td>
                    <td className="px-4 py-3 text-sm text-secondary">{expense.recordedBy}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="border-t border-border">
          <AdminPagination currentPage={expensePage} totalPages={Math.max(1, Math.ceil(totalExpenses / ITEMS_PER_PAGE))} onPageChange={setExpensePage} totalItems={totalExpenses} itemsPerPage={ITEMS_PER_PAGE} />
        </div>
      </div>
    </div>
  );
}
