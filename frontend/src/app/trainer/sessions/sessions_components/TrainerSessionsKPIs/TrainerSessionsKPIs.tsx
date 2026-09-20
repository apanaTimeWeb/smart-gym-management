// RESPONSIBILITY: Renders KPI metric cards for Trainer Sessions page.
// DATA FLOW: TrainerSessionsMain → TrainerSessionsKPIs

import { CalendarCheck, CalendarX, TrendingUp, Users } from 'lucide-react';
import type { TrainerSession } from '@/app/trainer/sessions/sessions_types/TrainerSessionsTypes';
import { useDateRangeSuffix } from '@/lib/useDateRangeSuffix';
import type { TrainerSessionsKPIsProps } from '@/app/trainer/sessions/sessions_types/TrainerSessionsKPIsProps';



export default function TrainerSessionsKPIs({ sessions }: TrainerSessionsKPIsProps) {
  const dateSuffix = useDateRangeSuffix();
  const todayCount = sessions.filter(s => {
    // Basic approximation assuming sessions are loaded for today
    return s.status !== 'No Show';
  }).length;
  const completedThisWeek = 14; // Mock for now until backend supports it
  const noShowsThisMonth = 2; // Mock for now
  const avgAttendanceRate = 85; // Mock for now

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-card rounded-xl p-5 border border-border flex items-start gap-4">
        <div className="p-3 rounded-xl bg-primary-bg text-on-primary">
          <CalendarCheck size={24} />
        </div>
        <div>
          <p className="text-sm font-medium text-secondary mb-1">{`Today's Sessions${dateSuffix}`}</p>
          <h3 className="text-2xl font-bold text-primary">{todayCount}</h3>
        </div>
      </div>
      <div className="bg-card rounded-xl p-5 border border-border flex items-start gap-4">
        <div className="p-3 rounded-xl bg-success-bg text-on-success">
          <TrendingUp size={24} />
        </div>
        <div>
          <p className="text-sm font-medium text-secondary mb-1">{`Completed (Week)${dateSuffix}`}</p>
          <h3 className="text-2xl font-bold text-primary">{completedThisWeek}</h3>
        </div>
      </div>
      <div className="bg-card rounded-xl p-5 border border-border flex items-start gap-4">
        <div className="p-3 rounded-xl bg-danger-bg text-on-danger">
          <CalendarX size={24} />
        </div>
        <div>
          <p className="text-sm font-medium text-secondary mb-1">{`No Shows (Month)${dateSuffix}`}</p>
          <h3 className="text-2xl font-bold text-primary">{noShowsThisMonth}</h3>
        </div>
      </div>
      <div className="bg-card rounded-xl p-5 border border-border flex items-start gap-4">
        <div className="p-3 rounded-xl bg-info-bg text-on-info">
          <Users size={24} />
        </div>
        <div>
          <p className="text-sm font-medium text-secondary mb-1">{`Avg Attendance${dateSuffix}`}</p>
          <h3 className="text-2xl font-bold text-primary">{avgAttendanceRate}%</h3>
        </div>
      </div>
    </div>
  );
}
