'use client';
// RESPONSIBILITY: Renders the empty state for the earnings ledger when no records match the current search or date filter.
import { FileText } from 'lucide-react';

interface TrainerEarningsEmptyStateProps {
  message?: string;
  description?: string;
}

export default function TrainerEarningsEmptyState({ message = 'No earnings records found', description = 'Try adjusting your search criteria or date range.' }: TrainerEarningsEmptyStateProps) {
  return (
    <div className="p-12 flex flex-col items-center justify-center text-center h-full space-y-3">
      <div className="w-14 h-14 rounded-full bg-input flex items-center justify-center">
        <FileText size={26} className="text-secondary" />
      </div>
      <div>
        <p className="text-sm font-semibold text-primary">{message}</p>
        <p className="text-xs text-secondary mt-1">{description}</p>
      </div>
    </div>
  );
}
