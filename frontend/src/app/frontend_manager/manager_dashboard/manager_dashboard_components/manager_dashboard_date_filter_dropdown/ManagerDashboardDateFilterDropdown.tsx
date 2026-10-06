// RESPONSIBILITY: Renders ManagerDashboardDateFilterDropdown's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useCallback } from 'react';
import { useTranslations } from 'next-intl';
import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';
import { MANAGER_DASHBOARD_DATE_RANGE_OPTIONS } from '@/app/frontend_manager/manager_dashboard/manager_dashboard_constants/ManagerDashboardDateFilterConstants';
import { useManagerDashboardUrlState } from '@/app/frontend_manager/manager_dashboard/manager_dashboard_hooks/useManagerDashboardUrlState';
import type { ManagerDashboardDateRange, ManagerDashboardDateField } from '@/app/frontend_manager/manager_dashboard/manager_dashboard_constants/ManagerDashboardDateFilterConstants';


/**
 * @description Provides the `toDateInputValue` transformation used by the owning Manager feature. Keeps display/domain shaping local so components remain focused on rendering and interaction orchestration.
 * @dependencies Uses only the values and module constants visible in this file; it does not call APIs or cross feature boundaries.
 * @edge-case Handles missing, empty, nullable, and boundary inputs according to the caller's documented UI contract without inventing business data.
 */
function toDateInputValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * @description Provides the `resolvePresetDates` transformation used by the owning Manager feature. Keeps display/domain shaping local so components remain focused on rendering and interaction orchestration.
 * @dependencies Uses only the values and module constants visible in this file; it does not call APIs or cross feature boundaries.
 * @edge-case Handles missing, empty, nullable, and boundary inputs according to the caller's documented UI contract without inventing business data.
 */
function resolvePresetDates(range: ManagerDashboardDateRange): { startDate: string; endDate: string } {
  const today = new Date();
  switch (range) {
    case 'weekly': {
      const start = new Date(today);
      start.setDate(today.getDate() - 6);
      return { startDate: toDateInputValue(start), endDate: toDateInputValue(today) };
    }
    case 'monthly':
      return {
        startDate: toDateInputValue(new Date(today.getFullYear(), today.getMonth(), 1)),
        endDate: toDateInputValue(new Date(today.getFullYear(), today.getMonth() + 1, 0)),
      };
    case 'yearly':
      return {
        startDate: toDateInputValue(new Date(today.getFullYear(), 0, 1)),
        endDate: toDateInputValue(new Date(today.getFullYear(), 11, 31)),
      };
    case 'custom':
      return { startDate: '', endDate: '' };
  }
}

/** @description Renders the ManagerDashboardDateFilterDropdown component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (4 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerDashboardDateFilterDropdown() {
  const t = useTranslations('MANAGER_DASHBOARD');

  const { range, startDate, endDate, setRange, setCustomDateRange } = useManagerDashboardUrlState();


  const handleRangeChange = (value: string | number) => {
    const selected = value as ManagerDashboardDateRange;
    const dates = resolvePresetDates(selected);
    if (selected === 'custom') { setRange(selected); return; }
    setRange(selected);
    setCustomDateRange(dates.startDate, dates.endDate);
  };

  const handleDateChange = useCallback((key: ManagerDashboardDateField, value: string) => {
    const nextStart = key === 'startDate' ? value : startDate;
    const nextEnd = key === 'endDate' ? value : endDate;
    setCustomDateRange(nextStart, nextEnd);
  }, [endDate, setCustomDateRange, startDate]);

  return (
    <div className="flex flex-col sm:flex-row items-stretch gap-2 w-full sm:w-auto">
      <div className="w-full sm:w-48">
        <ManagerSearchableDropdown dataTestId="manager_dashboard-managerdashboarddatefilterdropdown-managersearchabledropdown-1"
          options={[...MANAGER_DASHBOARD_DATE_RANGE_OPTIONS]}
          value={range}
          onChange={handleRangeChange}
          className="bg-input"
         data-testid="manager_dashboard-managerdashboarddatefilterdropdown-searchable-dropdown-1"/>
      </div>
      {range === 'custom' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full sm:w-auto">
          <label className="sr-only" htmlFor="manager-dashboard-start-date">{t("COPY_START_DATE")}</label>
          <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 bg-input border border-border rounded-lg px-3 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_dashboard-manager-dashboard-date-filter-dropdown-manager-dashboard-start-date"
            id="manager-dashboard-start-date"
            type="date"
            value={startDate}
            onChange={(event) => handleDateChange('startDate', event.target.value)}
            
          />
          <label className="sr-only" htmlFor="manager-dashboard-end-date">{t("COPY_END_DATE")}</label>
          <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 bg-input border border-border rounded-lg px-3 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_dashboard-manager-dashboard-date-filter-dropdown-manager-dashboard-end-date"
            id="manager-dashboard-end-date"
            type="date"
            value={endDate}
            onChange={(event) => handleDateChange('endDate', event.target.value)}
            
          />
        </div>
      )}
    </div>
  );
}
