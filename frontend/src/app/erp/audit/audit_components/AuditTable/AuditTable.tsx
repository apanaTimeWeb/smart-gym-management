"use client";

import React from 'react';
import { useAuditTable } from './useAuditTable';
import { AUDIT_TABLE_HEADERS } from '../../audit_constants/AuditConstants';
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
    return <div className="p-4 text-[var(--danger)]">Error: {error}</div>;
  }

  return (
    <div className="w-full text-[var(--audit-text-primary)]">
      <div className="overflow-x-auto">
        <table className="w-full text-left whitespace-nowrap">
          <thead className="bg-[var(--audit-table-header-bg)] border-y border-[var(--audit-border-color)] text-xs uppercase tracking-wider text-[var(--audit-text-secondary)]">
            <tr>
              {AUDIT_TABLE_HEADERS.map((header) => (
                <th key={header} className="px-6 py-4 font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--audit-border-color)] text-sm">
            {logs.length === 0 ? (
              <tr>
                <td colSpan={AUDIT_TABLE_HEADERS.length} className="px-6 py-8 text-center text-[var(--audit-text-secondary)]">
                  No audit logs found matching your filters.
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id} className="hover:bg-[var(--audit-row-hover)] transition-colors">
                  <td className="px-6 py-4">{new Date(log.timestamp).toLocaleString()}</td>
                  <td className="px-6 py-4 font-medium">{log.actorId || 'System'}</td>
                  <td className="px-6 py-4">
                    <span className="bg-[var(--audit-bg-input)] px-2.5 py-1 rounded-md text-xs border border-[var(--audit-border-color)]">
                      {log.actorRole || 'System'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      log.action === 'CREATE' ? 'bg-[var(--success-bg)] text-[var(--success)] dark:bg-[var(--success-bg)] dark:text-[var(--success)]' :
                      log.action === 'UPDATE' ? 'bg-[var(--info-bg)] text-[var(--info)] dark:bg-[var(--info-bg)] dark:text-[var(--info)]' :
                      log.action === 'DELETE' ? 'bg-[var(--danger-bg)] text-[var(--danger)] dark:bg-[var(--danger-bg)] dark:text-[var(--danger)]' :
                      'bg-[var(--warning-bg)] text-[var(--warning)] dark:bg-[var(--warning-bg)] dark:text-[var(--warning)]'
                    }`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium">{log.entityType}</td>
                  <td className="px-6 py-4">{log.entityId || '-'}</td>
                  <td className="px-6 py-4">
                    <div className="max-w-xs truncate text-[var(--audit-text-secondary)]" title={JSON.stringify(log.newValue)}>
                      {JSON.stringify(log.newValue)}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-sm text-[var(--audit-text-secondary)]">
        <span className="mb-4 sm:mb-0">
          Showing <span className="font-medium text-[var(--audit-text-primary)]">{totalCount === 0 ? 0 : (page - 1) * limit + 1}</span> to <span className="font-medium text-[var(--audit-text-primary)]">{Math.min(page * limit, totalCount)}</span> of <span className="font-medium text-[var(--audit-text-primary)]">{totalCount}</span> entries
        </span>
        <div className="flex gap-2">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="px-4 py-2 rounded-xl border border-[var(--audit-border-color)] bg-[var(--audit-bg-card)] hover:bg-[var(--audit-row-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium text-[var(--audit-text-primary)]"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={page * limit >= totalCount}
            className="px-4 py-2 rounded-xl border border-[var(--audit-border-color)] bg-[var(--audit-bg-card)] hover:bg-[var(--audit-row-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium text-[var(--audit-text-primary)]"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
