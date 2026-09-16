"use client";
// RESPONSIBILITY: Manages the Roles & Permissions settings tab.
import { MOCK_ROLES } from '@/app/admin/settings/settings_utils/AdminSettingsSharedConstants';


export function AdminSettingsRoles() {
  return (
    <div className="bg-card rounded-xl shadow-sm border border-border mt-6">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between flex-wrap gap-3">
        <h2 className="font-bold text-foreground text-lg">Roles & Permissions</h2>
        <span className="text-xs text-secondary">Read-only in this settings view</span>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {MOCK_ROLES.map(role => (
            <div key={role.id} className="border border-border rounded-xl p-5 hover:shadow-sm motion-safe:transition-shadow bg-input/20 flex flex-col h-full">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${role.bg} flex items-center justify-center`}>
                    <span className={`font-bold ${role.color}`}>{role.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-base">{role.name}</h3>
                    <p className="text-xs text-secondary">{role.memberCount} active members</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-secondary mb-4 flex-1">{role.description}</p>
              <div className="flex flex-wrap gap-2 pt-3 border-t border-border">
                {role.permissions.map(p => (
                  <span key={p} className="px-2 py-1 text-xs font-medium uppercase tracking-wider bg-input border border-border text-foreground rounded-full">
                    {p.replace('_', ' ')}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}