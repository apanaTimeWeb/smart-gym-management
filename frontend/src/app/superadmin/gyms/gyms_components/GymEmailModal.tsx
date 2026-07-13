'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Send } from 'lucide-react';
import { useGymsContext } from '@/app/superadmin/gyms/gyms_context/GymsContext';

const gymEmailSchema = z.object({
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
});

type GymEmailFormValues = z.infer<typeof gymEmailSchema>;

export default function GymEmailModal() {
  const { isEmailModalOpen, closeEmailModal, selectedGym, handleEmailOwner } = useGymsContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<GymEmailFormValues>({
    resolver: zodResolver(gymEmailSchema),
  });

  useEffect(() => {
    if (isEmailModalOpen) {
      reset({ subject: '', message: '' });
    }
  }, [isEmailModalOpen, reset]);

  if (!isEmailModalOpen || !selectedGym) return null;

  const onSubmit = async (data: GymEmailFormValues) => {
    await handleEmailOwner(selectedGym.id, data);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-4">
      <div className="bg-card rounded-2xl p-7 max-w-[480px] w-full border border-border shadow-2xl relative">
        <button
          onClick={closeEmailModal}
          className="absolute top-5 right-5 text-secondary hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-bold text-foreground mb-1">Email Owner</h2>
        <p className="text-sm text-secondary mb-6">Send an email to {selectedGym.ownerName} ({selectedGym.adminEmail}).</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-secondary mb-1">Subject <span className="text-destructive">*</span></label>
            <input
              type="text"
              {...register('subject')}
              className="w-full bg-input border border-border rounded-lg px-[14px] py-[10px] text-sm text-foreground focus:border-border-focus focus:outline-none transition-colors"
              placeholder="E.g. Important Update regarding your subscription"
            />
            {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-secondary mb-1">Message <span className="text-destructive">*</span></label>
            <textarea
              {...register('message')}
              rows={5}
              className="w-full bg-input border border-border rounded-lg px-[14px] py-[10px] text-sm text-foreground focus:border-border-focus focus:outline-none transition-colors resize-none"
              placeholder="Type your message here..."
            />
            {errors.message && <p className="text-xs text-destructive mt-1">{errors.message.message}</p>}
          </div>

          <div className="flex justify-end gap-3 pt-4 mt-6">
            <button
              type="button"
              onClick={closeEmailModal}
              className="px-5 py-2.5 rounded-lg text-sm font-medium text-foreground border border-border hover:bg-background transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-primary hover:bg-primary-hover transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            >
              <Send className="w-4 h-4" /> {isSubmitting ? 'Sending...' : 'Send Email'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
