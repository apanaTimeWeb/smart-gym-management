"use client";
// RESPONSIBILITY: Create / Edit modal for Announcements — RHF + Zod validation.

import { Controller } from 'react-hook-form';
import { X, Loader2, Megaphone } from 'lucide-react';
import { useAdminAnnouncementsModalForm } from '@/app/admin/announcements/announcements_components/AdminAnnouncementsModal/useAdminAnnouncementsModalForm';
import { ANNOUNCEMENT_PRIORITY_OPTIONS, ANNOUNCEMENT_AUDIENCE_OPTIONS, ANNOUNCEMENT_COMPOSE_GYM_OPTIONS } from '@/app/admin/announcements/announcements_utils/AdminAnnouncementsSharedConstants';

export default function AdminAnnouncementsModal() {
  const { showModal, editingAnnouncement, saving, register, handleSubmit, control, errors, handleClose, saveAnnouncement, toggleArrayValue, isEdit } = useAdminAnnouncementsModalForm();

  if (!showModal) return null;


  return (
    <>
      <div data-admin-dialog="true" role="dialog" aria-modal="true" tabIndex={-1} className="fixed inset-0 bg-overlay backdrop-blur-sm z-40" onClick={() => void handleClose()} />
      <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
        <div className="bg-overlay border border-border rounded-2xl shadow-dialog w-full max-w-2xl max-h-screen flex flex-col">

          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-border shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary-subtle flex items-center justify-center">
                <Megaphone size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-primary">{isEdit ? 'Edit Announcement' : 'New Announcement'}</h3>
                <p className="text-xs text-secondary">{isEdit ? 'Update announcement details' : 'Broadcast to your branch members, trainers, or staff'}</p>
              </div>
            </div>
            <button onClick={() => void handleClose()} className="min-h-11 min-w-11 w-8 h-8 rounded-lg bg-input hover:bg-surface-hover flex items-center justify-center motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" aria-label="Close">
              <X size={16} className="text-secondary" />
            </button>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit(saveAnnouncement)} className="flex-1 overflow-y-auto p-5 space-y-4">

            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">Title *</label>
              <input
                {...register('title')}
                placeholder="e.g. Grand Opening — New Branch!"
                className="w-full px-4 py-2.5 bg-input border border-border rounded-xl text-sm text-primary focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary"
              />
              {errors.title && <p className="text-xs text-danger mt-1">{errors.title.message}</p>}
            </div>

            {/* Body */}
            <div>
              <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">Message Body *</label>
              <textarea
                {...register('body')}
                rows={4}
                placeholder="Write the full announcement message here..."
                className="w-full px-4 py-2.5 bg-input border border-border rounded-xl text-sm text-primary focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary resize-none"
              />
              {errors.body && <p className="text-xs text-danger mt-1">{errors.body.message}</p>}
            </div>

            {/* Priority + Pin row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">Priority *</label>
                <select
                  {...register('priority')}
                  className="w-full px-4 py-2.5 bg-input border border-border rounded-xl text-sm text-primary focus-visible:outline-none focus-visible:border-primary"
                >
                  {ANNOUNCEMENT_PRIORITY_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col justify-end">
                <label className="flex items-center gap-3 cursor-pointer p-3 bg-input border border-border rounded-xl hover:border-primary motion-safe:transition-colors motion-safe:duration-base">
                  <input type="checkbox" {...register('isPinned')} className="w-4 h-4 accent-primary" />
                  <div>
                    <p className="text-sm font-semibold text-primary">Pin Announcement</p>
                    <p className="text-xs text-secondary">Always show at top</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Audience */}
            <div>
              <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">Target Audience *</label>
              <Controller
                name="audience"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-wrap gap-2">
                    {ANNOUNCEMENT_AUDIENCE_OPTIONS.map(o => {
                      const selected = field.value.includes(o.value);
                      return (
                        <button
                          key={o.value}
                          type="button"
                          onClick={() => field.onChange(toggleArrayValue(field.value, o.value))}
                          className={`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page px-3 py-1.5 rounded-lg text-xs font-semibold border motion-safe:transition-colors ${
                            selected
                              ? 'bg-primary text-on-primary border-primary'
                              : 'bg-input text-secondary border-border hover:border-primary hover:text-primary'
                          }`}
                        >
                          {o.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              />
              {errors.audience && <p className="text-xs text-danger mt-1">{errors.audience.message}</p>}
            </div>

            {/* Gyms — admin can only target their own branches, never cross-tenant */}
            <div>
              <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">Target Branches *</label>
              <Controller
                name="gymIds"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-wrap gap-2">
                    {ANNOUNCEMENT_COMPOSE_GYM_OPTIONS.map(o => {
                      const selected = field.value.includes(o.value);
                      return (
                        <button
                          key={o.value}
                          type="button"
                          onClick={() => field.onChange(toggleArrayValue(field.value, o.value))}
                          className={`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page px-3 py-1.5 rounded-lg text-xs font-semibold border motion-safe:transition-colors ${
                            selected
                              ? 'bg-primary text-on-primary border-primary'
                              : 'bg-input text-secondary border-border hover:border-primary hover:text-primary'
                          }`}
                        >
                          {o.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              />
              {errors.gymIds && <p className="text-xs text-danger mt-1">{errors.gymIds.message}</p>}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">Publish Date & Time *</label>
                <input
                  type="datetime-local"
                  {...register('publishedAt')}
                  className="w-full px-4 py-2.5 bg-input border border-border rounded-xl text-sm text-primary focus-visible:outline-none focus-visible:border-primary"
                />
                {errors.publishedAt && <p className="text-xs text-danger mt-1">{errors.publishedAt.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">Expiry Date & Time *</label>
                <input
                  type="datetime-local"
                  {...register('expiresAt')}
                  className="w-full px-4 py-2.5 bg-input border border-border rounded-xl text-sm text-primary focus-visible:outline-none focus-visible:border-primary"
                />
                {errors.expiresAt && <p className="text-xs text-danger mt-1">{errors.expiresAt.message}</p>}
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => void handleClose()}
                className="flex-1 py-2.5 border border-border rounded-xl text-sm font-medium text-secondary hover:text-primary hover:bg-input motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 py-2.5 bg-primary hover:bg-primary-hover text-on-primary rounded-xl text-sm font-semibold motion-safe:transition-colors flex items-center justify-center gap-2 disabled:opacity-60 motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
              >
                {saving ? <Loader2 size={15} className="motion-safe:animate-spin motion-safe:duration-base" /> : null}
                {isEdit ? 'Save Changes' : 'Publish Announcement'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
