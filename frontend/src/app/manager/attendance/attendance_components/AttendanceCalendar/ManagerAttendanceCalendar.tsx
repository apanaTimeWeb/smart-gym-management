'use client';
// RESPONSIBILITY: Renders a month-wise calendar view of attendance for a specific user.
import React, { useState } from 'react';
import { useAttendanceContext } from '@/app/manager/attendance/attendance_context/ManagerAttendanceContext';
import { useAttendanceHistoryQuery } from '@/app/manager/attendance/attendance_api/ManagerUseManagerAttendanceQueries';
import { X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

export default function AttendanceCalendar() {
  const { calendarUser, setCalendarUser, showToast } = useAttendanceContext();
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
  
  const { data: historyData, isLoading: loading, isError, error } = useAttendanceHistoryQuery(
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
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-foreground/50 p-4 motion-safe:animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-card shadow-xl flex flex-col max-h-full rounded-2xl border-2 border-primary overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Attendance History
            </h2>
            <p className="text-sm text-secondary">
              {calendarUser.name} ({calendarUser.type})
            </p>
          </div>
          <button
            onClick={() => setCalendarUser(null)}
            className="p-2 rounded-md hover:bg-background text-secondary motion-safe:transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Controls */}
        <div className="p-4 pb-2 flex items-center justify-between">
          <button onClick={prevMonth} className="p-2 rounded-md hover:bg-background border border-border">
            <ChevronLeft size={16} />
          </button>
          <span className="text-xl font-bold text-foreground">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </span>
          <button onClick={nextMonth} className="p-2 rounded-md hover:bg-background border border-border">
            <ChevronRight size={16} />
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
                  <div key={`skeleton-${i}`} className="aspect-square rounded-md bg-muted" />
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
                  <div key={`blank-${b}`} className="aspect-square rounded-md bg-background/30" />
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
                        ${isPresent ? 'bg-success text-primary-foreground hover:scale-110' : ''}
                        ${isAbsent ? 'bg-danger text-primary-foreground hover:scale-110' : ''}
                        ${isLeave ? 'bg-primary text-primary-foreground hover:scale-110' : ''}
                        ${status === 'NONE' ? 'bg-background border border-border text-secondary' : ''}
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
