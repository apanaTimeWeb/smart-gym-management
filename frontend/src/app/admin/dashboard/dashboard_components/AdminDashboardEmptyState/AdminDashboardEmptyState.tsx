"use client";
// RESPONSIBILITY: Renders the empty state for dashboard leaderboard data.
import { Building2 } from 'lucide-react';

import type { AdminDashboardEmptyStateProps } from '@/app/admin/dashboard/dashboard_types/AdminDashboardEmptyStatePropsTypes';


export function AdminDashboardEmptyState({ title, description }: AdminDashboardEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-6 py-12 text-center">
      <Building2 size={28} aria-hidden="true" className="text-secondary" />
      <h3 className="text-base font-semibold text-primary">{title}</h3>
      <p className="text-sm text-secondary">{description}</p>
    </div>
  );
}
