// RESPONSIBILITY: Renders the Tickets Reply Modal component and its associated UI logic.
'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSuperadminUnsavedChangesGuard } from '@/app/superadmin/superadmin_utils/useSuperadminUnsavedChangesGuard';
import { replySchema, type ReplyFormValues } from '@/app/superadmin/tickets/superadmin_tickets_types/superadmin_tickets_types';
interface SuperadminTicketsReplyModalProps {
    isOpen: boolean;
    onClose: () => void;
    ticketId: string | null;
}
export default function SuperadminTicketsReplyModal({ isOpen, onClose, ticketId }: SuperadminTicketsReplyModalProps) {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting, isDirty } } = useForm<ReplyFormValues>({
        resolver: zodResolver(replySchema),
        defaultValues: { replyText: '' }
    });
    useSuperadminUnsavedChangesGuard(isDirty && isOpen, 'You have unsaved reply text. Discard?');
    if (!isOpen || !ticketId)
        return null;
    const onFormSubmit = async (data: ReplyFormValues) => {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 800));
            toast.success('Reply sent successfully!', { id: 'reply-sent-successfully' });
            reset();
            onClose();
        }
        catch (err) {
            toast.error('Failed to send reply.', { id: 'failed-to-send-reply' });
        }
    };
    const handleClose = () => {
        reset();
        onClose();
    };
    return (<div className="fixed inset-0 z-40 flex items-center justify-center bg-background/80 backdrop-blur-sm motion-safe:animate-in fade-in motion-safe:duration-base" role="dialog" aria-modal="true">
      <div className="bg-card border border-border w-full max-w-lg rounded-xl shadow-lg p-6 relative motion-safe:animate-in zoom-in-95 motion-safe:duration-base">
        <h2 className="text-xl font-bold text-foreground mb-4">Reply to Ticket #{ticketId}</h2>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Your Message</label>
            <textarea {...register('replyText')} className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page focus:border-primary min-h-32" placeholder="Type your reply here..." disabled={isSubmitting}/>
            {errors.replyText && (<p className="text-xs text-danger mt-1">{errors.replyText.message}</p>)}
          </div>
          <div className="flex gap-3 justify-end pt-4 border-t border-border">
            <button type="button" onClick={handleClose} disabled={isSubmitting} className="px-4 py-2 rounded-lg font-medium border border-border text-foreground hover:bg-card-hover motion-safe:transition-colors disabled:opacity-50">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="px-4 py-2 rounded-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 motion-safe:transition-colors disabled:opacity-50 flex items-center gap-2">
              {isSubmitting ? 'Sending...' : 'Send Reply'}
            </button>
          </div>
        </form>
      </div>
    </div>);
}
