// RESPONSIBILITY: Renders the table of audit logs and standard pagination controls.
"use client";

import React from 'react';
import { useAuditTable } from '@/app/erp/audit/audit_components/AuditTable/useAuditTable';
import { AUDIT_TABLE_HEADERS } from '@/app/erp/audit/audit_utils/AuditSharedConstants';
import ErpPagination from '@/app/erp/erp_components/ErpShared/ErpPagination';

export const AuditTable = () => {
  const {
    logs,
    loading,
    error,
    page,
    limit,
    totalCount,
    setCurrentPage,
  } = useAuditTable();

  const totalPages = Math.ceil(totalCount / limit) || 1;

  if (loading) {
    return <div className="p-4 text-center">Loading audit logs...</div>;
  }

  if (error) {
    return <div className="p-4 text-danger">Error: {error}</div>;
  }

  return (
    <div className="w-full text-foreground">
      <div className="overflow-x-auto">
        <table className="w-full text-left whitespace-nowrap">
          <thead className="bg-input border-y border-border text-xs uppercase tracking-wider text-secondary">
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
                <tr key={log.id} className="hover:bg-primary/5 transition-colors">
                  <td className="px-6 py-4">{new Date(log.timestamp).toLocaleString()}</td>
                  <td className="px-6 py-4 font-medium">{log.actorId || 'System'}</td>
                  <td className="px-6 py-4">
                    <span className="bg-input px-2.5 py-1 rounded-md text-xs border border-border">
                      {log.actorRole || 'System'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      log.action === 'CREATE' ? 'bg-success/10 text-success' :
                      log.action === 'UPDATE' ? 'bg-info/10 text-info' :
                      log.action === 'DELETE' ? 'bg-danger/10 text-danger' :
                      'bg-warning/10 text-warning'
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

      <div className="mt-4 border-t border-border pt-4">
        <ErpPagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={totalCount}
          itemsPerPage={limit}
        />
      </div>
    </div>
  );
};
