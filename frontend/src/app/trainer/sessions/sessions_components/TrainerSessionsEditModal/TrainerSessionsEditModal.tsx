'use client';
// RESPONSIBILITY: View-only shell for editing a session. Form state/submission lives in useTrainerSessionsEditForm.
import { X, Loader2, Save } from 'lucide-react';
import type { TrainerSession } from '@/app/trainer/sessions/sessions_types/TrainerSessionsTypes';
import { DURATION_OPTIONS } from '@/app/trainer/sessions/sessions_utils/TrainerSessionsSharedConstants';
import TrainerSearchableDropdown from '@/app/trainer/trainer_components/TrainerShared/TrainerSearchableDropdown/TrainerSearchableDropdown';
import { useTrainerSessionsEditForm } from '@/app/trainer/sessions/sessions_hooks/useTrainerSessionsEditForm';
import { useTrainerUnsavedChangesGuard } from '@/app/trainer/trainer_utils/TrainerUseWarnIfUnsavedChanges';
import type { TrainerSessionsEditModalProps } from '@/app/trainer/sessions/sessions_types/TrainerSessionsEditModalProps';


export default function TrainerSessionsEditModal({ session, onClose, onSuccess }: TrainerSessionsEditModalProps) {
  const form = useTrainerSessionsEditForm(session, onSuccess);
  useTrainerUnsavedChangesGuard(form.formState.isDirty && !form.formState.isSubmitting && !form.mutation.isPending);
  const durationOptions = DURATION_OPTIONS.map(item => ({ value: item.value, label: item.label }));
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay/80 p-4" role="presentation">
      <div className="bg-overlay w-full max-w-md rounded-xl shadow-dialog border border-border overflow-hidden" role="dialog" aria-modal="true" aria-labelledby="trainer-session-edit-title">
        <div className="flex items-center justify-between p-5 border-b border-border"><div><h3 id="trainer-session-edit-title" className="text-lg font-bold text-primary">Edit Session</h3><p className="text-xs text-secondary mt-0.5 truncate max-w-xs">{session.title}</p></div><button type="button" onClick={onClose} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page text-secondary hover:text-primary hover:bg-input p-2 rounded-lg" aria-label="Close edit session modal"><X size={20} /></button></div>
        <form onSubmit={form.submit} className="p-5 space-y-4">
          {form.formState.errors.root?.message && <p role="alert" className="text-sm text-on-danger bg-danger-bg rounded-lg px-3 py-2">{form.formState.errors.root.message}</p>}
          <div className="grid grid-cols-2 gap-4">
            <div><label htmlFor="trainer-session-edit-time" className="block text-sm font-semibold text-secondary mb-1">Session Time</label><input id="trainer-session-edit-time" type="time" {...form.register('time')} aria-invalid={Boolean(form.formState.errors.time)} className="w-full px-3 py-2 border border-border rounded-lg bg-input text-primary focus:outline-none focus:ring-2 focus:ring-primary" />{form.formState.errors.time && <p className="text-xs text-danger mt-1">{form.formState.errors.time.message}</p>}</div>
            <div><label htmlFor="trainer-session-edit-duration" className="block text-sm font-semibold text-secondary mb-1">Duration</label><TrainerSearchableDropdown options={durationOptions} value={form.watch('duration')} onChange={value => form.setValue('duration', String(value), { shouldValidate: true, shouldDirty: true })} placeholder="Select duration" />{form.formState.errors.duration && <p className="text-xs text-danger mt-1">{form.formState.errors.duration.message}</p>}</div>
          </div>
          <div><label htmlFor="trainer-session-edit-location" className="block text-sm font-semibold text-secondary mb-1">Location / Studio <span className="font-normal">(optional)</span></label><input id="trainer-session-edit-location" {...form.register('location')} className="w-full px-3 py-2 border border-border rounded-lg bg-input text-primary focus:outline-none focus:ring-2 focus:ring-primary" /></div>
          <div><label htmlFor="trainer-session-edit-room" className="block text-sm font-semibold text-secondary mb-1">Room <span className="font-normal">(optional)</span></label><input id="trainer-session-edit-room" {...form.register('room')} className="w-full px-3 py-2 border border-border rounded-lg bg-input text-primary focus:outline-none focus:ring-2 focus:ring-primary" /></div>
          <div className="pt-4 flex justify-end gap-2 border-t border-border"><button type="button" onClick={onClose} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page px-4 py-2 text-sm font-semibold text-secondary hover:text-primary hover:bg-input rounded-lg">Cancel</button><button type="submit" disabled={form.formState.isSubmitting || form.mutation.isPending} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page flex items-center gap-2 px-4 py-2 text-sm font-semibold text-on-primary bg-primary rounded-lg hover:bg-primary-hover disabled:opacity-70">{form.mutation.isPending && <Loader2 size={16} className="motion-safe:animate-spin" />}<Save size={16} />Save Changes</button></div>
        </form>
      </div>
    </div>
  );
}
