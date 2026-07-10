'use client';

import { DUMMY_FEATURE_FLAGS, DUMMY_RELEASE_NOTES } from '@/app/superadmin/superadmin_utils/SuperadminSharedConstants';
import { ToggleLeft, Send, Search } from 'lucide-react';
import { useState } from 'react';

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState<'FLAGS' | 'NOTES'>('FLAGS');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Product Management</h1>
          <p className="text-[var(--text-secondary)] mt-1">Control feature rollout and publish release notes to gyms.</p>
        </div>
        <div className="flex bg-[var(--bg-input)] p-1 rounded-lg border border-[var(--border)]">
          <button 
            onClick={() => setActiveTab('FLAGS')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'FLAGS' ? 'bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
          >
            Feature Flags
          </button>
          <button 
            onClick={() => setActiveTab('NOTES')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'NOTES' ? 'bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
          >
            Release Notes
          </button>
        </div>
      </div>

      {activeTab === 'FLAGS' && (
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[var(--border)] flex items-center justify-between">
            <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
              <ToggleLeft className="text-[var(--primary)]" /> Global Feature Flags
            </h2>
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" />
              <input type="text" placeholder="Search flags..." className="w-full pl-9 pr-4 py-2 bg-[var(--bg-input)] border border-[var(--border)] rounded-lg text-sm" />
            </div>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {DUMMY_FEATURE_FLAGS.map(flag => (
              <div key={flag.id} className="p-6 flex items-center justify-between hover:bg-[var(--bg-input)] transition-colors">
                <div>
                  <h3 className="text-[var(--text-primary)] font-bold mb-1">{flag.name}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{flag.description}</p>
                  
                  {!flag.isGlobalEnabled && flag.enabledTenantIds.length > 0 && (
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs font-bold text-[var(--warning)] bg-[var(--warning)]/10 px-2 py-0.5 rounded">BETA OVERRIDE</span>
                      <span className="text-xs text-[var(--text-secondary)]">Enabled for {flag.enabledTenantIds.length} specific gyms</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end">
                  <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${flag.isGlobalEnabled ? 'bg-[var(--success)]' : 'bg-[var(--border)]'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${flag.isGlobalEnabled ? 'right-1' : 'left-1'}`}></div>
                  </div>
                  <span className="text-xs font-medium mt-2 text-[var(--text-secondary)]">
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
              <div key={note.id} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="bg-[var(--primary)]/10 text-[var(--primary)] px-2.5 py-1 rounded-md text-xs font-bold border border-[var(--primary)]/20">
                      {note.version}
                    </span>
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">{note.title}</h3>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${note.isPublished ? 'bg-[var(--success)]/10 text-[var(--success)]' : 'bg-[var(--warning)]/10 text-[var(--warning)]'}`}>
                    {note.isPublished ? 'PUBLISHED' : 'DRAFT'}
                  </span>
                </div>
                <p className="text-[var(--text-secondary)] text-sm mb-4 leading-relaxed">{note.content}</p>
                <div className="text-xs text-[var(--text-disabled)] font-medium">
                  {note.isPublished ? `Published on ${new Date(note.date).toLocaleDateString()}` : 'Not visible to gyms yet'}
                </div>
              </div>
            ))}
          </div>
          
          <div>
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 sticky top-24">
              <h3 className="font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <Send size={18} className="text-[var(--primary)]" /> Compose Release Note
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-[var(--text-secondary)] mb-1 block">Version Tag</label>
                  <input type="text" placeholder="e.g. v2.6.1" className="w-full bg-[var(--bg-input)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)]" />
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--text-secondary)] mb-1 block">Title</label>
                  <input type="text" placeholder="Feature announcement..." className="w-full bg-[var(--bg-input)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)]" />
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--text-secondary)] mb-1 block">Content (Markdown supported)</label>
                  <textarea rows={5} className="w-full bg-[var(--bg-input)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] resize-none" placeholder="We just shipped..."></textarea>
                </div>
                <button className="w-full bg-[var(--primary)] text-white py-2.5 rounded-lg font-medium hover:bg-[var(--primary-hover)] transition-colors">
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
