// RESPONSIBILITY: AuditTable.tsx handles the logic and UI for its corresponding feature.
"use client";

import React from 'react';
import { useAuditTable } from '@/app/erp/audit/audit_components/AuditTable/useAuditTable';
import { AUDIT_TABLE_HEADERS } from '@/app/erp/audit/audit_utils/AuditSharedConstants';
import '../../audit.css';

export const AuditTable = () => {
  const {
    logs,
    loading,
    error,
    page,
    limit,
    totalCount,
    handleNextPage,
    handlePrevPage,
  } = useAuditTable();

  if (loading) {
    return <div className="p-4 text-center">Loading audit logs...</div>;
  }

  if (error) {
    return <div className="p-4 text-destructive">Error: {error}</div>;
  }

  return (
    <div className="w-full text-foreground">
      <div className="overflow-x-auto">
        <table className="w-full text-left whitespace-nowrap">
          <thead className="bg-muted border-y border-border text-xs uppercase tracking-wider text-secondary">
            <tr>
              {AUDIT_TABLE_HEADERS.map((header) => (
                <th key={header} className="px-6 py-4 font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-sm">
            {logs.length === 0 ? (
              <tr>
                <td colSpan={AUDIT_TABLE_HEADERS.length} className="px-6 py-8 text-center text-secondary">
                  No audit logs found matching your filters.
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id} className="hover:bg-accent transition-colors">
                  <td className="px-6 py-4">{new Date(log.timestamp).toLocaleString()}</td>
                  <td className="px-6 py-4 font-medium">{log.actorId || 'System'}</td>
                  <td className="px-6 py-4">
                    <span className="bg-input px-2.5 py-1 rounded-md text-xs border border-border">
                      {log.actorRole || 'System'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      log.action === 'CREATE' ? 'bg-success-bg text-success dark:bg-success-bg dark:text-success' :
                      log.action === 'UPDATE' ? 'bg-info-bg text-info dark:bg-info-bg dark:text-info' :
                      log.action === 'DELETE' ? 'bg-danger-bg text-destructive dark:bg-danger-bg dark:text-destructive' :
                      'bg-warning-bg text-warning dark:bg-warning-bg dark:text-warning'
                    }`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium">{log.entityType}</td>
                  <td className="px-6 py-4">{log.entityId || '-'}</td>
                  <td className="px-6 py-4">
                    <div className="max-w-xs truncate text-secondary" title={JSON.stringify(log.newValue)}>
                      {JSON.stringify(log.newValue)}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-sm text-secondary">
        <span className="mb-4 sm:mb-0">
          Showing <span className="font-medium text-foreground">{totalCount === 0 ? 0 : (page - 1) * limit + 1}</span> to <span className="font-medium text-foreground">{Math.min(page * limit, totalCount)}</span> of <span className="font-medium text-foreground">{totalCount}</span> entries
        </span>
        <div className="flex gap-2">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="px-4 py-2 rounded-xl border border-border bg-card hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium text-foreground"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={page * limit >= totalCount}
            className="px-4 py-2 rounded-xl border border-border bg-card hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium text-foreground"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
