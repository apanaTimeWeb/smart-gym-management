"use client";
// RESPONSIBILITY: Detail drawer for a single audit log — full metadata, IP, user agent, affected record.

import { X, Download, ShieldAlert, Clock, User, Building2, Monitor, Hash } from 'lucide-react';
import { displayValue } from '@/app/admin/admin_layout/admin_utils/AdminDisplayValue';
import type { AuditLog } from '@/app/admin/audit_logs/audit_types/AdminAuditTypes';
import { useAdminAuditLogsLogic } from '@/app/admin/audit_logs/audit_context/useAdminAuditLogsLogic';

const SEVERITY_STYLES: Record<string, string> = {
  high:   'bg-danger text-danger border-danger',
  medium: 'bg-warning text-warning border-warning',
  low:    'bg-success text-success border-success',
};

import type { AdminAuditLogsDetailDrawerProps } from '@/app/admin/audit_logs/audit_logs_types/AdminAuditLogsDetailDrawerPropsTypes';


export default function AdminAuditLogsDetailDrawer({ log, onClose }: AdminAuditLogsDetailDrawerProps) {
  const { exportCSV } = useAdminAuditLogsLogic();

  const fields = [
    { icon: Clock,     label: 'Timestamp',       value: new Date(log.timestamp).toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'medium' }) },
    { icon: User,      label: 'Performed By',     value: log.user },
    { icon: Building2, label: 'Branch',           value: log.branchId === 'all' ? 'Global (All Branches)' : log.branchId },
    { icon: Monitor,   label: 'IP Address',       value: log.ip },
    { icon: Monitor,   label: 'User Agent',       value: displayValue(log.userAgent) },
    { icon: Hash,      label: 'Affected Record',  value: displayValue(log.affectedRecordId) },
  ];

  return (
    <>
      <div aria-hidden="true" className="fixed inset-0 bg-overlay backdrop-blur-sm z-40" onClick={onClose} />
      <div data-admin-dialog="true" role="dialog" aria-modal="true" tabIndex={-1} className="fixed inset-y-0 right-0 z-40 w-full max-w-lg bg-overlay border-l border-border shadow-dialog flex flex-col motion-safe:animate-in motion-safe:slide-in-from-right motion-safe:duration-slow">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border shrink-0">
          <div>
            <h3 className="font-bold text-primary text-base">{log.action.replace(/_/g, ' ')}</h3>
            <p className="text-xs text-secondary mt-0.5">{log.module} Module · {new Date(log.timestamp).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-input hover:bg-surface-hover flex items-center justify-center motion-safe:transition-colors motion-safe:duration-base" aria-label="Close drawer">
            <X size={16} className="text-secondary" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Severity badge */}
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${SEVERITY_STYLES[log.severity]}`}>
              {log.severity} severity
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-subtle text-primary border border-border">
              {log.module}
            </span>
          </div>

          {/* Full details */}
          <div className="bg-input rounded-xl p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <ShieldAlert size={14} className="text-secondary" />
              <p className="text-xs text-secondary uppercase tracking-wider font-semibold">Event Details</p>
            </div>
            <p className="text-sm text-primary leading-relaxed">{log.details}</p>
          </div>

          {/* Metadata grid */}
          <div className="grid grid-cols-2 gap-3">
            {fields.map(f => (
              <div key={f.label} className="bg-input rounded-xl p-3 border border-border">
                <div className="flex items-center gap-1.5 mb-1">
                  <f.icon size={12} className="text-secondary" />
                  <p className="text-xs text-secondary uppercase tracking-wider font-medium">{f.label}</p>
                </div>
                <p className="text-sm font-semibold text-primary break-all">{f.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-border flex gap-3 shrink-0">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-border rounded-xl text-sm font-medium text-secondary hover:text-primary hover:bg-input motion-safe:transition-colors motion-safe:duration-base"
          >
            Close
          </button>
          <button
            onClick={() => exportCSV([log])}
            className="flex-1 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-semibold hover:bg-primary-hover motion-safe:transition-colors flex items-center justify-center gap-2 motion-safe:duration-base"
          >
            <Download size={14} /> Export This Log
          </button>
        </div>
      </div>
    </>
  );
}
