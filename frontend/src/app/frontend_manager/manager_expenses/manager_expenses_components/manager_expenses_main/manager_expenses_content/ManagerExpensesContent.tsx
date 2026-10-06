// RESPONSIBILITY: Renders ManagerExpensesContent's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { Suspense, useState } from 'react';
import { useTranslations } from 'next-intl';
import ManagerHeader from '@/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_header/ManagerHeader';
import ManagerExpensesKPIs from '@/app/frontend_manager/manager_expenses/manager_expenses_components/manager_expenses_kpis/ManagerExpensesKPIs';
import ManagerExpensesChart from '@/app/frontend_manager/manager_expenses/manager_expenses_components/manager_expenses_chart/ManagerExpensesChart';
import ManagerExpensesModal from '@/app/frontend_manager/manager_expenses/manager_expenses_components/manager_expenses_modal/ManagerExpensesModal';
import ManagerExpensesTable from '@/app/frontend_manager/manager_expenses/manager_expenses_components/manager_expenses_table/ManagerExpensesTable';
import ManagerExpensesToolbar from '@/app/frontend_manager/manager_expenses/manager_expenses_components/manager_expenses_toolbar/ManagerExpensesToolbar';
import { useManagerExpensesLogic } from '@/app/frontend_manager/manager_expenses/manager_expenses_hooks/useManagerExpensesLogic';


/** @description Renders the ManagerExpensesContent component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (7 documented module/import dependencies).. @edge-case Preserves modal lifecycle. */
export function ManagerExpensesContent() {
  const t = useTranslations('MANAGER_EXPENSES');

  const { setShowModal } = useManagerExpensesLogic();
  const [activeTab, setActiveTab] = useState('View Expenses');

  return (
    <div className="min-h-full pb-10">
      <ManagerHeader data-testid="manager_expenses-managerexpensescontent-managerheader-1" title={t("COPY_EXPENSES_1")} subtitle={t("COPY_TRACK_MANAGE_OPERATIONAL_COSTS")} />
      <div className="p-4 sm:p-6 space-y-6 max-w-screen-2xl mx-auto w-full">
        
        <div className="flex flex-wrap gap-2 bg-card border border-border p-1 rounded-xl w-fit mb-4 motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
          {[t('COPY_ADD_EXPENSE'), t('COPY_VIEW_EXPENSES'), t('COPY_EXPENSE_REPORT')].map((t, mapIndex) => (
            <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`px-4 py-2 text-sm font-semibold rounded-lg motion-safe:transition-all ${
                activeTab === t ? 'bg-primary text-on-primary shadow-card' : 'text-secondary hover:text-primary hover:bg-primary-subtle'
              } motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110`)].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_expenses-expenses-managerexpensescontent-button-add-expense-${mapIndex}`}
              key={t}
              onClick={() => setActiveTab(t)}
              
            >
              {t}
            </button>
          ))}
        </div>

        {activeTab === 'View Expenses' && (
          <>
            <Suspense fallback={<div className="h-20 bg-skeleton-base motion-safe:animate-pulse rounded-xl" />}>
              <ManagerExpensesToolbar />
            </Suspense>

            <Suspense fallback={<div className="h-32 bg-skeleton-base motion-safe:animate-pulse rounded-xl" />}>
              <ManagerExpensesKPIs />
            </Suspense>

            <Suspense fallback={<div className="h-96 bg-skeleton-base motion-safe:animate-pulse rounded-xl" />}>
              <ManagerExpensesTable />
            </Suspense>
          </>
        )}

        {activeTab === 'Add Expense' && (
          <div className="bg-card border border-border rounded-xl p-6 max-w-xl motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
            <h3 className="text-lg font-bold text-primary mb-2">{t("COPY_RECORD_NEW_EXPENSE")}</h3>
            <p className="text-sm text-secondary mb-5">{t("COPY_USE_VALIDATED_EXPENSE_FORM_CREATE_NEW_OPERATIONAL_COST")}</p>
            <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "px-4 py-2.5 bg-primary text-on-primary rounded-lg text-sm font-semibold motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_expenses-manager-expenses-content-button-add"
              type="button"
              onClick={() => setShowModal(true)}
              
            >{t("COPY_OPEN_EXPENSE_FORM")}</button>
          </div>
        )}

        {activeTab === 'Expense Report' && (
          <div className="bg-card border border-border rounded-xl p-2 min-h-96 motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
            <ManagerExpensesChart />
          </div>
        )}

        <ManagerExpensesModal />
      </div>
    </div>
  );
}
