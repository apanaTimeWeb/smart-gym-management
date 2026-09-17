// RESPONSIBILITY: Renders the create/edit form for one Superadmin tenant segment and delegates persistence to the module API.
'use client';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { Save, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { createSuperadminSegment, updateSuperadminSegment } from '@/app/superadmin/segments/segments_api/superadmin_segments_api';
import { useSuperadminUnsavedChangesGuard } from '@/app/superadmin/superadmin_utils/useSuperadminUnsavedChangesGuard';
import type { SuperadminSegmentEditorModalProps } from '@/app/superadmin/segments/segments_types/SuperadminSegmentsTypes';
export default function SuperadminSegmentEditorModal({ segment, onClose, onSaved }: SuperadminSegmentEditorModalProps) {
    const [name, setName] = useState(segment?.name ?? '');
    const [description, setDescription] = useState(segment?.description ?? '');
    const [rules, setRules] = useState(String(segment?.rules ?? 1));
    const [usedIn, setUsedIn] = useState(segment?.usedIn ?? 'Gyms');
    const [saving, setSaving] = useState(false);
    const dirty = name !== (segment?.name ?? '') || description !== (segment?.description ?? '') || rules !== String(segment?.rules ?? 1) || usedIn !== (segment?.usedIn ?? 'Gyms');
    useSuperadminUnsavedChangesGuard(dirty && !saving, 'You have unsaved changes. Are you sure you want to leave? Your changes will be lost.');
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!name.trim()) return;
        setSaving(true);
        try {
            const payload = { name: name.trim(), description: description.trim(), rules: Math.max(1, Number(rules) || 1), usedIn: usedIn.trim() || 'Gyms' };
            const response = segment ? await updateSuperadminSegment(segment.id, payload) : await createSuperadminSegment(payload);
            toast.success(response.message, { id: `segment-save-${segment?.id ?? 'new'}` });
            onSaved();
        } catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : 'Unable to save segment.', { id: `segment-save-error-${segment?.id ?? 'new'}` });
        } finally { setSaving(false); }
    };
    return <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay/80 p-4" role="dialog" aria-modal="true" aria-labelledby="superadmin-segment-editor-title">
      <form onSubmit={handleSubmit} className="w-full max-w-lg rounded-xl border border-border bg-overlay p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4"><div><h2 id="superadmin-segment-editor-title" className="text-lg font-semibold text-foreground">{segment ? 'Edit Segment' : 'New Segment'}</h2><p className="mt-1 text-sm text-secondary">Define a reusable tenant audience rule set.</p></div><button type="button" onClick={onClose} aria-label="Close segment editor" className="rounded-md p-2 text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><X size={18}/></button></div>
        <div className="mt-6 space-y-4">
          <div><label htmlFor="superadmin-segment-name" className="text-sm font-medium text-secondary">Name</label><input id="superadmin-segment-name" value={name} onChange={(e)=>setName(e.target.value)} required className="mt-1 w-full rounded-md border border-border bg-input px-3 py-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"/></div>
          <div><label htmlFor="superadmin-segment-description" className="text-sm font-medium text-secondary">Description</label><textarea id="superadmin-segment-description" value={description} onChange={(e)=>setDescription(e.target.value)} className="mt-1 min-h-24 w-full rounded-md border border-border bg-input px-3 py-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"/></div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2"><div><label htmlFor="superadmin-segment-rules" className="text-sm font-medium text-secondary">Rule count</label><input id="superadmin-segment-rules" type="number" min={1} step={1} value={rules} onChange={(e)=>setRules(e.target.value)} className="mt-1 w-full rounded-md border border-border bg-input px-3 py-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"/></div><div><label htmlFor="superadmin-segment-used-in" className="text-sm font-medium text-secondary">Used in</label><input id="superadmin-segment-used-in" value={usedIn} onChange={(e)=>setUsedIn(e.target.value)} className="mt-1 w-full rounded-md border border-border bg-input px-3 py-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"/></div></div>
        </div>
        <div className="mt-6 flex justify-end gap-2"><button type="button" onClick={onClose} className="rounded-md border border-border px-4 py-2 text-sm text-foreground">Cancel</button><button type="submit" disabled={saving || !name.trim()} className="inline-flex min-w-28 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60">{saving ? <><span className="motion-safe:animate-spin">⟳</span>Saving...</> : <><Save size={18}/>Save</>}</button></div>
      </form>
    </div>;
}
