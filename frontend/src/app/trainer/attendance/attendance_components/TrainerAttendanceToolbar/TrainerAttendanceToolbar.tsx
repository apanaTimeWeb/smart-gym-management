'use client';
// RESPONSIBILITY: Toolbar for Attendance â€” tabs, search, date filter, view-mode toggle, and action buttons.
// DATA FLOW: props (from TrainerAttendanceMain) â†’ URL state via useAttendanceFilters setters
import { useState, useEffect } from 'react';
import { RefreshCw, Search, Calendar as CalendarIcon, List, Plus, LogIn, LogOut, Loader2 } from 'lucide-react';
import { ATTENDANCE_TABS, ATTENDANCE_DATE_FILTER_OPTIONS } from '@/app/trainer/attendance/attendance_utils/TrainerAttendanceSharedConstants';
import type { TrainerAttendanceToolbarProps } from '@/app/trainer/attendance/attendance_components/TrainerAttendanceToolbar/TrainerAttendanceToolbarTypes';
import TrainerSearchableDropdown from '@/app/trainer/trainer_components/TrainerShared/TrainerSearchableDropdown/TrainerSearchableDropdown';

export default function TrainerAttendanceToolbar({
  tab, setTab, viewMode, search, setSearch,
  filterDate, setFilterDate,
  onAddRecord, onRefresh, onSelfCheckIn, onSelfCheckOut,
  selfCheckInPending, selfCheckOutPending,
  setViewMode,
}: TrainerAttendanceToolbarProps) {
  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => { setLocalSearch(search); }, [search]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (localSearch !== search) setSearch(localSearch);
    }, 300);
    return () => clearTimeout(handler);
  }, [localSearch, search, setSearch]);

  return (
    <div className="border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center">
      {/* Tabs */}
      <div className="flex">
        {ATTENDANCE_TABS.map(t => (
          <button type="button"
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-3.5 text-sm font-medium motion-safe:transition-colors border-b-2 ${
              tab === t
                ? 'text-primary bg-primary-subtle border-primary'
                : 'border-transparent text-secondary hover:text-primary'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="px-4 py-2.5 flex flex-wrap gap-2 items-center">
        {/* My Attendance view toggle */}
        {tab === 'My Attendance' && setViewMode && (
          <div className="flex bg-input border border-border rounded-lg p-0.5">
            <button type="button"
              onClick={() => setViewMode('calendar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md motion-safe:transition-all ${
                viewMode === 'calendar' ? 'bg-card text-primary shadow-card' : 'text-secondary hover:text-primary'
              }`}
            >
              <CalendarIcon size={14} /> Calendar
            </button>
            <button type="button"
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md motion-safe:transition-all ${
                viewMode === 'table' ? 'bg-card text-primary shadow-card' : 'text-secondary hover:text-primary'
              }`}
            >
              <List size={14} /> List
            </button>
          </div>
        )}

        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
          <input
            value={localSearch}
            onChange={e => setLocalSearch(e.target.value)}
            placeholder={`Search ${tab.toLowerCase()}...`}
            className="pl-9 pr-3 py-2 border border-border bg-input text-primary rounded-lg text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary w-40 sm:w-56"
          />
        </div>

        {/* Date filter */}
        <TrainerSearchableDropdown
          options={ATTENDANCE_DATE_FILTER_OPTIONS}
          value={filterDate}
          onChange={(val: string | number) => setFilterDate(String(val))}
          placeholder="Filter by date"
          className="w-36"
        />

        {/* Refresh */}
        <button type="button"
          onClick={onRefresh}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-primary-subtle text-secondary motion-safe:transition-colors motion-safe:duration-base"
          aria-label="Refresh attendance records"
        >
          <RefreshCw size={14} />
        </button>

        {/* Self Check-in / Check-out (My Attendance tab only) */}
        {tab === 'My Attendance' && (
          <>
            <button type="button"
              onClick={onSelfCheckIn}
              disabled={selfCheckInPending}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page flex items-center gap-2 px-3 py-2 text-sm bg-success text-on-success rounded-lg hover:opacity-90 disabled:opacity-70 motion-safe:transition-opacity"
            >
              {selfCheckInPending ? <Loader2 size={14} className="motion-safe:animate-spin" /> : <LogIn size={14} />}
              Check In
            </button>
            <button type="button"
              onClick={onSelfCheckOut}
              disabled={selfCheckOutPending}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page flex items-center gap-2 px-3 py-2 text-sm bg-warning text-on-primary rounded-lg hover:opacity-90 disabled:opacity-70 motion-safe:transition-opacity"
            >
              {selfCheckOutPending ? <Loader2 size={14} className="motion-safe:animate-spin" /> : <LogOut size={14} />}
              Check Out
            </button>
          </>
        )}

        {/* Add Record */}
        {tab === 'Members' && (
          <button type="button"
            onClick={onAddRecord}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page flex items-center gap-2 px-3 py-2 text-sm bg-primary text-on-primary rounded-lg hover:opacity-90 motion-safe:transition-opacity"
          >
            <Plus size={14} /> Add Record
          </button>
        )}
      </div>
    </div>
  );
}

