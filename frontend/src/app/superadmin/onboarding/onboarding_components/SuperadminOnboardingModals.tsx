'use client';
// RESPONSIBILITY: Renders the extend-trial and convert-to-paid dialogs with keyboard-accessible confirmation controls; mutation orchestration stays in the parent hook.
import { useSuperadminDialogAccessibility } from '@/app/superadmin/superadmin_utils/useSuperadminDialogAccessibility';
import { AlertTriangle } from 'lucide-react';

export function SuperadminOnboardingModals({
  extendModalId,
  setExtendModalId,
  extendDays,
  setExtendDays,
  handleExtendTrial,
  convertConfirmId,
  setConvertConfirmId,
  handleConvertToPaidConfirmed,
}: {
  extendModalId: string | null;
  setExtendModalId: (id: string | null) => void;
  extendDays: string;
  setExtendDays: (days: string) => void;
  handleExtendTrial: (id: string) => void;
  convertConfirmId: string | null;
  setConvertConfirmId: (id: string | null) => void;
  handleConvertToPaidConfirmed: (id: string) => void;
}) {
  const extendDialogRef = useSuperadminDialogAccessibility(Boolean(extendModalId), () => setExtendModalId(null));
  const convertDialogRef = useSuperadminDialogAccessibility(Boolean(convertConfirmId), () => setConvertConfirmId(null));

  return (
    <>
      {/* Extend Trial Modal */}
      {extendModalId && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay/80 backdrop-blur-sm" ref={extendDialogRef} role="dialog" aria-modal="true" aria-labelledby="superadmin-onboarding-extend-title" tabIndex={-1}>
          <div className="bg-overlay border border-border rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <h2 id="superadmin-onboarding-extend-title" className="text-lg font-bold text-foreground mb-1">Extend Trial</h2>
            <p className="text-secondary text-sm mb-4">
              How many additional days would you like to grant?
            </p>
            {/* Rule 65: hardened numeric input — blocks -, e, + */}
            <input
              type="number"
              min={1}
              max={90}
              value={extendDays}
              onChange={(e) => setExtendDays(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === '-' || e.key === 'e' || e.key === '+') e.preventDefault();
              }}
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground text-sm focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary mb-4"
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setExtendModalId(null)}
                className="px-4 py-2 rounded-lg bg-input text-secondary hover:text-foreground text-sm motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Cancel
              </button>
              <button
                onClick={() => handleExtendTrial(extendModalId)}
                className="px-4 py-2 rounded-lg bg-primary text-black font-semibold text-sm hover:bg-primary-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Extend Trial
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Convert to Paid — double confirmation modal */}
      {convertConfirmId && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay/80 backdrop-blur-sm" ref={convertDialogRef} role="dialog" aria-modal="true" aria-labelledby="superadmin-onboarding-convert-title" tabIndex={-1}>
          <div className="bg-overlay border border-border rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-warning" strokeWidth={2}  />
              </div>
              <h2 id="superadmin-onboarding-convert-title" className="text-lg font-bold text-foreground">Convert to Paid?</h2>
            </div>
            <p className="text-secondary text-sm mb-5">
              This will mark the tenant as a paid subscriber and end their trial. This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConvertConfirmId(null)}
                className="px-4 py-2 rounded-lg bg-input text-secondary hover:text-foreground text-sm motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Cancel
              </button>
              <button
                onClick={() => handleConvertToPaidConfirmed(convertConfirmId)}
                className="px-4 py-2 rounded-lg bg-success text-white font-semibold text-sm hover:opacity-90 motion-safe:transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success"
              >
                Yes, Convert to Paid
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

