'use client';
// RESPONSIBILITY: Renders permission-aware Trainer dashboard shortcuts and navigates only to supported Trainer routes.
import { Dumbbell, Utensils, Users, CalendarCheck } from 'lucide-react';
import Link from 'next/link';
import { TrainerPageUrlConfig } from '@/app/trainer/Trainer_url_config';

const QUICK_ACTIONS = [
  { href: TrainerPageUrlConfig.WORKOUT, label: 'Workout Library', icon: Dumbbell, tone: 'primary' },
  { href: TrainerPageUrlConfig.ATTENDANCE, label: 'View Attendance', icon: CalendarCheck, tone: 'success' },
  { href: TrainerPageUrlConfig.MEMBERS, label: 'View Members', icon: Users, tone: 'info' },
  { href: TrainerPageUrlConfig.LIBRARY, label: 'Diet Library', icon: Utensils, tone: 'warning' },
] as const;

export default function TrainerDashboardQuickActions() {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-5"><h3 className="font-bold text-foreground text-lg">Quick Actions</h3></div>
      <div className="grid grid-cols-2 gap-3">
        {QUICK_ACTIONS.map(({ href, label, icon: Icon, tone }) => (
          <Link key={href} href={href} className="flex flex-col items-center justify-center p-4 rounded-xl border border-border bg-bg-page motion-safe:transition-colors hover:bg-primary-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <Icon size={18} strokeWidth={2} className={{primary:'mb-2 text-primary',success:'mb-2 text-success',info:'mb-2 text-info',warning:'mb-2 text-warning'}[tone]} />
            <span className="text-xs font-semibold text-center text-foreground">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
