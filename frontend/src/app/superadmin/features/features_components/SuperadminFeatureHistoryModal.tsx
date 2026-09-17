'use client';
import { useSuperadminDialogAccessibility } from '@/app/superadmin/superadmin_utils/useSuperadminDialogAccessibility';
// RESPONSIBILITY: Renders the API-backed change history drawer for one feature flag; owns no mock data or network calls.
import { formatDate } from '@/lib/formatters';
import { Clock, X } from 'lucide-react';
import type { FeatureFlag, FeatureFlagHistory } from '@/app/superadmin/features/superadmin_features_types/superadmin_features_types';

export interface SuperadminFeatureHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  flag: FeatureFlag | null;
  history: FeatureFlagHistory[];
}

export default function SuperadminFeatureHistoryModal({ isOpen, onClose, flag, history }: SuperadminFeatureHistoryModalProps) {
  const dialogRef = useSuperadminDialogAccessibility(isOpen, onClose);

  if (!isOpen || !flag) return null;

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-overlay/80 backdrop-blur-sm motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200">
      <div ref={dialogRef}  className="flex h-full w-full max-w-md flex-col border-l border-border bg-overlay shadow-2xl motion-safe:animate-in motion-safe:slide-in-from-right-full motion-safe:duration-300" role="dialog" aria-modal="true" aria-labelledby="superadmin-feature-history-title">
        <div className="flex items-center justify-between border-b border-border p-6">
          <div className="min-w-0"><h2 id="superadmin-feature-history-title" className="text-xl font-bold text-foreground">Change History</h2><p className="mt-1 truncate text-sm text-secondary" title={flag.name}>{flag.name}</p></div>
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-secondary hover:bg-input hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label="Close change history"><X size={18} strokeWidth={2} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {history.length === 0 ? <div className="rounded-lg border border-border bg-card p-8 text-center text-sm text-secondary">No change history is available for this feature yet.</div> : <div className="relative space-y-6 before:absolute before:inset-y-0 before:left-5 before:w-0.5 before:bg-border">{history.map((entry) => <div key={entry.id} className="relative flex items-start gap-4">
            <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-overlay bg-input text-secondary"><Clock size={18} strokeWidth={2} aria-hidden="true" /></div>
            <div className="min-w-0 flex-1 rounded-lg border border-border bg-card p-4 shadow-sm"><div className="flex items-center justify-between gap-2"><div className="truncate text-sm font-bold text-foreground" title={entry.user}>{entry.user}</div><time className="shrink-0 text-xs font-medium text-secondary">{formatDate(entry.timestamp)}</time></div><div className="mt-1 text-sm text-secondary">{entry.action}</div></div>
          </div>)}</div>}
        </div>
      </div>
    </div>
  );
}
