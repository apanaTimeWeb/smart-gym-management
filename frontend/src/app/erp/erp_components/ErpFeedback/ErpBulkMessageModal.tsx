// RESPONSIBILITY: ErpBulkMessageModal.tsx handles the logic and UI for its corresponding feature.
'use client';

import { useState, useEffect } from 'react';
import { X, Send, MessageCircle, Mail, CheckCircle, Phone, AtSign, Users } from 'lucide-react';
import type { MessageType, ErpMessageRecipient } from '@/app/erp/erp_components/ErpFeedback/ErpMessageModal';

interface ErpBulkMessageModalProps {
  open?: boolean;
  onClose: () => void;
  recipients: ErpMessageRecipient[];
  type: MessageType;
  defaultMessage?: string;
  onSuccess?: (msg: string) => void;
}

const WA_GREEN = '#25D366';
const EMAIL_BLUE = 'var(--info)';

export default function ErpBulkMessageModal({
  open,
  onClose,
  recipients,
  type,
  defaultMessage = '',
  onSuccess,
}: ErpBulkMessageModalProps) {
  const [message, setMessage] = useState(defaultMessage);
  const [subject, setSubject] = useState('Message from GymSmart');
  
  // For WhatsApp Queue Tracking
  const [sentIndexes, setSentIndexes] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (open) {
      setSentIndexes(new Set());
      setMessage(defaultMessage);
    }
  }, [open, defaultMessage]);

  if (!open) return null;

  const accentColor = type === 'whatsapp' ? WA_GREEN : EMAIL_BLUE;
  const Icon = type === 'whatsapp' ? MessageCircle : Mail;
  const label = type === 'whatsapp' ? 'WhatsApp' : 'Email';

  const handleSendEmail = () => {
    const validEmails = recipients.map(r => r.email).filter(Boolean).join(',');
    if (!validEmails) return;
    
    const url = `mailto:?bcc=${validEmails}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.location.href = url;
    
    setTimeout(() => {
      onSuccess?.('Bulk email client opened successfully!');
      onClose();
    }, 1500);
  };

  const handleSendWhatsApp = (index: number) => {
    const recipient = recipients[index];
    const phone = recipient.phone?.replace(/\D/g, '') || '';
    if (!phone) return;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    
    setSentIndexes(prev => new Set(prev).add(index));
  };

  const allWhatsAppSent = type === 'whatsapp' && sentIndexes.size === recipients.length && recipients.length > 0;

  const handleDone = () => {
    onSuccess?.(`Finished sending to ${sentIndexes.size} recipients!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        className="bg-card rounded-2xl shadow-2xl w-full max-w-2xl relative overflow-hidden border border-border max-h-[90vh] flex flex-col"
        style={{ animation: 'fadeScaleIn 0.2s ease' }}
      >
        <div
          className="px-6 py-4 flex items-center justify-between shrink-0"
          style={{ background: accentColor }}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <Icon size={18} color="white" />
            </div>
            <div>
              <p className="text-white font-bold text-base leading-tight">Bulk {label} Message</p>
              <p className="text-white/90 text-xs flex items-center gap-1">
                <Users size={12} /> Sending to {recipients.length} recipients
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <X size={16} color="white" />
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
                className="w-full px-3 py-2.5 text-sm bg-input border border-border rounded-lg focus:outline-none focus:border-border-focus text-foreground"
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
              className="w-full px-3 py-2.5 text-sm bg-input border border-border rounded-xl focus:outline-none focus:border-border-focus text-foreground resize-none"
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
                  {sentIndexes.size} / {recipients.length} Sent
                </span>
              )}
            </div>
            
            <div className="flex-1 overflow-y-auto bg-input rounded-xl border border-border p-2 space-y-1.5">
              {recipients.map((rec, idx) => {
                const isSent = sentIndexes.has(idx);
                const hasContactInfo = type === 'whatsapp' ? !!rec.phone : !!rec.email;
                
                return (
                  <div key={idx} className="flex items-center justify-between p-2.5 bg-card rounded-lg border border-border">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0" style={{ background: 'var(--primary)' }}>
                        {rec.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">{rec.name}</p>
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
                        className={`shrink-0 px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${
                          isSent 
                            ? 'bg-success/10 text-success border border-success/20'
                            : 'bg-[#25D366] text-white hover:opacity-90 disabled:opacity-50'
                        }`}
                      >
                        {isSent ? (
                          <><CheckCircle size={12} /> Sent</>
                        ) : (
                          <><Send size={12} /> Send</>
                        )}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
            {type === 'whatsapp' && (
              <p className="text-xs text-secondary mt-2 italic text-center">
                * WhatsApp prevents automated bulk sending. Please click "Send" for each recipient to safely message them via WhatsApp Web.
              </p>
            )}
          </div>
        </div>

        <div className="px-6 py-4 bg-input border-t border-border flex gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm border border-border rounded-xl hover:bg-card text-foreground font-medium transition-colors"
          >
            Cancel
          </button>
          
          {type === 'email' ? (
            <button
              onClick={handleSendEmail}
              disabled={!message.trim()}
              className="flex-1 px-4 py-2.5 text-sm font-semibold text-white rounded-xl flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50"
              style={{ background: EMAIL_BLUE }}
            >
              <Send size={15} />
              Open Email Client (BCC All)
            </button>
          ) : (
            <button
              onClick={allWhatsAppSent ? handleDone : onClose}
              className={`flex-1 px-4 py-2.5 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all ${
                allWhatsAppSent ? 'bg-success text-white' : 'bg-card border border-border text-foreground'
              }`}
            >
              {allWhatsAppSent ? (
                <><CheckCircle size={15} /> All Done</>
              ) : (
                'Close Queue'
              )}
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeScaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
