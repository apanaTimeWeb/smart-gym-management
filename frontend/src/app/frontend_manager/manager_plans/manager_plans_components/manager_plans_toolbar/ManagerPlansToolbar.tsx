// RESPONSIBILITY: Renders ManagerPlansToolbar's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { MANAGER_PLANS_STATUS_FILTER_OPTIONS, MANAGER_PLANS_TIER_FILTER_OPTIONS } from '@/app/frontend_manager/manager_plans/manager_plans_constants/ManagerPlansConstants';
import { useManagerPlansLogic } from '@/app/frontend_manager/manager_plans/manager_plans_hooks/useManagerPlansLogic';


/** @description Renders search and filter controls for the plans list. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerPlansToolbar() {
  const t = useTranslations('MANAGER_PLANS');

  const { search, setSearch, tierFilter, setTierFilter, statusFilter, setStatusFilter } = useManagerPlansLogic();

  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="relative flex-1 max-w-xs">
        <Search size={18} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary"/>
        <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "w-full pl-9 pr-4 py-2 text-sm bg-input border border-border rounded-lg text-primary focus-visible:outline-none focus-visible:border-primary"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_plans-manager-plans-main-input-text"
          type="text"
          placeholder={t("COPY_SEARCH_PLANS")}
          value={search}
          onChange={e => setSearch(e.target.value)}
          
        />
      </div>
      <select className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "px-3 py-2 bg-input border border-border rounded-lg text-sm text-primary focus-visible:outline-none focus-visible:border-primary"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_plans-manager-plans-main-select-option-1"
        value={tierFilter}
        onChange={e => setTierFilter(e.target.value)}
        
      >
        {MANAGER_PLANS_TIER_FILTER_OPTIONS.map((option) => <option key={option.value} value={option.value} data-testid="manager_plans-managerplanstoolbar-section-filters">{t(option.labelKey)}</option>)}
      </select>
      <select className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "px-3 py-2 bg-input border border-border rounded-lg text-sm text-primary focus-visible:outline-none focus-visible:border-primary"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_plans-manager-plans-main-select-option-2"
        value={statusFilter}
        onChange={e => setStatusFilter(e.target.value)}
        
      >
        {MANAGER_PLANS_STATUS_FILTER_OPTIONS.map((option) => <option key={option.value} value={option.value} data-testid="manager_plans-managerplanstoolbar-section-actions">{t(option.labelKey)}</option>)}
      </select>
    </div>
  );
}
