// RESPONSIBILITY: Renders the entity-specific empty state for a staff ledger with no transactions.
import { FileText } from 'lucide-react';

export default function ManagerHrLedgerEmptyState() {
  return (
    <div className="flex flex-col items-center gap-2 p-12 text-center text-secondary">
      <FileText size={18} aria-hidden="true" className="opacity-20" />
      <p>No transactions found for this staff member.</p>
    </div>
  );
}
