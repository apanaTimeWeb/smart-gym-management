// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';
import { Edit, Trash2, ExternalLink, CheckCircle2 } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useConfirm } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';
import ManagerPagination from '@/components/ui/manager_pagination/ManagerPagination';
import ManagerTableSkeleton from '@/components/ui/manager_table_skeleton/ManagerTableSkeleton';
import ManagerExpensesEmptyState from '@/app/frontend_manager/manager_expenses/manager_expenses_components/manager_expenses_table/ManagerExpensesEmptyState';
import { EXPENSE_ALL_STATUS_FILTER } from '@/app/frontend_manager/manager_expenses/manager_expenses_constants/ManagerExpensesSharedConstants';
import { EXPENSE_PENDING_STATUS } from '@/app/frontend_manager/manager_expenses/manager_expenses_constants/ManagerExpensesSharedConstants';
import { EXPENSES_TABLE_HEADERS, EXPENSE_STATUS_STYLES } from '@/app/frontend_manager/manager_expenses/manager_expenses_constants/ManagerExpensesSharedConstants';
import { useManagerExpensesLogic } from '@/app/frontend_manager/manager_expenses/manager_expenses_hooks/useManagerExpensesLogic';
import { useExpensesListQuery } from '@/app/frontend_manager/manager_expenses/manager_expenses_hooks/useManagerExpensesQueries';
import { ManagerExpensesFormatCurrency, ManagerExpensesFormatDate } from '@/app/frontend_manager/manager_expenses/manager_expenses_utils/ManagerExpensesFormatters';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/frontend_manager/manager_infrastructure/ManagerPaginationDefaults';


/** @description Renders the ManagerExpensesTable component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (10 documented module/import dependencies).. @edge-case Preserves empty state. */
export default function ManagerExpensesTable() {
  const t = useTranslations('MANAGER_EXPENSES');
  const locale = useLocale();

  const { confirm } = useConfirm();
  const { search, statusFilter, currentPage, setCurrentPage, openEdit, deleteExpense, markAsPaid } = useManagerExpensesLogic();
  
  const { data, isPending } = useExpensesListQuery({
    search,
    status: statusFilter !== EXPENSE_ALL_STATUS_FILTER ? statusFilter : '',
    page: currentPage.toString() });

  const expenses = data?.expenses || [];
  const totalExpenses = data?.total || 0;

  const totalPages = Math.ceil(totalExpenses / MANAGER_ITEMS_PER_PAGE);

  return (
    <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden flex flex-col h-full min-h-96 motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
      {isPending ? (
        <ManagerTableSkeleton rows={6} />
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
                {expenses.map((e, mapIndex) => {
                  const statusStyle = EXPENSE_STATUS_STYLES[e.status] || { bg: 'bg-input', text: 'text-secondary' };
                  return (
                    <tr key={e.id} className="hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-base ease-in-out">
                      <td className="px-5 py-3.5 text-sm font-bold text-primary whitespace-nowrap">{e.id}</td>
                      <td className="px-5 py-3.5 text-sm font-semibold text-primary whitespace-nowrap">
                        {e.title}
                        {e.referenceNo && <span className="block text-xs font-normal text-secondary mt-0.5">{t("COPY_REF")}{e.referenceNo}</span>}
                      </td>
                      <td className="px-5 py-3.5 text-sm text-secondary whitespace-nowrap">{e.category}</td>
                      <td className="px-5 py-3.5 text-sm font-bold text-primary whitespace-nowrap">{ManagerExpensesFormatCurrency(e.amount, ManagerEnvConfig.currencyCode, locale)}</td>
                      <td className="px-5 py-3.5 text-sm text-secondary whitespace-nowrap">
                        {ManagerExpensesFormatDate(e.date)}
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <span data-testid={`manager_expenses-manager-expenses-table-status-${e.id}`} className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`}>
                          {e.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {e.status === EXPENSE_PENDING_STATUS && (
                            <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "p-1.5 rounded-lg bg-success-bg text-success hover:bg-success-bg motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_expenses-expenses-managerexpensestable-button-mark-as-paid-${mapIndex}`}
                              onClick={async () => {
                                const ok = await confirm({
                                  title: t("COPY_MARK_AS_PAID_2"),
                                  message: t("TEXT_MARK_EXPENSE_PAID_MESSAGE", { value: e.title }),
                                  confirmText: t("COPY_MARK_PAID") });
                                if (ok && markAsPaid) markAsPaid(e.id);
                              }}
                              
                              title={t("COPY_MARK_AS_PAID_1")}
                            >
                              <CheckCircle2 size={18} strokeWidth={2}/>
                            </button>
                          )}
                          {e.receiptUrl && (
                            <a data-testid={`manager_expenses-expenses-managerexpensestable-a-view-receipt-${mapIndex}`} href={e.receiptUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-input text-secondary hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" title={t("COPY_VIEW_RECEIPT")}>
                              <ExternalLink size={18} strokeWidth={2}/>
                            </a>
                          )}
                          <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "p-1.5 rounded-lg bg-input text-secondary hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_expenses-expenses-managerexpensestable-button-edit-${mapIndex}`} onClick={() => openEdit(e)}  title={t("COPY_EDIT")}><Edit size={18} strokeWidth={2}/></button>
                          <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "p-1.5 rounded-lg bg-danger text-on-danger motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_expenses-expenses-managerexpensestable-button-delete-${mapIndex}`} onClick={async () => { 
                            const ok = await confirm({
                              title: t("COPY_DELETE_EXPENSE"),
                              message: t("TEXT_DELETE_EXPENSE_CONFIRM_MESSAGE", { value: e.title }),
                              type: 'danger',
                              confirmText: t("COPY_DELETE_2")
                            });
                            if (ok) deleteExpense(e.id); 
                          }}  title={t("COPY_DELETE_1")}><Trash2 size={18} strokeWidth={2}/></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {expenses.length === 0 && !isPending && (
                  <tr>
                    <td colSpan={EXPENSES_TABLE_HEADERS.length} className="p-0 border-b-0">
                      <ManagerExpensesEmptyState />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <ManagerPagination data-testid="manager_expenses-managerexpensestable-managerpagination-1" 
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
