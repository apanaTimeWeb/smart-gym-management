// RESPONSIBILITY: Renders the Product Management page — feature flag toggles and release note publishing.
'use client';
import { formatDate } from '@/lib/formatters';
// Fetches data via useSuperadminFeaturesData hook. Mutations (toggle, publish) dispatched from here.
// No raw API calls — all async state goes through the hook (Rule 6).
//
// DATA FLOW: featuresApi → useSuperadminFeaturesData → SuperadminFeaturesClient → FeatureFlags/ReleaseNotes JSX
import { useSuperadminFeaturesData } from '@/app/superadmin/features/features_utils/useSuperadminFeaturesData';
import { ToggleLeft, Send, Search, Users, Clock } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUnsavedChangesGuard } from '@/hooks/useUnsavedChangesGuard';
import type { FeatureFlag, ReleaseNote } from '@/app/superadmin/features/features_types/SuperadminFeaturesTypes';
import toast from 'react-hot-toast';
import { useSuperadminConfirm } from '@/app/superadmin/superadmin_layout/SuperadminFeedback/SuperadminConfirmProvider';
import { releaseNoteSchema } from '@/app/superadmin/features/features_types/SuperadminFeaturesUiTypes';
import type { FeaturesTab, ReleaseNoteFormValues } from '@/app/superadmin/features/features_types/SuperadminFeaturesUiTypes';
import SuperadminFeatureRolloutModal from '@/app/superadmin/features/features_components/SuperadminFeatureRolloutModal';
import SuperadminFeatureHistoryModal from '@/app/superadmin/features/features_components/SuperadminFeatureHistoryModal';
export default function SuperadminFeaturesClient() {
    const [activeTab, setActiveTab] = useState<FeaturesTab>('FLAGS');
    const [rolloutFlag, setRolloutFlag] = useState<FeatureFlag | null>(null);
    const [historyFlag, setHistoryFlag] = useState<FeatureFlag | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<ReleaseNoteFormValues>({
        resolver: zodResolver(releaseNoteSchema),
        defaultValues: { version: '', title: '', content: '' }
    });
    useUnsavedChangesGuard(isDirty && activeTab === 'NOTES', 'You have an unsaved release note. Discard?');
    const { confirm } = useSuperadminConfirm();
    const { data, isPending, error, updateFeatureFlagStatus, updateFlag, publishNote, isPublishing } = useSuperadminFeaturesData();
    const onPublishNote = async (formData: ReleaseNoteFormValues) => {
        const confirmed = await confirm({ title: 'Publish Release Note', message: 'Publish this release note to all tenant owners and admins?', type: 'warning', confirmText: 'Publish', cancelText: 'Cancel' });
        if (!confirmed) return;
        const response = await publishNote({ data: { ...formData, isPublished: true, date: new Date().toISOString() }, idempotencyKey: crypto.randomUUID() });
        if (response.data) { reset(); toast.success(response.message, { id: 'release-note-published-successfully' }); }
    };
    if (isPending)
        return (<div className="space-y-4 motion-safe:animate-pulse">
      <div className="h-8 w-64 bg-skeleton-base rounded"/>
      <div className="h-96 bg-skeleton-base rounded-xl border border-border"/>
    </div>);
    if (error || !data)
        return <div className="p-8 text-center text-danger font-medium">{error instanceof Error ? error.message : String(error)}</div>;
    const { flags, notes } = data;
    const filteredFlags = flags.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const handleToggle = async (flag: FeatureFlag) => {
        const nextEnabledState = !flag.isGlobalEnabled;
        const confirmed = await confirm({ title: nextEnabledState ? 'Enable Feature Flag' : 'Suspend Feature Flag', message: nextEnabledState ? `Enable ${flag.name} globally?` : `Suspend ${flag.name} globally?`, type: 'warning', confirmText: nextEnabledState ? 'Enable' : 'Suspend', cancelText: 'Cancel' });
        if (!confirmed) return;
        try {
            const res = await updateFeatureFlagStatus({ id: flag.id, enabled: nextEnabledState, idempotencyKey: crypto.randomUUID() });
            toast.success(res.message, { id: `feature-flag-status-${flag.id}` });
        }
        catch (e: unknown) {
            const errorMsg = e instanceof Error ? e.message : String(e);
            toast.error(errorMsg, { id: `feature-flag-status-error-${flag.id}` });
        }
    };
    const handleSaveRollout = async (tenantIds: string[]) => {
        if (!rolloutFlag)
            return;
        try {
            const res = await updateFlag({ id: rolloutFlag.id, body: { enabledTenantIds: tenantIds }, idempotencyKey: crypto.randomUUID() });
            toast.success(res.message, { id: 'canary-rollout-updated-successfully' });
        }
        catch (e: unknown) {
            const errorMsg = e instanceof Error ? e.message : String(e);
            toast.error(errorMsg, { id: 'failed-to-update-canary-rollout' });
        }
    };
    /** Named handlers for tab switching — Rule 52: no inline arrow functions on event handlers */
    function handleShowFlagsTab() { setActiveTab('FLAGS'); }
    function handleShowNotesTab() { setActiveTab('NOTES'); }
    return (<div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Product Management</h1>
          <p className="text-secondary mt-1">Control feature rollout and publish release notes to gyms.</p>
        </div>
        <div className="flex bg-input p-1 rounded-lg border border-border">
          <button onClick={handleShowFlagsTab} className={`px-4 py-2 rounded-md text-sm font-medium motion-safe:transition-colors ${activeTab === 'FLAGS' ? 'bg-card text-primary shadow-card' : 'text-secondary hover:text-primary'}`}>
            Feature Flags
          </button>
          <button onClick={handleShowNotesTab} className={`px-4 py-2 rounded-md text-sm font-medium motion-safe:transition-colors ${activeTab === 'NOTES' ? 'bg-card text-primary shadow-card' : 'text-secondary hover:text-primary'}`}>
            Release Notes
          </button>
        </div>
      </div>

      {activeTab === 'FLAGS' && (<div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h2 className="text-lg font-bold text-primary flex items-center gap-2">
              <ToggleLeft className="text-primary"/> Global Feature Flags
            </h2>
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary"/>
              <input type="text" placeholder="Search flags..." className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-primary" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            </div>
          </div>
          <div className="divide-y divide-border">
            {filteredFlags.map((flag: FeatureFlag) => (<div key={flag.id} className="p-6 flex items-center justify-between hover:bg-input motion-safe:transition-colors">
                <div>
                  <h3 className="text-primary font-bold mb-1">{flag.name}</h3>
                  <p className="text-sm text-secondary">{flag.description}</p>
                  
                  {!flag.isGlobalEnabled && (<div className="mt-3 flex items-center gap-4">
                      {flag.enabledTenantIds.length > 0 && (<div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-warning bg-warning/10 px-2 py-0.5 rounded">BETA OVERRIDE</span>
                          <span className="text-xs text-secondary">Enabled for {flag.enabledTenantIds.length} specific gyms</span>
                        </div>)}
                      <button onClick={() => setRolloutFlag(flag)} className="text-xs flex items-center gap-1.5 text-primary hover:text-primary-hover font-semibold motion-safe:transition-colors">
                        <Users className="w-3.5 h-3.5"/>
                        Manage Rollout
                      </button>
                    </div>)}
                  {flag.isGlobalEnabled && (<div className="mt-3 flex items-center gap-4">
                      <span className="text-xs text-secondary">Manage Rollout from the action above.</span>
                    </div>)}
                  <button onClick={() => setHistoryFlag(flag)} className="mt-2 text-xs flex items-center gap-1.5 text-secondary hover:text-primary font-semibold motion-safe:transition-colors">
                    <Clock className="w-3.5 h-3.5"/>
                    View History
                  </button>
                </div>
                <div className="flex flex-col items-end">
                  <button type="button" aria-label={`Toggle ${flag.name}`} onClick={() => void handleToggle(flag)} className={`w-12 h-6 rounded-full relative cursor-pointer motion-safe:transition-colors ${flag.isGlobalEnabled ? 'bg-success' : 'bg-border'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-card rounded-full motion-safe:transition-all ${flag.isGlobalEnabled ? 'right-1' : 'left-1'}`}></div>
                  </button>
                  <span className="text-xs font-medium mt-2 text-secondary">
                    {flag.isGlobalEnabled ? 'Globally Enabled' : 'Globally Disabled'}
                  </span>
                </div>
              </div>))}
          </div>
        </div>)}

      {activeTab === 'NOTES' && (<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {notes.map((note: ReleaseNote) => (<div key={note.id} className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="bg-primary/10 text-primary px-2.5 py-1 rounded-md text-xs font-bold border border-primary/20">
                      {note.version}
                    </span>
                    <h3 className="text-lg font-bold text-primary">{note.title}</h3>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${note.isPublished ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                    {note.isPublished ? 'PUBLISHED' : 'DRAFT'}
                  </span>
                </div>
                <p className="text-secondary text-sm mb-4 leading-relaxed">{note.content}</p>
                <div className="text-xs text-disabled font-medium">
                  {note.isPublished ? `Published on ${formatDate(note.date)}` : 'Not visible to gyms yet'}
                </div>
              </div>))}
          </div>
          
          <div>
            <form onSubmit={handleSubmit(onPublishNote)} className="bg-card border border-border rounded-xl p-6 sticky top-24">
              <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                <Send className="w-5 h-5 text-primary"/> Compose Release Note
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-secondary mb-1 block">Version Tag</label>
                  <input type="text" placeholder="e.g. v2.6.1" {...register('version')} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-primary"/>
                  {errors.version && <p className="text-xs text-danger mt-1">{errors.version.message}</p>}
                </div>
                <div>
                  <label className="text-xs font-medium text-secondary mb-1 block">Title</label>
                  <input type="text" placeholder="Feature announcement..." {...register('title')} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-primary"/>
                  {errors.title && <p className="text-xs text-danger mt-1">{errors.title.message}</p>}
                </div>
                <div>
                  <label className="text-xs font-medium text-secondary mb-1 block">Content (Markdown supported)</label>
                  <textarea rows={5} {...register('content')} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-primary resize-none" placeholder="We just shipped..."></textarea>
                  {errors.content && <p className="text-xs text-danger mt-1">{errors.content.message}</p>}
                </div>
                <button type="submit" disabled={isPublishing} className="w-full bg-primary text-on-primary py-2.5 rounded-lg font-medium hover:bg-primary-hover motion-safe:transition-colors disabled:opacity-70">
                  {isPublishing ? 'Publishing...' : 'Publish to All Gyms'}
                </button>
              </div>
            </form>
          </div>
        </div>)}

      <SuperadminFeatureRolloutModal isOpen={!!rolloutFlag} onClose={() => setRolloutFlag(null)} flag={rolloutFlag} onSaveRollout={handleSaveRollout}/>

      <SuperadminFeatureHistoryModal isOpen={!!historyFlag} onClose={() => setHistoryFlag(null)} flag={historyFlag}/>
    </div>);
}
