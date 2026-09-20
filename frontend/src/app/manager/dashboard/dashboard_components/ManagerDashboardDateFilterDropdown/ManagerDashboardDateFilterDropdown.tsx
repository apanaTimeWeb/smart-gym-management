// RESPONSIBILITY: Renders dashboard-owned date-range controls and synchronizes the selected range to URL state.
'use client';
import { useCallback } from 'react';
import { useManagerDashboardUrlState } from '@/app/manager/dashboard/dashboard_hooks/ManagerUseManagerDashboardUrlState';
import { MANAGER_DASHBOARD_DATE_RANGE_OPTIONS } from '@/app/manager/dashboard/dashboard_utils/ManagerDashboardDateFilterConstants';
import ManagerSearchableDropdown from '@/app/manager/manager_components/ManagerShared/ManagerSearchableDropdown';
import type { ManagerDashboardDateRange, ManagerDashboardDateField } from '@/app/manager/dashboard/dashboard_utils/ManagerDashboardDateFilterConstants';


function toDateInputValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

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

export default function ManagerDashboardDateFilterDropdown() {
  const { range, startDate, endDate, setRange, setCustomDateRange } = useManagerDashboardUrlState();


  const handleRangeChange = (value: string | number) => {
    const selected = value as ManagerDashboardDateRange;
    const dates = resolvePresetDates(selected);
    if (selected === 'custom') { setRange(selected); return; }
    setRange(selected);
  };

  const handleDateChange = useCallback((key: ManagerDashboardDateField, value: string) => {
    const nextStart = key === 'startDate' ? value : startDate;
    const nextEnd = key === 'endDate' ? value : endDate;
    setCustomDateRange(nextStart, nextEnd);
  }, [endDate, setCustomDateRange, startDate]);

  return (
    <div className="flex flex-col sm:flex-row items-stretch gap-2 w-full sm:w-auto">
      <div className="w-full sm:w-48">
        <ManagerSearchableDropdown
          options={[...MANAGER_DASHBOARD_DATE_RANGE_OPTIONS]}
          value={range}
          onChange={handleRangeChange}
          className="bg-input"
        />
      </div>
      {range === 'custom' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full sm:w-auto">
          <label className="sr-only" htmlFor="manager-dashboard-start-date">Start date</label>
          <input
            id="manager-dashboard-start-date"
            type="date"
            value={startDate}
            onChange={(event) => handleDateChange('startDate', event.target.value)}
            className="min-h-11 bg-input border border-border rounded-lg px-3 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
          <label className="sr-only" htmlFor="manager-dashboard-end-date">End date</label>
          <input
            id="manager-dashboard-end-date"
            type="date"
            value={endDate}
            onChange={(event) => handleDateChange('endDate', event.target.value)}
            className="min-h-11 bg-input border border-border rounded-lg px-3 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>
      )}
    </div>
  );
}
