// RESPONSIBILITY: Renders a reusable empty state for Admin finance data tables.

import { ReceiptText } from 'lucide-react';

import type { AdminFinanceEmptyStateProps } from '@/app/admin/finance/finance_types/AdminFinanceEmptyStatePropsTypes';


export default function AdminFinanceEmptyState({ title, description }: AdminFinanceEmptyStateProps) {
  return <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
    <ReceiptText size={32} aria-hidden="true" className="text-secondary" />
    <h3 className="text-base font-semibold text-primary">{title}</h3>
    <p className="text-sm text-secondary">{description}</p>
  </div>;
}
