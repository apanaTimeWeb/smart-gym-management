'use client';
import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';
// RESPONSIBILITY: Renders the primary tabular list of expenses with actions and pagination.
import { Edit, Trash2, ExternalLink, CheckCircle2, Banknote, Loader2 } from 'lucide-react';
import ManagerTableSkeleton from '@/app/manager/manager_components/ManagerShared/ManagerTableSkeleton';
import { useConfirm } from '@/app/manager/manager_components/ManagerFeedback/ManagerConfirmProvider';
import { useManagerExpensesLogic } from '@/app/manager/expenses/expenses_hooks/ManagerUseManagerExpensesLogic';
import { useExpensesListQuery } from '@/app/manager/expenses/expenses_api/ManagerUseManagerExpensesQueries';
import { EXPENSES_TABLE_HEADERS, EXPENSE_STATUS_STYLES } from '@/app/manager/expenses/expenses_utils/ManagerExpensesSharedConstants';
import { formatCurrencyFromMinorUnits , formatDate} from '@/lib/formatters';
import ManagerPagination from '@/app/manager/manager_components/ManagerShared/ManagerPagination';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/manager/manager_infrastructure/ManagerPaginationDefaults';
import ManagerEmptyState from '@/app/manager/manager_components/ManagerFeedback/ManagerEmptyState';

export default function ManagerExpensesTable() {
  const { confirm } = useConfirm();
  const { search, statusFilter, currentPage, setCurrentPage, openEdit, deleteExpense, markAsPaid } = useManagerExpensesLogic();
  
  const { data, isLoading } = useExpensesListQuery({
    search,
    status: statusFilter !== 'All' ? statusFilter : '',
    page: currentPage.toString() });

  const expenses = data?.expenses || [];
  const totalExpenses = data?.total || 0;

  const totalPages = Math.ceil(totalExpenses / MANAGER_ITEMS_PER_PAGE);

  return (
    <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden flex flex-col h-full min-h-96">
      {isLoading ? (
        <div className="flex items-center justify-center py-16 flex-1">
          <Loader2 className="w-8 h-8 motion-safe:animate-spin text-primary" />
        </div>
      ) : (
        <>
          <div className="overflow-x-auto flex-1">
            <table className="w-full">
              <thead className="bg-primary-subtle border-b border-border">
                <tr>
                  {EXPENSES_TABLE_HEADERS.map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-secondary uppercase tracking-wider px-5 py-3 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {expenses.map(e => {
                  const statusStyle = EXPENSE_STATUS_STYLES[e.status] || { bg: 'bg-input', text: 'text-secondary' };
                  return (
                    <tr key={e.id} className="hover:bg-primary-subtle motion-safe:transition-colors">
                      <td className="px-5 py-3.5 text-sm font-bold text-primary whitespace-nowrap">{e.id}</td>
                      <td className="px-5 py-3.5 text-sm font-semibold text-primary whitespace-nowrap">
                        {e.title}
                        {e.referenceNo && <span className="block text-xs font-normal text-secondary mt-0.5">Ref: {e.referenceNo}</span>}
                      </td>
                      <td className="px-5 py-3.5 text-sm text-secondary whitespace-nowrap">{e.category}</td>
                      <td className="px-5 py-3.5 text-sm font-bold text-primary whitespace-nowrap">{formatCurrencyFromMinorUnits(e.amount, ManagerEnvConfig.currencyCode)}</td>
                      <td className="px-5 py-3.5 text-sm text-secondary whitespace-nowrap">
                        {formatDate(e.date)}
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`}>
                          {e.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {e.status === 'PENDING' && (
                            <button
                              onClick={async () => {
                                const ok = await confirm({
                                  title: 'Mark as Paid',
                                  message: `Mark expense "${e.title}" as paid?`,
                                  confirmText: 'Mark Paid' });
                                if (ok && markAsPaid) markAsPaid(e.id);
                              }}
                              className="p-1.5 rounded-lg bg-success-bg text-success hover:bg-success-bg motion-safe:transition-all motion-safe:duration-200"
                              title="Mark as Paid"
                            >
                              <CheckCircle2 size={18} />
                            </button>
                          )}
                          {e.receiptUrl && (
                            <a href={e.receiptUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-input text-secondary hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-200" title="View Receipt">
                              <ExternalLink size={18} />
                            </a>
                          )}
                          <button onClick={() => openEdit(e)} className="p-1.5 rounded-lg bg-input text-secondary hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-200" title="Edit"><Edit size={18} /></button>
                          <button onClick={async () => { 
                            const ok = await confirm({
                              title: 'Delete Expense',
                              message: `Delete expense "${e.title}"?`,
                              type: 'danger',
                              confirmText: 'Delete'
                            });
                            if (ok) deleteExpense(e.id); 
                          }} className="p-1.5 rounded-lg bg-danger text-on-danger hover:opacity-80 motion-safe:transition-all motion-safe:duration-200" title="Delete"><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {expenses.length === 0 && !isLoading && (
                  <tr>
                    <td colSpan={EXPENSES_TABLE_HEADERS.length} className="p-0 border-b-0">
                      <ManagerEmptyState 
                        icon={<Banknote size={18} />}
                        title="No expenses found"
                        subtitle="There are no expenses matching the current criteria."
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <ManagerPagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              totalItems={totalExpenses} 
              itemsPerPage={MANAGER_ITEMS_PER_PAGE} 
              onPageChange={setCurrentPage} 
            />
          )}
        </>
      )}
    </div>
  );
}
