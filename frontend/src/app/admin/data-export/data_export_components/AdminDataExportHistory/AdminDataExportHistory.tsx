"use client";
// RESPONSIBILITY: Table showing export job history with server-side pagination, filter, and sortable headers.

import { displayValue } from '@/app/admin/admin_layout/admin_utils/AdminDisplayValue';
import { CheckCircle, ChevronsUpDown, ChevronDown, ChevronUp, Download, Loader2, Trash2, XCircle } from 'lucide-react';
import { useAdminDataExportLogic } from '@/app/admin/data-export/data_export_context/useAdminDataExportLogic';
import AdminTableSkeleton from '@/app/admin/admin_layout/AdminShared/AdminTableSkeleton';
import AdminPagination from '@/app/admin/admin_layout/AdminShared/AdminPagination';
import { AdminSearchableDropdown } from '@/app/admin/admin_layout/AdminShared/AdminSearchableDropdown/AdminSearchableDropdown';
import { EXPORT_STATUS_OPTIONS } from '@/app/admin/data-export/data_export_utils/AdminDataExportSharedConstants';
import type { DataExportSortDirection, DataExportSortKey, ExportJob, ExportStatus } from '@/app/admin/data-export/data_export_types/AdminDataExportTypes';
import AdminDataExportEmptyState from '@/app/admin/data-export/data_export_components/AdminDataExportEmptyState/AdminDataExportEmptyState';

const STATUS_STYLES: Record<string, string> = { completed: 'bg-success text-success', processing: 'bg-warning text-warning', failed: 'bg-danger text-danger' };
const STATUS_ICONS: Record<string, React.ReactNode> = { completed: <CheckCircle size={11} />, processing: <Loader2 size={11} className="motion-safe:animate-spin motion-safe:duration-base" />, failed: <XCircle size={11} /> };
const DATA_TYPE_LABELS: Record<string, string> = { members: 'Members', payments: 'Payments', attendance: 'Attendance', staff: 'Staff', full_report: 'Full Report' };
const HEADERS: ReadonlyArray<{ key: DataExportSortKey | 'actions'; label: string; sortable: boolean }> = [
  { key: 'dataType', label: 'Data Type', sortable: true }, { key: 'format', label: 'Format', sortable: true }, { key: 'dateFrom', label: 'Gyms / Date', sortable: true },
  { key: 'rowCount', label: 'Rows', sortable: true }, { key: 'fileSizeKb', label: 'Size', sortable: true }, { key: 'status', label: 'Status', sortable: true }, { key: 'createdAt', label: 'Created', sortable: true }, { key: 'actions', label: 'Actions', sortable: false },
];

function getSortIcon(column: DataExportSortKey, sortKey: DataExportSortKey, sortDir: DataExportSortDirection) {
  if (column !== sortKey) return <ChevronsUpDown size={13} className="text-disabled" />;
  return sortDir === 'asc' ? <ChevronUp size={13} className="text-primary" /> : <ChevronDown size={13} className="text-primary" />;
}

export default function AdminDataExportHistory() {
  const logic = useAdminDataExportLogic();
  const downloadExport = (job: ExportJob) => {
    const payload = JSON.stringify(job, null, 2);
    const url = URL.createObjectURL(new Blob([payload], { type: 'application/json;charset=utf-8;' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${job.id}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <p className="text-sm font-semibold text-primary">Export History</p>
        <div className="w-44"><AdminSearchableDropdown options={EXPORT_STATUS_OPTIONS} value={logic.statusFilter} onChange={(val) => { if (val === 'all' || val === 'completed' || val === 'processing' || val === 'failed') logic.setStatusFilter(val as ExportStatus | 'all'); }} placeholder="All Status" /></div>
      </div>
      {logic.status === 'pending' ? <AdminTableSkeleton rows={5} cols={HEADERS.length} /> : (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table data-admin-responsive-table className="w-full">
              <thead><tr className="bg-surface-highlight border-b border-border">
                {HEADERS.map((header) => (
                  <th role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.currentTarget.click(); } }}  key={header.key} className={`px-4 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap ${header.sortable ? 'cursor-pointer' : ''}`} onClick={() => header.sortable && logic.onSort(header.key as DataExportSortKey)}>
                    <div className="flex items-center gap-1.5">{header.label}{header.sortable && getSortIcon(header.key as DataExportSortKey, logic.sortKey, logic.sortDir)}</div>
                  </th>
                ))}
              </tr></thead>
              <tbody className="divide-y divide-border">
                {logic.jobs.length === 0 ? <tr><td colSpan={HEADERS.length}><AdminDataExportEmptyState /></td></tr> : logic.jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-surface-highlight motion-safe:transition-colors group motion-safe:duration-base">
                    <td className="px-4 py-3 text-sm font-medium text-primary">{DATA_TYPE_LABELS[job.dataType] ?? job.dataType}</td>
                    <td className="px-4 py-3 text-sm text-secondary uppercase">{job.format}</td>
                    <td className="px-4 py-3 text-xs text-secondary whitespace-nowrap"><span className="block max-w-36 truncate">{job.gymNames.join(', ')}</span><span>{job.dateFrom} → {job.dateTo}</span></td>
                    <td className="px-4 py-3 text-sm text-primary">{displayValue(job.rowCount?.toLocaleString('en-IN'))}</td>
                    <td className="px-4 py-3 text-sm text-secondary">{job.fileSizeKb !== undefined ? `${job.fileSizeKb} KB` : '—'}</td>
                    <td className="px-4 py-3"><span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${STATUS_STYLES[job.status] ?? 'bg-input text-secondary'}`}>{STATUS_ICONS[job.status]}{job.status}</span></td>
                    <td className="px-4 py-3 text-xs text-secondary whitespace-nowrap">{new Date(job.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</td>
                    <td className="px-4 py-3"><div className="flex items-center gap-1">
                      {job.status === 'completed' && <button onClick={(event) => { event.stopPropagation(); downloadExport(job); }} className="p-1.5 rounded-lg hover:bg-input text-secondary hover:text-primary motion-safe:transition-colors motion-safe:duration-base" aria-label="Download export" title="Download export"><Download size={15} /></button>}
                      <button onClick={(event) => { event.stopPropagation(); logic.deleteJob(job.id); }} className="p-1.5 rounded-lg hover:bg-danger text-secondary hover:text-on-danger motion-safe:transition-colors motion-safe:duration-base" aria-label="Delete export job" title="Delete export"><Trash2 size={15} /></button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-border"><AdminPagination currentPage={logic.currentPage} totalPages={logic.totalPages} onPageChange={logic.setCurrentPage} totalItems={logic.totalItems} itemsPerPage={10} /></div>
        </div>
      )}
    </div>
  );
}
