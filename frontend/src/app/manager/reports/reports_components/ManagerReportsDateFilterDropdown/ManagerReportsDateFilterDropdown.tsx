// RESPONSIBILITY: Renders reports-owned date-range controls and synchronizes the selected range to URL state.
'use client';
import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ManagerSearchableDropdown from '@/app/manager/manager_components/ManagerShared/ManagerSearchableDropdown';
import { MANAGER_REPORTS_DATE_RANGE_OPTIONS } from '@/app/manager/reports/reports_utils/ManagerReportsDateFilterConstants';
import type { ManagerReportsDateRange } from '@/app/manager/reports/reports_utils/ManagerReportsDateFilterConstants';

export default function ManagerReportsDateFilterDropdown() {
  const router=useRouter(); const pathname=usePathname(); const searchParams=useSearchParams(); const range=(searchParams.get('range') as ManagerReportsDateRange | null)??'this_month';
  const update=useCallback((next:string)=>{const p=new URLSearchParams(searchParams.toString()); if(next==='this_month')p.delete('range');else p.set('range',next);router.replace(`${pathname}${p.toString()?`?${p.toString()}`:''}`,{scroll:false});},[pathname,router,searchParams]);
  return <div className="w-full sm:w-48"><ManagerSearchableDropdown options={[...MANAGER_REPORTS_DATE_RANGE_OPTIONS]} value={range} onChange={(v)=>update(String(v))} className="bg-input"/></div>;
}
