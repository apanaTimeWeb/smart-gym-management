// RESPONSIBILITY: Renders the Messaging Compose Modal component and its associated UI logic.
import { X, Send } from 'lucide-react';
import type { MessageChannel, MessagingTenant } from '@/app/superadmin/messaging/messaging_types/superadmin_messaging_types';
import { SuperadminMessagingTenantDropdown } from '@/app/superadmin/messaging/messaging_components/SuperadminMessagingTenantDropdown';

export function SuperadminMessagingComposeModal({
  composeTenantId,
  setComposeTenantId,
  tenants,
  composeChannel,
  setComposeChannel,
  composeSubject,
  setComposeSubject,
  composeBody,
  setComposeBody,
  onClose,
  onSend,
}: {
  composeTenantId: string;
  setComposeTenantId: (id: string) => void;
  tenants: MessagingTenant[];
  composeChannel: MessageChannel;
  setComposeChannel: (ch: MessageChannel) => void;
  composeSubject: string;
  setComposeSubject: (s: string) => void;
  composeBody: string;
  setComposeBody: (b: string) => void;
  onClose: () => void;
  onSend: () => void;
}) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" role="dialog" aria-modal="true">
      <div className="bg-overlay border border-border rounded-2xl p-6 w-full max-w-lg shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">Compose Message</h2>
          <button
            onClick={onClose}
            aria-label="Close compose modal"
            className="p-1.5 rounded-lg text-secondary hover:text-foreground hover:bg-input motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-secondary uppercase tracking-wider block mb-1">Gym</label>
            <SuperadminMessagingTenantDropdown value={composeTenantId} onChange={setComposeTenantId} tenants={tenants} />
          </div>

          <div>
            <label className="text-xs font-medium text-secondary uppercase tracking-wider block mb-1">Channel</label>
            <div className="flex gap-2">
              {(['EMAIL', 'SMS', 'IN_APP'] as const).map((ch) => (
                <button
                  key={ch}
                  onClick={() => setComposeChannel(ch)}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium border motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    composeChannel === ch
                      ? 'bg-primary/10 text-primary border-primary/30'
                      : 'bg-input text-secondary border-border hover:text-foreground'
                  }`}
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-secondary uppercase tracking-wider block mb-1">Subject</label>
            <input
              type="text"
              value={composeSubject}
              onChange={(e) => setComposeSubject(e.target.value)}
              placeholder="Message subject..."
              className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-secondary uppercase tracking-wider block mb-1">Body</label>
            <textarea
              value={composeBody}
              onChange={(e) => setComposeBody(e.target.value)}
              rows={4}
              placeholder="Write your message..."
              className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary resize-none"
            />
          </div>
        </div>

        <div className="flex gap-3 justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-input text-secondary hover:text-foreground text-sm motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Cancel
          </button>
          <button
            onClick={onSend}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-black font-semibold text-sm motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Send size={18} strokeWidth={2} /> Send
          </button>
        </div>
      </div>
    </div>
  );
}
