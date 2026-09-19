'use client';
// RESPONSIBILITY: Renders the TrainerDashboardUpcomingSessions route/UI for the owning Trainer feature.
import { DashboardUrlConfig } from '@/app/trainer/dashboard/dashboard_url_config';
import { useTrainerDashboardQuery } from '@/app/trainer/dashboard/dashboard_queries/useTrainerDashboardQuery';
import { Clock, Calendar } from 'lucide-react';
import Link from 'next/link';


export default function TrainerDashboardUpcomingSessions() {
  const { data: stats } = useTrainerDashboardQuery();
  if (!stats?.upcomingSessions) return null;

  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-card xl:col-span-2">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-primary text-lg flex items-center gap-2">
          <Calendar className="text-primary" size={20} />
          Upcoming Sessions
        </h3>
        <Link href={DashboardUrlConfig.PAGES.SCHEDULE} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page text-sm text-primary font-medium hover:underline">View Schedule</Link>
      </div>

      <div className="space-y-3">
        {stats.upcomingSessions.length === 0 ? (
          <p className="text-secondary text-sm">No upcoming sessions today.</p>
        ) : (
          stats.upcomingSessions.map(session => (
            <div key={session.id} className="flex items-center justify-between p-3 rounded-xl border border-border/50 bg-page hover:bg-page motion-safe:transition-colors motion-safe:duration-base">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-subtle text-primary flex items-center justify-center font-bold">
                  {session.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-primary text-sm">{session.name}</p>
                  <p className="text-xs text-secondary">{session.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-sm font-medium text-primary bg-input px-3 py-1.5 rounded-lg">
                <Clock size={14} className="text-secondary" />
                {session.time}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
