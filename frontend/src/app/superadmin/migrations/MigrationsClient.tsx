// RESPONSIBILITY: MigrationsClient renders the Schema Rollouts page — pending migration alerts, history table, and targeted sync modal. Fetches data via useSuperadminData.
'use client';

import { useState } from 'react';
import { useMigrationsData } from '@/app/superadmin/migrations/migrations_utils/useMigrationsData';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { DatabaseZap, AlertTriangle, Play, CheckCircle2, Clock, Search, X, Target } from 'lucide-react';
import type { SchemaMigration } from '@/app/superadmin/migrations/migrations_types/migrations_types';
import toast from 'react-hot-toast';
import SuperadminPagination from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminPagination';

const StatusIcons = {
  SUCCESS: <CheckCircle2 className="text-success" size={18} />,
  PENDING: <Clock className="text-warning" size={18} />,
  FAILED: <AlertTriangle className="text-danger" size={18} />
};

export default function MigrationsClient() {
  const { data, fetchState, error, setData } = useMigrationsData();

  const [showTargetModal, setShowTargetModal] = useState(false);
  const [gymSearchTerm, setGymSearchTerm] = useState('');
  const [isGymDropdownOpen, setIsGymDropdownOpen] = useState(false);
  const [selectedGymId, setSelectedGymId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  if (fetchState === 'loading') return <div className="p-8 text-center text-disabled">Loading...</div>;
  if (error || !data) return <div className="p-8 text-center text-danger">Error loading data.</div>;

  const { migrations: DUMMY_MIGRATIONS, tenants: DUMMY_TENANTS } = data;

  const pendingCount = DUMMY_MIGRATIONS.filter(m => m.status === 'PENDING').length;

  const totalPages = Math.ceil(DUMMY_MIGRATIONS.length / ITEMS_PER_PAGE) || 1;
  const paginatedMigrations = DUMMY_MIGRATIONS.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  
  const filteredGymsForDropdown = DUMMY_TENANTS.filter(t => t.name.toLowerCase().includes(gymSearchTerm.toLowerCase()));
  const selectedGym = DUMMY_TENANTS.find(t => t.id === selectedGymId);

  return (
    <div className="space-y-6 relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Schema Rollouts</h1>
          <p className="text-secondary mt-1">Manage TypeORM migrations across all 50+ tenant databases.</p>
        </div>
      </div>

      {pendingCount > 0 && (
        <div className="bg-warning/10 border border-warning/30 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="p-3 bg-warning/20 rounded-full text-warning">
              <DatabaseZap size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-warning">{pendingCount} Pending Migrations Detected</h2>
              <p className="text-sm text-secondary mt-1">Backend codebase updated. The tenant databases require schema sync.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button 
              onClick={() => setShowTargetModal(true)}
              className="flex-1 md:flex-none bg-input text-foreground px-4 py-3 rounded-lg font-bold hover:bg-border transition-colors flex items-center justify-center gap-2 border border-border"
            >
              <Target size={18} /> Targeted Sync
            </button>
            <button 
              onClick={async () => {
                const loadingToast = toast.loading('Running migrations on all tenants...');
                await new Promise(res => setTimeout(res, 2000));
                
                if (setData && data) {
                  setData({
                    ...data,
                    migrations: data.migrations.map(m => 
                      m.status === 'PENDING' ? { ...m, status: 'SUCCESS', appliedAt: new Date().toISOString() } : m
                    )
                  });
                }
                toast.success('All tenants synced successfully!', { id: loadingToast });
              }}
              className="flex-1 md:flex-none bg-warning text-black px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap shadow-lg shadow-warning/20"
            >
              <Play size={18} /> Run on All Tenants
            </button>
          </div>
        </div>
      )}

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col min-h-[400px]">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">Migration History</h2>
        </div>
        
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-header border-b border-border text-sm">
                <th className="p-4 font-semibold text-secondary w-12"></th>
                <th className="p-4 font-semibold text-secondary">Migration File Name</th>
                <th className="p-4 font-semibold text-secondary">Execution Status</th>
                <th className="p-4 font-semibold text-secondary">Applied At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginatedMigrations.map((mig) => (
                <tr key={mig.id} className="hover:bg-input transition-colors">
                  <td className="p-4 text-center">
                    {StatusIcons[mig.status]}
                  </td>
                  <td className="p-4 text-sm font-mono font-medium text-foreground">
                    {mig.name}.ts
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${
                      mig.status === 'SUCCESS' ? 'text-success bg-success/10 border-success/20' :
                      mig.status === 'PENDING' ? 'text-warning bg-warning/10 border-warning/20' :
                      'text-danger bg-danger-bg/10 border-destructive/20'
                    }`}>
                      {mig.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-secondary font-mono">
                    {mig.appliedAt ? new Date(mig.appliedAt).toLocaleString() : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <SuperadminPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Target Specific Tenant Modal */}
      {showTargetModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowTargetModal(false)}></div>
          <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md overflow-hidden motion-safe:animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">Targeted Migration</h2>
              <button onClick={() => setShowTargetModal(false)} className="text-secondary hover:text-foreground transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-5 space-y-4">
              <p className="text-sm text-secondary mb-4">
                Select a specific Gym database to run the pending TypeORM migrations on. This is useful for canary testing schema changes before a global rollout.
              </p>

              <div className="relative">
                <label className="block text-sm font-medium text-secondary mb-1.5">Select Gym (Tenant)</label>
                
                {/* Custom Searchable Dropdown */}
                <div 
                  className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-foreground cursor-pointer flex justify-between items-center hover:border-primary transition-colors"
                  onClick={() => setIsGymDropdownOpen(!isGymDropdownOpen)}
                >
                  <span className={selectedGym ? 'text-foreground' : 'text-secondary'}>
                    {selectedGym ? `${selectedGym.name} (${selectedGym.plan})` : '-- Choose Gym --'}
                  </span>
                  <span className="text-secondary text-xs">▼</span>
                </div>

                {isGymDropdownOpen && (
                  <div className="absolute z-10 top-[calc(100%+4px)] left-0 right-0 bg-card border border-border rounded-lg shadow-xl overflow-hidden max-h-64 flex flex-col motion-safe:animate-in fade-in zoom-in-95 duration-100">
                    <div className="p-2 border-b border-border bg-header">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-secondary" />
                        <input 
                          type="text" 
                          placeholder="Search gym by name..." 
                          className="w-full pl-8 pr-3 py-1.5 bg-input border border-border rounded text-sm text-foreground focus:outline-none focus:border-primary"
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
                          className="px-3 py-2.5 text-sm text-foreground hover:bg-input hover:text-primary cursor-pointer rounded-md transition-colors"
                          onClick={() => {
                            setSelectedGymId(t.id);
                            setIsGymDropdownOpen(false);
                            setGymSearchTerm('');
                          }}
                        >
                          <span className="font-bold">{t.name}</span> <span className="text-secondary text-xs ml-1">({t.plan})</span>
                        </div>
                      ))}
                      {filteredGymsForDropdown.length === 0 && (
                        <div className="px-3 py-6 text-center text-sm text-disabled font-medium">No gyms found</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-5 border-t border-border bg-header flex justify-end gap-3">
              <button 
                onClick={() => setShowTargetModal(false)}
                className="px-4 py-2 bg-input border border-border text-foreground rounded-lg text-sm font-medium hover:bg-border transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  toast.success(`Running pending migrations on ${selectedGym?.name ?? 'Selected Gym'}...`);
                  setShowTargetModal(false);
                }}
                disabled={!selectedGymId}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  selectedGymId ? 'bg-warning text-black hover:opacity-90' : 'bg-input text-disabled cursor-not-allowed border border-border'
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
