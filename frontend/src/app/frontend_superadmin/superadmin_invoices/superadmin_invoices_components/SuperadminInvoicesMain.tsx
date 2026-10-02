'use client';
/**
 * RESPONSIBILITY: React component SuperadminInvoicesMain owned by the superadmin_invoices feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: lucide-react, @/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_hooks/useSuperadminInvoicesMain, @/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_components/superadmin_invoices_header/SuperadminInvoicesHeader, @/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_components/superadmin_invoices_stats_bar/SuperadminInvoicesStatsBar, @/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_components/superadmin_invoices_table/SuperadminInvoicesTable, @/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_components/superadmin_invoices_empty_state/SuperadminInvoicesEmptyState, @/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_components/superadmin_invoices_log_payment_modal/SuperadminInvoicesLogPaymentModal, @/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_components/superadmin_invoices_aging_report/SuperadminInvoicesAgingReport
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Root orchestrator for the Invoices page. Composes child views from useSuperadminInvoicesMain.
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { SearchableDropdown } from '@/components/ui/SearchableDropdown';

import SuperadminInvoicesAgingReport from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_components/superadmin_invoices_aging_report/SuperadminInvoicesAgingReport';
import SuperadminInvoicesEmptyState from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_components/superadmin_invoices_empty_state/SuperadminInvoicesEmptyState';
import SuperadminInvoicesHeader from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_components/superadmin_invoices_header/SuperadminInvoicesHeader';
import SuperadminInvoicesLogPaymentModal from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_components/superadmin_invoices_log_payment_modal/SuperadminInvoicesLogPaymentModal';
import SuperadminInvoicesStatsBar from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_components/superadmin_invoices_stats_bar/SuperadminInvoicesStatsBar';
import SuperadminInvoicesTable from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_components/superadmin_invoices_table/SuperadminInvoicesTable';
import { SUPERADMIN_INVOICES_TAB_CODES, SUPERADMIN_INVOICE_STATUS_OPTIONS } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_constants/SuperadminInvoicesConstants';
import { useSuperadminInvoicesMain } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_hooks/useSuperadminInvoicesMain';



/**
 * @description Owns the SuperadminInvoicesMain responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminInvoicesMain() {
  const t = useTranslations('superadmin_invoices');
  const { isPending, error, invoices, filteredInvoices, filteredTenantsForDropdown, selectedGym, totalRevenue, failedRevenue, search, setSearch, showAddModal, setShowAddModal, gymSearchTerm, setGymSearchTerm, isGymDropdownOpen, setIsGymDropdownOpen, handleSelectGym, isLoggingPayment, statusFilter, setStatusFilter, pendingRevenue, overdueCount, currentPage, pageLimit, setPage, total, activeTab, setActiveTab, handleSavePayment } = useSuperadminInvoicesMain();
  if (isPending) return (<div className="space-y-6 motion-safe:animate-pulse" data-testid="superadmin_invoices-superadmin-invoices-main-page"><div className="h-8 w-full rounded bg-card sm:w-64"/><div className="grid grid-cols-1 gap-6 md:grid-cols-2"><div className="h-28 rounded-xl border border-border bg-card"/><div className="h-28 rounded-xl border border-border bg-card"/></div><div className="overflow-hidden rounded-xl border border-border bg-card"><div className="h-12 bg-surface-highlight"/>{[...Array(6)].map((_, i) => <div key={`skeleton-${i}`} className="h-12 border-t border-border"/>)}</div></div>);
  if (error) return <div className="p-8 text-center text-danger" role="alert" data-testid="superadmin_invoices-main-error-state">{error}</div>;
  return (<div className="relative space-y-6" data-testid="superadmin_invoices-superadmin-invoices-main-page-ready">
    <SuperadminInvoicesHeader onLogPaymentClick={() => setShowAddModal(true)} data-testid="superadmin_invoices-superadmin-invoices-header-interactive-2"/>
    <SuperadminInvoicesStatsBar totalRevenue={totalRevenue} failedRevenue={failedRevenue} pendingRevenue={pendingRevenue} overdueCount={overdueCount} currency="INR"/>
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-card">
      <div className="flex flex-col items-center justify-between gap-4 border-b border-border bg-input p-4 md:flex-row">
        <div className="flex w-full rounded-lg border border-border bg-input p-1 md:w-auto">
          <button type="button" onClick={() => setActiveTab(SUPERADMIN_INVOICES_TAB_CODES.ALL)} aria-current={activeTab === SUPERADMIN_INVOICES_TAB_CODES.ALL ? 'page' : undefined} className={`flex-1 rounded-md px-4 py-2 text-sm font-medium motion-safe:transition-colors md:flex-none ${activeTab === SUPERADMIN_INVOICES_TAB_CODES.ALL ? 'bg-page text-primary shadow-card' : 'text-secondary hover:bg-page hover:text-primary'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page`} data-testid="superadmin_invoices-superadmin-invoices-main-invoices-main-all-invoices">{t('ui.all_invoices_cf44752e')}</button>
          <button type="button" onClick={() => setActiveTab('AGING')} aria-current={activeTab === 'AGING' ? 'page' : undefined} className={`flex-1 rounded-md px-4 py-2 text-sm font-medium motion-safe:transition-colors md:flex-none ${activeTab === 'AGING' ? 'bg-page text-primary shadow-card' : 'text-secondary hover:bg-page hover:text-primary'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page`} data-testid="superadmin_invoices-superadmin-invoices-main-invoices-main-aging-report">{t('ui.aging_report_76e9c1a4')}</button>
        </div>
      </div>
      {activeTab === 'AGING' ? <SuperadminInvoicesAgingReport invoices={invoices}/> : <>
        <div className="flex gap-4 border-b border-border p-4">
          <div className="relative max-w-md flex-1"><Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" aria-hidden="true"/><label htmlFor="superadmin-invoices-search" className="sr-only">{t('ui.search_by_invoice_id_or_gym_name_26bd2806')}</label><input id="superadmin-invoices-search" type="search" placeholder={t('ui.search_by_invoice_id_or_gym_name_50f3a18b')} className="w-full rounded-lg border border-border bg-input py-2 pl-9 pr-4 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" value={search} onChange={(e) => setSearch(e.target.value)} data-testid="superadmin_invoices-superadmin-invoices-main-main-superadmin-invoices-search"/></div>
          <div className="w-40 rounded-lg bg-input"><SearchableDropdown data-testid="superadmin_invoices-superadmin-invoices-main-status-filter" options={SUPERADMIN_INVOICE_STATUS_OPTIONS.map((option) => ({ label: option.label, value: option.value }))} value={statusFilter || ''} onChange={(val) => setStatusFilter(val ? String(val) : null)} className="border-border bg-transparent"/></div>
        </div>
        {filteredInvoices.length === 0 ? <SuperadminInvoicesEmptyState onLogPaymentClick={() => setShowAddModal(true)} data-testid="superadmin_invoices-superadmin-invoices-empty-state-interactive-3"/> : <SuperadminInvoicesTable onLogPaymentClick={() => setShowAddModal(true)} invoices={filteredInvoices} currentPage={currentPage} totalPages={Math.ceil(total / pageLimit) || 1} onPageChange={setPage} data-testid="superadmin_invoices-superadmin-invoices-table-interactive-4"/>}
      </>}
    </div>
    {showAddModal ? <SuperadminInvoicesLogPaymentModal onClose={() => setShowAddModal(false)} selectedGym={selectedGym} isGymDropdownOpen={isGymDropdownOpen} setIsGymDropdownOpen={setIsGymDropdownOpen} gymSearchTerm={gymSearchTerm} setGymSearchTerm={setGymSearchTerm} filteredTenantsForDropdown={filteredTenantsForDropdown} handleSelectGym={handleSelectGym} onSave={handleSavePayment} isSaving={isLoggingPayment} data-testid="superadmin_invoices-superadmin-invoices-log-payment-modal-interactive-5"/> : null}
  </div>);
}
