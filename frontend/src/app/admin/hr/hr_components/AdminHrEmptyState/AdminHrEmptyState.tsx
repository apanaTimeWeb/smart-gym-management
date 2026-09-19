// RESPONSIBILITY: Renders reusable empty states for Admin HR data sections.

import { Users } from 'lucide-react';

import type { AdminHrEmptyStateProps } from '@/app/admin/hr/hr_types/AdminHrEmptyStatePropsTypes';


export default function AdminHrEmptyState({ title, description }: AdminHrEmptyStateProps) {
  return <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
    <Users size={32} aria-hidden="true" className="text-secondary" />
    <h3 className="text-base font-semibold text-primary">{title}</h3>
    <p className="text-sm text-secondary">{description}</p>
  </div>;
}
