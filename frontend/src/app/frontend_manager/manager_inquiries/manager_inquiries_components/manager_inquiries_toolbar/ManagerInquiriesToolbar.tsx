// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';
import { useState } from 'react';
import { useManagerDebouncedValueCommit } from '@/app/frontend_manager/manager_infrastructure/useManagerDebouncedValueCommit';
import { RefreshCw, Plus, MessageCircle, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';
import { MANAGER_INQUIRY_CONVERTED_STATUS } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_constants/ManagerInquiriesConstants';
import { INQUIRIES_STATUS_LABELS } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_constants/ManagerInquiriesSharedConstants';
import { useManagerInquiriesLogic } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_hooks/useManagerInquiriesLogic';


/** @description Renders the ManagerInquiriesToolbar component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (3 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerInquiriesToolbar() {
  const t = useTranslations('MANAGER_INQUIRIES');

  const { search, setSearch, statusFilter, setStatusFilter, openAdd, selectedIds, clearSelection, openBulkMsg, setCurrentPage, refresh } = useManagerInquiriesLogic();
  const [prevSearch, setPrevSearch] = useState(search);
  const [localSearch, setLocalSearch] = useState(search);

  if (search !== prevSearch) {
    setPrevSearch(search);
    setLocalSearch(search);
  }


  if (selectedIds.length > 0) {
    return (
      <div className="bg-primary-subtle border border-focus rounded-xl p-4 flex flex-wrap gap-3 items-center justify-between motion-safe:transition-all motion-safe:duration-base ease-in-out">
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-semibold text-primary">
            {selectedIds.length} {selectedIds.length === 1 ? 'inquiry' : 'inquiries'}{t("COPY_SELECTED")}</span>
          <button data-testid="manager_inquiries-manager-inquiries-toolbar-selection" onClick={clearSelection} className="text-sm font-medium text-secondary hover:text-primary motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110">{t("COPY_CLEAR_SELECTION")}</button>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-on-success rounded-xl bg-success motion-safe:transition-all hover:bg-primary-hover motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_inquiries-manager-inquiries-toolbar-button-action-1"
            onClick={() => openBulkMsg('whatsapp')}
            
          >
            <MessageCircle size={18} strokeWidth={2}/>{t("COPY_BULK_WHATSAPP")}</button>
          <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-on-info rounded-xl bg-info motion-safe:transition-all hover:bg-primary-hover motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_inquiries-manager-inquiries-toolbar-button-action-2"
            onClick={() => openBulkMsg('email')}
            
          >
            <Mail size={18} strokeWidth={2}/>{t("COPY_BULK_EMAIL")}</button>
        </div>
      </div>
    );
  }

  useManagerDebouncedValueCommit(localSearch, search, setSearch, 300);

  return (
    <div className="bg-card rounded-xl shadow-card border border-border p-4 flex flex-wrap gap-3 items-center justify-between motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
      <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "border border-border rounded-xl px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page  w-full sm:w-64  bg-input text-primary"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_inquiries-manager-inquiries-toolbar-input-value"
        value={localSearch}
        onChange={e => setLocalSearch(e.target.value)}
        placeholder={t("COPY_SEARCH_NAME_PHONE")}
        
      />
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <div className="w-48">
          <ManagerSearchableDropdown dataTestId="manager_inquiries-managerinquiriestoolbar-managersearchabledropdown-1"
            value={statusFilter}
            onChange={(val) => setStatusFilter(String(val))}
            options={[
              { label: t("COPY_ALL_STATUS"), value: t('COPY_ALL') },
              ...Object.entries(INQUIRIES_STATUS_LABELS)
                .filter(([val]) => val !== MANAGER_INQUIRY_CONVERTED_STATUS)
                .map(([val, label]) => ({ label, value: val })),
            ]}
           data-testid="manager_inquiries-managerinquiriestoolbar-searchable-dropdown-1"/>
        </div>
        <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-w-32 flex items-center gap-2 px-3 py-2.5 text-sm border border-border rounded-xl motion-safe:transition-all text-secondary motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_inquiries-manager-inquiries-toolbar-button-refresh"
          onClick={() => void refresh()}
          
          aria-label={t("COPY_REFRESH_INQUIRIES")}
        >
          <RefreshCw size={18} strokeWidth={2} />
        </button>
        <button data-testid="manager_inquiries-manager-inquiries-toolbar-add"
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-on-primary bg-primary rounded-xl hover:bg-primary-hover motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 ease-in-out focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"
        >
          <Plus size={18} strokeWidth={2}/>{t("COPY_ADD_INQUIRY")}</button>
      </div>
    </div>
  );
}
