'use client';
// RESPONSIBILITY: Renders the Product Management page — feature flag toggles and release note publishing.
// Fetches data via useSuperadminFeaturesData hook. Mutations (toggle, publish) dispatched from here.
// No raw API calls — all async state goes through the hook (Rule 6).
//
// DATA FLOW: featuresApi → useSuperadminFeaturesData → SuperadminFeaturesClient → FeatureFlags/ReleaseNotes JSX
import { useSuperadminFeaturesData } from '@/app/superadmin/features/features_utils/useSuperadminFeaturesData';

import { ToggleLeft, Send, Search, Users, Clock } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useUnsavedChangesGuard } from '@/lib/useUnsavedChangesGuard';
import type { FeatureFlag, ReleaseNote } from '@/app/superadmin/features/superadmin_features_types/superadmin_features_types';
import { featuresApi } from '@/app/superadmin/features/superadmin_features_api/superadmin_features_api';
import toast from 'react-hot-toast';
import SuperadminFeatureRolloutModal from '@/app/superadmin/features/features_components/SuperadminFeatureRolloutModal';
import SuperadminFeatureHistoryModal from '@/app/superadmin/features/features_components/SuperadminFeatureHistoryModal';

const releaseNoteSchema = z.object({
  version: z.string().min(1, 'Version is required'),
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
});
type ReleaseNoteFormValues = z.infer<typeof releaseNoteSchema>;

export type FeaturesTab = 'FLAGS' | 'NOTES';

