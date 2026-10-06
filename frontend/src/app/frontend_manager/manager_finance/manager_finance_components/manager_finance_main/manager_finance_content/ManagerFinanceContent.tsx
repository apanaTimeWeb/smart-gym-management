// RESPONSIBILITY: Renders ManagerFinanceContent's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { Wallet, Plus } from 'lucide-react';
import { useManagerFinanceUiStore } from '@/app/frontend_manager/manager_finance/manager_finance_store/useManagerFinanceUiStore';
import ManagerFinancePaymentModal from '@/app/frontend_manager/manager_finance/manager_finance_components/manager_finance_payment_modal/ManagerFinancePaymentModal';
import { useTranslations } from 'next-intl';
import ManagerHeader from '@/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_header/ManagerHeader';
import ManagerTableSkeleton from '@/components/ui/manager_table_skeleton/ManagerTableSkeleton';
import ManagerFinanceFilters from '@/app/frontend_manager/manager_finance/manager_finance_components/manager_finance_filters/ManagerFinanceFilters';
import ManagerFinanceKpiCards from '@/app/frontend_manager/manager_finance/manager_finance_components/manager_finance_kpi_cards/ManagerFinanceKpiCards';
import ManagerFinanceRevenueChart from '@/app/frontend_manager/manager_finance/manager_finance_components/manager_finance_revenue_chart/ManagerFinanceRevenueChart';
import ManagerFinanceTable from '@/app/frontend_manager/manager_finance/manager_finance_components/manager_finance_table/ManagerFinanceTable';
import { useManagerFinanceLogic } from '@/app/frontend_manager/manager_finance/manager_finance_hooks/useManagerFinanceLogic';
import { FINANCE_TABS } from '@/app/frontend_manager/manager_finance/manager_finance_constants/ManagerFinanceSharedConstants';

/** @description Renders the ManagerFinanceContent component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (8 documented module/import dependencies).. @edge-case Preserves error state. */
export function ManagerFinanceContent() {
  const t = useTranslations('MANAGER_FINANCE');
  const ui = useManagerFinanceUiStore();

  const { tab, setTab, payments, isPending, isError, reload } = useManagerFinanceLogic();

  return (
    <div className="min-h-full pb-10">
      <ManagerHeader data-testid="manager_finance-managerfinancecontent-managerheader-1" title={t("COPY_BRANCH_FINANCE")} subtitle={t("COPY_TRACK_PAYMENTS_REVENUE_FINANCIAL_OVERVIEW")} />

      <div className="p-6 space-y-6">
        <div className="flex justify-end"><button type="button" onClick={() => ui.setShowModal(true)} data-testid="manager_finance-managerfinancecontent-button-record-payment" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"> <Plus size={18} strokeWidth={2} aria-hidden="true" />{t('TEXT_RECORD_PAYMENT')}</button></div>
        {/* KPIs */}
        <ManagerFinanceKpiCards />

        {/* Tabs */}
        <div className="flex gap-1 bg-input rounded-xl p-1 w-fit">
          {FINANCE_TABS.map((tabValue, mapIndex) => (
            <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`px-5 py-2 text-sm font-medium rounded-lg motion-safe:transition-all ${
                tab === tabValue ? 'bg-card text-primary shadow-card' : 'text-secondary hover:text-primary'
              } motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110`)].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_finance-finance-managerfinancecontent-button-payments-${mapIndex}`}
              key={tabValue}
              onClick={() => setTab(tabValue)}
              
            >
              {tabValue === 'Payments' ? t('COPY_PAYMENTS') : t('COPY_SUMMARY')}
            </button>
          ))}
        </div>

        {/* ── Payments Tab ── */}
        {tab === 'Payments' && (
          <div className="bg-card rounded-xl border border-border overflow-hidden shadow-card motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
            {/* Toolbar */}
            <ManagerFinanceFilters />

            {(() => { if (isPending) { return (
              <ManagerTableSkeleton rows={6} />
            ); } return (() => { if (isError) { return (
              <div className="py-16 text-center space-y-3">
                <p className="text-sm text-danger font-medium">{t("TEXT_GENERIC_ERROR")}</p>
                <button data-testid="manager_finance-manager-finance-content-reload" onClick={reload} className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-on-primary motion-safe:transition-all hover:bg-primary-hover motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110">{t("COPY_TRY_AGAIN_1")}</button>
              </div>
            ); } return (() => { if (payments.length === 0) { return (
              <div className="py-16 text-center space-y-2">
                <Wallet size={18} strokeWidth={2} className="mx-auto text-secondary opacity-40"/>
                <p className="text-sm text-secondary font-medium">{t("COPY_NO_PAYMENTS_FOUND_1")}</p>
              </div>
            ); } return (
              <ManagerFinanceTable />
            ); })(); })(); })()}
          </div>
        )}

        {/* ── Summary Tab ── */}
        {tab === 'Summary' && (
          <div className="space-y-5">
            <ManagerFinanceRevenueChart />
          </div>
        )}
        {ui.showModal ? <ManagerFinancePaymentModal /> : null}
      </div>
    </div>
  );
}
