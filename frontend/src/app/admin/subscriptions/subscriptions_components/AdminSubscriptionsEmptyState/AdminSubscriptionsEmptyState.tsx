"use client";
// RESPONSIBILITY: Renders the empty state for an Admin subscriptions data section.
import { FileText } from 'lucide-react';

import type { AdminSubscriptionsEmptyStateProps } from '@/app/admin/subscriptions/subscriptions_types/AdminSubscriptionsEmptyStatePropsTypes';


export function AdminSubscriptionsEmptyState({ title, description }: AdminSubscriptionsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-6 py-12 text-center">
      <FileText size={28} aria-hidden="true" className="text-secondary" />
      <h3 className="text-base font-semibold text-primary">{title}</h3>
      <p className="text-sm text-secondary">{description}</p>
    </div>
  );
}
