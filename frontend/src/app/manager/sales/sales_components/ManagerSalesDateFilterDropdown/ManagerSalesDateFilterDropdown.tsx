// RESPONSIBILITY: Renders sales-owned date-range controls and synchronizes the selected range to sales URL state.
'use client';
import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ManagerSearchableDropdown from '@/app/manager/manager_components/ManagerShared/ManagerSearchableDropdown';
import { MANAGER_SALES_DATE_RANGE_OPTIONS } from '@/app/manager/sales/sales_utils/ManagerSalesDateFilterConstants';
import type { ManagerSalesDateRange } from '@/app/manager/sales/sales_utils/ManagerSalesDateFilterConstants';


function toDateInputValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function resolvePresetDates(range: ManagerSalesDateRange): { startDate: string; endDate: string } {
  const now = new Date();
  switch (range) {
    case 'this_month':
      return {
        startDate: toDateInputValue(new Date(now.getFullYear(), now.getMonth(), 1)),
        endDate: toDateInputValue(new Date(now.getFullYear(), now.getMonth() + 1, 0)),
      };
    case 'last_month':
      return {
        startDate: toDateInputValue(new Date(now.getFullYear(), now.getMonth() - 1, 1)),
        endDate: toDateInputValue(new Date(now.getFullYear(), now.getMonth(), 0)),
      };
    case 'last_3_months':
      return {
        startDate: toDateInputValue(new Date(now.getFullYear(), now.getMonth() - 3, 1)),
        endDate: toDateInputValue(new Date(now.getFullYear(), now.getMonth() + 1, 0)),
      };
    case 'last_6_months':
      return {
        startDate: toDateInputValue(new Date(now.getFullYear(), now.getMonth() - 6, 1)),
        endDate: toDateInputValue(new Date(now.getFullYear(), now.getMonth() + 1, 0)),
      };
    case 'this_year':
      return {
        startDate: toDateInputValue(new Date(now.getFullYear(), 0, 1)),
        endDate: toDateInputValue(new Date(now.getFullYear(), 11, 31)),
      };
    case 'custom':
      return { startDate: '', endDate: '' };
  }
}

export default function ManagerSalesDateFilterDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const range = (searchParams.get('range') as ManagerSalesDateRange | null) ?? 'this_month';
  const startDate = searchParams.get('startDate') ?? '';
  const endDate = searchParams.get('endDate') ?? '';

  const updateUrl = useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    router.replace(`${pathname}${params.toString() ? `?${params.toString()}` : ''}`, { scroll: false });
  }, [pathname, router, searchParams]);

  const handleRangeChange = useCallback((input: string | number) => {
    const selected = input as ManagerSalesDateRange;
    const dates = resolvePresetDates(selected);
    updateUrl({
      range: selected,
      startDate: dates.startDate || null,
      endDate: dates.endDate || null,
    });
  }, [updateUrl]);

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="w-full sm:w-48">
        <ManagerSearchableDropdown
          options={[...MANAGER_SALES_DATE_RANGE_OPTIONS]}
          value={range}
          onChange={handleRangeChange}
          className="bg-input"
        />
      </div>
      {range === 'custom' && (
        <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
          <label className="sr-only" htmlFor="manager-sales-start-date">Start date</label>
          <input
            id="manager-sales-start-date"
            type="date"
            value={startDate}
            onChange={(event) => updateUrl({ range: 'custom', startDate: event.target.value || null })}
            className="min-h-11 bg-input border border-border rounded-lg px-3 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
          <label className="sr-only" htmlFor="manager-sales-end-date">End date</label>
          <input
            id="manager-sales-end-date"
            type="date"
            value={endDate}
            onChange={(event) => updateUrl({ range: 'custom', endDate: event.target.value || null })}
            className="min-h-11 bg-input border border-border rounded-lg px-3 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>
      )}
    </div>
  );
}
