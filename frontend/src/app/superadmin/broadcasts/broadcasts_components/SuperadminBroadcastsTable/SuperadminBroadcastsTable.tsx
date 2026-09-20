// RESPONSIBILITY: Renders the Broadcasts data table shell (header + rows). Delegates row rendering to BroadcastsTableRow. No API calls.
'use client';
import { formatDate, formatDateTime } from '@/lib/formatters';
import SuperadminBroadcastStatusBadge from '@/app/superadmin/broadcasts/broadcasts_components/SuperadminBroadcastStatusBadge/SuperadminBroadcastStatusBadge';
import { Send, Edit2, Trash2 } from 'lucide-react';
import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';
import SuperadminBroadcastsEmptyState from '@/app/superadmin/broadcasts/broadcasts_components/SuperadminBroadcastsEmptyState/SuperadminBroadcastsEmptyState';
import type { SuperadminBroadcastsTableProps } from '@/app/superadmin/broadcasts/broadcasts_types/SuperadminBroadcastsTypes';
export default function SuperadminBroadcastsTable({ broadcasts, onSend, onEdit, onDelete, onCreateClick }: SuperadminBroadcastsTableProps) {
    const { confirm } = useConfirm();
    return (<div className="bg-card border border-border rounded-xl overflow-hidden shadow-card flex flex-col min-h-96">
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-primary/5 border-b border-border">
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Title</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Audience</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Delivery Rate</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Scheduled / Sent Date</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {broadcasts.length === 0 ? (<tr>
                <td colSpan={6}><SuperadminBroadcastsEmptyState onCreateClick={onCreateClick}/></td>
              </tr>) : (broadcasts.map((bc) => (<tr key={bc.id} tabIndex={0} aria-label={`Open broadcast ${bc.title}`} className="hover:bg-primary/5 focus-visible:bg-surface-hover focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out group cursor-pointer" onClick={() => onEdit(bc)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onEdit(bc); } }}>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-primary">{bc.title}</span>
                      <span className="text-xs text-secondary truncate max-w-xs">{bc.content}</span>
                    </div>
                  </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-primary-subtle text-on-primary border border-primary/20">
                    {bc.targetGymIds && bc.targetGymIds.length > 0 ? `${bc.targetGymIds.length} Gym(s)` : 'All Gyms'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <SuperadminBroadcastStatusBadge status={bc.status}/>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {bc.status === 'SENT' && bc.totalRecipients ? (<div>
                      <span className="text-success font-semibold">
                        {bc.deliveredCount ?? 0}/{bc.totalRecipients}
                      </span>
                      <span className="ml-1 text-secondary text-xs">
                        ({Math.round(((bc.deliveredCount ?? 0) / bc.totalRecipients) * 100)}%)
                      </span>
                    </div>) : (<span className="text-disabled">â€”</span>)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary">
                  {bc.status === 'SCHEDULED' && bc.scheduledDate ? formatDateTime(bc.scheduledDate) : ''}
                  {bc.status === 'SENT' && bc.sentDate ? formatDateTime(bc.sentDate) : ''}
                  {bc.status === 'DRAFT' && '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-2">
                    {bc.status === 'DRAFT' && (<button onClick={(e) => { e.stopPropagation(); onSend(bc.id); }} className="p-1.5 text-secondary hover:text-on-primary hover:bg-primary-subtle rounded-lg motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out" title="Send Now" aria-label={`Send broadcast: ${bc.title}`}>
                        <Send size={18} strokeWidth={2}/>
                      </button>)}
                    <button onClick={(e) => { e.stopPropagation(); onEdit(bc); }} className="p-1.5 text-secondary hover:text-on-primary hover:bg-primary-subtle rounded-lg motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out" title="Edit Broadcast" aria-label={`Edit broadcast: ${bc.title}`}>
                      <Edit2 size={18} strokeWidth={2}/>
                    </button>
                    <button onClick={async (e) => {
                e.stopPropagation();
                const ok = await confirm({
                    title: 'Delete Broadcast',
                    message: `Are you sure you want to delete broadcast "${bc.title}"? This action cannot be undone.`,
                    type: 'danger',
                    confirmText: 'Delete'
                });
                if (ok) {
                    onDelete(bc.id);
                }
            }} className="p-1.5 text-secondary hover:text-on-danger hover:bg-danger-bg/10 rounded-lg motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out" title="Delete Broadcast" aria-label={`Delete broadcast: ${bc.title}`}>
                      <Trash2 size={18} strokeWidth={2}/>
                    </button>
                  </div>
                </td>
              </tr>)))}
          </tbody>
        </table>
      </div>
    </div>);
}
