'use client';

import React, { useState } from 'react';
import { Megaphone, Plus, Search, X } from 'lucide-react';
import { DUMMY_BROADCASTS } from '@/app/superadmin/superadmin_utils/SuperadminSharedConstants';
import { BroadcastStatus, BroadcastAudience, Broadcast } from '@/app/superadmin/superadmin_types/superadmin_types';

const getStatusBadge = (status: BroadcastStatus) => {
  switch (status) {
    case 'SENT':
      return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[var(--success-bg)] text-[var(--success)]">SENT</span>;
    case 'SCHEDULED':
      return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[var(--warning-bg)] text-[var(--warning)]">SCHEDULED</span>;
    case 'DRAFT':
    default:
      return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#1E1E2E] text-[var(--text-secondary)]">DRAFT</span>;
  }
};

export default function BroadcastsPage() {
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>(DUMMY_BROADCASTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [audience, setAudience] = useState<BroadcastAudience>('ALL_TENANTS');
  const [status, setStatus] = useState<BroadcastStatus>('DRAFT');
  const [scheduledDate, setScheduledDate] = useState('');

  const handleCreateBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newBroadcast: Broadcast = {
      id: `bc-new-${Date.now()}`,
      title,
      content,
      audience,
      status,
      scheduledDate: status === 'SCHEDULED' ? scheduledDate : null,
      sentDate: status === 'SENT' ? new Date().toISOString() : null,
    };

    setBroadcasts([newBroadcast, ...broadcasts]);
    setIsModalOpen(false);
    
    // Reset form
    setTitle('');
    setContent('');
    setAudience('ALL_TENANTS');
    setStatus('DRAFT');
    setScheduledDate('');
  };

  const filteredBroadcasts = broadcasts.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Megaphone className="w-6 h-6 text-[var(--primary)]" />
            Announcements & Broadcasts
          </h1>
          <p className="text-[14px] text-[var(--text-secondary)] mt-1">
            Push notifications and announcements to all gym dashboards.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
            <input 
              type="text" 
              placeholder="Search broadcasts..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-[var(--bg-input)] border border-[var(--border)] rounded-lg text-[14px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-focus)] transition-colors w-64"
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-medium rounded-lg transition-colors text-[14px]"
          >
            <Plus className="w-4 h-4" />
            New Broadcast
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--primary)]/5 border-b border-[var(--border)]">
                <th className="px-6 py-4 text-[12px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Title</th>
                <th className="px-6 py-4 text-[12px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Audience</th>
                <th className="px-6 py-4 text-[12px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[12px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Scheduled / Sent Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {filteredBroadcasts.map((bc) => (
                <tr key={bc.id} className="hover:bg-[var(--primary)]/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-medium text-[var(--text-primary)]">{bc.title}</span>
                      <span className="text-[12px] text-[var(--text-secondary)] truncate max-w-xs">{bc.content}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[var(--primary-subtle)] text-[var(--primary)] border border-[var(--primary)]/20">
                      {bc.audience.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(bc.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[14px] text-[var(--text-secondary)]">
                    {bc.status === 'SCHEDULED' && bc.scheduledDate ? new Date(bc.scheduledDate).toLocaleString() : ''}
                    {bc.status === 'SENT' && bc.sentDate ? new Date(bc.sentDate).toLocaleString() : ''}
                    {bc.status === 'DRAFT' && '-'}
                  </td>
                </tr>
              ))}
              {filteredBroadcasts.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-[var(--text-secondary)]">
                    <Megaphone className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p>No broadcasts found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Broadcast Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[1000] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl w-full max-w-[480px] shadow-xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-7 py-5 border-b border-[var(--border)]">
              <h2 className="text-[18px] font-bold text-[var(--text-primary)]">New Broadcast</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleCreateBroadcast} className="flex flex-col p-7 gap-5 overflow-y-auto max-h-[70vh] custom-scrollbar">
              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] font-bold text-[var(--text-secondary)]">Broadcast Title <span className="text-[var(--danger)]">*</span></label>
                <input 
                  type="text" 
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border)] rounded-lg text-[14px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-focus)] transition-colors"
                  placeholder="e.g. Scheduled Maintenance"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] font-bold text-[var(--text-secondary)]">Message Content <span className="text-[var(--danger)]">*</span></label>
                <textarea 
                  required
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border)] rounded-lg text-[14px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-focus)] transition-colors resize-none"
                  placeholder="Write your announcement here..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[14px] font-bold text-[var(--text-secondary)]">Audience <span className="text-[var(--danger)]">*</span></label>
                  <select 
                    value={audience}
                    onChange={(e) => setAudience(e.target.value as BroadcastAudience)}
                    className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border)] rounded-lg text-[14px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-focus)] transition-colors appearance-none"
                  >
                    <option value="ALL_TENANTS">All Tenants</option>
                    <option value="PRO_ONLY">Pro Plan Only</option>
                    <option value="SUSPENDED_ONLY">Suspended Only</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[14px] font-bold text-[var(--text-secondary)]">Status <span className="text-[var(--danger)]">*</span></label>
                  <select 
                    value={status}
                    onChange={(e) => setStatus(e.target.value as BroadcastStatus)}
                    className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border)] rounded-lg text-[14px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-focus)] transition-colors appearance-none"
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="SCHEDULED">Scheduled</option>
                    <option value="SENT">Send Now</option>
                  </select>
                </div>
              </div>

              {status === 'SCHEDULED' && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-[14px] font-bold text-[var(--text-secondary)]">Scheduled Date & Time <span className="text-[var(--danger)]">*</span></label>
                  <input 
                    type="datetime-local" 
                    required
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border)] rounded-lg text-[14px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-focus)] transition-colors"
                  />
                </div>
              )}

              <div className="flex justify-end gap-3 mt-2 pt-5 border-t border-[var(--border)]">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-transparent border border-[var(--border)] hover:bg-[var(--border)] text-[var(--text-primary)] font-medium rounded-lg transition-colors text-[14px]"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2.5 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-medium rounded-lg transition-colors text-[14px]"
                >
                  Save Broadcast
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
