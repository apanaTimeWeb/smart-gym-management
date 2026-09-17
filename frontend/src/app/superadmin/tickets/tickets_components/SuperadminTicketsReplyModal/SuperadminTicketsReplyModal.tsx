'use client';
import { useSuperadminDialogAccessibility } from '@/app/superadmin/superadmin_utils/useSuperadminDialogAccessibility';
// RESPONSIBILITY: Renders the ticket reply form and delegates the mutation to the Tickets API.
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { ticketsApi } from '@/app/superadmin/tickets/superadmin_tickets_api/superadmin_tickets_api';
import { replySchema, type ReplyFormValues } from '@/app/superadmin/tickets/superadmin_tickets_types/superadmin_tickets_types';
import { useSuperadminUnsavedChangesGuard } from '@/app/superadmin/superadmin_utils/useSuperadminUnsavedChangesGuard';

interface SuperadminTicketsReplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketId: string | null;
}

export default function SuperadminTicketsReplyModal({ isOpen, onClose, ticketId }: SuperadminTicketsReplyModalProps) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting, isDirty } } = useForm<ReplyFormValues>({ resolver: zodResolver(replySchema), defaultValues: { replyText: '' } });
  useSuperadminUnsavedChangesGuard(isDirty && isOpen, 'You have unsaved reply text. Discard?');
  const dialogRef = useSuperadminDialogAccessibility(isOpen, onClose);

  if (!isOpen || !ticketId) return null;

  const onFormSubmit = async (data: ReplyFormValues) => {
    try {
      const response = await ticketsApi.replyToTicket(ticketId, data.replyText);
      toast.success(response.message, { id: `ticket-reply-${ticketId}` });
      reset();
      onClose();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Ticket reply failed.', { id: `ticket-reply-${ticketId}` });
    }
  };

  return (
    <div ref={dialogRef}  className="fixed inset-0 z-40 flex items-center justify-center bg-overlay/80 backdrop-blur-sm p-4" role="dialog" aria-modal="true" aria-labelledby="ticket-reply-title">
      <div className="bg-card border border-border w-full max-w-lg rounded-xl shadow-2xl p-6 motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95">
        <h2 id="ticket-reply-title" className="text-xl font-bold text-foreground mb-4">Reply to Ticket #{ticketId}</h2>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div>
            <label htmlFor="ticket-reply-text" className="block text-sm font-medium text-foreground mb-2">Your Message</label>
            <textarea id="ticket-reply-text" {...register('replyText')} aria-invalid={!!errors.replyText} aria-describedby="ticket-reply-error" className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-32" placeholder="Type your reply here..." disabled={isSubmitting} />
            {errors.replyText && <p id="ticket-reply-error" className="text-xs text-danger mt-1">{errors.replyText.message}</p>}
          </div>
          <div className="flex gap-3 justify-end pt-4 border-t border-border">
            <button type="button" onClick={() => { reset(); onClose(); }} disabled={isSubmitting} className="px-4 py-2 rounded-lg font-medium border border-border text-foreground hover:bg-card-hover motion-safe:transition-all motion-safe:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="min-w-32 px-4 py-2 rounded-lg font-medium bg-primary text-primary-foreground hover:bg-primary-hover motion-safe:transition-all motion-safe:duration-200 disabled:opacity-50 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              {isSubmitting ? <><Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin" /> Sending...</> : 'Send Reply'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