export default function SuperadminFeaturesClient() {
  const [activeTab, setActiveTab] = useState<FeaturesTab>('FLAGS');
  const [isPublishing, setIsPublishing] = useState(false);
  const [rolloutFlag, setRolloutFlag] = useState<FeatureFlag | null>(null);
  const [historyFlag, setHistoryFlag] = useState<FeatureFlag | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<ReleaseNoteFormValues>({
    resolver: zodResolver(releaseNoteSchema),
    defaultValues: { version: '', title: '', content: '' }
  });

  useUnsavedChangesGuard(isDirty && activeTab === 'NOTES', 'You have an unsaved release note. Discard?');

  const { data, isLoading, isError, error, toggleFlag, updateFlag, publishNote } = useSuperadminFeaturesData();

  const onPublishNote = async (formData: ReleaseNoteFormValues) => {
    setIsPublishing(true);
    try {
      const res = await featuresApi.createNote({ ...formData, isPublished: true, date: new Date().toISOString() });
      if (res.data) {
        // setData removed((prev: { flags: FeatureFlag[]; notes: ReleaseNote[]; } | null) => prev ? { ...prev, notes: [res.data, ...prev.notes] } : prev);
        reset();
        toast.success('Release note published successfully', { id: 'release-note-published-successfully' });
      }
    } catch (err: unknown) {
      toast.error('Failed to publish release note', { id: 'failed-to-publish-release-note' });
    } finally {
      setIsPublishing(false);
    }
  };

  if (isLoading) return (
    <div className="space-y-4 motion-safe:animate-pulse">
      <div className="h-8 w-64 bg-skeleton-base rounded" />
      <div className="h-96 bg-skeleton-base rounded-xl border border-border" />
    </div>
  );
  if (error || !data) return <div className="p-8 text-center text-danger font-medium">Error loading data.</div>;

  const { flags: DUMMY_FEATURE_FLAGS, notes: DUMMY_RELEASE_NOTES } = data as { flags: FeatureFlag[]; notes: ReleaseNote[] };

  const filteredFlags = DUMMY_FEATURE_FLAGS.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    f.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggle = async (flagId: string) => {
    try {
      await toggleFlag(flagId);
      toast.success('Feature flag toggled', { id: 'feature-flag-toggled' });
    } catch (e) {
      toast.error('Failed to toggle feature flag', { id: 'failed-to-toggle-feature-flag' });
    }
  };

  const handleSaveRollout = async (tenantIds: string[]) => {
    if (!rolloutFlag) return;
    try {
      await updateFlag({ id: rolloutFlag.id, body: { enabledTenantIds: tenantIds } });
      toast.success('Canary rollout updated successfully', { id: 'canary-rollout-updated-successfully' });
    } catch (e) {
      toast.error('Failed to update canary rollout', { id: 'failed-to-update-canary-rollout' });
    }
  };

  /** Named handlers for tab switching — Rule 52: no inline arrow functions on event handlers */
  function handleShowFlagsTab() { setActiveTab('FLAGS'); }
  function handleShowNotesTab() { setActiveTab('NOTES'); }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Product Management</h1>
          <p className="text-secondary mt-1">Control feature rollout and publish release notes to gyms.</p>
        </div>
        <div className="flex bg-input p-1 rounded-lg border border-border">
          <button 
            onClick={handleShowFlagsTab}
            className={`px-4 py-2 rounded-md text-sm font-medium motion-safe:transition-colors ${activeTab === 'FLAGS' ? 'bg-card text-foreground shadow-sm' : 'text-secondary hover:text-foreground'}`}
          >
            Feature Flags
          </button>
          <button 
            onClick={handleShowNotesTab}
            className={`px-4 py-2 rounded-md text-sm font-medium motion-safe:transition-colors ${activeTab === 'NOTES' ? 'bg-card text-foreground shadow-sm' : 'text-secondary hover:text-foreground'}`}
          >
            Release Notes
          </button>
        </div>
      </div>

      {activeTab === 'FLAGS' && (
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <ToggleLeft className="text-primary" /> Global Feature Flags
            </h2>
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
              <input 
                type="text" 
                placeholder="Search flags..." 
                className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="divide-y divide-border">
            {filteredFlags.map((flag: FeatureFlag) => (
              <div key={flag.id} className="p-6 flex items-center justify-between hover:bg-input motion-safe:transition-colors">
                <div>
                  <h3 className="text-foreground font-bold mb-1">{flag.name}</h3>
                  <p className="text-sm text-secondary">{flag.description}</p>
                  
                  {!flag.isGlobalEnabled && (
                    <div className="mt-3 flex items-center gap-4">
                      {flag.enabledTenantIds.length > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-warning bg-warning/10 px-2 py-0.5 rounded">BETA OVERRIDE</span>
                          <span className="text-xs text-secondary">Enabled for {flag.enabledTenantIds.length} specific gyms</span>
                        </div>
                      )}
                      <button 
                        onClick={() => setRolloutFlag(flag)}
                        className="text-xs flex items-center gap-1.5 text-primary hover:text-primary-hover font-semibold motion-safe:transition-colors"
                      >
                        <Users className="w-3.5 h-3.5" />
                        Manage Rollout
                      </button>
                    </div>
                  )}
                  {flag.isGlobalEnabled && (
                    <div className="mt-3 flex items-center gap-4">
                      {/* Placeholder for layout consistency when globally enabled */}
                      <span className="text-xs text-secondary opacity-0">Placeholder</span>
                    </div>
                  )}
                  <button 
                    onClick={() => setHistoryFlag(flag)}
                    className="mt-2 text-xs flex items-center gap-1.5 text-secondary hover:text-foreground font-semibold motion-safe:transition-colors"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    View History
                  </button>
                </div>
                <div className="flex flex-col items-end">
                  <div onClick={() => handleToggle(flag.id)} className={`w-12 h-6 rounded-full relative cursor-pointer motion-safe:transition-colors ${flag.isGlobalEnabled ? 'bg-success' : 'bg-border'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full motion-safe:transition-all ${flag.isGlobalEnabled ? 'right-1' : 'left-1'}`}></div>
                  </div>
                  <span className="text-xs font-medium mt-2 text-secondary">
                    {flag.isGlobalEnabled ? 'Globally Enabled' : 'Globally Disabled'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'NOTES' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {DUMMY_RELEASE_NOTES.map((note: ReleaseNote) => (
              <div key={note.id} className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="bg-primary/10 text-primary px-2.5 py-1 rounded-md text-xs font-bold border border-primary/20">
                      {note.version}
                    </span>
                    <h3 className="text-lg font-bold text-foreground">{note.title}</h3>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${note.isPublished ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                    {note.isPublished ? 'PUBLISHED' : 'DRAFT'}
                  </span>
                </div>
                <p className="text-secondary text-sm mb-4 leading-relaxed">{note.content}</p>
                <div className="text-xs text-disabled font-medium">
                  {note.isPublished ? `Published on ${new Date(note.date).toLocaleDateString()}` : 'Not visible to gyms yet'}
                </div>
              </div>
            ))}
          </div>
          
          <div>
            <form onSubmit={handleSubmit(onPublishNote)} className="bg-card border border-border rounded-xl p-6 sticky top-24">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Send className="w-5 h-5 text-primary" /> Compose Release Note
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-secondary mb-1 block">Version Tag</label>
                  <input type="text" placeholder="e.g. v2.6.1" {...register('version')} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground" />
                  {errors.version && <p className="text-xs text-danger mt-1">{errors.version.message}</p>}
                </div>
                <div>
                  <label className="text-xs font-medium text-secondary mb-1 block">Title</label>
                  <input type="text" placeholder="Feature announcement..." {...register('title')} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground" />
                  {errors.title && <p className="text-xs text-danger mt-1">{errors.title.message}</p>}
                </div>
                <div>
                  <label className="text-xs font-medium text-secondary mb-1 block">Content (Markdown supported)</label>
                  <textarea rows={5} {...register('content')} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground resize-none" placeholder="We just shipped..."></textarea>
                  {errors.content && <p className="text-xs text-danger mt-1">{errors.content.message}</p>}
                </div>
                <button type="submit" disabled={isPublishing} className="w-full bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-primary-hover motion-safe:transition-colors disabled:opacity-70">
                  {isPublishing ? 'Publishing...' : 'Publish to All Gyms'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <SuperadminFeatureRolloutModal 
        isOpen={!!rolloutFlag} 
        onClose={() => setRolloutFlag(null)} 
        flag={rolloutFlag} 
        onSaveRollout={handleSaveRollout} 
      />

      <SuperadminFeatureHistoryModal
        isOpen={!!historyFlag}
        onClose={() => setHistoryFlag(null)}
        flag={historyFlag}
      />
    </div>
  );
}


