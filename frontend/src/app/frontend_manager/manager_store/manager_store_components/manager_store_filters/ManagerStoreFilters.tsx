// RESPONSIBILITY: Renders ManagerStoreFilters's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useTranslations } from 'next-intl';
import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';
import { useManagerStoreLogic } from '@/app/frontend_manager/manager_store/manager_store_hooks/useManagerStoreLogic';
import type { ManagerStoreSortOrder } from '@/app/frontend_manager/manager_store/manager_store_types/ManagerStoreTypes';


/** @description Renders the ManagerStoreFilters component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (3 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerStoreFilters() {
  const t = useTranslations('MANAGER_STORE');

  const { startDate, setStartDate, endDate, setEndDate, sortOrder, setSortOrder } = useManagerStoreLogic();

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card p-4 border-b border-border">
      <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
        <div className="flex flex-col">
          <label htmlFor="manager-managerstorefilters-field-1" className="text-xs text-secondary uppercase font-semibold mb-1">{t("COPY_START_DATE")}</label>
          <input id="manager-managerstorefilters-field-1" className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "text-sm px-3 py-2 rounded-lg border border-border bg-input text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_store-manager-store-filters-input-date-1" 
            type="date" 
            value={startDate} 
            onChange={e => setStartDate(e.target.value)} 
            
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="manager-managerstorefilters-field-2" className="text-xs text-secondary uppercase font-semibold mb-1">{t("COPY_END_DATE")}</label>
          <input id="manager-managerstorefilters-field-2" className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "text-sm px-3 py-2 rounded-lg border border-border bg-input text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_store-manager-store-filters-input-date-2" 
            type="date" 
            value={endDate} 
            onChange={e => setEndDate(e.target.value)} 
            
          />
        </div>
      </div>
      <div className="flex flex-col w-full sm:w-auto">
        <label htmlFor="manager-managerstorefilters-field-3" className="text-xs text-secondary uppercase font-semibold mb-1">{t("COPY_SORT_DATE")}</label>
        <ManagerSearchableDropdown ariaLabel={t("COPY_SORT_DATE")} dataTestId="manager_store-managerstorefilters-managersearchabledropdown-1"
          value={sortOrder}
          onChange={(val) => setSortOrder(String(val) as ManagerStoreSortOrder)}
          options={[
            { label: t("COPY_NEWEST_FIRST"), value: 'DESC' },
            { label: t("COPY_OLDEST_FIRST"), value: 'ASC' }
          ]}
         data-testid="manager_store-managerstorefilters-searchable-dropdown-1"/>
      </div>
    </div>
  );
}
