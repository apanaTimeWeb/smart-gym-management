// RESPONSIBILITY: Toolbar for Attendance â€” tabs, search, date filter, view-mode toggle, and action buttons.
'use client';
// DATA FLOW: props (from TrainerAttendanceMain) â†’ URL state via useAttendanceFilters setters
import { useState } from 'react';
import { RefreshCw, Search, Calendar as CalendarIcon, List, Plus, LogIn, LogOut, Loader2 } from 'lucide-react';
import { ATTENDANCE_TABS, ATTENDANCE_DATE_FILTER_OPTIONS } from '@/app/trainer/attendance/attendance_utils/TrainerAttendanceSharedConstants';
import type { TrainerAttendanceToolbarProps } from '@/app/trainer/attendance/attendance_components/TrainerAttendanceToolbar/TrainerAttendanceToolbarTypes';
import TrainerSearchableDropdown from '@/app/trainer/trainer_components/TrainerShared/TrainerSearchableDropdown/TrainerSearchableDropdown';

export default function TrainerAttendanceToolbar({
  tab, setTab, viewMode, search, setSearch,
  filterDate, setFilterDate,
  onAddRecord, onRefresh, onSelfCheckIn, onSelfCheckOut,
  selfCheckInPending, selfCheckOutPending, isRefreshing,
  setViewMode,
}: TrainerAttendanceToolbarProps) {
  const [localSearch, setLocalSearch] = useState(search);


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
                ? 'text-on-primary bg-primary-subtle border-primary'
                : 'border-transparent text-secondary hover:text-primary'
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page`}
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
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page`}
            >
              <CalendarIcon size={18} /> Calendar
            </button>
            <button type="button"
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md motion-safe:transition-all ${
                viewMode === 'table' ? 'bg-card text-primary shadow-card' : 'text-secondary hover:text-primary'
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page`}
            >
              <List size={18} /> List
            </button>
          </div>
        )}

        {/* Search */}
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
          <input
            value={localSearch}
            onChange={e => { const value = e.target.value; setLocalSearch(value); setSearch(value); }}
            placeholder={`Search ${tab.toLowerCase()}...`}
            className="pl-9 pr-3 py-2 border border-border bg-input text-primary rounded-lg text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary w-40 sm:w-56"
          />
        </div>

        {/* Date filter */}
        <TrainerSearchableDropdown
          options={ATTENDANCE_DATE_FILTER_OPTIONS as unknown as { label: string; value: string }[]}
          value={filterDate}
          onChange={(val: string | number) => setFilterDate(String(val))}
          placeholder="Filter by date"
          className="w-36"
        />

        {/* Refresh */}
        <button type="button"
          onClick={onRefresh}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-w-11 min-h-11 flex items-center justify-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-primary-subtle text-secondary motion-safe:transition-colors motion-safe:duration-base"
          aria-label="Refresh attendance records"
        >
          {isRefreshing ? <Loader2 size={18} className="motion-safe:animate-spin" /> : <RefreshCw size={18} />}
        </button>

        {/* Self Check-in / Check-out (My Attendance tab only) */}
        {tab === 'My Attendance' && (
          <>
            <button type="button"
              onClick={onSelfCheckIn}
              disabled={selfCheckInPending}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-w-28 min-h-11 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-success text-on-success rounded-lg hover:bg-primary-hover disabled:opacity-70 motion-safe:transition-opacity"
            >
              {selfCheckInPending ? <Loader2 size={18} className="motion-safe:animate-spin" /> : <LogIn size={18} />}
              Check In
            </button>
            <button type="button"
              onClick={onSelfCheckOut}
              disabled={selfCheckOutPending}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-w-28 min-h-11 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-warning-bg text-warning rounded-lg hover:bg-primary-hover disabled:opacity-70 motion-safe:transition-opacity"
            >
              {selfCheckOutPending ? <Loader2 size={18} className="motion-safe:animate-spin" /> : <LogOut size={18} />}
              Check Out
            </button>
          </>
        )}

        {/* Add Record */}
        {tab === 'Members' && (
          <button type="button"
            onClick={onAddRecord}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-w-28 min-h-11 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-primary-subtle text-primary rounded-lg hover:bg-primary-subtle motion-safe:transition-colors"
          >
            <Plus size={18} /> Add Record
          </button>
        )}
      </div>
    </div>
  );
}

