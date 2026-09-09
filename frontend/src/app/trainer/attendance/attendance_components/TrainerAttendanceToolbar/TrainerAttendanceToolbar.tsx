// RESPONSIBILITY: Provides the tab switcher, search input, date filter dropdown, and view-mode toggle for the Attendance module.
// DATA FLOW: useAttendanceContext → TrainerAttendanceToolbar → URL params via context setters
'use client';

import { useState, useEffect } from 'react';
import { RefreshCw, Search, Calendar as CalendarIcon, List } from 'lucide-react';
import { useAttendanceContext } from '@/app/trainer/attendance/attendance_context/AttendanceContext';
import { ATTENDANCE_TABS, ATTENDANCE_DATE_FILTER_OPTIONS } from '@/app/trainer/attendance/attendance_utils/AttendanceSharedConstants';
import { SearchableDropdown } from '@/app/trainer/trainer_components/TrainerShared/SearchableDropdown';

export default function TrainerAttendanceToolbar() {
  const { tab, setTab, viewMode, setViewMode, loadAll, search, setSearch, filterDate, setFilterDate, setCurrentPage } = useAttendanceContext();
  const [localSearch, setLocalSearch] = useState(search);

  // Sync local search back to context if the URL resets it externally.
  // WHY: filterDate/tab changes reset the URL ?search= param, so localSearch must follow.
  useEffect(() => { setTimeout(() => setLocalSearch(search), 0); }, [search]);

  // Debounce search → only flush to URL after 300 ms of inactivity (Rule 15).
  // WHY: search is in deps because we only push when the debounced value diverges from the URL.
  useEffect(() => {
    const handler = setTimeout(() => {
      if (localSearch !== search) {
        setSearch(localSearch);
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [localSearch, search, setSearch, setCurrentPage]);

  return (
    <div className="border-b border-border flex justify-between items-center">
      <div className="flex">
        {ATTENDANCE_TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-3.5 text-sm font-medium motion-safe:transition-colors border-b-2 ${
              tab === t
                ? 'text-primary bg-primary-subtle border-primary'
                : 'border-transparent text-secondary hover:text-foreground'
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="px-4 py-2.5 flex flex-wrap gap-3 items-center">
        {tab === 'My Attendance' && (
          <div className="flex bg-input border border-border rounded-lg p-0.5">
            <button
              onClick={() => setViewMode('calendar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md motion-safe:transition-all ${
                viewMode === 'calendar' ? 'bg-card text-primary shadow-sm' : 'text-secondary hover:text-foreground'
              }`}
            >
              <CalendarIcon size={14} /> Calendar History
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md motion-safe:transition-all ${
                viewMode === 'table' ? 'bg-card text-primary shadow-sm' : 'text-secondary hover:text-foreground'
              }`}
            >
              <List size={14} /> List View
            </button>
          </div>
        )}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
          <input
            value={localSearch}
            onChange={e => setLocalSearch(e.target.value)}
            placeholder={`Search ${tab.toLowerCase()}...`}
            className="pl-9 pr-3 py-2 border border-border bg-input text-foreground rounded-lg text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page focus-visible:ring-primary w-40 sm:w-64"
          />
        </div>
        {/* SearchableDropdown replaces native <select> to fix dark mode rendering (Rule 20) */}
        <SearchableDropdown
          options={ATTENDANCE_DATE_FILTER_OPTIONS}
          value={filterDate}
          onChange={(val) => setFilterDate(String(val))}
          placeholder="Filter by date"
          className="w-36"
        />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={loadAll}
            className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-primary-subtle text-secondary motion-safe:transition-colors"
            aria-label="Refresh attendance records"
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
