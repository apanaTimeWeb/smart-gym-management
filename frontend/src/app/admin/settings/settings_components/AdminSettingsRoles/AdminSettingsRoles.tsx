"use client";
// RESPONSIBILITY: Renders the read-only role permission summary for the Settings Roles tab.
import { ShieldCheck } from 'lucide-react';
import { useAdminSettingsRolesData } from '@/app/admin/settings/settings_context/useAdminSettingsRolesData';

export function AdminSettingsRoles() {
  const { roles, status } = useAdminSettingsRolesData();

  if (status === 'pending') {
    return <div className="bg-card rounded-xl shadow-card border border-border mt-6 h-64 motion-safe:animate-pulse motion-safe:duration-base" />;
  }

  if (roles.length === 0) {
    return <div className="bg-card rounded-xl shadow-card border border-border mt-6 p-8 text-center text-sm text-secondary">No role permission data available.</div>;
  }

  return (
    <div className="bg-card rounded-xl shadow-card border border-border mt-6">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-bold text-primary text-lg">Roles &amp; Permissions</h2>
          <p className="text-xs text-secondary">Read-only permission defaults from the Admin permissions API</p>
        </div>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        {roles.map((role) => {
          const granted = Object.values(role.permissions).filter(Boolean).length;
          const total = Object.keys(role.permissions).length;
          return (
            <div key={role.role} className="border border-border rounded-xl p-5 bg-input">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary-subtle flex items-center justify-center text-primary"><ShieldCheck size={18} /></div>
                <div>
                  <h3 className="font-semibold text-primary text-base capitalize">{role.role}</h3>
                  <p className="text-xs text-secondary">{granted} of {total} permissions enabled</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(role.permissions).map(([permission, enabled]) => (
                  <span key={permission} className={`px-2 py-1 text-xs font-medium uppercase tracking-wider rounded-full border ${enabled ? 'bg-success text-success border-border' : 'bg-input text-secondary border-border'}`}>
                    {permission.replaceAll('_', ' ')}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
