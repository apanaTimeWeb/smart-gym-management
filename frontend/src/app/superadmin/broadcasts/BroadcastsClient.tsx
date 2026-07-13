// RESPONSIBILITY: BroadcastsClient.tsx handles the logic and UI for its corresponding feature.
'use client';

import React from 'react';
import { Megaphone, Plus, Search, Edit2, Trash2, Send } from 'lucide-react';
import { BroadcastStatus } from '@/app/superadmin/superadmin_types/superadmin_types';
import { useBroadcastsPage } from '@/app/superadmin/superadmin_utils/hooks/useBroadcastsPage';
import { SuperadminBroadcastModal } from '@/app/superadmin/broadcasts/broadcasts_components/SuperadminBroadcastModal';
import { toast } from 'react-hot-toast';

const getStatusBadge = (status: BroadcastStatus) => {
  switch (status) {
    case 'SENT':
      return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-success-bg text-success">SENT</span>;
    case 'SCHEDULED':
      return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-warning-bg text-warning">SCHEDULED</span>;
    case 'DRAFT':
    default:
      return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-input text-secondary">DRAFT</span>;
  }
};

export default function BroadcastsClient() {
  const {
    broadcasts,
    searchQuery,
    setSearchQuery,
    isModalOpen,
    setIsModalOpen,
    form,
    handleCreateBroadcast,
    handleDeleteBroadcast,
    handleSendBroadcast,
    openEditModal,
    openCreateModal,
    editingId,
    fetchState,
    error,
  } = useBroadcastsPage();

  if (fetchState === 'loading') return <div className="p-8 text-center text-disabled animate-pulse">Loading...</div>;
  if (fetchState === 'error' || error) return <div className="p-8 text-center text-destructive">Error loading data.</div>;

  const handleRowClick = (title: string) => {
    toast(`Clicked on broadcast: ${title}`);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Megaphone className="w-6 h-6 text-primary" />
            Announcements & Broadcasts
          </h1>
          <p className="text-sm text-secondary mt-1">
            Push notifications and announcements to all gym dashboards.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <input 
              type="text" 
              placeholder="Search broadcasts..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-border-focus transition-colors w-64"
            />
          </div>
          <button 
            onClick={openCreateModal}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            New Broadcast
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary/5 border-b border-border">
                <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Title</th>
                <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Audience</th>
                <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Scheduled / Sent Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {broadcasts.map((bc) => (
                <tr 
                  key={bc.id} 
                  className="hover:bg-primary/5 transition-colors group cursor-pointer"
                  onClick={() => handleRowClick(bc.title)}
                >
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">{bc.title}</span>
                      <span className="text-xs text-secondary truncate max-w-xs">{bc.content}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-primary-subtle text-primary border border-primary/20">
                      {bc.audience.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(bc.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary">
                    {bc.status === 'SCHEDULED' && bc.scheduledDate ? new Date(bc.scheduledDate).toLocaleString() : ''}
                    {bc.status === 'SENT' && bc.sentDate ? new Date(bc.sentDate).toLocaleString() : ''}
                    {bc.status === 'DRAFT' && '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      {bc.status === 'DRAFT' && (
                        <button
                          onClick={(e) => { e.stopPropagation(); handleSendBroadcast(bc.id); }}
                          className="p-1.5 text-secondary hover:text-primary hover:bg-primary-subtle rounded-lg transition-colors"
                          title="Send Now"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={(e) => { e.stopPropagation(); openEditModal(bc); }}
                        className="p-1.5 text-secondary hover:text-primary hover:bg-primary-subtle rounded-lg transition-colors"
                        title="Edit Broadcast"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDeleteBroadcast(bc.id); }}
                        className="p-1.5 text-secondary hover:text-destructive hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete Broadcast"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {broadcasts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-secondary">
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
        isEditMode={!!editingId}
      />
    </div>
  );
}
