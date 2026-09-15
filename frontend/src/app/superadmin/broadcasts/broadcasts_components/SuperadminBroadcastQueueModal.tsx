'use client';
// RESPONSIBILITY: Renders an automated queue that visually simulates sending WhatsApp messages and Notifications to selected gyms.

import { useEffect, useState } from 'react';
import { X, CheckCircle, Phone, Bell, Loader2 } from 'lucide-react';
import { maskSensitiveData } from '@/lib/formatters';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { logger } from '@/lib/logger';

export interface BroadcastRecipient {
  id: string;
  name: string;
  phone: string;
}

/** Shape of a notification persisted to local storage for the in-app notification bell. */
interface BroadcastNotification {
  id: string;
  text: string;
  time: string;
  unread: boolean;
}

interface SuperadminBroadcastQueueModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipients: BroadcastRecipient[];
  broadcastTitle: string;
  onComplete: () => void;
}

export default function SuperadminBroadcastQueueModal({
  isOpen,
  onClose,
  recipients,
  broadcastTitle,
  onComplete
}: SuperadminBroadcastQueueModalProps) {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  // Rule 58: use the shared useLocalStorage hook — never access localStorage directly in a component.
  // Key uses 'admin_notifications_v1' for versioning compatibility.
  const [, setNotifications] = useLocalStorage<BroadcastNotification[]>('admin_notifications_v1', []);

  // Starts the queue from the first recipient whenever the modal opens with a new list.
  // EXPLANATION: Synchronize component state with external dependencies.
  // EFFECT DEPENDENCIES: Documented intentionally.
  useEffect(() => {
    if (isOpen && recipients.length > 0) {
      setCurrentIndex(0);
      setCompleted(new Set());
    }
  }, [isOpen, recipients]);

  // Processes each recipient sequentially with a 1.5s visual delay.
  // EXPLANATION: Synchronize component state with external dependencies.
  // EFFECT DEPENDENCIES: Documented intentionally.
  useEffect(() => {
    if (currentIndex >= 0 && currentIndex < recipients.length) {
      const timer = setTimeout(() => {
        const rec = recipients[currentIndex];
        
        if (!rec) return;

        // Push notification logic (mocked to localstorage)
        try {
          setNotifications(prev => {
            const notifs = [...(prev || [])];
            notifs.unshift({
              id: `n-${Date.now()}-${rec.id}`,
              text: `[Broadcast] ${broadcastTitle}`,
              time: 'Just now',
              unread: true
            });
            return notifs;
          });
        } catch (e) {
          logger.error(e);
        }

        // We simulate the WhatsApp open without actually opening tabs to prevent popup blocker chaos for bulk sending
        setCompleted(prev => new Set(prev).add(rec.id));
        
        if (currentIndex + 1 === recipients.length) {
          setTimeout(() => {
            onComplete();
          }, 1000);
        } else {
          setCurrentIndex(prev => prev + 1);
        }
      }, 1500); // 1.5s per gym for visual effect

      return () => clearTimeout(timer);
    }
  }, [currentIndex, recipients, broadcastTitle, onComplete, setNotifications]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="bg-overlay rounded-2xl shadow-2xl w-full max-w-lg border border-border flex flex-col motion-safe:animate-in motion-safe:zoom-in-95 motion-safe:duration-200 overflow-hidden">
        <div className="px-6 py-4 bg-primary flex items-center justify-between">
          <div>
            <h2 className="text-white font-bold text-lg">Automated Broadcast</h2>
            <p className="text-white/80 text-xs">Sending to {recipients.length} Gyms directly...</p>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white motion-safe:transition-colors p-1 bg-white/10 rounded-full hover:bg-white/20">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 max-h-96 overflow-y-auto space-y-3 bg-overlay custom-scrollbar">
          {recipients.map((rec, idx) => {
            const isProcessing = currentIndex === idx;
            const isDone = completed.has(rec.id);
            const isPending = !isProcessing && !isDone;

            return (
              <div key={rec.id} className={`p-4 rounded-xl border flex items-center justify-between motion-safe:transition-colors ${
                isProcessing ? 'border-primary bg-primary-subtle' : 
                isDone ? 'border-success/30 bg-success-bg/30' : 'border-border bg-input'
              }`}>
                <div>
                  <p className="font-bold text-foreground text-sm">{rec.name}</p>
                  <p className="text-xs text-secondary mt-0.5 font-mono">{maskSensitiveData(rec.phone, 'phone')}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`flex flex-col items-center gap-1 ${isDone || isProcessing ? 'text-success' : 'text-secondary/30'}`}>
                    <Phone size={14} />
                    <span className="text-xs font-bold">WA</span>
                  </div>
                  <div className={`flex flex-col items-center gap-1 ${isDone || isProcessing ? 'text-primary' : 'text-secondary/30'}`}>
                    <Bell size={14} />
                    <span className="text-xs font-bold">APP</span>
                  </div>
                  <div className="ml-3 w-6 h-6 flex items-center justify-center">
                    {isProcessing && <Loader2 className="w-5 h-5 text-primary motion-safe:animate-spin" />}
                    {isDone && <CheckCircle className="w-5 h-5 text-success" />}
                    {isPending && <div className="w-2 h-2 rounded-full bg-border" />}
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

