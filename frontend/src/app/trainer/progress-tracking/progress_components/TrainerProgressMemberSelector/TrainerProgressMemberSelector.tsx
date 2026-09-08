'use client';
// RESPONSIBILITY: Multi-member selector for the comparison view.
// DATA FLOW: useTrainerProgressLogic → TrainerProgressMemberSelector
// Max COMPARISON_MAX_MEMBERS members can be selected at once.

import { Users } from 'lucide-react';
import { COMPARISON_MAX_MEMBERS } from '@/app/trainer/progress-tracking/progress_utils/TrainerProgressSharedConstants';

interface Props {
  allMembers: { id: string; name: string }[];
  selectedIds: string[];
  onToggle: (memberId: string) => void;
}

export default function TrainerProgressMemberSelector({ allMembers, selectedIds, onToggle }: Props) {
  return (
    <div className="bg-card rounded-xl border border-border p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users size={16} className="text-primary" />
          <span className="text-sm font-semibold text-foreground">Select Members to Compare</span>
          <span className="text-xs text-secondary bg-input px-2 py-0.5 rounded-full">
            {selectedIds.length} / {COMPARISON_MAX_MEMBERS}
          </span>
        </div>
        {selectedIds.length > 0 && (
          <button
            onClick={() => selectedIds.forEach(id => onToggle(id))}
            className="text-xs text-secondary hover:text-danger motion-safe:transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {allMembers.map((m) => {
          const isSelected = selectedIds.includes(m.id);
          const isDisabled = !isSelected && selectedIds.length >= COMPARISON_MAX_MEMBERS;
          return (
            <button
              key={m.id}
              onClick={() => !isDisabled && onToggle(m.id)}
              disabled={isDisabled}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border motion-safe:transition-all ${
                isSelected
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : isDisabled
                  ? 'bg-input text-secondary/40 border-border cursor-not-allowed'
                  : 'bg-input text-secondary border-border hover:border-primary hover:text-foreground'
              }`}
            >
              {m.name}
            </button>
          );
        })}
      </div>

      {selectedIds.length === 0 && (
        <p className="text-xs text-secondary/60 italic">Select at least 2 members to compare.</p>
      )}
    </div>
  );
}
