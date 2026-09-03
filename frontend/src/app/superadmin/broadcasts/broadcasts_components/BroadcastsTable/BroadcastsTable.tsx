'use client';
// RESPONSIBILITY: Renders the Broadcasts data table shell (header + rows). Delegates row rendering to BroadcastsTableRow. No API calls.
import { useState } from 'react';
import BroadcastStatusBadge from '@/app/superadmin/broadcasts/broadcasts_components/BroadcastStatusBadge/BroadcastStatusBadge';
import { Send, Edit2, Trash2 } from 'lucide-react';
import type { BroadcastsTableProps } from '@/app/superadmin/broadcasts/broadcasts_types/broadcasts_types';
import SuperadminPagination from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminPagination';

const ITEMS_PER_PAGE = 10;

export default function BroadcastsTable({ broadcasts, onSend, onEdit, onDelete }: BroadcastsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(broadcasts.length / ITEMS_PER_PAGE) || 1;
  const paginatedBroadcasts = broadcasts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm flex flex-col min-h-[400px]">
      <div className="overflow-x-auto flex-1">
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
            {paginatedBroadcasts.map((bc) => (
              <tr 
                key={bc.id} 
                className="hover:bg-primary/5 transition-all duration-200 ease-in-out group cursor-pointer"
                onClick={() => onEdit(bc)}
              >
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">{bc.title}</span>
                    <span className="text-xs text-secondary truncate max-w-xs">{bc.content}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-primary-subtle text-primary border border-primary/20">
                    {(bc.audience || '').replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <BroadcastStatusBadge status={bc.status} />
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
                        onClick={(e) => { e.stopPropagation(); onSend(bc.id); }}
                        className="p-1.5 text-secondary hover:text-primary hover:bg-primary-subtle rounded-lg transition-all duration-200 ease-in-out"
                        title="Send Now"
                        aria-label={`Send broadcast: ${bc.title}`}
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); onEdit(bc); }}
                      className="p-1.5 text-secondary hover:text-primary hover:bg-primary-subtle rounded-lg transition-all duration-200 ease-in-out"
                      title="Edit Broadcast"
                      aria-label={`Edit broadcast: ${bc.title}`}
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); onDelete(bc.id); }}
                      className="p-1.5 text-secondary hover:text-danger hover:bg-danger-bg/10 rounded-lg transition-all duration-200 ease-in-out"
                      title="Delete Broadcast"
                      aria-label={`Delete broadcast: ${bc.title}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <SuperadminPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
