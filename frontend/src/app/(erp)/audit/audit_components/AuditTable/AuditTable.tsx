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
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="w-full" style={{ color: 'var(--audit-text-primary)' }}>
      <div className="overflow-x-auto rounded-lg border" style={{ borderColor: 'var(--audit-border-color)' }}>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr style={{ backgroundColor: 'var(--audit-primary-bg)', borderBottom: '1px solid var(--audit-border-color)' }}>
              {AUDIT_TABLE_HEADERS.map((header) => (
                <th key={header} className="p-3 font-semibold text-sm">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan={AUDIT_TABLE_HEADERS.length} className="p-4 text-center">
                  No audit logs found.
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id} className="border-b transition-colors hover:bg-gray-50" style={{ borderBottomColor: 'var(--audit-border-color)' }}>
                  <td className="p-3 text-sm">{new Date(log.timestamp).toLocaleString()}</td>
                  <td className="p-3 text-sm">{log.actorId || 'System'}</td>
                  <td className="p-3 text-sm">{log.actorRole || '-'}</td>
                  <td className="p-3 text-sm font-medium" style={{ color: 'var(--audit-accent)' }}>{log.action}</td>
                  <td className="p-3 text-sm">{log.entityType}</td>
                  <td className="p-3 text-sm">{log.entityId || '-'}</td>
                  <td className="p-3 text-sm">
                    <div className="max-w-xs truncate" title={JSON.stringify(log.newValue)}>
                      {JSON.stringify(log.newValue)}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <span className="text-sm" style={{ color: 'var(--audit-text-secondary)' }}>
          Showing {(page - 1) * limit + 1} to {Math.min(page * limit, totalCount)} of {totalCount} entries
        </span>
        <div className="flex gap-2">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="px-3 py-1 rounded border disabled:opacity-50"
            style={{ borderColor: 'var(--audit-border-color)' }}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={page * limit >= totalCount}
            className="px-3 py-1 rounded border disabled:opacity-50"
            style={{ borderColor: 'var(--audit-border-color)' }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
