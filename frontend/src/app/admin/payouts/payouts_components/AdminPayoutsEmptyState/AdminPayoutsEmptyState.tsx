// RESPONSIBILITY: Renders reusable empty states for Admin payouts data tables.

import { WalletCards } from 'lucide-react';

import type { AdminPayoutsEmptyStateProps } from '@/app/admin/payouts/payouts_types/AdminPayoutsEmptyStatePropsTypes';


export default function AdminPayoutsEmptyState({ title, description }: AdminPayoutsEmptyStateProps) {
  return <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
    <WalletCards size={32} aria-hidden="true" className="text-secondary" />
    <h3 className="text-base font-semibold text-primary">{title}</h3>
    <p className="text-sm text-secondary">{description}</p>
  </div>;
}
