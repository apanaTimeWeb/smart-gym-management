'use client';
// RESPONSIBILITY: Renders the empty state UI for Sales module lists. Receives a message and optional subtext via props. No API calls.
import type { ManagerSalesEmptyStateProps } from '@/app/manager/sales/sales_types/ManagerSalesEmptyStateTypes';
import { IndianRupee } from 'lucide-react';



export default function ManagerSalesEmptyState({ message, subtext }: ManagerSalesEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center border border-border rounded-xl bg-card">
      <div className="w-12 h-12 rounded-full bg-primary-subtle flex items-center justify-center mb-3">
        <IndianRupee size={18} className="text-primary" />
      </div>
      <p className="text-base font-medium text-secondary">{message}</p>
      {subtext && <p className="text-sm text-secondary mt-1 opacity-70">{subtext}</p>}
    </div>
  );
}
