// RESPONSIBILITY: Renders the attendance calendar and its feature-owned day interactions.
'use client';
import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useManagerAttendanceLogic } from '@/app/manager/attendance/attendance_hooks/ManagerUseManagerAttendanceLogic';
import { useAttendanceHistoryQuery } from '@/app/manager/attendance/attendance_hooks/ManagerUseManagerAttendanceQueries';
import { formatAttendanceMonthYear } from '@/app/manager/attendance/attendance_utils/ManagerAttendanceSharedConstants';


export default function ManagerAttendanceCalendar() {
  const { calendarUser, setCalendarUser, showToast } = useManagerAttendanceLogic();
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
  
  const { data: historyData, isPending: loading, isError, error } = useAttendanceHistoryQuery(
    calendarUser?.id || '',
    calendarUser?.type || 'MEMBER',
    monthStr
  );

  const history = Array.isArray(historyData) ? historyData : [];

  if (isError) {
    showToast((error as Error).message, 'error');
  }



  if (!calendarUser) return null;

  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const getStatusForDay = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const record = history.find(r => r.date === dateStr || r.date.startsWith(dateStr));
    if (record) {
      return record.status === 'LEAVE' ? 'LEAVE' : 'PRESENT';
    }
    // If date is in future, return NONE, else ABSENT
    const isFuture = new Date(dateStr) > new Date();
    return isFuture ? 'NONE' : 'ABSENT';
  };

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  let totalP = 0;
  let totalA = 0;
  let totalL = 0;
  days.forEach(day => {
    const st = getStatusForDay(day);
    if (st === 'PRESENT') totalP++;
    else if (st === 'ABSENT') totalA++;
    else if (st === 'LEAVE') totalL++;
  });

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay-backdrop p-4 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-base">
      <div className="w-full max-w-md bg-card shadow-card flex flex-col max-h-full rounded-2xl border-2 border-primary overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div>
            <h2 className="text-lg font-semibold text-primary">
              Attendance History
            </h2>
            <p className="text-sm text-secondary">
              {calendarUser.name} ({calendarUser.type})
            </p>
          </div>
          <button
            type="button"
            aria-label="Close attendance calendar"
            onClick={() => setCalendarUser(null)}
            className="min-h-11 min-w-11 flex items-center justify-center p-2 rounded-md hover:bg-page text-secondary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X size={18} />
          </button>
        </div>

        {/* Controls */}
        <div className="p-4 pb-2 flex items-center justify-between">
          <button type="button" aria-label="Previous month" onClick={prevMonth} className="min-h-11 min-w-11 flex items-center justify-center p-2 rounded-md hover:bg-page border border-border motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <ChevronLeft size={18} />
          </button>
          <span className="text-xl font-bold text-primary">
            {formatAttendanceMonthYear(currentDate)}
          </span>
          <button type="button" aria-label="Next month" onClick={nextMonth} className="min-h-11 min-w-11 flex items-center justify-center p-2 rounded-md hover:bg-page border border-border motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <ChevronRight size={18} />
          </button>
        </div>
        
        {/* Stats */}
        <div className={`px-4 pb-2 grid ${calendarUser.type === 'STAFF' ? 'grid-cols-3' : 'grid-cols-2 gap-4 max-w-3/4'} text-xs font-bold text-secondary`}>
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-success"></div> Present: {totalP}</div>
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-danger"></div> Absent: {totalA}</div>
          {calendarUser.type === 'STAFF' && (
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-primary"></div> Leave: {totalL}</div>
          )}
        </div>

        {/* Calendar Grid */}
        <div className="p-4 overflow-y-auto">
          {loading ? (
            <div>
              <div className="grid grid-cols-7 gap-1.5 mb-2 text-center text-xs font-bold text-secondary">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d}>{d}</div>)}
              </div>
              <div className="grid grid-cols-7 gap-1.5 motion-safe:animate-pulse">
                {[...Array(35)].map((_, i) => (
                  <div key={`skeleton-${i}`} className="aspect-square rounded-md bg-input" />
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-7 gap-1.5 mb-2 text-center text-xs font-bold text-secondary">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d}>{d}</div>)}
              </div>
              <div className="grid grid-cols-7 gap-1.5">
                {blanks.map(b => (
                  <div key={`blank-${b}`} className="aspect-square rounded-md bg-page" />
                ))}
                {days.map(day => {
                  const status = getStatusForDay(day);
                  const isPresent = status === 'PRESENT';
                  const isAbsent = status === 'ABSENT';
                  const isLeave = status === 'LEAVE';
                  return (
                    <div
                      key={day}
                      className={`
                        aspect-square flex items-center justify-center rounded-md border-none text-xs font-bold motion-safe:transition-all
                        ${isPresent ? 'bg-success text-on-success motion-safe:hover:scale-110' : ''}
                        ${isAbsent ? 'bg-danger text-on-danger motion-safe:hover:scale-110' : ''}
                        ${isLeave ? 'bg-primary text-on-primary motion-safe:hover:scale-110' : ''}
                        ${status === 'NONE' ? 'bg-page border border-border text-secondary' : ''}
                      `}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}

