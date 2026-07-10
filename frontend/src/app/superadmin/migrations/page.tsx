'use client';

import { useState } from 'react';
import { useSuperadminData } from '@/app/superadmin/superadmin_utils/useSuperadminData';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { DatabaseZap, AlertTriangle, Play, CheckCircle2, Clock, Search, X, Target } from 'lucide-react';
import { SchemaMigration, Tenant } from '@/app/superadmin/superadmin_types/superadmin_types';

const StatusIcons = {
  SUCCESS: <CheckCircle2 className="text-[var(--success)]" size={18} />,
  PENDING: <Clock className="text-[var(--warning)]" size={18} />,
  FAILED: <AlertTriangle className="text-[var(--danger)]" size={18} />
};

export default function MigrationsPage() {
  const { data, loading, error } = useSuperadminData<{ migrations: SchemaMigration[], tenants: Tenant[] }>(SuperadminUrlConfig.BACKEND_API.MIGRATIONS_BASE);

  if (loading) return <div className="p-8 text-center text-[var(--text-disabled)]">Loading...</div>;
  if (error || !data) return <div className="p-8 text-center text-[var(--danger)]">Error loading data.</div>;

  const { migrations: DUMMY_MIGRATIONS, tenants: DUMMY_TENANTS } = data;

  const pendingCount = DUMMY_MIGRATIONS.filter(m => m.status === 'PENDING').length;

  const [showTargetModal, setShowTargetModal] = useState(false);
  const [gymSearchTerm, setGymSearchTerm] = useState('');
  const [isGymDropdownOpen, setIsGymDropdownOpen] = useState(false);
  const [selectedGymId, setSelectedGymId] = useState('');
  
  const filteredGymsForDropdown = DUMMY_TENANTS.filter(t => t.name.toLowerCase().includes(gymSearchTerm.toLowerCase()));
  const selectedGym = DUMMY_TENANTS.find(t => t.id === selectedGymId);

  return (
    <div className="space-y-6 relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Schema Rollouts</h1>
          <p className="text-[var(--text-secondary)] mt-1">Manage TypeORM migrations across all 50+ tenant databases.</p>
        </div>
      </div>

      {pendingCount > 0 && (
        <div className="bg-[var(--warning)]/10 border border-[var(--warning)]/30 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[var(--warning)]/20 rounded-full text-[var(--warning)]">
              <DatabaseZap size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[var(--warning)]">{pendingCount} Pending Migrations Detected</h2>
              <p className="text-sm text-[var(--text-secondary)] mt-1">Backend codebase updated. The tenant databases require schema sync.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button 
              onClick={() => setShowTargetModal(true)}
              className="flex-1 md:flex-none bg-[var(--bg-input)] text-[var(--text-primary)] px-4 py-3 rounded-lg font-bold hover:bg-[var(--border)] transition-colors flex items-center justify-center gap-2 border border-[var(--border)]"
            >
              <Target size={18} /> Targeted Sync
            </button>
            <button className="flex-1 md:flex-none bg-[var(--warning)] text-black px-6 py-3 rounded-lg font-bold hover:bg-[#e69b00] transition-colors flex items-center justify-center gap-2 whitespace-nowrap shadow-lg shadow-[var(--warning)]/20">
              <Play size={18} /> Run on All Tenants
            </button>
          </div>
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

      {/* Target Specific Tenant Modal */}
      {showTargetModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowTargetModal(false)}></div>
          <div className="relative bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">Targeted Migration</h2>
              <button onClick={() => setShowTargetModal(false)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-5 space-y-4">
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                Select a specific Gym database to run the pending TypeORM migrations on. This is useful for canary testing schema changes before a global rollout.
              </p>

              <div className="relative">
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Select Gym (Tenant)</label>
                
                {/* Custom Searchable Dropdown */}
                <div 
                  className="w-full bg-[var(--bg-input)] border border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-primary)] cursor-pointer flex justify-between items-center hover:border-[var(--primary)] transition-colors"
                  onClick={() => setIsGymDropdownOpen(!isGymDropdownOpen)}
                >
                  <span className={selectedGym ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}>
                    {selectedGym ? `${selectedGym.name} (${selectedGym.plan})` : '-- Choose Gym --'}
                  </span>
                  <span className="text-[var(--text-secondary)] text-xs">▼</span>
                </div>

                {isGymDropdownOpen && (
                  <div className="absolute z-10 top-[calc(100%+4px)] left-0 right-0 bg-[var(--bg-card)] border border-[var(--border)] rounded-lg shadow-xl overflow-hidden max-h-64 flex flex-col animate-in fade-in zoom-in-95 duration-100">
                    <div className="p-2 border-b border-[var(--border)] bg-[var(--bg-header)]">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--text-secondary)]" />
                        <input 
                          type="text" 
                          placeholder="Search gym by name..." 
                          className="w-full pl-8 pr-3 py-1.5 bg-[var(--bg-input)] border border-[var(--border)] rounded text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]"
                          value={gymSearchTerm}
                          onChange={(e) => setGymSearchTerm(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          autoFocus
                        />
                      </div>
                    </div>
                    <div className="overflow-y-auto p-1 custom-scrollbar">
                      {filteredGymsForDropdown.map(t => (
                        <div 
                          key={t.id} 
                          className="px-3 py-2.5 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-input)] hover:text-[var(--primary)] cursor-pointer rounded-md transition-colors"
                          onClick={() => {
                            setSelectedGymId(t.id);
                            setIsGymDropdownOpen(false);
                            setGymSearchTerm('');
                          }}
                        >
                          <span className="font-bold">{t.name}</span> <span className="text-[var(--text-secondary)] text-xs ml-1">({t.plan})</span>
                        </div>
                      ))}
                      {filteredGymsForDropdown.length === 0 && (
                        <div className="px-3 py-6 text-center text-sm text-[var(--text-disabled)] font-medium">No gyms found</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-5 border-t border-[var(--border)] bg-[var(--bg-header)] flex justify-end gap-3">
              <button 
                onClick={() => setShowTargetModal(false)}
                className="px-4 py-2 bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-primary)] rounded-lg text-sm font-medium hover:bg-[var(--border)] transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  alert(`Running pending migrations specifically on ${selectedGym?.name || 'Selected Gym'}...`);
                  setShowTargetModal(false);
                }}
                disabled={!selectedGymId}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  selectedGymId ? 'bg-[var(--warning)] text-black hover:bg-[#e69b00]' : 'bg-[var(--bg-input)] text-[var(--text-disabled)] cursor-not-allowed border border-[var(--border)]'
                }`}
              >
                <Play size={16} /> Run Target Sync
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
