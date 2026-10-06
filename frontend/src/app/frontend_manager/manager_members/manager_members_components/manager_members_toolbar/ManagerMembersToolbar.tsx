// RESPONSIBILITY: Renders ManagerMembersToolbar's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useState } from 'react';
import { useManagerDebouncedValueCommit } from '@/app/frontend_manager/manager_infrastructure/useManagerDebouncedValueCommit';
import { Search, RefreshCw, Plus, Download, Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';
import { MEMBER_EXPORT_FORMATS } from '@/app/frontend_manager/manager_members/manager_members_constants/ManagerMembersSharedConstants';
import { MEMBER_STATUS_OPTIONS, MEMBER_GENDER_OPTIONS } from '@/app/frontend_manager/manager_members/manager_members_constants/ManagerMembersUiConstants';
import { useManagerMembersLogic } from '@/app/frontend_manager/manager_members/manager_members_hooks/useManagerMembersLogic';
import { useFetchPlans } from '@/app/frontend_manager/manager_members/manager_members_hooks/useManagerMembersQueries';


/** @description Renders the ManagerMembersToolbar component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (5 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerMembersToolbar() {
  const t = useTranslations('MANAGER_MEMBERS');

  const {
    search, debouncedSearch, setSearch,
    statusFilter, setStatusFilter,
    genderFilter, setGenderFilter,
    planFilter, setPlanFilter,
    expiryFrom, expiryTo, setExpiryRange,
    sortColumn, sortDirection,
    openAdd, currentPage, exportMembers
  } = useManagerMembersLogic();
  const { data: plansData } = useFetchPlans();
  const plans = plansData || [];
  const [localSearch, setLocalSearch] = useState(search);
  const [prevSearch, setPrevSearch] = useState(search);

  if (search !== prevSearch) {
    setPrevSearch(search);
    setLocalSearch(search);
  }


  const handleRefresh = () => {
    // Refresh is handled by re-querying; search reset triggers requery
    setSearch('');
  };

  // Build plan options dynamically from live plan list (Rule 3B — no hardcoded plans)
  const planOptions = [
    { label: t("COPY_ALL_PLANS"), value: 'All' },
    ...plans.map(p => ({ label: p.name, value: p.id })),
  ];

  useManagerDebouncedValueCommit(localSearch, search, setSearch, 300);

  return (
    <div className="bg-card rounded-xl shadow-card border border-border p-4 flex flex-col gap-3 motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
      {/* Row 1: Search + Primary Actions */}
      <div className="flex flex-col lg:flex-row gap-3 items-start lg:items-center justify-between">
        <div className="relative w-full lg:w-72">
          <Search size={18} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
          <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "pl-9 pr-3 py-2.5 border border-border rounded-xl text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page w-full bg-input text-primary"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-members-toolbar-input-value"
            value={localSearch}
            onChange={e => setLocalSearch(e.target.value)}
            placeholder={t("COPY_SEARCH_NAME_PHONE")}
            
          />
        </div>
        <div className="flex flex-wrap gap-2 w-full lg:w-auto">
          <button data-testid="manager_members-members-toolbar-refresh"
            onClick={handleRefresh}
            className="flex justify-center items-center gap-2 px-3 py-2.5 text-sm border border-border rounded-xl hover:opacity-80 text-primary w-full sm:w-auto motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"
          >
            <RefreshCw size={18} strokeWidth={2}/>{t("COPY_REFRESH")}</button>
          {/* Export buttons — CRITICAL FIX */}
          {MEMBER_EXPORT_FORMATS.map((fmt, mapIndex) => (
            <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "flex justify-center items-center gap-2 px-3 py-2.5 text-sm border border-border rounded-xl hover:bg-primary-subtle text-secondary hover:text-primary motion-safe:transition-all w-full sm:w-auto motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_members-members-managermemberstoolbar-button-exportmembers-${mapIndex}`}
              key={fmt.value}
              onClick={() => void exportMembers(fmt.value)}
              
              aria-label={fmt.label}
            >
              <Download size={18} strokeWidth={2}/> {fmt.label}
            </button>
          ))}
          <button data-testid="manager_members-members-toolbar-add"
            onClick={openAdd}
            className="flex justify-center items-center gap-2 px-4 py-2.5 text-sm font-semibold text-on-primary bg-primary rounded-xl motion-safe:transition-all hover:bg-primary-hover w-full sm:w-auto motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"
          >
            <Plus size={18} strokeWidth={2}/>{t("COPY_ADD_MEMBER")}</button>
        </div>
      </div>

      {/* Row 2: Filters — CRITICAL FIX */}
      <div className="flex flex-wrap gap-2 items-center">
        {/* Status filter */}
        <ManagerSearchableDropdown dataTestId="manager_members-managermemberstoolbar-managersearchabledropdown-1"
          value={statusFilter}
          onChange={(val) => setStatusFilter(String(val))}
          className="w-full sm:w-44"
          options={MEMBER_STATUS_OPTIONS}
          placeholder={t("COPY_FILTER_STATUS")}
         data-testid="manager_members-managermemberstoolbar-searchable-dropdown-1"/>
        {/* Gender filter — CRITICAL FIX */}
        <ManagerSearchableDropdown dataTestId="manager_members-managermemberstoolbar-managersearchabledropdown-2"
          value={genderFilter}
          onChange={(val) => setGenderFilter(String(val))}
          className="w-full sm:w-40"
          options={MEMBER_GENDER_OPTIONS}
          placeholder={t("COPY_FILTER_GENDER")}
         data-testid="manager_members-managermemberstoolbar-searchable-dropdown-2"/>
        {/* Plan filter — CRITICAL FIX */}
        <ManagerSearchableDropdown dataTestId="manager_members-managermemberstoolbar-managersearchabledropdown-3"
          value={planFilter}
          onChange={(val) => setPlanFilter(String(val))}
          className="w-full sm:w-44"
          options={planOptions}
          placeholder={t("COPY_FILTER_PLAN")}
         data-testid="manager_members-managermemberstoolbar-searchable-dropdown-3"/>
        {/* Expiry Date Range — CRITICAL FIX */}
        <div className="flex items-center gap-1.5 border border-border rounded-xl px-3 py-1.5 bg-input text-sm w-full sm:w-auto">
          <Calendar size={18} strokeWidth={2} className="text-secondary shrink-0" data-testid="manager_members-managermemberstoolbar-interactive"/>
          <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "bg-transparent text-secondary focus-visible:outline-none text-xs"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-members-toolbar-input-date-1"
            type="date"
            value={expiryFrom}
            onChange={e => setExpiryRange(e.target.value, expiryTo)}
            
            title={t("COPY_EXPIRY_3")}
            aria-label={t("COPY_EXPIRY_DATE_3")}
          />
          <span className="text-secondary text-xs">–</span>
          <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "bg-transparent text-secondary focus-visible:outline-none text-xs"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-members-toolbar-input-date-2"
            type="date"
            value={expiryTo}
            onChange={e => setExpiryRange(expiryFrom, e.target.value)}
            
            title={t("COPY_EXPIRY_2")}
            aria-label={t("COPY_EXPIRY_DATE_1")}
          />
        </div>
      </div>
    </div>
  );
}
