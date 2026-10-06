"use client";
// RESPONSIBILITY: Renders Finance expense records from the module-owned server query, exposing documented category filtering and pagination.
import { useLocale, useTranslations } from 'next-intl';
import { formatDate } from '@/app/frontend_admin/admin_finance/admin_finance_utils/AdminFinanceFormatters';

import { displayValue } from '@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutDisplayValue';
import { useAdminFinanceLogic } from '@/app/frontend_admin/admin_finance/admin_finance_hooks/useAdminFinanceLogic';
import { AdminFinanceFormatCurrency } from '@/app/frontend_admin/admin_finance/admin_finance_utils/AdminFinanceFormatCurrency';

import { EXPENSE_CATEGORIES } from '@/app/frontend_admin/admin_finance/admin_finance_constants/AdminFinanceConstants';
import AdminLayoutPagination from '@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutPagination';
import AdminFinanceEmptyState from '@/app/frontend_admin/admin_finance/admin_finance_components/admin_finance_empty_state/AdminFinanceEmptyState';

const ITEMS_PER_PAGE = 8;

const CATEGORY_COLORS: Record<string, string> = {
  Rent: 'bg-info text-on-info',
  Salaries: 'bg-warning-bg text-warning',
  Utilities: 'bg-primary-subtle text-primary',
  Equipment: 'bg-purple-bg text-purple-text',
  Marketing: 'bg-success-bg text-success',
  Maintenance: 'bg-danger-bg text-danger',
  Supplies: 'bg-info text-on-info',
  Other: 'bg-input text-secondary',
};

/**
 * AdminFinanceExpensesTable renders the admin finance expenses table UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinanceExpensesTable: Renders Finance expense records from the module-owned server query, exposing documented category filtering and pagination.
 * @dependencies Consumes AdminFinanceFormatters, AdminLayoutDisplayValue, useAdminFinanceLogic, AdminFinanceFormatCurrency, AdminFinanceConstants.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinanceExpensesTable() {
  const locale = useLocale();
  const t = useTranslations();

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
            className="px-3 py-2 border border-border rounded-xl text-sm bg-input text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-11 motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page"
            aria-label={t('finance.admin_finance_expenses_table.text_a78210146a')}
           data-testid="admin_finance-admin_finance-expenses-table-control">
            <option value="All" data-testid="admin_finance-admin_finance-expenses-table-control-2">{t('finance.admin_finance_expenses_table.text_1fd266c217')}</option>
            {EXPENSE_CATEGORIES.map((category , __testIdIndex60) => <option key={category} value={category} data-testid={`admin_finance-admin_finance-expenses-table-control-3-map60-${__testIdIndex60}-1`}>{category}</option>)}
          </select>
          <span className="text-sm text-secondary">
            {t('finance.admin_finance_expenses_table.text_d8e7170f94')}<span className="font-bold text-danger">{AdminFinanceFormatCurrency(totalExpenseAmount, undefined, locale)}</span>
          </span>
        </div>
        <span className="text-xs text-secondary">{t('finance.admin_finance_expenses_table.text_51b38f2fd6')}</span>
      </div>

      <div className="rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table data-admin-responsive-table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-highlight border-b border-border">
                {['finance.admin_finance_expenses_table.date', 'finance.admin_finance_expenses_table.category', 'finance.admin_finance_expenses_table.branch', 'finance.admin_finance_expenses_table.amount', 'finance.admin_finance_expenses_table.notes', 'finance.admin_finance_expenses_table.recordedBy'].map((heading) => (
                  <th key={heading} className="px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap">{t(heading)}</th>
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
                <tr><td colSpan={6}><AdminFinanceEmptyState title={t('finance.admin_finance_expenses_table.text_15f519954e')} description={t('finance.admin_finance_expenses_table.auto_4508b993fb')} /></td></tr>
              ) : (
                expenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-surface-hover motion-safe:transition-colors motion-safe:duration-base">
                    <td className="px-4 py-3 text-sm text-primary whitespace-nowrap">{formatDate(expense.date, locale)}</td>
                    <td className="px-4 py-3"><span className={`text-xs font-bold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[expense.category] ?? 'bg-input text-secondary'}`}>{expense.category}</span></td>
                    <td className="px-4 py-3 text-sm text-primary">{expense.branchName ?? expense.branchId}</td>
                    <td className="px-4 py-3 text-sm font-bold text-danger">{AdminFinanceFormatCurrency(expense.amount, undefined, locale)}</td>
                    <td className="px-4 py-3 text-sm text-secondary max-w-xs truncate">{displayValue(expense.notes)}</td>
                    <td className="px-4 py-3 text-sm text-secondary">{expense.recordedBy}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="border-t border-border">
          <AdminLayoutPagination currentPage={expensePage} totalPages={Math.max(1, Math.ceil(totalExpenses / ITEMS_PER_PAGE))} onPageChange={setExpensePage} totalItems={totalExpenses} itemsPerPage={ITEMS_PER_PAGE} />
        </div>
      </div>
    </div>
  );
}
