// RESPONSIBILITY: Displays trainer notes and owns the note-entry UI; mutation behavior is delegated to the Members mutation hook.
'use client';
import { useState, useRef } from 'react';
import { useTrainerDialogFocusTrap } from '@/app/trainer/trainer_components/TrainerShared/useTrainerDialogFocusTrap';
import { useTrainerUnsavedChangesGuard } from '@/app/trainer/trainer_utils/TrainerUseWarnIfUnsavedChanges';
import { useTrainerIdempotencyKey } from '@/app/trainer/trainer_utils/useTrainerIdempotencyKey';
import { useTrainerFeedback } from '@/app/trainer/trainer_components/TrainerFeedback/useTrainerFeedback';
import { getTrainerUserSafeErrorMessage } from '@/app/trainer/trainer_utils/TrainerUserSafeError';
import { Plus, X } from 'lucide-react';
import { useTrainerMembersMutations } from '@/app/trainer/members/members_queries/useTrainerMembersMutations';
import { useTrainerSelectedMember } from '@/app/trainer/members/members_queries/useTrainerSelectedMember';
import { formatDate } from '@/lib/formatters';

export default function TrainerMembersProfileNotes() {
  const dialogRef = useRef<HTMLDivElement>(null);
  const { member: selectedMember } = useTrainerSelectedMember();
  const { addNote } = useTrainerMembersMutations();
  const [noteText, setNoteText] = useState('');
  const [open, setOpen] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const actionKeys = useTrainerIdempotencyKey();
  const guardNavigation = useTrainerUnsavedChangesGuard(open && isDirty && !addNote.isPending);
  const { showSuccess, showError } = useTrainerFeedback();
  useTrainerDialogFocusTrap({ isOpen: open, dialogRef, onEscape: () => void guardNavigation(() => setOpen(false)) });
  if (!selectedMember) return null;
  const notes = selectedMember.trainerNotes || [];
  const submit = async () => {
    const text = noteText.trim();
    if (!text) return;
    const actionId = `add-member-note-${selectedMember.id}`;
    try {
      const response = await addNote.mutateAsync({ memberId: selectedMember.id, text, idempotencyKey: actionKeys.begin(actionId) });
      showSuccess(response.message, actionId);
      actionKeys.clear(actionId);
      setNoteText('');
      setIsDirty(false);
      setOpen(false);
    } catch (error) { showError(error, actionId); }
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-bold text-primary">Trainer Notes</h3>
        <button type="button" onClick={() => { setNoteText(''); setIsDirty(false); setOpen(true); }} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-on-primary text-sm font-semibold rounded-lg hover:bg-primary-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><Plus size={18} />Add Note</button>
      </div>
      {notes.length === 0 ? (
        <div className="text-secondary p-4 bg-input rounded-xl border border-border">No notes have been added for this member yet.</div>
      ) : notes.map(note => (
        <div key={note.id} className="p-4 bg-card border border-border rounded-xl">
          <div className="text-xs text-secondary mb-1">{formatDate(note.date)}</div>
          <p className="text-sm text-primary">{note.text}</p>
        </div>
      ))}
      {open && (
        <div className="fixed inset-0 z-40 bg-overlay flex items-center justify-center p-4" role="presentation">
          <div className="w-full max-w-md bg-overlay border border-border rounded-xl shadow-dialog p-5" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="trainer-member-note-title">
            <div className="flex items-center justify-between mb-4"><h4 id="trainer-member-note-title" className="font-semibold text-primary">Add Trainer Note</h4><button type="button" aria-label="Close add note dialog" onClick={() => void guardNavigation(() => setOpen(false))} className="min-w-11 min-h-11 p-2 rounded-lg text-secondary hover:text-primary hover:bg-primary-subtle motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"><X size={18} /></button></div>
            <label htmlFor="trainer-member-note" className="block text-sm font-medium text-secondary mb-1">Note</label>
            <textarea id="trainer-member-note" value={noteText} onChange={e => { setNoteText(e.target.value); setIsDirty(Boolean(e.target.value)); }} rows={5} aria-describedby="trainer-member-note-help" className="w-full bg-input border border-border rounded-lg p-3 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
            <p id="trainer-member-note-help" className="text-xs text-secondary mt-1">Add a private coaching note for this member.</p>
            {addNote.isError && <p role="alert" className="text-xs text-danger mt-2">{getTrainerUserSafeErrorMessage(addNote.error)}</p>}
            <div className="flex justify-end gap-2 mt-5"><button type="button" onClick={() => void guardNavigation(() => setOpen(false))} className="min-h-11 px-4 py-2 border border-border rounded-lg text-secondary hover:bg-primary-subtle motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">Cancel</button><button type="button" onClick={() => void submit()} disabled={!noteText.trim() || addNote.isPending} className="min-h-11 min-w-28 px-4 py-2 rounded-lg bg-primary text-on-primary font-semibold motion-safe:transition-colors disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">{addNote.isPending ? 'Saving…' : 'Save Note'}</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
