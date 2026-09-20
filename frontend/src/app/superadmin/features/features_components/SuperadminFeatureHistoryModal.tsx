// RESPONSIBILITY: Renders one feature flag's change history from the feature-owned API/query boundary.
'use client';
import { Clock, Loader2, X } from 'lucide-react';
import { formatDate } from '@/lib/formatters';
import type { FeatureFlag } from '@/app/superadmin/features/features_types/SuperadminFeaturesTypes';
import { useSuperadminFeatureHistory } from '@/app/superadmin/features/features_utils/useSuperadminFeatureHistory';
import type { SuperadminFeatureHistoryModalProps } from '@/app/superadmin/features/features_types/SuperadminFeatureHistoryModalTypes';

export default function SuperadminFeatureHistoryModal({ isOpen, onClose, flag }: SuperadminFeatureHistoryModalProps) {
  const query = useSuperadminFeatureHistory(flag?.id ?? null);
  if (!isOpen || !flag) return null;
  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-overlay backdrop-blur-sm motion-safe:animate-in motion-safe:fade-in motion-safe:duration-base">
      <div className="flex h-full w-full max-w-md flex-col border-l border-border bg-card shadow-dialog motion-safe:animate-in motion-safe:slide-in-from-right-full motion-safe:duration-slow" role="dialog" aria-modal="true" aria-labelledby="superadmin-feature-history-title">
        <div className="flex items-center justify-between border-b border-border p-6">
          <div>
            <h2 id="superadmin-feature-history-title" className="text-xl font-bold text-primary">Change History</h2>
            <p className="mt-1 max-w-md truncate text-sm text-secondary">{flag.name}</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close history" className="min-h-11 min-w-11 rounded-lg p-2 text-secondary hover:bg-input hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <X size={18} strokeWidth={2} aria-hidden="true"/>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {query.isPending ? (
            <div className="flex min-h-48 items-center justify-center gap-2 text-secondary" aria-busy="true"><Loader2 size={18} className="motion-safe:animate-spin"/> Loading history…</div>
          ) : query.isError ? (
            <div role="alert" className="rounded-lg border border-border bg-danger-bg p-4 text-sm text-danger">Unable to load feature history. <button type="button" onClick={() => void query.refetch()} className="ml-1 underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger">Retry</button></div>
          ) : (query.data?.data?.length ?? 0) === 0 ? (
            <div className="rounded-lg border border-border bg-input p-6 text-center text-sm text-secondary">No change history is available for this feature yet.</div>
          ) : (
            <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:w-0.5 before:bg-border">
              {query.data?.data?.map((log) => (
                <div key={log.id} className="relative flex items-start gap-4">
                  <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-border bg-input text-secondary shadow-card"><Clock size={18} strokeWidth={2} aria-hidden="true"/></div>
                  <div className="min-w-0 flex-1 rounded-lg border border-border bg-card p-4 shadow-card">
                    <div className="mb-1 flex items-center justify-between gap-2"><div className="text-sm font-bold text-primary">{log.user}</div><time className="shrink-0 text-xs font-medium text-secondary">{formatDate(log.timestamp)}</time></div>
                    <div className="text-sm text-secondary">{log.action}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
