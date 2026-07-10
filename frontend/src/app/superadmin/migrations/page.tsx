'use client';

import { DUMMY_MIGRATIONS } from '@/app/superadmin/superadmin_utils/SuperadminSharedConstants';
import { DatabaseZap, AlertTriangle, Play, CheckCircle2, Clock } from 'lucide-react';

const StatusIcons = {
  SUCCESS: <CheckCircle2 className="text-[var(--success)]" size={18} />,
  PENDING: <Clock className="text-[var(--warning)]" size={18} />,
  FAILED: <AlertTriangle className="text-[var(--danger)]" size={18} />
};

export default function MigrationsPage() {
  const pendingCount = DUMMY_MIGRATIONS.filter(m => m.status === 'PENDING').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Schema Rollouts</h1>
          <p className="text-[var(--text-secondary)] mt-1">Manage TypeORM migrations across all 50+ tenant databases.</p>
        </div>
      </div>

      {pendingCount > 0 && (
        <div className="bg-[var(--warning)]/10 border border-[var(--warning)]/30 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[var(--warning)]/20 rounded-full text-[var(--warning)]">
              <DatabaseZap size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[var(--warning)]">{pendingCount} Pending Migrations Detected</h2>
              <p className="text-sm text-[var(--text-secondary)] mt-1">Backend codebase updated. The tenant databases require schema sync.</p>
            </div>
          </div>
          <button className="bg-[var(--warning)] text-black px-6 py-3 rounded-lg font-bold hover:bg-[#e69b00] transition-colors flex items-center gap-2 whitespace-nowrap shadow-lg shadow-[var(--warning)]/20">
            <Play size={18} /> Run on All Tenants
          </button>
        </div>
      )}

      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[var(--border)]">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">Migration History</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--bg-header)] border-b border-[var(--border)] text-sm">
                <th className="p-4 font-semibold text-[var(--text-secondary)] w-12"></th>
                <th className="p-4 font-semibold text-[var(--text-secondary)]">Migration File Name</th>
                <th className="p-4 font-semibold text-[var(--text-secondary)]">Execution Status</th>
                <th className="p-4 font-semibold text-[var(--text-secondary)]">Applied At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {DUMMY_MIGRATIONS.map((mig) => (
                <tr key={mig.id} className="hover:bg-[var(--bg-input)] transition-colors">
                  <td className="p-4 text-center">
                    {StatusIcons[mig.status]}
                  </td>
                  <td className="p-4 text-sm font-mono font-medium text-[var(--text-primary)]">
                    {mig.name}.ts
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${
                      mig.status === 'SUCCESS' ? 'text-[var(--success)] bg-[var(--success)]/10 border-[var(--success)]/20' :
                      mig.status === 'PENDING' ? 'text-[var(--warning)] bg-[var(--warning)]/10 border-[var(--warning)]/20' :
                      'text-[var(--danger)] bg-[var(--danger)]/10 border-[var(--danger)]/20'
                    }`}>
                      {mig.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-[var(--text-secondary)] font-mono">
                    {mig.appliedAt ? new Date(mig.appliedAt).toLocaleString() : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
