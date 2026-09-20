// RESPONSIBILITY: Multi-member selector for the comparison view.
'use client';
// DATA FLOW: useTrainerProgressLogic → TrainerProgressMemberSelector
// Max COMPARISON_MAX_MEMBERS members can be selected at once.

import { Users } from 'lucide-react';
import { COMPARISON_MAX_MEMBERS } from '@/app/trainer/progress-tracking/progress-tracking_utils/TrainerProgressSharedConstants';
import type { TrainerProgressMemberSelectorProps } from '@/app/trainer/progress-tracking/progress-tracking_types/TrainerProgressMemberSelectorProps';



export default function TrainerProgressMemberSelector({ allMembers, selectedIds, onToggle }: TrainerProgressMemberSelectorProps) {
  return (
    <div className="bg-card rounded-xl border border-border p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users size={18} className="text-primary" />
          <span className="text-sm font-semibold text-primary">Select Members to Compare</span>
          <span className="text-xs text-secondary bg-input px-2 py-0.5 rounded-full">
            {selectedIds.length} / {COMPARISON_MAX_MEMBERS}
          </span>
        </div>
        {selectedIds.length > 0 && (
          <button type="button"
            onClick={() => selectedIds.forEach(id => onToggle(id))}
            className="text-xs text-secondary hover:text-danger motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
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
            <button type="button"
              key={m.id}
              onClick={() => !isDisabled && onToggle(m.id)}
              disabled={isDisabled}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border motion-safe:transition-all ${
                isSelected
                  ? 'bg-primary text-on-primary border-primary shadow-card'
                  : isDisabled
                  ? 'bg-input text-secondary/40 border-border cursor-not-allowed'
                  : 'bg-input text-secondary border-border hover:border-primary hover:text-primary'
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page`}
            >
              {m.name}
            </button>
          );
        })}
      </div>

      {selectedIds.length === 0 && (
        <p className="text-xs text-disabled italic">Select at least 2 members to compare.</p>
      )}
    </div>
  );
}
