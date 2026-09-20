// RESPONSIBILITY: Renders the paginated, sortable Progress entries table and delegates mutations to the owning feature.
'use client';
// DATA FLOW: Query response -> rows; URL sort/page -> query refresh; delete -> confirm -> mutation.

import { Fragment, useState } from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown, Pencil, Trash2 } from 'lucide-react';
import { formatNumber, displayValue } from '@/lib/formatters';
import { useTrainerConfirm } from '@/app/trainer/trainer_components/TrainerFeedback/useTrainerConfirm';
import TrainerPagination from '@/app/trainer/trainer_components/TrainerShared/TrainerPagination';
import type { TrainerProgressTableProps } from '@/app/trainer/progress-tracking/progress-tracking_types/TrainerProgressTableProps';
import type { ProgressEntry, ProgressSortDirection, ProgressSortField } from '@/app/trainer/progress-tracking/progress-tracking_types/TrainerProgressTypes';

const TABLE_COLUMNS = [
  { label: 'Date', field: 'date' }, { label: 'Weight (kg)', field: 'weightKg' }, { label: 'Height (cm)', field: 'heightCm' },
  { label: 'BMI', field: 'bmi' }, { label: 'Body Fat %', field: 'bodyFatPercent' }, { label: 'Muscle Mass (kg)', field: 'muscleMassKg' },
  { label: 'Waist (cm)', field: 'waistCm' }, { label: 'Notes', field: null },
] as const;

/** Renders the active/inactive sort arrow required by the table header contract. */
function SortDirectionIcon({ active, direction }: { active: boolean; direction: ProgressSortDirection }) {
  const Icon = active ? (direction === 'asc' ? ArrowUp : ArrowDown) : ArrowUpDown;
  return <Icon size={18} className={active ? 'text-primary' : 'text-secondary'} aria-hidden="true" />;
}

export default function TrainerProgressTable({ entries, totalEntries, currentPage, itemsPerPage, sortBy, sortDirection, onPageChange, onSort, onEdit, onDelete }: TrainerProgressTableProps) {
  const { confirm } = useTrainerConfirm();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const totalPages = Math.max(1, Math.ceil(totalEntries / itemsPerPage));

  const handleEdit = (entry: ProgressEntry) => onEdit(entry);

  const handleDelete = async (entry: ProgressEntry) => {
    const approved = await confirm({
      title: 'Delete Entry', message: `Delete the progress entry from ${entry.date}? This cannot be undone.`, type: 'danger', confirmText: 'Delete',
      requireTypedConfirmation: true, confirmationPhrase: 'DELETE ENTRY',
    });
    if (approved) onDelete(entry.id);
  };

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-highlight">
              {TABLE_COLUMNS.map((column) => <th key={column.label} className="px-4 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap">{column.field ? <button type="button" onClick={() => onSort(column.field as ProgressSortField)} className="inline-flex items-center gap-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label={`Sort by ${column.label}`}>{column.label}<SortDirectionIcon active={sortBy === column.field} direction={sortDirection} /></button> : column.label}</th>)}
              <th className="px-4 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {entries.map((entry) => (
              <Fragment key={entry.id}>
                <tr
                  tabIndex={0}
                  onClick={() => setExpandedId((current) => (current === entry.id ? null : entry.id))}
                  onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setExpandedId((current) => (current === entry.id ? null : entry.id)); } }}
                  className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary hover:bg-surface-hover motion-safe:transition-colors motion-safe:duration-base"
                >
                  <td className="px-4 py-3 text-primary whitespace-nowrap">{displayValue(entry.date)}</td>
                  <td className="px-4 py-3 text-primary">{formatNumber(entry.weightKg)}</td>
                  <td className="px-4 py-3 text-primary">{formatNumber(entry.heightCm)}</td>
                  <td className="px-4 py-3 text-primary">{formatNumber(entry.bmi)}</td>
                  <td className="px-4 py-3 text-primary">{entry.bodyFatPercent == null ? '—' : formatNumber(entry.bodyFatPercent)}</td>
                  <td className="px-4 py-3 text-primary">{entry.muscleMassKg == null ? '—' : formatNumber(entry.muscleMassKg)}</td>
                  <td className="px-4 py-3 text-primary">{entry.waistCm == null ? '—' : formatNumber(entry.waistCm)}</td>
                  <td className="px-4 py-3 text-secondary max-w-40 truncate" title={entry.notes ?? undefined}>{displayValue(entry.notes)}</td>
                  <td className="px-4 py-3"><div className="flex items-center gap-2">
                    <button type="button" onClick={(event) => { event.stopPropagation(); handleEdit(entry); }} className="min-w-11 min-h-11 inline-flex items-center justify-center p-1.5 rounded-lg text-secondary hover:text-primary hover:bg-input motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label="Edit entry" title="Edit entry"><Pencil size={18} /></button>
                    <button type="button" onClick={(event) => { event.stopPropagation(); void handleDelete(entry); }} className="min-w-11 min-h-11 inline-flex items-center justify-center p-1.5 rounded-lg text-secondary hover:text-danger hover:bg-danger-bg motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label="Delete entry" title="Delete entry"><Trash2 size={18} /></button>
                  </div></td>
                </tr>
                {expandedId === entry.id && (
                  <tr key={`${entry.id}-details`} className="bg-surface-highlight">
                    <td colSpan={9} className="px-4 py-3 text-sm text-secondary">{displayValue(entry.notes)}</td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <TrainerPagination currentPage={currentPage} totalPages={totalPages} totalItems={totalEntries} itemsPerPage={itemsPerPage} onPageChange={onPageChange} />
    </div>
  );
}
