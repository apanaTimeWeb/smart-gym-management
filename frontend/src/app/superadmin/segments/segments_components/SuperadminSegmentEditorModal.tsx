// RESPONSIBILITY: Renders the create/edit form for one Superadmin tenant segment and delegates persistence to the feature mutation hook. No API calls.
// DATA FLOW: Form state → useSuperadminSegmentMutations → Segments API/MSW → TanStack Query reconciliation → parent-visible segment data.
'use client';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { Save, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSuperadminSegmentMutations } from '@/app/superadmin/segments/segments_utils/useSuperadminSegmentMutations';
import { useSuperadminUnsavedChangesGuard } from '@/app/superadmin/superadmin_infrastructure/useSuperadminUnsavedChangesGuard';
import type { SuperadminSegmentEditorModalProps } from '@/app/superadmin/segments/segments_types/SuperadminSegmentsTypes';
import { SuperadminSegmentCreatePayloadSchema } from '@/app/superadmin/segments/segments_types/SuperadminSegmentsValidationSchema';

export default function SuperadminSegmentEditorModal({ segment, onClose, onSaved }: SuperadminSegmentEditorModalProps) {
  const [name, setName] = useState(segment?.name ?? '');
  const [description, setDescription] = useState(segment?.description ?? '');
  const [rules, setRules] = useState(String(segment?.rules ?? 1));
  const [usedIn, setUsedIn] = useState(segment?.usedIn ?? 'Gyms');
  const { createSegment, updateSegment, isSaving } = useSuperadminSegmentMutations();
  const dirty = name !== (segment?.name ?? '') || description !== (segment?.description ?? '') || rules !== String(segment?.rules ?? 1) || usedIn !== (segment?.usedIn ?? 'Gyms');
  useSuperadminUnsavedChangesGuard(dirty && !isSaving, 'You have unsaved changes. Are you sure you want to leave? Your changes will be lost.');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = SuperadminSegmentCreatePayloadSchema.safeParse({
      name: name.trim(),
      description: description.trim(),
      rules: Math.max(1, Number(rules) || 1),
      usedIn: usedIn.trim() || 'Gyms',
    });
    if (!parsed.success) return;
    try {
      const response = segment
        ? await updateSegment({ id: segment.id, payload: parsed.data })
        : await createSegment(parsed.data);
      toast.success(response.message, { id: `segment-save-${segment?.id ?? 'new'}` });
      onSaved();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : '', { id: `segment-save-error-${segment?.id ?? 'new'}` });
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay/80 p-4" role="dialog" aria-modal="true" aria-labelledby="superadmin-segment-editor-title">
      <form onSubmit={handleSubmit} className="w-full max-w-lg rounded-xl border border-border bg-overlay p-6 shadow-dialog">
        <div className="flex items-start justify-between gap-4">
          <div><h2 id="superadmin-segment-editor-title" className="text-lg font-semibold text-primary">{segment ? 'Edit Segment' : 'New Segment'}</h2><p className="mt-1 text-sm text-secondary">Define a reusable tenant audience rule set.</p></div>
          <button type="button" onClick={onClose} aria-label="Close segment editor" className="min-h-11 min-w-11 rounded-md p-2 text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95"><X size={18} strokeWidth={2} aria-hidden="true" /></button>
        </div>
        <div className="mt-6 space-y-4">
          <div><label htmlFor="superadmin-segment-name" className="text-sm font-medium text-secondary">Name</label><input id="superadmin-segment-name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 w-full rounded-md border border-border bg-input px-3 py-2 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" /></div>
          <div><label htmlFor="superadmin-segment-description" className="text-sm font-medium text-secondary">Description</label><textarea id="superadmin-segment-description" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 min-h-24 w-full rounded-md border border-border bg-input px-3 py-2 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" /></div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div><label htmlFor="superadmin-segment-rules" className="text-sm font-medium text-secondary">Rule count</label><input id="superadmin-segment-rules" type="number" min={1} step={1} value={rules} onChange={(e) => setRules(e.target.value)} className="mt-1 w-full rounded-md border border-border bg-input px-3 py-2 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" /></div>
            <div><label htmlFor="superadmin-segment-used-in" className="text-sm font-medium text-secondary">Used in</label><input id="superadmin-segment-used-in" value={usedIn} onChange={(e) => setUsedIn(e.target.value)} className="mt-1 w-full rounded-md border border-border bg-input px-3 py-2 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" /></div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" onClick={onClose} disabled={isSaving} className="min-h-11 rounded-md border border-border px-4 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95">Cancel</button>
          <button type="submit" disabled={isSaving || !name.trim()} className="inline-flex min-h-11 min-w-28 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-60 motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95">
            {isSaving ? <><span className="motion-safe:animate-spin" aria-hidden="true">⟳</span>Saving...</> : <><Save size={18} strokeWidth={2} aria-hidden="true" />Save</>}
          </button>
        </div>
      </form>
    </div>
  );
}
