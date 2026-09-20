// RESPONSIBILITY: Renders the Superadmin broadcast delivery queue. Delivery state comes from the feature API/MSW contract; this component contains no delivery simulation or notification persistence.
'use client';
import { useEffect, useRef, useState } from 'react';
import { X, CheckCircle, Phone, Bell, Loader2, RotateCcw } from 'lucide-react';
import { maskSensitiveData } from '@/lib/formatters';
import { useSuperadminBroadcastDelivery } from '@/app/superadmin/broadcasts/broadcasts_utils/useSuperadminBroadcastDelivery';
import type { SuperadminBroadcastRecipient, SuperadminBroadcastQueueRecipientState, SuperadminBroadcastQueueModalProps } from '@/app/superadmin/broadcasts/broadcasts_types/SuperadminBroadcastQueueModalTypes';







export default function SuperadminBroadcastQueueModal({ isOpen, onClose, recipients, broadcastId, broadcastTitle, onComplete }: SuperadminBroadcastQueueModalProps) {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [states, setStates] = useState<Record<string, SuperadminBroadcastQueueRecipientState>>({});
  const [lastError, setLastError] = useState<string | null>(null);
  const processingIndexRef = useRef<number | null>(null);
  const idempotencyKeysRef = useRef<Map<string, string>>(new Map());
  const [isReady, setIsReady] = useState(false);
  const { deliverRecipient } = useSuperadminBroadcastDelivery();

  // EFFECT INTENT: Reset the queue session whenever the modal closes or its recipient contract changes; no delivery work is started until the reset render completes.
  useEffect(() => {
    if (!isOpen || !broadcastId) {
      setCurrentIndex(-1);
      setStates({});
      setLastError(null);
      setIsReady(false);
      processingIndexRef.current = null;
      idempotencyKeysRef.current.clear();
      return;
    }
    const initialStates = Object.fromEntries(recipients.map((recipient) => [recipient.id, 'PENDING' as const]));
    setStates(initialStates);
    setCurrentIndex(recipients.length > 0 ? 0 : -1);
    setLastError(null);
    setIsReady(true);
    processingIndexRef.current = null;
    idempotencyKeysRef.current = new Map();
  }, [broadcastId, isOpen, recipients]);

  // EFFECT INTENT: Process exactly one recipient at a time through the feature delivery mutation; successful responses advance the queue and failures stop it for explicit retry.
  useEffect(() => {
    if (!isOpen || !isReady || !broadcastId || currentIndex < 0 || currentIndex >= recipients.length) return;
    if (processingIndexRef.current === currentIndex) return;
    const recipient = recipients[currentIndex];
    if (!recipient || states[recipient.id] === 'DELIVERED') return;
    processingIndexRef.current = currentIndex;
    setStates((previous) => ({ ...previous, [recipient.id]: 'PROCESSING' }));
    setLastError(null);

    const intentKey = `${broadcastId}:${recipient.id}`;
    const idempotencyKey = idempotencyKeysRef.current.get(intentKey) ?? crypto.randomUUID();
    idempotencyKeysRef.current.set(intentKey, idempotencyKey);

    void deliverRecipient({ broadcastId, recipientId: recipient.id, idempotencyKey })
      .then((response) => {
        if (!response.success || !response.data) throw new Error(response.message);
        setStates((previous) => ({ ...previous, [recipient.id]: 'DELIVERED' }));
        if (currentIndex + 1 >= recipients.length) {
          onComplete(response.message);
          setCurrentIndex(-1);
        } else {
          setCurrentIndex((previous) => previous + 1);
        }
      })
      .catch((error: unknown) => {
        setStates((previous) => ({ ...previous, [recipient.id]: 'FAILED' }));
        setLastError(error instanceof Error ? error.message : '');
      })
      .finally(() => {
        processingIndexRef.current = null;
      });
  }, [broadcastId, currentIndex, deliverRecipient, isOpen, isReady, onComplete, recipients, states]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-overlay/80 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="superadmin-broadcast-queue-title">
      <div className="bg-overlay rounded-xl shadow-dialog w-full max-w-lg border border-border flex flex-col overflow-hidden">
        <div className="px-6 py-4 bg-primary-subtle flex items-center justify-between">
          <div className="min-w-0">
            <h2 id="superadmin-broadcast-queue-title" className="truncate text-on-primary font-bold text-lg">Automated Broadcast</h2>
            <p className="text-on-primary/80 text-xs">Processing delivery for {recipients.length} selected tenants.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close broadcast delivery queue" className="min-h-11 min-w-11 inline-flex items-center justify-center rounded-full text-on-primary/80 hover:text-on-primary hover:bg-primary-hover motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        <div className="p-6 max-h-96 overflow-y-auto space-y-3 custom-scrollbar" aria-live="polite">
          <p className="text-sm text-secondary mb-4">{broadcastTitle}</p>
          {recipients.map((recipient) => {
            const state = states[recipient.id] ?? 'PENDING';
            const isProcessing = state === 'PROCESSING';
            const isDone = state === 'DELIVERED';
            const isFailed = state === 'FAILED';
            return (
              <div key={recipient.id} className={`p-4 rounded-lg border flex items-center justify-between motion-safe:transition-all motion-safe:duration-base ${isProcessing ? 'border-primary bg-primary-subtle' : isDone ? 'border-success/30 bg-success-bg/30' : isFailed ? 'border-danger/30 bg-danger-bg/30' : 'border-border bg-input'}`}>
                <div className="min-w-0">
                  <p className="truncate font-bold text-primary text-sm">{recipient.name}</p>
                  <p className="truncate text-xs text-secondary mt-0.5 font-mono">{maskSensitiveData(recipient.phone, 'phone')}</p>
                  {isFailed ? <p className="mt-1 text-xs text-danger" role="alert">{lastError}</p> : null}
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className={`flex flex-col items-center gap-1 ${isDone || isProcessing ? 'text-success' : isFailed ? 'text-danger' : 'text-disabled'}`} aria-label="WhatsApp delivery channel">
                    <Phone size={18} strokeWidth={2} />
                    <span className="text-xs font-bold">WA</span>
                  </div>
                  <div className={`flex flex-col items-center gap-1 ${isDone || isProcessing ? 'text-primary' : 'text-disabled'}`} aria-label="In-app notification channel">
                    <Bell size={18} strokeWidth={2} />
                    <span className="text-xs font-bold">APP</span>
                  </div>
                  <div className="ml-3 w-20 min-h-11 flex items-center justify-end gap-2">
                    {isProcessing ? <Loader2 size={18} strokeWidth={2} className="text-primary motion-safe:animate-spin" aria-label="Delivering" /> : null}
                    {isDone ? <CheckCircle size={18} strokeWidth={2} className="text-success" aria-label="Delivered" /> : null}
                    {isFailed ? (
                      <button type="button" onClick={() => { setLastError(null); setStates((previous) => ({ ...previous, [recipient.id]: 'PENDING' })); const index = recipients.findIndex((item) => item.id === recipient.id); setCurrentIndex(index); }} className="inline-flex items-center justify-center gap-1 rounded-md border border-danger/30 px-2 py-1 text-xs font-medium text-danger hover:bg-danger-bg motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label={`Retry delivery to ${recipient.name}`}>
                        <RotateCcw size={18} strokeWidth={2} />Retry
                      </button>
                    ) : null}
                    {state === 'PENDING' && !isReady ? <span className="w-2 h-2 rounded-full bg-border" aria-hidden="true" /> : null}
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

export type { SuperadminBroadcastRecipient } from '@/app/superadmin/broadcasts/broadcasts_types/SuperadminBroadcastQueueModalTypes';
