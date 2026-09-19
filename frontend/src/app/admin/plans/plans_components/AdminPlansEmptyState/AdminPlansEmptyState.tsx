// RESPONSIBILITY: Renders reusable empty states for Admin plans data sections.

import { CreditCard } from 'lucide-react';

import type { AdminPlansEmptyStateProps } from '@/app/admin/plans/plans_types/AdminPlansEmptyStatePropsTypes';


export default function AdminPlansEmptyState({ title, description }: AdminPlansEmptyStateProps) {
  return <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
    <CreditCard size={32} aria-hidden="true" className="text-secondary" />
    <h3 className="text-base font-semibold text-primary">{title}</h3>
    <p className="text-sm text-secondary">{description}</p>
  </div>;
}
