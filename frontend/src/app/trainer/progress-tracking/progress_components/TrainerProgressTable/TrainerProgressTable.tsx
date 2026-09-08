'use client';
// RESPONSIBILITY: Renders the progress entries table with edit/delete actions.
// DATA FLOW: useTrainerProgressLogic → TrainerProgressTable

import { Pencil, Trash2 } from 'lucide-react';
import type { ProgressEntry } from '@/app/trainer/progress-tracking/progress_types/TrainerProgressTypes';
import { PROGRESS_TABLE_HEADERS } from '@/app/trainer/progress-tracking/progress_utils/TrainerProgressSharedConstants';
import { useConfirm } from '@/app/trainer/trainer_components/TrainerFeedback/TrainerConfirmProvider';

interface Props {
  entries: ProgressEntry[];
  onEdit: (entry: ProgressEntry) => void;
  onDelete: (entryId: string) => void;
}

export default function TrainerProgressTable({ entries, onEdit, onDelete }: Props) {
  const { confirm } = useConfirm();

  const handleDelete = async (entry: ProgressEntry) => {
    const ok = await confirm({
      title: 'Delete Entry',
      message: `Delete the progress entry from ${entry.date}? This cannot be undone.`,
      type: 'danger',
      confirmText: 'Delete',
    });
    if (ok) onDelete(entry.id);
  };

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-input">
              {PROGRESS_TABLE_HEADERS.map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {entries.map((entry) => (
              <tr key={entry.id} className="hover:bg-input/50 motion-safe:transition-colors">
                <td className="px-4 py-3 text-foreground whitespace-nowrap">{entry.date}</td>
                <td className="px-4 py-3 text-foreground">{entry.weightKg}</td>
                <td className="px-4 py-3 text-foreground">{entry.heightCm}</td>
                <td className="px-4 py-3 text-foreground">{entry.bmi.toFixed(1)}</td>
                <td className="px-4 py-3 text-foreground">{entry.bodyFatPercent ?? '—'}</td>
                <td className="px-4 py-3 text-foreground">{entry.muscleMassKg ?? '—'}</td>
                <td className="px-4 py-3 text-foreground">{entry.waistCm ?? '—'}</td>
                <td className="px-4 py-3 text-secondary max-w-[160px] truncate">{entry.notes ?? '—'}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(entry)}
                      className="p-1.5 rounded-lg text-secondary hover:text-foreground hover:bg-input motion-safe:transition-colors"
                      aria-label="Edit entry"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(entry)}
                      className="p-1.5 rounded-lg text-secondary hover:text-danger hover:bg-danger-bg motion-safe:transition-colors"
                      aria-label="Delete entry"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
