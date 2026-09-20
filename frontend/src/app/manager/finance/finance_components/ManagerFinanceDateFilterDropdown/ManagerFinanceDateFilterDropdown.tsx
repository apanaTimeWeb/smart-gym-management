// RESPONSIBILITY: Renders finance-owned date-range controls and keeps them in finance URL state.
'use client';
import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MANAGER_FINANCE_DATE_RANGE_OPTIONS } from '@/app/manager/finance/finance_utils/ManagerFinanceDateFilterConstants';
import ManagerSearchableDropdown from '@/app/manager/manager_components/ManagerShared/ManagerSearchableDropdown';
import type { ManagerFinanceDateRange } from '@/app/manager/finance/finance_utils/ManagerFinanceDateFilterConstants';


function value(date: Date) { return date.toISOString().slice(0, 10); }
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

export default function ManagerFinanceDateFilterDropdown() {
  const router = useRouter(); const pathname = usePathname(); const searchParams = useSearchParams();
  const range = (searchParams.get('range') as ManagerFinanceDateRange | null) ?? 'this_month';
  const startDate = searchParams.get('startDate') ?? ''; const endDate = searchParams.get('endDate') ?? '';
  const update = useCallback((updates: Record<string, string | null>) => { const p = new URLSearchParams(searchParams.toString()); Object.entries(updates).forEach(([k,v]) => v ? p.set(k,v) : p.delete(k)); router.replace(`${pathname}${p.toString() ? `?${p.toString()}` : ''}`, {scroll:false}); }, [pathname, router, searchParams]);
  const onChange = (input: string | number) => { const next = input as ManagerFinanceDateRange; const d = dates(next); update({range:next,startDate:d.startDate||null,endDate:d.endDate||null}); };
  return <div className="flex flex-col sm:flex-row gap-2"><div className="w-full sm:w-48"><ManagerSearchableDropdown options={[...MANAGER_FINANCE_DATE_RANGE_OPTIONS]} value={range} onChange={onChange} className="bg-input" /></div>{range === 'custom' && <div className="grid grid-cols-2 gap-2"><label className="sr-only" htmlFor="manager-finance-start-date">Start date</label><input id="manager-finance-start-date" type="date" value={startDate} onChange={(e)=>update({startDate:e.target.value||null})} className="min-h-11 bg-input border border-border rounded-lg px-3 text-sm text-primary"/><label className="sr-only" htmlFor="manager-finance-end-date">End date</label><input id="manager-finance-end-date" type="date" value={endDate} onChange={(e)=>update({endDate:e.target.value||null})} className="min-h-11 bg-input border border-border rounded-lg px-3 text-sm text-primary"/></div>}</div>;
}
