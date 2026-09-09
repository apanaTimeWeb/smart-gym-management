'use client';
// RESPONSIBILITY: Renders the subscription renewal calendar view for Gym tenants.

import React, { useMemo } from 'react';
import { useSuperadminGymsTable } from '@/app/superadmin/gyms/gyms_components/SuperadminGymsTable/useSuperadminGymsTable';
import type { Tenant } from '@/app/superadmin/gyms/superadmin_gyms_types/superadmin_gyms_types';
import { useRouter } from 'next/navigation';

export default function SuperadminGymsCalendar() {
  const router = useRouter();
  const { filteredGyms, fetchState, handleRowClick } = useSuperadminGymsTable();

  // Create a simple calendar grid for the current month
  const { daysInMonth, startDay, currentYear, currentMonth, monthName } = useMemo(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDay = new Date(year, month, 1).getDay();
    const monthName = today.toLocaleString('default', { month: 'long' });
    return { daysInMonth, startDay, currentYear: year, currentMonth: month, monthName };
  }, []);

  const gymsByDate = useMemo(() => {
    const map: Record<number, Tenant[]> = {};
    filteredGyms.forEach(gym => {
      // Mock renewal date based on created at
      const date = gym.trialEndsAt ? new Date(gym.trialEndsAt) : new Date(gym.createdAt);
      // Since it's a mock, just place them on a valid day in the current month to show data
      const day = (date.getDate() % daysInMonth) + 1;
      if (!map[day]) map[day] = [];
      map[day].push(gym);
    });
    return map;
  }, [filteredGyms, daysInMonth]);

  if (fetchState === 'loading') {
    return <div className="p-8 text-center text-secondary">Loading calendar...</div>;
  }

  if (fetchState === 'error') {
    return <div className="p-8 text-center text-danger">Error loading calendar. Please try again.</div>;
  }

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: startDay }, (_, i) => i);

  return (
    <div className="p-6 bg-card border border-border rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">
          {monthName} {currentYear} Renewals
        </h2>
        <div className="flex items-center gap-4 text-sm text-secondary">
          <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-success"></div> Renewing</span>
          <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-warning"></div> Trial Ends</span>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-px bg-border rounded-xl overflow-hidden shadow-sm">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="bg-input p-3 text-center text-xs font-semibold text-secondary uppercase tracking-wider">
            {day}
          </div>
        ))}
        
        {blanks.map(blank => (
          <div key={`blank-${blank}`} className="bg-card min-h-[120px] p-2" />
        ))}
        
        {days.map(day => {
          const dayGyms = gymsByDate[day] || [];
          return (
            <div key={day} className="bg-card min-h-[120px] p-2 hover:bg-input/50 motion-safe:transition-colors group border-t border-border">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium text-foreground">{day}</span>
                {dayGyms.length > 0 && (
                  <span className="text-xs bg-primary/20 text-primary px-1.5 rounded-full font-medium">{dayGyms.length}</span>
                )}
              </div>
              <div className="space-y-1 overflow-y-auto max-h-[80px] scrollbar-thin">
                {dayGyms.map(gym => (
                  <div 
                    key={gym.id} 
                    onClick={() => handleRowClick(gym)}
                    className="text-xs p-1.5 rounded bg-background border border-border cursor-pointer hover:border-primary motion-safe:transition-colors truncate"
                    title={`${gym.name} (${gym.plan})`}
                  >
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${gym.trialEndsAt ? 'bg-warning' : 'bg-success'}`} />
                      <span className="truncate text-foreground font-medium">{gym.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
