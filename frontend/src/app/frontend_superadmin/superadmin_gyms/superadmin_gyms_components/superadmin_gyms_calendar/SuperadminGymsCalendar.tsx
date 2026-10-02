'use client';
/**
 * RESPONSIBILITY: React component SuperadminGymsCalendar owned by the superadmin_gyms feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: useMemo
 * MODULE DEPENDENCIES: date-fns, @/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_utils/SuperadminGymsCalendarUtils, @/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_hooks/useSuperadminGymsTable, @/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_types/SuperadminGymsTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the subscription renewal calendar view for Gym tenants.
import { useMemo } from 'react';

import { format, getMonth, getYear, parseISO, startOfToday } from 'date-fns';
import { useTranslations } from 'next-intl';

import { useSuperadminGymsTable } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_hooks/useSuperadminGymsTable';
import { getSuperadminGymsCalendarGrid } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_utils/SuperadminGymsCalendarUtils';

import type { Tenant } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_types/SuperadminGymsTypes';


/** @description Renders the gym calendar presentation for the owning module. @dependencies Receives feature-owned calendar configuration and display data. @edge-case Handles empty calendar state without dereferencing missing events. */
export default function SuperadminGymsCalendar() {
  const t = useTranslations('superadmin_gyms');
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
        return <div className="p-8 text-center text-secondary">{t('ui.loading_calendar_5e68e6b5')}</div>;
    }

    if (isError) {
        return <div role="alert" className="flex min-h-80 items-center justify-center rounded-xl border border-border bg-danger-bg p-8 text-danger" data-testid="superadmin_gyms-calendar-error-state">{t('ui.unable_to_load_renewal_calendar_42a1e2f8')}</div>;
    }
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blanks = Array.from({ length: startDay }, (_, i) => i);
    return (<div className="p-6 bg-card border border-border rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-primary">
          {monthName} {currentYear} {t('ui.renewals_61583caa')}</h2>
        <div className="flex items-center gap-4 text-sm text-secondary">
          <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-success text-on-success"></div> {t('ui.renewing_3db896b2')}</span>
          <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-warning text-on-warning"></div> {t('ui.trial_ends_01354510')}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-px bg-surface-highlight rounded-xl overflow-hidden shadow-card">
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
                {dayGyms.map(gym => (<button type="button" key={gym.id} onClick={() => handleRowClick(gym)} className="w-full truncate rounded border border-border bg-page p-1.5 text-left text-xs hover:border-focus focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors" title={`${gym.name} (${gym.plan})`} data-testid="superadmin_gyms-superadmin-gyms-calendar-superadmin-gyms-calendar-button">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${gym.trialEndsAt ? 'bg-warning text-on-warning' : 'bg-success text-on-success'}`}/>
                      <span className="truncate text-primary font-medium">{gym.name}</span>
                    </div>
                  </button>))}
              </div>
            </div>);
        })}
      </div>
    </div>);
}
