// RESPONSIBILITY: Renders the selected White-labeling domain drawer and delegates status mutations to the feature hook.
'use client';

import { useEffect, useRef } from 'react';
import { AlertTriangle, CheckCircle, Loader2, X } from 'lucide-react';
import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';
import { formatDate } from '@/lib/formatters';
import { useSuperadminWhiteLabelingStore } from '@/app/superadmin/white-labeling/white-labeling_store/useSuperadminWhiteLabelingStore';
import { useUpdateSuperadminDomainStatus } from '@/app/superadmin/white-labeling/white-labeling_hooks/useSuperadminWhiteLabeling';
import type { WhiteLabelDomain } from '@/app/superadmin/white-labeling/white-labeling_types/SuperadminWhiteLabelingTypes';
import { SUPERADMIN_WHITE_LABELING_DNS_GUIDANCE } from '@/app/superadmin/white-labeling/white-labeling_constants/SuperadminWhiteLabelingConstants';
import type { SuperadminWhiteLabelingDrawerProps } from '@/app/superadmin/white-labeling/white-labeling_types/SuperadminWhiteLabelingComponentTypes';


export default function SuperadminWhiteLabelingDrawer({ domains }: SuperadminWhiteLabelingDrawerProps) {
  const { selectedDomainId, setSelectedDomainId } = useSuperadminWhiteLabelingStore();
  const { mutateAsync: updateStatus, isPending } = useUpdateSuperadminDomainStatus();
  const { confirm } = useConfirm();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const domain = domains.find((item) => item.id === selectedDomainId);

  useEffect(() => {
    if (!domain) return;
    restoreFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); setSelectedDomainId(null); return; }
      if (event.key !== 'Tab') return;
      const root = document.getElementById('superadmin-white-labeling-drawer');
      if (!root) return;
      const focusable = Array.from(root.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])'));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      restoreFocusRef.current?.focus();
    };
  }, [domain, setSelectedDomainId]);

  if (!domain) return null;

  const markFailed = async () => {
    const confirmed = await confirm({ title: 'Mark Domain as Failed', message: `Mark ${domain.domain} as failed? This changes its current verification state.`, type: 'danger', confirmText: 'Mark Failed' });
    if (confirmed) await updateStatus({ id: domain.id, dto: { status: 'failed' } });
  };

  const markVerified = async () => { await updateStatus({ id: domain.id, dto: { status: 'active' } }); };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-overlay backdrop-blur-sm motion-safe:transition-opacity" onClick={() => setSelectedDomainId(null)} aria-hidden="true" />
      <aside id="superadmin-white-labeling-drawer" className="fixed inset-y-0 right-0 z-40 flex w-full max-w-md flex-col border-l border-border bg-overlay shadow-dialog motion-safe:transition-transform motion-safe:duration-slow" aria-labelledby="superadmin-white-labeling-drawer-title" aria-modal="true" role="dialog">
        <div className="flex shrink-0 items-center justify-between border-b border-border p-6">
          <div className="min-w-0"><h2 id="superadmin-white-labeling-drawer-title" className="text-xl font-bold text-primary">Manage Domain</h2><p className="mt-1 truncate text-sm text-secondary" title={domain.gymName}>{domain.gymName}</p></div>
          <button ref={closeButtonRef} type="button" onClick={() => setSelectedDomainId(null)} className="min-h-11 min-w-11 rounded-lg p-2 text-secondary hover:bg-input hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" aria-label="Close panel"><X size={18} className="h-5" aria-hidden="true"/></button>
        </div>

        <div className="flex-1 space-y-8 overflow-y-auto p-6 custom-scrollbar">
          <section className="space-y-4"><h3 className="text-sm font-semibold uppercase tracking-wider text-primary">Domain Configuration</h3><div className="space-y-3 rounded-xl border border-border bg-input p-4 text-sm"><div className="flex items-center justify-between gap-3"><span className="text-secondary">Target Domain</span><span className="max-w-60 truncate rounded-md bg-page px-2 py-1 font-medium text-primary" title={domain.domain}>{domain.domain}</span></div><div className="flex items-center justify-between gap-3"><span className="text-secondary">DNS Status</span><span className={`${domain.status === 'active' ? 'text-success' : domain.status === 'failed' ? 'text-danger' : 'text-warning'} font-medium`}>{domain.status}</span></div><div className="flex items-center justify-between gap-3"><span className="text-secondary">SSL Certificate</span><span className={`${domain.sslStatus === 'issued' ? 'text-success' : domain.sslStatus === 'failed' ? 'text-danger' : 'text-warning'} font-medium`}>{domain.sslStatus}</span></div><div className="flex items-center justify-between gap-3"><span className="text-secondary">Added On</span><span className="text-primary">{formatDate(domain.createdAt)}</span></div></div></section>

          <section className="space-y-4"><h3 className="text-sm font-semibold uppercase tracking-wider text-primary">Branding Profile</h3><div className="space-y-4 rounded-xl border border-border bg-input p-4"><div className="flex items-center gap-4"><span className="w-24 shrink-0 text-sm text-secondary">App Logo</span>{domain.logoUrl ? <span className="truncate text-sm font-medium text-primary" title={domain.logoUrl}>Configured</span> : <span className="rounded-md border border-border bg-page px-3 py-1.5 text-sm font-medium text-primary">Not Provided</span>}</div><div className="flex items-center gap-4"><span className="w-24 shrink-0 text-sm text-secondary">Theme Color</span>{domain.primaryColor ? <div className="flex min-w-0 items-center gap-2"><div className="h-6 w-6 shrink-0 rounded-full border border-border" style={{ backgroundColor: domain.primaryColor }} aria-hidden="true" /><span className="truncate font-mono text-sm text-primary">{domain.primaryColor}</span></div> : <span className="rounded-md border border-border bg-page px-3 py-1.5 text-sm font-medium text-primary">Default</span>}</div></div></section>

          <section className="space-y-4"><h3 className="text-sm font-semibold uppercase tracking-wider text-primary">DNS Instructions for Gym</h3><div className="space-y-2 rounded-xl border border-border bg-page p-4 text-sm text-secondary"><p>The gym owner needs to add the following DNS records to their domain registrar:</p><div className="overflow-x-auto rounded-md border border-border bg-input p-3 font-mono text-xs text-primary"><p>Type: {SUPERADMIN_WHITE_LABELING_DNS_GUIDANCE.recordType}</p><p>Name: {SUPERADMIN_WHITE_LABELING_DNS_GUIDANCE.recordName}</p><p>Value: {SUPERADMIN_WHITE_LABELING_DNS_GUIDANCE.recordValue}</p></div><p className="text-xs text-disabled">{SUPERADMIN_WHITE_LABELING_DNS_GUIDANCE.propagationMessage}</p></div></section>
        </div>

        <div className="shrink-0 space-y-3 border-t border-border bg-page p-6">
          {domain.status !== 'active' ? <button type="button" onClick={() => void markVerified()} disabled={isPending} className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-success px-4 py-2.5 font-medium text-on-success motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:cursor-not-allowed disabled:opacity-50"><CheckCircle size={18} aria-hidden="true"/>{isPending ? <><Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true" /> Saving...</> : <>Mark as Verified</>}</button> : null}
          {domain.status === 'pending' ? <button type="button" onClick={() => void markFailed()} disabled={isPending} className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-danger px-4 py-2.5 font-medium text-on-danger motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:cursor-not-allowed disabled:opacity-50"><AlertTriangle size={18} aria-hidden="true"/>{isPending ? <><Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true" /> Saving...</> : <>Mark as Failed</>}</button> : null}
          <button type="button" onClick={() => setSelectedDomainId(null)} className="min-h-11 w-full rounded-lg bg-input px-4 py-2.5 font-medium text-primary hover:bg-border motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">Close</button>
        </div>
      </aside>
    </>
  );
}
