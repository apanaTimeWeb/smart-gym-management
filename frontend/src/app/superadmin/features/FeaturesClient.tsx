'use client';

import { useSuperadminData } from '@/app/superadmin/superadmin_utils/useSuperadminData';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { ToggleLeft, Send, Search } from 'lucide-react';
import { useState } from 'react';
import { FeatureFlag, ReleaseNote } from '@/app/superadmin/superadmin_types/superadmin_types';

export default function FeaturesClient() {
  const [activeTab, setActiveTab] = useState<'FLAGS' | 'NOTES'>('FLAGS');
  const { data, loading, error } = useSuperadminData<{ flags: FeatureFlag[], notes: ReleaseNote[] }>(SuperadminUrlConfig.BACKEND_API.FEATURES_BASE);

  if (loading) return <div className="p-8 text-center text-disabled">Loading...</div>;
  if (error || !data) return <div className="p-8 text-center text-destructive">Error loading data.</div>;

  const { flags: DUMMY_FEATURE_FLAGS, notes: DUMMY_RELEASE_NOTES } = data;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Product Management</h1>
          <p className="text-secondary mt-1">Control feature rollout and publish release notes to gyms.</p>
        </div>
        <div className="flex bg-input p-1 rounded-lg border border-border">
          <button 
            onClick={() => setActiveTab('FLAGS')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'FLAGS' ? 'bg-card text-foreground shadow-sm' : 'text-secondary hover:text-foreground'}`}
          >
            Feature Flags
          </button>
          <button 
            onClick={() => setActiveTab('NOTES')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'NOTES' ? 'bg-card text-foreground shadow-sm' : 'text-secondary hover:text-foreground'}`}
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
              <input type="text" placeholder="Search flags..." className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm" />
            </div>
          </div>
          <div className="divide-y divide-border">
            {DUMMY_FEATURE_FLAGS.map(flag => (
              <div key={flag.id} className="p-6 flex items-center justify-between hover:bg-input transition-colors">
                <div>
                  <h3 className="text-foreground font-bold mb-1">{flag.name}</h3>
                  <p className="text-sm text-secondary">{flag.description}</p>
                  
                  {!flag.isGlobalEnabled && flag.enabledTenantIds.length > 0 && (
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs font-bold text-warning bg-warning/10 px-2 py-0.5 rounded">BETA OVERRIDE</span>
                      <span className="text-xs text-secondary">Enabled for {flag.enabledTenantIds.length} specific gyms</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end">
                  <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${flag.isGlobalEnabled ? 'bg-success' : 'bg-border'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${flag.isGlobalEnabled ? 'right-1' : 'left-1'}`}></div>
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
            {DUMMY_RELEASE_NOTES.map(note => (
              <div key={note.id} className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
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
            <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Send size={18} className="text-primary" /> Compose Release Note
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-secondary mb-1 block">Version Tag</label>
                  <input type="text" placeholder="e.g. v2.6.1" className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground" />
                </div>
                <div>
                  <label className="text-xs font-medium text-secondary mb-1 block">Title</label>
                  <input type="text" placeholder="Feature announcement..." className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground" />
                </div>
                <div>
                  <label className="text-xs font-medium text-secondary mb-1 block">Content (Markdown supported)</label>
                  <textarea rows={5} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground resize-none" placeholder="We just shipped..."></textarea>
                </div>
                <button className="w-full bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-primary-hover transition-colors">
                  Publish to All Gyms
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
