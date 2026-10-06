// RESPONSIBILITY: Renders a consistent empty state for an Admin reports data section.
"use client";
import { BarChart3 } from 'lucide-react';

import type { AdminReportsEmptyStateProps } from '@/app/frontend_admin/admin_reports/admin_reports_types/AdminReportsEmptyStatePropsTypes';


/**
 * AdminReportsEmptyState renders the admin reports empty state UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminReportsEmptyState: Renders a consistent empty state for an Admin reports data section.
 * @dependencies Consumes AdminReportsEmptyStatePropsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export function AdminReportsEmptyState({ title, description }: AdminReportsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-6 py-12 text-center" data-testid="admin_reports-admin_reports-empty-state-state">
      <BarChart3 size={18} aria-hidden="true" className="text-secondary"  strokeWidth={2}/>
      <h3 className="text-base font-semibold text-primary">{title}</h3>
      <p className="text-sm text-secondary">{description}</p>
    </div>
  );
}
