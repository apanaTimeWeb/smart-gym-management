// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';
import { Search, Download, FileText, RefreshCw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';
import ManagerFinanceDateFilterDropdown from '@/app/frontend_manager/manager_finance/manager_finance_components/manager_finance_date_filter_dropdown/ManagerFinanceDateFilterDropdown';
import { FINANCE_METHOD_FILTER_OPTIONS, FINANCE_STATUS_FILTER_OPTIONS } from '@/app/frontend_manager/manager_finance/manager_finance_constants/ManagerFinanceSharedConstants';
import { useManagerFinanceLogic } from '@/app/frontend_manager/manager_finance/manager_finance_hooks/useManagerFinanceLogic';


/** @description Renders the ManagerFinanceFilters component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (3 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerFinanceFilters() {
  const t = useTranslations('MANAGER_FINANCE');

  const {
    search, setSearch,
    statusFilter, setStatusFilter,
    methodFilter, setMethodFilter,
    setCurrentPage, reload, exportCSV, exportPDF
  } = useManagerFinanceLogic();

  return (
    <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-3 p-4 border-b border-border">
      <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
        <div className="relative w-full sm:w-64">
          <Search size={18} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary"/>
          <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "w-full pl-9 pr-4 py-2 text-sm bg-input border border-border rounded-lg text-primary focus-visible:outline-none focus-visible:border-primary"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_finance-manager-finance-main-input-text"
            type="text"
            placeholder={t("COPY_SEARCH_PAYMENTS")}
            value={search}
            onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
            
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <ManagerFinanceDateFilterDropdown  data-testid="manager_finance-managerfinancefilters-finance-date-filter-dropdown-1"/>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 w-full xl:w-auto justify-start xl:justify-end">
        <div className="w-40">
          <ManagerSearchableDropdown dataTestId="manager_finance-managerfinancefilters-managersearchabledropdown-1"
            value={statusFilter}
            onChange={(val) => { setStatusFilter(val.toString()); setCurrentPage(1); }}
            options={FINANCE_STATUS_FILTER_OPTIONS.map((option) => ({
              value: option.value,
              label: t(option.labelKey),
            }))}
            className="bg-input"
           data-testid="manager_finance-managerfinancefilters-searchable-dropdown-1"/>
        </div>
        <div className="w-44">
          <ManagerSearchableDropdown dataTestId="manager_finance-managerfinancefilters-managersearchabledropdown-2"
            value={methodFilter}
            onChange={(val) => { setMethodFilter(val.toString()); setCurrentPage(1); }}
            options={FINANCE_METHOD_FILTER_OPTIONS.map((option) => ({
              value: option.value,
              label: t(option.labelKey),
            }))}
            className="bg-input"
           data-testid="manager_finance-managerfinancefilters-searchable-dropdown-2"/>
        </div>
        <button data-testid="manager_finance-manager-finance-main-export-csv" onClick={exportCSV}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg bg-primary text-on-primary motion-safe:transition-all hover:bg-primary-hover motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110">
          <Download size={18} strokeWidth={2}/>{t("COPY_CSV")}</button>
        <button data-testid="manager_finance-manager-finance-main-export-pdf" onClick={exportPDF}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg bg-info text-on-info motion-safe:transition-all hover:brightness-110 motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110">
          <FileText size={18} strokeWidth={2}/>{t("COPY_PDF")}</button>
        <button data-testid="manager_finance-manager-finance-main-reload" onClick={reload}
          className="min-w-32 flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-input border border-border text-secondary hover:text-primary motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110">
          <RefreshCw size={18} strokeWidth={2}/>{t("COPY_REFRESH")}</button>
      </div>
    </div>
  );
}
