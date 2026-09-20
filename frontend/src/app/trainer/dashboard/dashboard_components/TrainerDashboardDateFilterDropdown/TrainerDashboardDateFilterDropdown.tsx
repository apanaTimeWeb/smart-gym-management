'use client';
// RESPONSIBILITY: Renders the Dashboard-owned URL date-range control; API/query behavior remains in Dashboard query/API layers.
import type { ChangeEvent } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Calendar } from 'lucide-react';
import { TRAINER_DASHBOARD_DATE_RANGE_OPTIONS, type TrainerDashboardDateRange } from '@/app/trainer/dashboard/dashboard_utils/TrainerDashboardDateRangeConstants';
import { resolveTrainerDashboardDateRange } from '@/app/trainer/dashboard/dashboard_utils/TrainerDashboardDateRangeUtils';

export default function TrainerDashboardDateFilterDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentRange = (searchParams.get('range') ?? 'this_month') as TrainerDashboardDateRange;
  const customStartDate = searchParams.get('startDate') ?? '';
  const customEndDate = searchParams.get('endDate') ?? '';

  const pushParams = (params: URLSearchParams) => {
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleRangeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newRange = event.target.value as TrainerDashboardDateRange;
    const params = new URLSearchParams(searchParams.toString());
    params.set('range', newRange);
    if (newRange === 'custom') {
      params.delete('startDate');
      params.delete('endDate');
    } else {
      const { startDate, endDate } = resolveTrainerDashboardDateRange(newRange);
      params.set('startDate', startDate);
      params.set('endDate', endDate);
    }
    pushParams(params);
  };

  const handleDateChange = (key: 'startDate' | 'endDate', value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('range', 'custom');
    if (value) params.set(key, value); else params.delete(key);
    pushParams(params);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
      <div className="relative min-w-40">
        <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" aria-hidden="true" />
        <label className="sr-only" htmlFor="trainer-dashboard-range">Dashboard date range</label>
        <select
          id="trainer-dashboard-range"
          value={currentRange}
          onChange={handleRangeChange}
          className="w-full pl-9 pr-8 py-2 text-sm bg-input border border-border rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
        >
          {TRAINER_DASHBOARD_DATE_RANGE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      {currentRange === 'custom' && (
        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor="trainer-dashboard-start-date">Dashboard start date</label>
          <input id="trainer-dashboard-start-date" type="date" value={customStartDate} onChange={(event) => handleDateChange('startDate', event.target.value)} className="px-3 py-2 text-sm bg-input border border-border rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-primary" />
          <span className="text-secondary text-sm font-medium" aria-hidden="true">to</span>
          <label className="sr-only" htmlFor="trainer-dashboard-end-date">Dashboard end date</label>
          <input id="trainer-dashboard-end-date" type="date" value={customEndDate} onChange={(event) => handleDateChange('endDate', event.target.value)} className="px-3 py-2 text-sm bg-input border border-border rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
      )}
    </div>
  );
}
