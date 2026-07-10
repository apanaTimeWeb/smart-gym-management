'use client';

import { DUMMY_STAFF } from '@/app/superadmin/superadmin_utils/SuperadminSharedConstants';
import { Users, UserPlus, Shield } from 'lucide-react';

export default function StaffPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Superadmin Staff</h1>
          <p className="text-[var(--text-secondary)] mt-1">Manage your team's access to the SaaS Control Panel.</p>
        </div>
        <button className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg font-medium hover:bg-[var(--primary-hover)] transition-colors flex items-center gap-2">
          <UserPlus size={18} /> Invite Staff
        </button>
      </div>

      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[var(--bg-header)] border-b border-[var(--border)] text-sm">
                <th className="p-4 font-semibold text-[var(--text-secondary)]">Staff Member</th>
                <th className="p-4 font-semibold text-[var(--text-secondary)]">Role</th>
                <th className="p-4 font-semibold text-[var(--text-secondary)]">Status</th>
                <th className="p-4 font-semibold text-[var(--text-secondary)]">Last Login</th>
                <th className="p-4 font-semibold text-[var(--text-secondary)] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {DUMMY_STAFF.map((staff) => (
                <tr key={staff.id} className="hover:bg-[var(--bg-input)] transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold">
                        {staff.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[var(--text-primary)]">{staff.name}</p>
                        <p className="text-xs text-[var(--text-secondary)]">{staff.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5 text-sm font-medium text-[var(--text-primary)]">
                      {staff.role === 'SUPERADMIN' && <Shield size={14} className="text-[var(--warning)]" />}
                      {staff.role.replace('_', ' ')}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      staff.status === 'ACTIVE' ? 'bg-[var(--success)]/10 text-[var(--success)]' : 'bg-[var(--text-disabled)]/10 text-[var(--text-disabled)]'
                    }`}>
                      {staff.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-[var(--text-secondary)]">{new Date(staff.lastLogin).toLocaleString()}</td>
                  <td className="p-4 text-right">
                    <button className="text-sm font-medium text-[var(--primary)] hover:underline" disabled={staff.role === 'SUPERADMIN'}>
                      Edit Access
                    </button>
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
