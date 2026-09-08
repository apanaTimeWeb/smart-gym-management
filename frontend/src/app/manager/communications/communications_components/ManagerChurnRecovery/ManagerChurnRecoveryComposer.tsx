// RESPONSIBILITY: Slide-in drawer composer for sending win-back messages to a single churned member.
// Renders template tier selector, channel toggle, editable message body, and send button.
'use client';

import { X, MessageCircle, Mail, Send, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import type {
  ChurnedMember,
  CommChannel,
  WinBackTemplateTier,
} from '@/app/manager/communications/communications_types/communications_types';
import { CHURN_WIN_BACK_TEMPLATES } from '@/app/manager/communications/communications_utils/ManagerCommunicationsSharedConstants';

interface ManagerChurnRecoveryComposerProps {
  member: ChurnedMember | null;
  isOpen: boolean;
  onClose: () => void;
  onSend: (
    member: ChurnedMember,
    channel: CommChannel,
    templateTier: WinBackTemplateTier,
    message: string,
    subject: string,
  ) => void;
  isSending: boolean;
  defaultTier: WinBackTemplateTier;
}

const TIER_OPTIONS: { value: WinBackTemplateTier; label: string }[] = [
  { value: '7_days',  label: '< 7 Days' },
  { value: '30_days', label: '7–30 Days' },
  { value: '90_days', label: '30–90 Days' },
  { value: 'custom',  label: 'Custom' },
];

export default function ManagerChurnRecoveryComposer({
  member,
  isOpen,
  onClose,
  onSend,
  isSending,
  defaultTier,
}: ManagerChurnRecoveryComposerProps) {
  const [channel, setChannel]       = useState<CommChannel>('whatsapp');
  const [tier, setTier]             = useState<WinBackTemplateTier>(defaultTier);
  const [message, setMessage]       = useState('');
  const [subject, setSubject]       = useState('');

  // Sync state when member or default tier changes
  useEffect(() => {
    setTier(defaultTier);
    const tpl = CHURN_WIN_BACK_TEMPLATES[defaultTier];
    setMessage(tpl.message);
    setSubject(tpl.subject);
    setChannel('whatsapp');
  }, [member, defaultTier]);

  // Auto-fill template when tier changes
  function handleTierChange(newTier: WinBackTemplateTier) {
    setTier(newTier);
    const tpl = CHURN_WIN_BACK_TEMPLATES[newTier];
    setMessage(tpl.message);
    setSubject(tpl.subject);
  }

  function handleSend() {
    if (!member) return;
    onSend(member, channel, tier, message, subject);
  }

  const isEmailChannel  = channel === 'email';
  const canSend         = message.trim().length >= 10 && (!isEmailChannel || subject.trim().length >= 3);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 motion-safe:transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <aside
        aria-label="Win-Back Message Composer"
        aria-modal="true"
        role="dialog"
        className={`fixed top-0 right-0 h-full w-full sm:w-[480px] bg-overlay border-l border-border z-40 flex flex-col shadow-2xl shadow-black/50 motion-safe:transition-transform motion-safe:duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <div>
            <h2 className="text-base font-bold text-foreground">Win-Back Message</h2>
            {member && (
              <p className="text-xs text-secondary mt-0.5">
                Sending to: <span className="text-foreground font-medium">{member.name}</span>
                <span className="ml-2 text-warning">({member.daysSinceExit} days since exit)</span>
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close composer"
            className="p-2 rounded-lg text-secondary hover:text-foreground hover:bg-input motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar">
          {/* Template Tier Selector */}
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Template — Based on time since exit
            </label>
            <div className="flex flex-wrap gap-2">
              {TIER_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleTierChange(opt.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    tier === opt.value
                      ? 'bg-primary text-black border-primary'
                      : 'bg-input border-border text-secondary hover:text-foreground'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Channel */}
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">Channel</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setChannel('whatsapp')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  channel === 'whatsapp'
                    ? 'bg-success-bg border-success text-success'
                    : 'bg-input border-border text-secondary hover:text-foreground'
                }`}
                style={channel === 'whatsapp' ? { color: '#25D366', borderColor: '#25D366' } : undefined}
              >
                <MessageCircle size={15} />
                WhatsApp
              </button>
              <button
                type="button"
                onClick={() => setChannel('email')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  channel === 'email'
                    ? 'bg-info-bg border-info text-info'
                    : 'bg-input border-border text-secondary hover:text-foreground'
                }`}
              >
                <Mail size={15} />
                Email
              </button>
            </div>
          </div>

          {/* Subject — only for email */}
          {isEmailChannel && (
            <div>
              <label htmlFor="churn-subject" className="block text-sm font-medium text-secondary mb-1.5">
                Email Subject <span className="text-danger" aria-hidden="true">*</span>
              </label>
              <input
                id="churn-subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter email subject..."
                className="w-full px-3 py-2 text-sm bg-input border border-border rounded-lg text-foreground placeholder:text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary motion-safe:transition-colors"
                aria-required="true"
              />
            </div>
          )}

          {/* Message Body */}
          <div>
            <label htmlFor="churn-message" className="block text-sm font-medium text-secondary mb-1.5">
              Message <span className="text-danger" aria-hidden="true">*</span>
            </label>
            <textarea
              id="churn-message"
              rows={10}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your win-back message..."
              className="w-full px-3 py-2 text-sm bg-input border border-border rounded-lg text-foreground placeholder:text-secondary resize-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary motion-safe:transition-colors custom-scrollbar"
              aria-required="true"
              aria-describedby="churn-message-hint"
            />
            <p id="churn-message-hint" className="text-xs text-secondary mt-1">
              Use <code className="bg-input px-1 py-0.5 rounded text-primary">{'{name}'}</code> as a placeholder — the backend will replace it with the member&apos;s real name.
            </p>
          </div>

          {/* WhatsApp notice */}
          {channel === 'whatsapp' && (
            <div className="rounded-lg bg-warning-bg border border-warning/30 px-4 py-3 text-xs text-warning leading-relaxed">
              ⚠️ <strong>WhatsApp cannot be sent in bulk.</strong> Clicking &quot;Send&quot; below will open WhatsApp with the pre-filled message. Send it manually to this recipient.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-border shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium border border-border text-secondary hover:text-foreground bg-transparent motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSend}
            disabled={!canSend || isSending || !member}
            className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium bg-primary text-black disabled:opacity-50 disabled:cursor-not-allowed motion-safe:transition-all motion-safe:hover:bg-primary-hover motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {isSending ? (
              <Loader2 size={15} className="motion-safe:animate-spin" />
            ) : (
              <Send size={15} />
            )}
            {isSending ? 'Sending...' : 'Send Win-Back'}
          </button>
        </div>
      </aside>
    </>
  );
}
