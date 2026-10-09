"use client";
// RESPONSIBILITY: Renders the Dashboard-owned URL date-range control; API/query behavior remains in Dashboard query/API layers.
import { Calendar } from 'lucide-react';

import { useTranslations } from 'next-intl';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { TRAINER_DASHBOARD_DATE_RANGE_OPTIONS } from '@/app/frontend_trainer/trainer_dashboard/trainer_dashboard_utils/TrainerDashboardDateRangeConstants';

import { TrainerDashboardResolveDateRange } from '@/app/frontend_trainer/trainer_dashboard/trainer_dashboard_utils/TrainerDashboardResolveDateRange';

import type { TrainerDashboardDateField } from '@/app/frontend_trainer/trainer_dashboard/trainer_dashboard_types/TrainerDashboardDateRangeTypes';

import type { TrainerDashboardDateRange } from '@/app/frontend_trainer/trainer_dashboard/trainer_dashboard_types/TrainerDashboardDateRangeTypes';

import type { ChangeEvent } from 'react';

/**
 * @description Renders the Dashboard-owned URL date-range control; API/query behavior remains in Dashboard query/API layers.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders the dashboard feature's filtering and control surface, preserving URL/query state and accessible interaction semantics.
 * @dependencies Uses only documented dashboard module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerDashboardDateFilterDropdown() {
  const t = useTranslations('TRAINER_DASHBOARD');
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
      const { startDate, endDate } = TrainerDashboardResolveDateRange(newRange);
      params.set('startDate', startDate);
      params.set('endDate', endDate);
    }
    pushParams(params);
  };

  const handleDateChange = (key: TrainerDashboardDateField, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('range', 'custom');
    if (value) params.set(key, value); else params.delete(key);
    pushParams(params);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center ">
      <div className="relative min-w-40 ">
        <Calendar size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none " aria-hidden="true"  strokeWidth={2}/>
        <label className="sr-only " htmlFor="trainer-dashboard-range">{t("TEXT_DASHBOARD_DATE_RANGE")}</label>
        <select
          id="trainer-dashboard-range"
          value={currentRange}
          onChange={handleRangeChange}
          className="w-full ps-9 pe-8 py-2 text-sm bg-input border border-border rounded-lg text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary appearance-none cursor-pointer  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
         data-testid="trainer_dashboard-dashboard-main_date_range">
          {TRAINER_DASHBOARD_DATE_RANGE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value} data-testid={`trainer_dashboard-date-filter_dropdown_option${option.value}`}>{t(option.labelKey)}</option>
          ))}
        </select>
      </div>
      {currentRange === 'custom' && (
        <div className="flex items-center gap-2 ">
          <label className="sr-only " htmlFor="trainer-dashboard-start-date">{t("TEXT_DASHBOARD_START_DATE")}</label>
          <input id="trainer-dashboard-start-date" type="date" value={customStartDate} onChange={(event) => handleDateChange('startDate', event.target.value)} className="px-3 py-2 text-sm bg-input border border-border rounded-lg text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"  data-testid="trainer_dashboard-dashboard-main_start_date"/>
          <span className="text-secondary text-sm font-medium " aria-hidden="true">{t("TEXT_TO")}</span>
          <label className="sr-only " htmlFor="trainer-dashboard-end-date">{t("TEXT_DASHBOARD_END_DATE")}</label>
          <input id="trainer-dashboard-end-date" type="date" value={customEndDate} onChange={(event) => handleDateChange('endDate', event.target.value)} className="px-3 py-2 text-sm bg-input border border-border rounded-lg text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"  data-testid="trainer_dashboard-dashboard-main_end_date"/>
        </div>
      )}
    </div>
  );
}
