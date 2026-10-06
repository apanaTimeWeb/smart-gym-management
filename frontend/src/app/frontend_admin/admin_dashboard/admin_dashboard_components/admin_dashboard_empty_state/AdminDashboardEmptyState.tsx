// RESPONSIBILITY: Renders the empty state for dashboard leaderboard data.
"use client";
import { Building2 } from 'lucide-react';

import type { AdminDashboardEmptyStateProps } from '@/app/frontend_admin/admin_dashboard/admin_dashboard_types/AdminDashboardEmptyStatePropsTypes';


/**
 * AdminDashboardEmptyState renders the admin dashboard empty state UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminDashboardEmptyState: Renders the empty state for dashboard leaderboard data.
 * @dependencies Consumes AdminDashboardEmptyStatePropsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export function AdminDashboardEmptyState({ title, description }: AdminDashboardEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-6 py-12 text-center" data-testid="admin_dashboard-admin_dashboard-empty-state-state">
      <Building2 size={18} aria-hidden="true" className="text-secondary"  strokeWidth={2}/>
      <h3 className="text-base font-semibold text-primary">{title}</h3>
      <p className="text-sm text-secondary">{description}</p>
    </div>
  );
}
