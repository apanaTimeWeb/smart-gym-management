// RESPONSIBILITY: Renders the Superadmin ticket reply form. Submission state and API behavior are owned by useSuperadminTicketReply.
'use client';
import { Send, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { replySchema } from '@/app/superadmin/tickets/tickets_types/SuperadminTicketsTypes';
import type { SuperadminTicketsReplyFormValues } from '@/app/superadmin/tickets/tickets_types/SuperadminTicketsReplyFormTypes';
import { useSuperadminTicketReply } from '@/app/superadmin/tickets/tickets_utils/useSuperadminTicketReply';
import { useUnsavedChangesGuard } from '@/hooks/useUnsavedChangesGuard';
import type { SuperadminTicketsReplyModalProps } from '@/app/superadmin/tickets/tickets_types/SuperadminTicketsReplyModalTypes';



export default function SuperadminTicketsReplyModal({ isOpen, onClose, ticketId }: SuperadminTicketsReplyModalProps) {
  const { sendReply, isSending } = useSuperadminTicketReply();
  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<SuperadminTicketsReplyFormValues>({ resolver: zodResolver(replySchema), defaultValues: { replyText: '' } });
  useUnsavedChangesGuard(Boolean(isOpen && isDirty && !isSending), 'You have an unsent ticket reply. Are you sure you want to leave?');

  if (!isOpen || !ticketId) return null;

  const handleClose = () => {
    if (isSending) return;
    reset();
    onClose();
  };

  const onSubmit = async (values: SuperadminTicketsReplyFormValues) => {
    try {
      const response = await sendReply({ ticketId, values });
      toast.success(response.message, { id: `superadmin-ticket-reply-${ticketId}` });
      reset();
      onClose();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : '', { id: `superadmin-ticket-reply-error-${ticketId}` });
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay backdrop-blur-sm p-4" role="dialog" aria-modal="true" aria-labelledby="superadmin-ticket-reply-title">
      <div className="bg-overlay border border-border w-full max-w-lg rounded-xl shadow-dialog p-6 relative">
        <h2 id="superadmin-ticket-reply-title" className="text-lg font-bold text-primary mb-1">Reply to Ticket #{ticketId}</h2>
        <p className="text-sm text-secondary mb-4">Send a tenant-facing response through the ticket conversation.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="superadmin-ticket-reply-text" className="block text-sm font-medium text-secondary mb-2">Your Message</label>
            <textarea id="superadmin-ticket-reply-text" {...register('replyText')} aria-invalid={Boolean(errors.replyText)} aria-describedby="superadmin-ticket-reply-error" className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-32" placeholder="Type your reply here..." disabled={isSending} />
            {errors.replyText && <p id="superadmin-ticket-reply-error" className="text-xs text-danger mt-1">{errors.replyText.message}</p>}
          </div>
          <div className="flex gap-3 justify-end pt-4 border-t border-border">
            <button type="button" onClick={handleClose} disabled={isSending} className="px-4 py-2 rounded-md font-medium border border-border text-primary hover:bg-surface-hover motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Cancel</button>
            <button type="submit" disabled={isSending || !isDirty} className="px-4 py-2 rounded-md font-medium bg-primary text-on-primary hover:bg-primary-hover motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 disabled:opacity-50 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              {isSending ? <><Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin"/>Sending...</> : <><Send size={18} strokeWidth={2}/>Send Reply</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export type { SuperadminTicketsReplyModalProps } from '@/app/superadmin/tickets/tickets_types/SuperadminTicketsReplyModalTypes';
