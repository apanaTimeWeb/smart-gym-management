"use client";
// RESPONSIBILITY: Manages the Roles & Permissions settings tab.
import { MOCK_ROLES } from '@/app/admin/settings/settings_utils/AdminSettingsSharedConstants';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export function AdminSettingsRoles() {
  const handleAddRole = () => {
    toast.error('Role creation coming soon!', { id: 'roles-wip' });
  };

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border mt-6">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between flex-wrap gap-3">
        <h2 className="font-bold text-foreground text-lg">Roles & Permissions</h2>
        <button
          type="button"
          onClick={handleAddRole}
          className="px-4 py-2 text-sm bg-primary text-white rounded-lg font-medium flex items-center gap-2 hover:bg-primary-hover motion-safe:transition-colors"
        >
          <Plus size={16} /> Add Role
        </button>
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
                <div className="flex gap-2">
                  <button type="button" onClick={() => toast.error('Edit coming soon', { id: 'roles-edit' })} className="p-1.5 text-secondary hover:text-primary motion-safe:transition-colors bg-card border border-border rounded-md shadow-sm">
                    <Edit2 size={14} />
                  </button>
                  {role.name !== 'Super Admin' && (
                    <button type="button" onClick={() => toast.error('Delete coming soon', { id: 'roles-del' })} className="p-1.5 text-secondary hover:text-danger motion-safe:transition-colors bg-card border border-border rounded-md shadow-sm">
                      <Trash2 size={14} />
                    </button>
                  )}
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