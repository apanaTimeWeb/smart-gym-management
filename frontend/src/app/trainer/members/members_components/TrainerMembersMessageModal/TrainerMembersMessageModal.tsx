'use client';
// RESPONSIBILITY: Renders member-directed WhatsApp or Email delivery for the Members feature.
// DATA FLOW: Members store → message modal → external delivery URL → member.
import { useEffect, useId, useRef, useState } from 'react';
import { X, Send, MessageCircle, Mail, CheckCircle, Phone, AtSign } from 'lucide-react';
import type { MemberMessageType } from '@/app/trainer/members/members_types/TrainerMembersMessagingTypes';
import type { TrainerMembersMessageModalProps } from '@/app/trainer/members/members_types/TrainerMembersMessageModalTypes';
import { MembersUrlConfig } from '@/app/trainer/members/members_url_config';

const TAB_STYLE: Record<MemberMessageType, string> = {
  whatsapp: 'bg-social-whatsapp',
  email: 'bg-social-email',
};

export default function TrainerMembersMessageModal({
  isOpen,
  open,
  onClose,
  recipient,
  type,
  defaultMessage,
  message: propMessage,
  subject: defaultSubject = 'Message from GymSmart',
  onSuccess,
}: TrainerMembersMessageModalProps) {
  const [message, setMessage] = useState(defaultMessage || propMessage || '');
  const [subject, setSubject] = useState(defaultSubject);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const messageId = useId();
  const subjectId = useId();

  const visible = Boolean(isOpen || open);

  useEffect(() => {
    if (!visible) return;
    const previous = document.activeElement as HTMLElement | null;
    const focusable = dialogRef.current?.querySelector<HTMLElement>(
      'button:not([disabled]), input:not([disabled]), textarea:not([disabled])'
    );
    (focusable ?? dialogRef.current)?.focus();
    return () => previous?.focus();
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !sending) onClose();
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const elements = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), textarea:not([disabled])'
      ));
      if (elements.length === 0) return;
      const first = elements[0]!;
      const last = elements[elements.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [visible, sending, onClose]);

  useEffect(() => {
    if (!visible) return;
    setMessage(defaultMessage || propMessage || '');
    setSubject(defaultSubject);
    setSent(false);
  }, [visible, defaultMessage, propMessage, defaultSubject]);

  if (!visible) return null;

  const Icon = type === 'whatsapp' ? MessageCircle : Mail;
  const label = type === 'whatsapp' ? 'WhatsApp' : 'Email';
  const contactInfo = type === 'whatsapp' ? recipient.phone : recipient.email;

  const handleSend = () => {
    setSending(true);
    if (type === 'whatsapp') {
      const phone = contactInfo?.replace(/\D/g, '') || '';
      window.open(MembersUrlConfig.BACKEND_API.WHATSAPP(phone, message), '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = MembersUrlConfig.BACKEND_API.MAILTO(contactInfo || '', subject, message);
    }
    setSending(false);
    setSent(true);
    window.setTimeout(() => {
      setSent(false);
      onClose();
      onSuccess?.();
    }, 700);
  };

  const handleClose = () => {
    if (sending) return;
    setMessage(defaultMessage || propMessage || '');
    setSubject(defaultSubject);
    setSent(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-overlay/80 backdrop-blur-sm" role="presentation">
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="bg-overlay rounded-xl shadow-dialog w-full max-w-lg relative overflow-hidden border border-border motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <div className={`px-6 py-4 flex items-center justify-between ${TAB_STYLE[type]}`}>
          <div className="flex flex-wrap items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary-subtle flex items-center justify-center">
              <Icon size={18} className="text-on-primary" aria-hidden="true" />
            </div>
            <div>
              <p id={titleId} className="text-on-primary font-bold text-base leading-tight">{label} Message</p>
              <p className="text-on-primary text-xs">Sending to {recipient.name}</p>
            </div>
          </div>
          <button type="button" aria-label="Close member message dialog" onClick={handleClose} disabled={sending} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page w-10 h-10 rounded-full bg-primary-subtle flex items-center justify-center motion-safe:transition-colors disabled:opacity-50">
            <X size={16} className="text-on-primary" />
          </button>
        </div>

        <div className="px-6 pt-4 pb-2">
          <div className="flex items-center gap-3 p-3 bg-input rounded-lg border border-border">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-sm shrink-0">{recipient.name.charAt(0)}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-primary truncate">{recipient.name}</p>
              <div className="flex items-center gap-1 mt-0.5">
                {type === 'whatsapp' ? <Phone size={11} className="text-secondary" aria-hidden="true" /> : <AtSign size={11} className="text-secondary" aria-hidden="true" />}
                <p className="text-xs text-secondary truncate">{contactInfo || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        {type === 'email' && (
          <div className="px-6 pt-2">
            <label htmlFor={subjectId} className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">Subject</label>
            <input id={subjectId} type="text" value={subject} onChange={(event) => setSubject(event.target.value)} disabled={sending || sent} className="w-full px-3 py-2.5 text-sm bg-input border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-primary disabled:opacity-60" />
          </div>
        )}

        <div className="px-6 pt-3 pb-2">
          <label htmlFor={messageId} className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">Message</label>
          <textarea id={messageId} rows={5} value={message} onChange={(event) => setMessage(event.target.value)} disabled={sending || sent} className="w-full px-3 py-2.5 text-sm bg-input border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-primary resize-none disabled:opacity-60" placeholder="Type your message..." />
          <p className="text-right text-xs text-secondary mt-1">{message.length} chars</p>
        </div>

        <div className="px-6 pb-5 flex gap-3">
          <button type="button" onClick={handleClose} disabled={sending} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 flex-1 px-4 py-2.5 text-sm border border-border rounded-lg hover:bg-input text-primary font-medium motion-safe:transition-colors disabled:opacity-50">Cancel</button>
          <button type="button" onClick={handleSend} disabled={sending || sent || !message.trim() || !contactInfo} className={`min-h-11 flex-1 px-4 py-2.5 text-sm font-semibold text-on-primary rounded-lg flex items-center justify-center gap-2 motion-safe:transition-all disabled:opacity-50 ${sent ? 'bg-success' : type === 'whatsapp' ? 'bg-social-whatsapp' : 'bg-social-email'}`}>
            {sent ? <><CheckCircle size={16} /> Sent!</> : sending ? 'Sending…' : <><Send size={15} /> Send via {label}</>}
          </button>
        </div>
      </div>
    </div>
  );
}
