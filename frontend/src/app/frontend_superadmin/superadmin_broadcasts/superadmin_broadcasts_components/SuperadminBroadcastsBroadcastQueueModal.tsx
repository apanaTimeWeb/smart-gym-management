'use client';
/**
 * RESPONSIBILITY: React component SuperadminBroadcastsBroadcastQueueModal owned by the superadmin_broadcasts feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: useEffect, useState
 * MODULE DEPENDENCIES: lucide-react, @/lib/formatters, @/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_hooks/useSuperadminBroadcastsBroadcastDelivery, @/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_types/SuperadminBroadcastsBroadcastQueueModalTypes, @/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_types/SuperadminBroadcastsBroadcastQueueModalTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the Superadmin broadcast delivery queue. Delivery state comes from the feature API/MSW contract; this component contains no delivery simulation or notification persistence.
import { useEffect, useRef, useState } from 'react';

import { X, CheckCircle, Phone, Bell, Loader2, RotateCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { maskSensitiveData } from '@/lib/formatters';

import { SUPERADMIN_BROADCAST_QUEUE_STATE_CODES } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_constants/SuperadminBroadcastsBroadcastConstants';
import { useSuperadminBroadcastsBroadcastDelivery } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_hooks/useSuperadminBroadcastsBroadcastDelivery';

import type { SuperadminBroadcastRecipient, SuperadminBroadcastQueueRecipientState, SuperadminBroadcastsBroadcastQueueModalProps } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_types/SuperadminBroadcastsBroadcastQueueModalTypes';



/**
 * @description Owns the SuperadminBroadcastsBroadcastQueueModal responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminBroadcastsBroadcastQueueModal({ isOpen, onClose, recipients, broadcastId, broadcastTitle, onComplete }: SuperadminBroadcastsBroadcastQueueModalProps) {
  const t = useTranslations('superadmin_broadcasts');
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [states, setStates] = useState<Record<string, SuperadminBroadcastQueueRecipientState>>({});
  const [lastError, setLastError] = useState<string | null>(null);
  const processingIndexRef = useRef<number | null>(null);
  const [isReady, setIsReady] = useState(false);
  const { deliverRecipient } = useSuperadminBroadcastsBroadcastDelivery();

  // EFFECT INTENT: Reset the queue session whenever the modal closes or its recipient contract changes; no delivery work is started until the reset render completes.
// EFFECT: Synchronizes the component state/effect side effect with its declared dependencies and cleans up the subscription or listener when the owner unmounts or dependencies change.
  useEffect(() => {
    if (!isOpen || !broadcastId) {
      setCurrentIndex(-1);
      setStates({});
      setLastError(null);
      setIsReady(false);
      processingIndexRef.current = null;
      return;
    }
    const initialStates = Object.fromEntries(recipients.map((recipient) => [recipient.id, SUPERADMIN_BROADCAST_QUEUE_STATE_CODES.PENDING]));
    setStates(initialStates);
    setCurrentIndex(recipients.length > 0 ? 0 : -1);
    setLastError(null);
    setIsReady(true);
    processingIndexRef.current = null;
  }, [broadcastId, isOpen, recipients]);

  // EFFECT INTENT: Process exactly one recipient at a time through the feature delivery mutation; successful responses advance the queue and failures stop it for explicit retry.
// EFFECT: Synchronizes the component state/effect side effect with its declared dependencies and cleans up the subscription or listener when the owner unmounts or dependencies change.
  useEffect(() => {
    if (!isOpen || !isReady || !broadcastId || currentIndex < 0 || currentIndex >= recipients.length) return;
    if (processingIndexRef.current === currentIndex) return;
    const recipient = recipients[currentIndex];
    if (!recipient || states[recipient.id] === SUPERADMIN_BROADCAST_QUEUE_STATE_CODES.DELIVERED) return;
    processingIndexRef.current = currentIndex;
    setStates((previous) => ({ ...previous, [recipient.id]: SUPERADMIN_BROADCAST_QUEUE_STATE_CODES.PROCESSING }));
    setLastError(null);

    void deliverRecipient({ broadcastId, recipientId: recipient.id })
      .then((response) => {
        if (!response.success || !response.data) throw new Error(response.message);
        setStates((previous) => ({ ...previous, [recipient.id]: SUPERADMIN_BROADCAST_QUEUE_STATE_CODES.DELIVERED }));
        if (currentIndex + 1 >= recipients.length) {
          onComplete(response.message);
          setCurrentIndex(-1);
        } else {
          setCurrentIndex((previous) => previous + 1);
        }
      })
      .catch((error: unknown) => {
        setStates((previous) => ({ ...previous, [recipient.id]: SUPERADMIN_BROADCAST_QUEUE_STATE_CODES.FAILED }));
        setLastError('Delivery could not be completed. Please retry the recipient.');
      })
      .finally(() => {
        processingIndexRef.current = null;
      });
  }, [broadcastId, currentIndex, deliverRecipient, isOpen, isReady, onComplete, recipients, states]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-overlay backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="superadmin-broadcast-queue-title" data-testid="superadmin_broadcasts-broadcast-queue-modal-dialog">
      <div className="bg-overlay rounded-xl shadow-dialog w-full max-w-lg border border-border flex flex-col overflow-hidden">
        <div className="px-6 py-4 bg-primary-subtle flex items-center justify-between">
          <div className="min-w-0">
            <h2 id="superadmin-broadcast-queue-title" className="truncate text-on-primary font-bold text-lg">{t('ui.automated_broadcast_ff617205')}</h2>
            <p className="text-on-primary text-xs">{t('ui.processing_delivery_for_e271e10b')}{recipients.length} {t('ui.selected_tenants_49a95cf7')}</p>
          </div>
          <button type="button" onClick={onClose} aria-label={t('ui.close_broadcast_delivery_queue_c9578fd1')} className="min-h-11 min-w-11 inline-flex items-center justify-center rounded-full text-on-primary hover:text-on-primary hover:bg-primary-hover motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="superadmin_broadcasts-superadmin-broadcasts-broadcast-queue-modal-close-broadcast-delivery-queue">
            <X size={18} strokeWidth={2}/>
          </button>
        </div>

        <div className="p-6 max-h-96 overflow-y-auto space-y-3 custom-scrollbar" aria-live="polite" data-testid="superadmin_broadcasts-broadcast-queue-list">
          <p className="text-sm text-secondary mb-4">{broadcastTitle}</p>
          {recipients.map((recipient) => {
            const state = states[recipient.id] ?? SUPERADMIN_BROADCAST_QUEUE_STATE_CODES.PENDING;
            const isProcessing = state === SUPERADMIN_BROADCAST_QUEUE_STATE_CODES.PROCESSING;
            const isDone = state === SUPERADMIN_BROADCAST_QUEUE_STATE_CODES.DELIVERED;
            const isFailed = state === SUPERADMIN_BROADCAST_QUEUE_STATE_CODES.FAILED;
            return (
              <div key={recipient.id} className={`p-4 rounded-lg border flex items-center justify-between motion-safe:transition-all motion-safe:duration-base ${isProcessing ? 'border-focus bg-primary-subtle' : isDone ? 'border-border bg-success-bg' : isFailed ? 'border-border bg-danger-bg' : 'border-border bg-input'}`}>
                <div className="min-w-0">
                  <p className="truncate font-bold text-primary text-sm">{recipient.name}</p>
                  <p className="truncate text-xs text-secondary mt-0.5 font-mono">{maskSensitiveData(recipient.phone, 'phone')}</p>
                  {isFailed ? <p className="mt-1 text-xs text-danger" role="alert" data-testid="superadmin_broadcasts-broadcast-queue-error">{lastError}</p> : null}
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className={`flex flex-col items-center gap-1 ${isDone || isProcessing ? 'text-success' : isFailed ? 'text-danger' : 'text-disabled'}`} aria-label={t('ui.whatsapp_delivery_channel_8fa3581b')}>
                    <Phone size={18} strokeWidth={2}/>
                    <span className="text-xs font-bold">{t('ui.wa_4306a046')}</span>
                  </div>
                  <div className={`flex flex-col items-center gap-1 ${isDone || isProcessing ? 'text-primary' : 'text-disabled'}`} aria-label={t('ui.in_app_notification_channel_d29e6979')}>
                    <Bell size={18} strokeWidth={2}/>
                    <span className="text-xs font-bold">{t('ui.app_0bdbb2c3')}</span>
                  </div>
                  <div className="ml-3 w-20 min-h-11 flex items-center justify-end gap-2">
                    {isProcessing ? <Loader2 size={18} strokeWidth={2} className="text-primary motion-safe:animate-spin" aria-label={t('ui.delivering_eb32871c')}/> : null}
                    {isDone ? <CheckCircle size={18} strokeWidth={2} className="text-success" aria-label={t('ui.delivered_67edd3b9')}/> : null}
                    {isFailed ? (
                      <button type="button" onClick={() => { setLastError(null); setStates((previous) => ({ ...previous, [recipient.id]: SUPERADMIN_BROADCAST_QUEUE_STATE_CODES.PENDING })); const index = recipients.findIndex((item) => item.id === recipient.id); setCurrentIndex(index); }} className="inline-flex items-center justify-center gap-1 rounded-md border border-border px-2 py-1 text-xs font-medium text-danger hover:bg-danger-bg motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label={t('ui.retry_delivery_aria', { name: recipient.name })} data-testid="superadmin_broadcasts-superadmin-broadcasts-broadcast-queue-modal-broadcast-queue-modal-retry">
                        <RotateCcw size={18} strokeWidth={2}/>{t('ui.retry_6327b4e5')}</button>
                    ) : null}
                    {state === SUPERADMIN_BROADCAST_QUEUE_STATE_CODES.PENDING && !isReady ? <span className="w-2 h-2 rounded-full bg-surface-highlight" aria-hidden="true" /> : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export type { SuperadminBroadcastRecipient } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_types/SuperadminBroadcastsBroadcastQueueModalTypes';
