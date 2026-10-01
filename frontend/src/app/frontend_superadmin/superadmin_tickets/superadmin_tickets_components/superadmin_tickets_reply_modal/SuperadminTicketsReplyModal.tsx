'use client';
// RESPONSIBILITY: Renders the Superadmin ticket reply form. Submission state and API behavior are owned by useSuperadminTicketsTicketReply.
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { zodResolver } from '@hookform/resolvers/zod';
import { Send, Loader2 } from 'lucide-react';

import { useUnsavedChangesGuard } from '@/hooks/useUnsavedChangesGuard';
import { useSuperadminLayoutDialogA11y } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutDialogA11y';

import { replySchema } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_schemas/SuperadminTicketsTypesSchemas';
import { useSuperadminTicketsTicketReply } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_hooks/useSuperadminTicketsTicketReply';

import type { SuperadminTicketsReplyFormValues } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_types/SuperadminTicketsReplyFormTypes';
import type { SuperadminTicketsReplyModalProps } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_types/SuperadminTicketsReplyModalTypes';

/**
 * @description Renders the Superadmin ticket reply form. Submission state and API behavior are owned by useSuperadminTicketsTicketReply.
 * @dependencies Uses the existing feature-local API, query, state, and approved UI/infrastructure contracts imported by this component.
 * @edge-case Interactive, loading, empty, error, disabled, and repeated-action paths must remain recoverable through the owning feature contract.
 */
export default function SuperadminTicketsReplyModal({ isOpen, onClose, ticketId }: SuperadminTicketsReplyModalProps) {
  const t = useTranslations('superadmin_tickets');
  const { sendReply, isSending } = useSuperadminTicketsTicketReply();
  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<SuperadminTicketsReplyFormValues>({ resolver: zodResolver(replySchema), defaultValues: { replyText: '' } });
  useUnsavedChangesGuard(Boolean(isOpen && isDirty && !isSending), t('ui.unsent_ticket_reply_leave'));
  const handleClose = () => {
    if (isSending) return;
    reset();
    onClose();
  };
  const dialogRef = useSuperadminLayoutDialogA11y(isOpen && Boolean(ticketId), handleClose);

  if (!isOpen || !ticketId) return null;

  const onSubmit = async (values: SuperadminTicketsReplyFormValues) => {
    try {
      const response = await sendReply({ id: ticketId, values });
      toast.success(response.message, { id: `superadmin-ticket-reply-${ticketId}` });
      reset();
      onClose();
    } catch (error: unknown) {
      toast.error(t('ui.action_failed_retry'), { id: `superadmin-ticket-reply-error-${ticketId}` });
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay backdrop-blur-sm p-4" role="dialog" aria-modal="true" aria-labelledby="superadmin-ticket-reply-title" data-testid="superadmin_tickets-tickets-tickets-reply-modal-dialog" ref={dialogRef}>
      <div className="bg-overlay border border-border w-full max-w-lg rounded-xl shadow-dialog p-6 relative">
        <h2 id="superadmin-ticket-reply-title" className="text-lg font-bold text-primary mb-1">{t('ui.reply_to_ticket_03470b7')}{ticketId}</h2>
        <p className="text-sm text-secondary mb-4">{t('ui.send_a_tenant_facing_response_through_the_ticket_03d83e5')}</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" data-testid="superadmin_tickets-superadminticketsreplymodal-form-submit">
          <div>
            <label htmlFor="superadmin-ticket-reply-text" className="block text-sm font-medium text-secondary mb-2">{t('ui.your_message_5fbe072')}</label>
            <textarea id="superadmin-ticket-reply-text" {...register('replyText')} aria-invalid={Boolean(errors.replyText)} aria-describedby="superadmin-ticket-reply-error" className="min-h-11 w-full px-3 py-2 bg-input border border-border rounded-md text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-32 motion-safe:transition-all motion-safe:duration-base ease-in-out" placeholder={t('ui.type_your_reply_here_5d5b10c')} disabled={isSending}  data-testid="superadmin_tickets-tickets-tickets-reply-modal-reply"/>
            {errors.replyText && <p id="superadmin-ticket-reply-error" className="text-xs text-danger mt-1">{errors.replyText.message}</p>}
          </div>
          <div className="flex gap-3 justify-end pt-4 border-t border-border">
            <button type="button" data-autofocus="true" onClick={handleClose} disabled={isSending} className="min-h-11 px-4 py-2 rounded-md font-medium border border-border text-primary hover:bg-surface-hover motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:active:scale-95" data-testid="superadmin_tickets-tickets-tickets-reply-modal-cancel">{t('ui.cancel_292aa09')}</button>
            <button type="submit" disabled={isSending || !isDirty} className="min-h-11 min-w-32 px-4 py-2 rounded-md font-medium bg-primary text-on-primary hover:bg-primary-hover motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 disabled:opacity-50 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="superadmin_tickets-tickets-tickets-reply-modal-reply-2">
              {isSending ? <><Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin"/>{t('ui.sending_90dd3cf')}</> : <><Send size={18} strokeWidth={2}/>{t('ui.send_reply_ea329ca')}</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export type { SuperadminTicketsReplyModalProps } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_types/SuperadminTicketsReplyModalTypes';
