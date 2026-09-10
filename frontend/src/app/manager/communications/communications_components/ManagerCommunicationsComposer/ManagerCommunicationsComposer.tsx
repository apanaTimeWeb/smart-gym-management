// RESPONSIBILITY: Full message composer — channel selector, segment picker, title, message body, subject (email), recipient preview, and send action.
'use client';

import { MessageCircle, Mail, Send, Loader2, Users, Eye, Zap } from 'lucide-react';
import { useState } from 'react';
import { useManagerCommunicationsLogic } from '@/app/manager/communications/communications_context/useManagerCommunicationsLogic';
import ManagerCommunicationsSegmentPicker from '@/app/manager/communications/communications_components/ManagerCommunicationsSegmentPicker/ManagerCommunicationsSegmentPicker';
import ManagerBulkMessageModal from '@/app/manager/manager_components/ManagerFeedback/ManagerBulkMessageModal';
import type { MessageType } from '@/app/manager/manager_components/ManagerFeedback/ManagerMessageModal';

// WhatsApp brand green — third-party brand color, not a design system token.
const WA_GREEN = '#25D366';

export default function ManagerCommunicationsComposer() {
  const {
    selectedChannel, setSelectedChannel,
    composerTitle, setComposerTitle,
    composerMessage, setComposerMessage,
    composerSubject, setComposerSubject,
    segmentRecipients, loadingRecipients,
    selectedSegment,
    handleSend, sending,
  } = useManagerCommunicationsLogic();

  const [showPreview, setShowPreview] = useState(false);

  const canSend = composerTitle.trim().length >= 3
    && composerMessage.trim().length >= 10
    && segmentRecipients.length > 0
    && !loadingRecipients;

  const bulkRecipients = segmentRecipients.map(r => ({
    name: r.name,
    phone: r.phone,
    email: r.email,
  }));

  const templates = [
    { title: 'Monthly Fee Reminder', body: 'Hi {name},\n\nJust a gentle reminder that your monthly gym fee is due. Please complete the payment at the earliest to continue your uninterrupted workouts.\n\nThanks,\nGymSmart Team' },
    { title: 'Payment Overdue', body: '⚠️ Hi {name},\n\nYour payment is currently overdue. Please pay your pending dues immediately to avoid suspension of your membership.\n\nRegards,\nGymSmart Team' },
    { title: 'Renewal Reminder', body: 'Hi {name},\n\nYour membership is expiring soon! Renew now to keep your fitness journey going without any breaks. Contact the reception for exciting renewal offers.\n\nThanks,\nGymSmart Team' },
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-6">
      {/* Step 1 — Segment */}
      <ManagerCommunicationsSegmentPicker />

      {/* Step 2 — Channel */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-secondary uppercase tracking-wider">
          2. Choose Channel
        </label>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setSelectedChannel('whatsapp')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-semibold motion-safe:transition-all ${
              selectedChannel === 'whatsapp'
                ? 'border-[#25D366] text-white'
                : 'bg-input border-border text-secondary hover:border-[#25D366]/50'
            }`}
            style={selectedChannel === 'whatsapp' ? { background: WA_GREEN } : undefined}
          >
            <MessageCircle size={16} />
            WhatsApp
          </button>
          <button
            type="button"
            onClick={() => setSelectedChannel('email')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-semibold motion-safe:transition-all ${
              selectedChannel === 'email'
                ? 'bg-info border-info text-white'
                : 'bg-input border-border text-secondary hover:border-info/50'
            }`}
          >
            <Mail size={16} />
            Email
          </button>
        </div>
      </div>

      {/* Step 3 — Compose */}
      <div className="space-y-4">
        <label className="block text-sm font-semibold text-secondary uppercase tracking-wider">
          3. Compose Message
        </label>

        {/* Quick Templates */}
        <div className="bg-input border border-border rounded-lg p-3">
          <label className="block text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
            <Zap size={14} className="text-warning" /> Quick Templates
          </label>
          <div className="flex flex-wrap gap-2">
            {templates.map((tpl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setComposerTitle(tpl.title);
                  setComposerMessage(tpl.body);
                }}
                className="px-3 py-1.5 text-xs font-medium bg-card border border-border rounded-md hover:border-primary hover:text-primary transition-colors"
              >
                {tpl.title}
              </button>
            ))}
          </div>
        </div>

        {/* Campaign title */}
        <div>
          <label className="block text-xs font-medium text-secondary mb-1">
            Campaign Title <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            value={composerTitle}
            onChange={(e) => setComposerTitle(e.target.value)}
            placeholder="e.g. June Renewal Reminder"
            className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>

        {/* Email subject */}
        {selectedChannel === 'email' && (
          <div>
            <label className="block text-xs font-medium text-secondary mb-1">
              Email Subject <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              value={composerSubject}
              onChange={(e) => setComposerSubject(e.target.value)}
              placeholder="Email subject line..."
              className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>
        )}

        {/* Message body */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-medium text-secondary">
              Message Body <span className="text-danger">*</span>
            </label>
            <span className="text-xs text-secondary">{composerMessage.length} chars</span>
          </div>
          <textarea
            rows={6}
            value={composerMessage}
            onChange={(e) => setComposerMessage(e.target.value)}
            placeholder="Type your message... Use {name} to personalise."
            className="w-full bg-input border border-border rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary resize-none"
          />
          <p className="text-xs text-secondary mt-1">
            Tip: Use <code className="bg-input px-1 rounded text-primary">{'{name}'}</code> to personalise each message with the member&apos;s name.
          </p>
        </div>
      </div>

      {/* Recipient summary + actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-sm text-secondary">
          {loadingRecipients ? (
            <Loader2 size={15} className="motion-safe:animate-spin" />
          ) : (
            <Users size={15} />
          )}
          {loadingRecipients
            ? 'Loading recipients...'
            : selectedSegment === 'custom'
              ? 'Select recipients manually below'
              : `${segmentRecipients.length} recipient${segmentRecipients.length !== 1 ? 's' : ''} in this segment`
          }
        </div>

        <div className="flex gap-3">
          {segmentRecipients.length > 0 && (
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="flex items-center gap-2 px-4 py-2 bg-input border border-border rounded-lg text-sm font-medium text-secondary hover:text-foreground motion-safe:transition-colors"
            >
              <Eye size={15} />
              Preview & Send
            </button>
          )}
          <button
            type="button"
            onClick={handleSend}
            disabled={!canSend || sending}
            className="flex items-center gap-2 px-5 py-2 bg-primary text-black rounded-lg text-sm font-semibold hover:opacity-90 motion-safe:transition-opacity disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
          >
            {sending ? (
              <Loader2 size={15} className="motion-safe:animate-spin" />
            ) : (
              <Send size={15} />
            )}
            {sending ? 'Sending...' : 'Send Campaign'}
          </button>
        </div>
      </div>

      {/* Bulk message preview modal — uses existing shared component */}
      {showPreview && (
        <ManagerBulkMessageModal
          open={showPreview}
          onClose={() => setShowPreview(false)}
          recipients={bulkRecipients}
          type={selectedChannel as MessageType}
          defaultMessage={composerMessage}
          onSuccess={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}
