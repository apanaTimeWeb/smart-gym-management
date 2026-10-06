// RESPONSIBILITY: Renders ManagerReportsDateFilterDropdown's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';
import { MANAGER_REPORTS_DATE_RANGE_OPTIONS } from '@/app/frontend_manager/manager_reports/manager_reports_constants/ManagerReportsDateFilterConstants';
import type { ManagerReportsDateRange } from '@/app/frontend_manager/manager_reports/manager_reports_constants/ManagerReportsDateFilterConstants';

/** @description Renders the ManagerReportsDateFilterDropdown component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (3 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerReportsDateFilterDropdown() {
  const router=useRouter(); const pathname=usePathname(); const searchParams=useSearchParams(); const range=(searchParams.get('range') as ManagerReportsDateRange | null)??'this_month';
  const update=useCallback((next:string)=>{const p=new URLSearchParams(searchParams.toString()); if(next==='this_month')p.delete('range');else p.set('range',next);router.replace(`${pathname}${p.toString()?`?${p.toString()}`:''}`,{scroll:false});},[pathname,router,searchParams]);
  return <div className="w-full sm:w-48"><ManagerSearchableDropdown dataTestId="manager_reports-managerreportsdatefilterdropdown-managersearchabledropdown-1" options={[...MANAGER_REPORTS_DATE_RANGE_OPTIONS]} value={range} onChange={(v)=>update(String(v))} className="bg-input" data-testid="manager_reports-managerreportsdatefilterdropdown-searchable-dropdown-1"/></div>;
}
