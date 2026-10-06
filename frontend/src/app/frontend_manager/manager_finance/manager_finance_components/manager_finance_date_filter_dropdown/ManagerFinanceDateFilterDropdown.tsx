// RESPONSIBILITY: Renders ManagerFinanceDateFilterDropdown's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';
import { MANAGER_FINANCE_DATE_RANGE_OPTIONS } from '@/app/frontend_manager/manager_finance/manager_finance_constants/ManagerFinanceDateFilterConstants';
import type { ManagerFinanceDateRange } from '@/app/frontend_manager/manager_finance/manager_finance_constants/ManagerFinanceDateFilterConstants';


/**
 * @description Provides the `value` transformation used by the owning Manager feature. Keeps display/domain shaping local so components remain focused on rendering and interaction orchestration.
 * @dependencies Uses only the values and module constants visible in this file; it does not call APIs or cross feature boundaries.
 * @edge-case Handles missing, empty, nullable, and boundary inputs according to the caller's documented UI contract without inventing business data.
 */
function value(date: Date) { return date.toISOString().slice(0, 10); }
/**
 * @description Provides the `dates` transformation used by the owning Manager feature. Keeps display/domain shaping local so components remain focused on rendering and interaction orchestration.
 * @dependencies Uses only the values and module constants visible in this file; it does not call APIs or cross feature boundaries.
 * @edge-case Handles missing, empty, nullable, and boundary inputs according to the caller's documented UI contract without inventing business data.
 */
function dates(range: ManagerFinanceDateRange) {
  const now = new Date();
  switch (range) {
    case 'this_month': return { startDate: value(new Date(now.getFullYear(), now.getMonth(), 1)), endDate: value(new Date(now.getFullYear(), now.getMonth() + 1, 0)) };
    case 'last_month': return { startDate: value(new Date(now.getFullYear(), now.getMonth() - 1, 1)), endDate: value(new Date(now.getFullYear(), now.getMonth(), 0)) };
    case 'last_3_months': return { startDate: value(new Date(now.getFullYear(), now.getMonth() - 3, 1)), endDate: value(new Date(now.getFullYear(), now.getMonth() + 1, 0)) };
    case 'last_6_months': return { startDate: value(new Date(now.getFullYear(), now.getMonth() - 6, 1)), endDate: value(new Date(now.getFullYear(), now.getMonth() + 1, 0)) };
    case 'this_year': return { startDate: value(new Date(now.getFullYear(), 0, 1)), endDate: value(new Date(now.getFullYear(), 11, 31)) };
    default: return { startDate: '', endDate: '' };
  }
}

/** @description Renders the ManagerFinanceDateFilterDropdown component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (3 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerFinanceDateFilterDropdown() {
  const t = useTranslations('MANAGER_FINANCE');

  const router = useRouter(); const pathname = usePathname(); const searchParams = useSearchParams();
  const range = (searchParams.get('range') as ManagerFinanceDateRange | null) ?? 'this_month';
  const startDate = searchParams.get('startDate') ?? ''; const endDate = searchParams.get('endDate') ?? '';
  const update = useCallback((updates: Record<string, string | null>) => { const p = new URLSearchParams(searchParams.toString()); Object.entries(updates).forEach(([k,v]) => v ? p.set(k,v) : p.delete(k)); router.replace(`${pathname}${p.toString() ? `?${p.toString()}` : ''}`, {scroll:false}); }, [pathname, router, searchParams]);
  const onChange = (input: string | number) => { const next = input as ManagerFinanceDateRange; const d = dates(next); update({range:next,startDate:d.startDate||null,endDate:d.endDate||null}); };
  return <div className="flex flex-col sm:flex-row gap-2"><div className="w-full sm:w-48"><ManagerSearchableDropdown dataTestId="manager_finance-managerfinancedatefilterdropdown-managersearchabledropdown-1" options={[...MANAGER_FINANCE_DATE_RANGE_OPTIONS]} value={range} onChange={onChange} className="bg-input"  data-testid="manager_finance-managerfinancedatefilterdropdown-searchable-dropdown-1"/></div>{range === 'custom' && <div className="grid grid-cols-2 gap-2"><label className="sr-only" htmlFor="manager-finance-start-date">{t("COPY_START_DATE")}</label><input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 bg-input border border-border rounded-lg px-3 text-sm text-primary"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_finance-manager-finance-date-filter-dropdown-manager-finance-start-date" id="manager-finance-start-date" type="date" value={startDate} onChange={(e)=>update({startDate:e.target.value||null})} /><label className="sr-only" htmlFor="manager-finance-end-date">{t("COPY_END_DATE")}</label><input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 bg-input border border-border rounded-lg px-3 text-sm text-primary"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_finance-manager-finance-date-filter-dropdown-manager-finance-end-date" id="manager-finance-end-date" type="date" value={endDate} onChange={(e)=>update({endDate:e.target.value||null})} /></div>}</div>;
}
