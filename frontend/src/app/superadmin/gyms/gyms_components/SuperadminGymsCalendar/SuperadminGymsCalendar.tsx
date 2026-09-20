// RESPONSIBILITY: Renders the subscription renewal calendar view for Gym tenants.
'use client';
import { useMemo } from 'react';
import { format, getMonth, getYear, parseISO, startOfToday } from 'date-fns';
import { getSuperadminGymsCalendarGrid } from '@/app/superadmin/gyms/gyms_utils/SuperadminGymsCalendarUtils';
import { useSuperadminGymsTable } from '@/app/superadmin/gyms/gyms_components/SuperadminGymsTable/useSuperadminGymsTable';
import type { Tenant } from '@/app/superadmin/gyms/gyms_types/SuperadminGymsTypes';
export default function SuperadminGymsCalendar() {
    const { filteredGyms, isPending, isError, handleRowClick } = useSuperadminGymsTable();
    // Create a simple calendar grid for the current month
    const { daysInMonth, startDay, currentYear, currentMonth, monthName } = useMemo(() => {
        const today = startOfToday();
        const year = getYear(today);
        const month = getMonth(today);
        const { daysInMonth, leadingEmptyDays: startDay } = getSuperadminGymsCalendarGrid(year, month);
        const monthName = format(today, 'MMMM');
        return { daysInMonth, startDay, currentYear: year, currentMonth: month, monthName };
    }, []);
    const gymsByDate = useMemo(() => {
        const map: Record<number, Tenant[]> = {};
        filteredGyms.forEach(gym => {
            const dateValue = gym.trialEndsAt ?? gym.createdAt;
            const date = parseISO(dateValue);
            if (Number.isNaN(date.getTime()) || getYear(date) !== currentYear || getMonth(date) !== currentMonth) return;
            const day = date.getDate();
            map[day] ??= [];
            map[day].push(gym);
        });
        return map;
    }, [filteredGyms, currentMonth, currentYear]);
    if (isPending) {
        return <div className="p-8 text-center text-secondary">Loading calendar...</div>;
    }

    if (isError) {
        return <div role="alert" className="flex min-h-80 items-center justify-center rounded-xl border border-border bg-danger-bg p-8 text-danger">Unable to load renewal calendar.</div>;
    }
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blanks = Array.from({ length: startDay }, (_, i) => i);
    return (<div className="p-6 bg-card border border-border rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-primary">
          {monthName} {currentYear} Renewals
        </h2>
        <div className="flex items-center gap-4 text-sm text-secondary">
          <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-success"></div> Renewing</span>
          <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-warning"></div> Trial Ends</span>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-px bg-border rounded-xl overflow-hidden shadow-card">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (<div key={day} className="bg-input p-3 text-center text-xs font-semibold text-secondary uppercase tracking-wider">
            {day}
          </div>))}
        
        {blanks.map(blank => (<div key={`blank-${blank}`} className="bg-card min-h-32 p-2"/>))}
        
        {days.map(day => {
            const dayGyms = gymsByDate[day] || [];
            return (<div key={day} className="bg-card min-h-32 p-2 hover:bg-input motion-safe:transition-colors group border-t border-border">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium text-primary">{day}</span>
                {dayGyms.length > 0 && (<span className="text-xs bg-primary-subtle text-primary px-1.5 rounded-full font-medium">{dayGyms.length}</span>)}
              </div>
              <div className="space-y-1 overflow-y-auto max-h-20 scrollbar-thin">
                {dayGyms.map(gym => (<div key={gym.id} onClick={() => handleRowClick(gym)} className="text-xs p-1.5 rounded bg-page border border-border cursor-pointer hover:border-primary motion-safe:transition-colors truncate" title={`${gym.name} (${gym.plan})`}>
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${gym.trialEndsAt ? 'bg-warning' : 'bg-success'}`}/>
                      <span className="truncate text-primary font-medium">{gym.name}</span>
                    </div>
                  </div>))}
              </div>
            </div>);
        })}
      </div>
    </div>);
}
