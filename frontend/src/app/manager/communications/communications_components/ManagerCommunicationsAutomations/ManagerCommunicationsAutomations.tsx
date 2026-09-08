// RESPONSIBILITY: Renders the Automations tab in Communications, allowing managers to enable/disable and configure automated background triggers like Birthday and Anniversary messages.
'use client';

import { useState } from 'react';
import { Loader2, Zap, Settings, MessageSquare, Clock } from 'lucide-react';
import type { CommAutomation } from '@/app/manager/communications/communications_types/communications_types';
import { useManagerCommunicationsLogic } from '@/app/manager/communications/communications_context/useManagerCommunicationsLogic';

export default function ManagerCommunicationsAutomations() {
  const { automations, automationsLoading, updateAutomation, isUpdatingAutomation } = useManagerCommunicationsLogic();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftMessage, setDraftMessage] = useState('');
  const [draftTime, setDraftTime] = useState('');

  if (automationsLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-secondary">
        <Loader2 size={32} className="motion-safe:animate-spin mb-4 text-primary" />
        <p className="text-sm font-medium">Loading Automations...</p>
      </div>
    );
  }

  const handleToggle = (auto: CommAutomation) => {
    updateAutomation(auto.id, { enabled: !auto.enabled });
  };

  const startEditing = (auto: CommAutomation) => {
    setEditingId(auto.id);
    setDraftMessage(auto.messageTemplate);
    setDraftTime(auto.sendTime);
  };

  const saveEditing = (id: string) => {
    updateAutomation(id, { messageTemplate: draftMessage, sendTime: draftTime });
    setEditingId(null);
  };

  return (
    <div className="space-y-6 motion-safe:animate-in motion-safe:fade-in duration-500">
      
      {/* Header Panel */}
      <div className="bg-card border border-border rounded-xl p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Zap size={20} className="text-warning fill-warning/20" />
            Automated Triggers
          </h2>
          <p className="text-sm text-secondary mt-1">
            Set up automated WhatsApp messages for recurring member events like birthdays and anniversaries.
          </p>
        </div>
      </div>

      {/* Grid of Automation Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {automations.map((auto) => {
          const isEditing = editingId === auto.id;

          return (
            <div key={auto.id} className={`bg-card border rounded-xl overflow-hidden motion-safe:transition-colors ${auto.enabled ? 'border-primary/30' : 'border-border'}`}>
              
              {/* Card Header */}
              <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-input/20">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${auto.enabled ? 'bg-primary/10 text-primary' : 'bg-input text-secondary'}`}>
                    <Zap size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">{auto.title}</h3>
                    <p className="text-xs text-secondary mt-0.5">{auto.description}</p>
                  </div>
                </div>
                
                {/* Toggle Switch */}
                <button
                  onClick={() => handleToggle(auto)}
                  disabled={isUpdatingAutomation}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    auto.enabled ? 'bg-primary' : 'bg-input border border-border'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white motion-safe:transition-transform ${
                      auto.enabled ? 'translate-x-6' : 'translate-x-1 bg-disabled'
                    }`}
                  />
                </button>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4">
                
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="flex items-center gap-2 text-xs font-semibold text-secondary uppercase tracking-wider mb-2">
                        <Clock size={14} /> Send Time
                      </label>
                      <input
                        type="time"
                        value={draftTime}
                        onChange={(e) => setDraftTime(e.target.value)}
                        className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-xs font-semibold text-secondary uppercase tracking-wider mb-2">
                        <MessageSquare size={14} /> WhatsApp Template
                      </label>
                      <textarea
                        value={draftMessage}
                        onChange={(e) => setDraftMessage(e.target.value)}
                        rows={4}
                        className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                      />
                      <p className="text-xs text-secondary mt-1">Use <code className="text-primary font-mono">{'{name}'}</code> to personalize.</p>
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-4 py-2 text-sm font-semibold text-secondary hover:text-foreground motion-safe:transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => saveEditing(auto.id)}
                        disabled={isUpdatingAutomation}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-black rounded-lg text-sm font-bold hover:bg-primary-hover motion-safe:transition-colors disabled:opacity-50"
                      >
                        {isUpdatingAutomation ? <Loader2 size={16} className="motion-safe:animate-spin" /> : 'Save Changes'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 opacity-80 hover:opacity-100 motion-safe:transition-opacity">
                    <div>
                      <label className="flex items-center gap-2 text-[11px] font-semibold text-secondary uppercase tracking-wider mb-1">
                        <Clock size={14} /> Send Time
                      </label>
                      <p className="text-sm font-medium text-foreground">{auto.sendTime}</p>
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-[11px] font-semibold text-secondary uppercase tracking-wider mb-1">
                        <MessageSquare size={14} /> WhatsApp Template
                      </label>
                      <div className="bg-input/50 border border-border rounded-lg p-3 text-sm text-secondary italic">
                        "{auto.messageTemplate}"
                      </div>
                    </div>
                    <div className="pt-2">
                      <button
                        onClick={() => startEditing(auto)}
                        className="flex items-center gap-2 text-xs font-semibold text-primary hover:text-primary-hover motion-safe:transition-colors focus-visible:outline-none"
                      >
                        <Settings size={14} /> Edit Configuration
                      </button>
                    </div>
                  </div>
                )}
                
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
