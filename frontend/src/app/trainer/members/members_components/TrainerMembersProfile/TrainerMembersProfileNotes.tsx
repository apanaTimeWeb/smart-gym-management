// RESPONSIBILITY: Renders the trainer notes tab for a member profile.
// DATA FLOW: TrainerMembersProfile → TrainerMembersProfileNotes

'use client';
import { useMembersContext } from '@/app/trainer/members/members_context/MembersContext';

export default function TrainerMembersProfileNotes() {
  const { selectedMember } = useMembersContext();

  if (!selectedMember) return null;

  const notes = selectedMember.trainerNotes || [];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-foreground mb-4">Trainer Notes</h3>
      {notes.length === 0 ? (
        <div className="text-secondary p-4 bg-input rounded-xl border border-border">
          No notes have been added for this member yet.
        </div>
      ) : (
        notes.map(note => (
          <div key={note.id} className="p-4 bg-card border border-border rounded-xl">
            <div className="text-xs text-secondary mb-1">{new Date(note.date).toLocaleDateString()}</div>
            <p className="text-sm text-foreground">{note.text}</p>
          </div>
        ))
      )}
      <button className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90">
        Add Note
      </button>
    </div>
  );
}
