'use client';
// RESPONSIBILITY: Renders a reusable, module-specific empty state for each Library collection.
import { Dumbbell, Plus } from 'lucide-react';
import { Apple } from 'lucide-react';
import type { ManagerLibraryEmptyStateProps } from '@/app/manager/library/library_types/ManagerLibraryEmptyStateTypes';

export default function ManagerLibraryEmptyState({ view, onAdd }: ManagerLibraryEmptyStateProps) {
  const isDiet = view === 'diet';
  const label = isDiet ? 'diet plans' : 'exercises';
  return (
    <div className="col-span-full flex min-h-64 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-card p-8 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-subtle text-on-primary">
        {isDiet ? <Apple size={18} aria-hidden="true" /> : <Dumbbell size={18} aria-hidden="true" />}
      </div>
      <h3 className="text-base font-semibold text-primary">No {label} found</h3>
      <p className="max-w-md text-sm text-secondary">Try changing the search or create a new {isDiet ? 'diet plan' : 'exercise'} to get started.</p>
      <button type="button" onClick={onAdd} className="mt-1 inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-on-primary motion-safe:transition-all motion-safe:duration-base motion-safe:hover:brightness-95 motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
        <Plus size={18} aria-hidden="true" /> Add {isDiet ? 'Diet Plan' : 'Exercise'}
      </button>
    </div>
  );
}
