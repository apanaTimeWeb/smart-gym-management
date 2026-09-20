// RESPONSIBILITY: Renders the TrainerDashboardRecentProgress route/UI for the owning Trainer feature.
'use client';
import { DashboardUrlConfig } from '@/app/trainer/dashboard/dashboard_url_config';
import { useTrainerDashboardQuery } from '@/app/trainer/dashboard/dashboard_queries/useTrainerDashboardQuery';
import { Activity, ArrowRight, User } from 'lucide-react';
import Link from 'next/link';

export default function TrainerDashboardRecentProgress() {
  const { data: stats } = useTrainerDashboardQuery();
  if (!stats?.recentMemberProgress) return null;

  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-primary text-lg flex items-center gap-2">
          <Activity className="text-info" size={18} />
          Recent Progress
        </h3>
      </div>

      <div className="space-y-4">
        {stats.recentMemberProgress.length === 0 ? (
          <p className="text-secondary text-sm">No recent member progress.</p>
        ) : (
          stats.recentMemberProgress.map((item, index) => (
            <div key={`${item.id}-${index}`} className="flex flex-col gap-1 border-b border-border/50 pb-3 last:border-0 last:pb-0">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-primary">{item.name}</span>
                <span className="text-xs text-secondary">{item.time}</span>
              </div>
              <p className="text-sm text-secondary line-clamp-2">{item.detail}</p>
            </div>
          ))
        )}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <Link href={DashboardUrlConfig.PAGES.PROGRESS_TRACKING} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page text-sm text-primary font-medium hover:underline flex items-center justify-center gap-1">
          View All Progress <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
