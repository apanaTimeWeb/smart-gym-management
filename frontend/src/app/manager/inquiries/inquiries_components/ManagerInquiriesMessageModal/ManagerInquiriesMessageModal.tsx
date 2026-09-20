'use client';
import type { ManagerInquiriesMessageModalProps } from '@/app/manager/inquiries/inquiries_types/ManagerInquiriesMessageTypes';
// RESPONSIBILITY: Renders the send-message modal (WhatsApp/Email) for communicating with a member. Shared across the Members and Finance modules.
import { useMemo, useState } from 'react';
import { X, Send, MessageCircle, Mail, Phone, AtSign } from 'lucide-react';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_infrastructure/ManagerUnsavedChangesGuard';









export default function ManagerInquiriesMessageModal({
 open,
 onClose,
 recipient,
 type,
 defaultMessage,
 message: propMessage,
 subject: defaultSubject = 'Message from GymSmart',
 whatsappUrlBuilder }: ManagerInquiriesMessageModalProps) {
 const [message, setMessage] = useState(defaultMessage || propMessage || '');
 const [subject, setSubject] = useState(defaultSubject);
 const [sending, setSending] = useState(false);
 const initialMessage = useMemo(() => defaultMessage || propMessage || '', [defaultMessage, propMessage]);
 const [sent, setSent] = useState(false);
 const initialSubject = defaultSubject;
 const { confirmAndClose } = useManagerUnsavedChangesGuard(message !== initialMessage || subject !== initialSubject);

 if (!open) return null;

 const Icon = type === 'whatsapp' ? MessageCircle : Mail;
 const label = type === 'whatsapp' ? 'WhatsApp' : 'Email';
 const contactInfo = type === 'whatsapp' ? recipient.phone : recipient.email;

 const handleSend = async () => {
  setSending(true);
  try {
   if (type === 'whatsapp') {
    const phone = contactInfo?.replace(/\D/g, '') || '';
    const url = whatsappUrlBuilder?.(phone, message);
    if (!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
   } else {
    const url = `mailto:${contactInfo || ''}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.location.href = url;
   }
   setSent(true);
  } finally {
   setSending(false);
  }
 };

 const handleClose = () => {
  if (sending) return;
  void confirmAndClose(() => {
   setSent(false);
   setMessage(initialMessage);
   setSubject(initialSubject);
   onClose();
  });
 };

 return (
 <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-overlay-backdrop backdrop-blur-sm">
 <div
 className="bg-overlay rounded-2xl shadow-dialog w-full max-w-lg relative overflow-hidden border border-border"

 >
 <div
 className={`px-6 py-4 flex items-center justify-between ${type === 'whatsapp' ? 'bg-social-whatsapp' : 'bg-info-bg'}`}
 
 >
 <div className="flex flex-wrap items-center gap-3">
 <div className="w-9 h-9 rounded-full bg-primary-subtle flex items-center justify-center">
 <Icon size={18} className="text-white" />
 </div>
 <div>
 <p className="text-white font-bold text-base leading-tight">{label} Message</p>
 <p className="text-white/80 text-xs">Sending to {recipient.name}</p>
 </div>
 </div>
 <button
 aria-label="Close message dialog"
 onClick={handleClose}
 disabled={sending}
 className="min-w-32 w-8 h-8 rounded-full bg-primary-subtle hover:bg-primary/30 flex items-center justify-center motion-safe:transition-colors disabled:opacity-50"
 >
 <X size={18} className="text-white" />
 </button>
 </div>

 <div className="px-6 pt-4 pb-2">
 <div className="flex items-center gap-3 p-3 bg-input rounded-xl border border-border">
 <div
 className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 bg-primary-subtle"
 >
 {recipient.name.charAt(0)}
 </div>
 <div className="flex-1 min-w-0">
 <p className="text-sm font-semibold text-primary truncate">{recipient.name}</p>
 <div className="flex items-center gap-1 mt-0.5">
 {type === 'whatsapp' ? (
 <Phone size={18} className="text-secondary flex-shrink-0" />
 ) : (
 <AtSign size={18} className="text-secondary flex-shrink-0" />
 )}
 <p className="text-xs text-secondary truncate">{contactInfo || 'N/A'}</p>
 </div>
 </div>
 </div>
 </div>

 {type === 'email' && (
 <div className="px-6 pt-2">
 <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">
 Subject
 </label>
 <input
 type="text"
 value={subject}
 onChange={(e) => setSubject(e.target.value)}
 disabled={sending || sent}
 className="w-full px-3 py-2.5 text-sm bg-input border border-border rounded-lg focus:outline-none focus:border-primary text-primary disabled:opacity-60"
 placeholder="Email subject..."
 />
 </div>
 )}

 <div className="px-6 pt-3 pb-2">
 <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">
 Message
 </label>
 <textarea
 rows={5}
 value={message}
 onChange={(e) => setMessage(e.target.value)}
 disabled={sending || sent}
 className="w-full px-3 py-2.5 text-sm bg-input border border-border rounded-xl focus:outline-none focus:border-primary text-primary resize-none disabled:opacity-60"
 placeholder="Type your message..."
 />
 <p className="text-right text-xs text-secondary mt-1">{message.length} chars</p>
 </div>

 <div className="px-6 pb-5 flex gap-3">
 <button
 aria-label="Close message dialog"
 onClick={handleClose}
 disabled={sending}
 className="min-w-32 flex-1 px-4 py-2.5 text-sm border border-border rounded-xl hover:bg-input text-primary font-medium motion-safe:transition-colors disabled:opacity-50"
 >
 Cancel
 </button>
 <button
 onClick={handleSend}
 disabled={sending || sent || !message.trim()}
 className={`min-w-32 flex-1 px-4 py-2.5 text-sm font-semibold text-on-success rounded-xl flex items-center justify-center gap-2 motion-safe:transition-all disabled:opacity-50 ${sent ? 'bg-success' : type === 'whatsapp' ? 'bg-social-whatsapp' : 'bg-info-bg'}`}
 
 >
 {sent ? (
 <>
 Opened
 </>
 ) : sending ? (
 <>
 <span className="w-4 h-4 border-2 border-border/40 border-t-on-primary rounded-full motion-safe:animate-spin" />
 Sending...
 </>
 ) : (
 <>
 <Send size={18} />
 Open {label}
 </>
 )}
 </button>
 </div>
 </div>

 </div>
 );
}
