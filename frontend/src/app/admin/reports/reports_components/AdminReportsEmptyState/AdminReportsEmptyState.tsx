"use client";
// RESPONSIBILITY: Renders a consistent empty state for an Admin reports data section.
import { BarChart3 } from 'lucide-react';

import type { AdminReportsEmptyStateProps } from '@/app/admin/reports/reports_types/AdminReportsEmptyStatePropsTypes';


export function AdminReportsEmptyState({ title, description }: AdminReportsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-6 py-12 text-center">
      <BarChart3 size={28} aria-hidden="true" className="text-secondary" />
      <h3 className="text-base font-semibold text-primary">{title}</h3>
      <p className="text-sm text-secondary">{description}</p>
    </div>
  );
}
