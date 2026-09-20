'use client';
import type { ManagerInquiriesBulkMessageModalProps } from '@/app/manager/inquiries/inquiries_types/ManagerInquiriesBulkMessageModalTypes';
// RESPONSIBILITY: Renders a bulk messaging modal for sending WhatsApp or Email messages to multiple recipients. Manages per-recipient send tracking for WhatsApp queue mode.
import { useEffect, useMemo, useState } from 'react';
import { X, Send, MessageCircle, Mail, CheckCircle, Phone, AtSign, Users } from 'lucide-react';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_infrastructure/ManagerUnsavedChangesGuard';



export default function ManagerInquiriesBulkMessageModal({
  open,
  onClose,
  recipients,
  type,
  defaultMessage = '',
  whatsappUrlBuilder }: ManagerInquiriesBulkMessageModalProps) {
  const [message, setMessage] = useState(defaultMessage);
  const [subject, setSubject] = useState('Message from GymSmart');

 
  // For WhatsApp Queue Tracking
  const [openedRecipientKeys, setOpenedRecipientKeys] = useState<Set<string>>(new Set());

  // Reset send state and message whenever the modal opens with new data.
  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpenedRecipientKeys(new Set());
      setMessage(defaultMessage);
    }
  }, [open, defaultMessage]);

  if (!open) return null;

  const Icon = type === 'whatsapp' ? MessageCircle : Mail;
  const label = type === 'whatsapp' ? 'WhatsApp' : 'Email';
  const initialSubject = useMemo(() => 'Message from GymSmart', []);
  const { confirmAndClose } = useManagerUnsavedChangesGuard(message !== defaultMessage || subject !== initialSubject || openedRecipientKeys.size > 0);

  const handleSendEmail = () => {
    const validEmails = recipients.map(r => r.email).filter(Boolean).join(',');
    if (!validEmails) return;

    const url = `mailto:?bcc=${validEmails}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.location.href = url;

    onClose();
  };

  const personalizeMessage = (baseMsg: string, name: string) => {
    return baseMsg.replace(/{name}/gi, name);
  };

  const handleSendWhatsApp = (index: number) => {
    const recipient = recipients[index];
    if (!recipient) return;
    const phone = recipient.phone?.replace(/\D/g, '') || '';
    if (!phone) return;

    const personalizedMessage = personalizeMessage(message, recipient.name);
    const url = whatsappUrlBuilder?.(phone, personalizedMessage);
    if (!url) return;
    window.open(url, '_blank');

    const recipientKey = `${recipient.phone ?? ''}-${recipient.email ?? ''}-${recipient.name}`;
    setOpenedRecipientKeys(prev => new Set(prev).add(recipientKey));
  };


  const allWhatsAppSent = type === 'whatsapp' && openedRecipientKeys.size === recipients.length && recipients.length > 0;

  const handleDone = () => { setOpenedRecipientKeys(new Set()); setMessage(defaultMessage); setSubject(initialSubject); onClose(); };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-overlay-backdrop backdrop-blur-sm">
      <div className="bg-overlay rounded-2xl shadow-dialog w-full max-w-2xl relative overflow-hidden border border-border max-h-full flex flex-col motion-safe:animate-in motion-safe:zoom-in-95 motion-safe:duration-200">
        <div
          className={`px-6 py-4 flex items-center justify-between shrink-0 ${type === 'whatsapp' ? 'bg-social-whatsapp' : 'bg-info-bg'}`}
          
        >
          <div className="flex flex-wrap items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary-subtle flex items-center justify-center">
              <Icon size={18} className="text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-base leading-tight">Bulk {label} Message</p>
              <p className="text-white/90 text-xs flex items-center gap-1">
                <Users size={18} /> Sending to {recipients.length} recipients
              </p>
            </div>
          </div>
          <button
            aria-label="Close bulk message dialog"
            onClick={() => { void confirmAndClose(onClose); }}
            className="w-8 h-8 rounded-full bg-primary-subtle hover:bg-primary/30 flex items-center justify-center motion-safe:transition-colors"
          >
            <X size={18} className="text-white" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto min-h-0 flex flex-col">
          {type === 'email' && (
            <div className="px-6 pt-5 pb-2 shrink-0">
              <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-input border border-border rounded-lg focus:outline-none focus:border-primary text-primary"
                placeholder="Email subject..."
              />
            </div>
          )}

          <div className={`px-6 pb-2 shrink-0 ${type === 'whatsapp' ? 'pt-5' : 'pt-2'}`}>
            <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">
              Message Content
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2.5 text-sm bg-input border border-border rounded-xl focus:outline-none focus:border-primary text-primary resize-none"
              placeholder={`Type your ${label} message...`}
            />
          </div>

          <div className="px-6 pb-2 pt-2 flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-secondary uppercase tracking-wider">
                Recipients Queue
              </label>
              {type === 'whatsapp' && (
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-input border border-border text-secondary">
                  {openedRecipientKeys.size} / {recipients.length} Opened
                </span>
              )}
            </div>

            <div className="flex-1 overflow-y-auto bg-input rounded-xl border border-border p-2 space-y-1.5">
              {recipients.map((rec, idx) => {
                const recipientKey = `${rec.phone ?? ''}-${rec.email ?? ''}-${rec.name}`;
                const isSent = openedRecipientKeys.has(recipientKey);
                const hasContactInfo = type === 'whatsapp' ? !!rec.phone : !!rec.email;
                // Stable composite key: phone+email uniquely identifies a recipient in this list
                const stableKey = `${rec.phone ?? ''}-${rec.email ?? ''}-${rec.name}`;

                return (
                  <div key={stableKey} className="flex items-center justify-between p-2.5 bg-overlay rounded-lg border border-border">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0 bg-primary-subtle">
                        {rec.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-primary truncate">{rec.name}</p>
                        <div className="flex items-center gap-1 mt-0.5 text-xs text-secondary">
                          {type === 'whatsapp' ? <Phone size={10} /> : <AtSign size={10} />}
                          <span className="truncate">{type === 'whatsapp' ? rec.phone : rec.email}</span>
                        </div>
                      </div>
                    </div>

                    {type === 'whatsapp' && (
                      <button
                        onClick={() => handleSendWhatsApp(idx)}
                        disabled={!hasContactInfo || !message.trim()}
                        className={`shrink-0 px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 motion-safe:transition-all ${
                          isSent
                            ? 'bg-success-bg text-success border border-success/20'
                            : 'bg-social-whatsapp text-white hover:opacity-90 disabled:opacity-50'
                        }`}
                        
                      >
                        {isSent ? (
                          <><CheckCircle size={18} /> Opened</>
                        ) : (
                          <><Send size={18} /> Send</>
                        )}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
            {type === 'whatsapp' && (
              <p className="text-xs text-secondary mt-2 italic text-center">
                * WhatsApp prevents automated bulk sending. Please click &quot;Open&quot; for each recipient to safely message them via WhatsApp Web.
              </p>
            )}
          </div>
        </div>

        <div className="px-6 py-4 bg-input border-t border-border flex gap-3 shrink-0">
          <button onClick={() => { void confirmAndClose(onClose); }} className="px-5 py-2.5 text-sm border border-border rounded-xl hover:bg-overlay text-primary font-medium motion-safe:transition-colors">
            Cancel
          </button>
          {type === 'email' ? (
            <button onClick={handleSendEmail} disabled={!message.trim()} className="flex-1 px-4 py-2.5 text-sm font-semibold text-on-info rounded-xl flex items-center justify-center gap-2 motion-safe:transition-all hover:opacity-90 disabled:opacity-50 bg-info">
              <Send size={18} />
              Open Email Client (BCC All)
            </button>
          ) : (
            <button onClick={allWhatsAppSent ? handleDone : onClose} className={`flex-1 px-4 py-2.5 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 motion-safe:transition-all ${allWhatsAppSent ? 'bg-success text-on-success' : 'bg-overlay border border-border text-primary'}`}>
              {allWhatsAppSent ? <><CheckCircle size={18} /> All Done</> : 'Close Queue'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
