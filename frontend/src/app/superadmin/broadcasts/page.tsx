'use client';

import React from 'react';
import { Megaphone, Plus, Search } from 'lucide-react';
import { BroadcastStatus } from '@/app/superadmin/superadmin_types/superadmin_types';
import { useBroadcastsPage } from '../superadmin_utils/hooks/useBroadcastsPage';
import { SuperadminBroadcastModal } from '../superadmin_components/Broadcasts/SuperadminBroadcastModal';
import { toast } from 'react-hot-toast';

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
  const {
    broadcasts,
    searchQuery,
    setSearchQuery,
    isModalOpen,
    setIsModalOpen,
    form,
    handleCreateBroadcast
  , loading, error} = useBroadcastsPage();

  if (loading) return <div className="p-8 text-center text-[var(--text-disabled)]">Loading...</div>;
  if (error) return <div className="p-8 text-center text-[var(--danger)]">Error loading data.</div>;

  const handleRowClick = (title: string) => {
    toast(`Clicked on broadcast: ${title}`);
  };

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
              {broadcasts.map((bc) => (
                <tr 
                  key={bc.id} 
                  className="hover:bg-[var(--primary)]/5 transition-colors group cursor-pointer"
                  onClick={() => handleRowClick(bc.title)}
                >
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
              {broadcasts.length === 0 && (
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

      <SuperadminBroadcastModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        form={form}
        onSubmit={handleCreateBroadcast}
      />
    </div>
  );
}
