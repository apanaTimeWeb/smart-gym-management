'use client';
// RESPONSIBILITY: Renders the modal UI for sending an email to a Gym owner. Purely a view component.

import React from 'react';
import { X } from 'lucide-react';
import { useGymEmailModal } from '@/app/superadmin/gyms/gyms_components/GymEmailModal/useGymEmailModal';

export default function GymEmailModal() {
  const {
    isEmailModalOpen,
    closeEmailModal,
    selectedGym,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
  } = useGymEmailModal();

  if (!isEmailModalOpen || !selectedGym) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-card rounded-2xl p-7 max-w-md w-full border border-border shadow-2xl relative">
        <button
          onClick={closeEmailModal}
          className="absolute top-5 right-5 text-secondary hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-bold text-foreground mb-1">Email Gym Owner</h2>
        <p className="text-sm text-secondary mb-6">Send an email to {selectedGym.ownerName} ({selectedGym.adminEmail}).</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-secondary mb-1">Subject <span className="text-destructive">*</span></label>
            <input
              type="text"
              {...register('subject')}
              className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:border-border-focus focus:outline-none transition-colors"
              placeholder="e.g., Important update about your subscription"
            />
            {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-secondary mb-1">Message <span className="text-destructive">*</span></label>
            <textarea
              {...register('message')}
              rows={5}
              className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:border-border-focus focus:outline-none transition-colors resize-none"
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
              className="px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-primary hover:bg-primary-hover transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Email'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
