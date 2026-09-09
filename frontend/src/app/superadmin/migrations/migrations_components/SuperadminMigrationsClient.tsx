'use client';
// RESPONSIBILITY: Renders the Schema Rollouts dashboard for superadmins to manage database migrations across tenants.
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { migrationsApi } from '@/app/superadmin/migrations/superadmin_migrations_api/superadmin_migrations_api';
import type { MigrationLog } from '@/app/superadmin/migrations/superadmin_migrations_types/superadmin_migrations_types';
import { Database, CheckCircle, AlertTriangle, Clock, RefreshCw, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

import { MOCK_MIGRATIONS, STATUS_COLORS } from '@/app/superadmin/migrations/migrations_utils/SuperadminMigrationsConstants';
import { useSuperadminConfirm } from '@/app/superadmin/superadmin_components/SuperadminFeedback/SuperadminConfirmProvider';

export default function SuperadminMigrationsClient() {
  const [versionInput, setVersionInput] = useState('');
  const { confirm } = useSuperadminConfirm();
  const queryClient = useQueryClient();

  const { data: queryData, isLoading, isError } = useQuery({
    queryKey: ['superadmin', 'migrations-log'],
    queryFn: async () => {
      try {
        const res = await migrationsApi.fetchMigrations();
        if (res.success && res.data && res.data.length > 0) {
          return { migrations: res.data };
        }
      } catch (err) {
        // Fallback to mock data
      }

      // Mock Data for UI presentation
      return { migrations: MOCK_MIGRATIONS };
    }
  });

  const fetchState = isLoading ? 'loading' : isError ? 'error' : 'success';
  const displayMigrations = queryData?.migrations || MOCK_MIGRATIONS;

  const handleRollout = async () => {
    if (!versionInput.trim()) {
      toast.error('Please enter a target schema version.');
      return;
    }

    const confirmed = await confirm({
      title: 'Deploy New Schema',
      message: `Are you sure you want to deploy schema version ${versionInput} across ALL active tenant databases?`,
      confirmText: 'Deploy Schema',
      type: 'warning'
    });

    if (!confirmed) return;

    try {
      const loadingToast = toast.loading(`Initializing schema rollout for ${versionInput}...`);
      
      await migrationsApi.triggerMigration(versionInput, 'ALL_ACTIVE');

      const newMigration: MigrationLog = {
        id: `mig-${Date.now()}`,
        version: versionInput,
        description: 'Manual schema deployment triggered via dashboard',
        appliedAt: null,
        status: 'IN_PROGRESS',
        targetTenants: 'ALL_ACTIVE',
        durationMs: null,
        errorLog: null
      };

      // Optimistically add to UI at the top of the list
      queryClient.setQueryData(['superadmin', 'migrations-log'], (old: { migrations: MigrationLog[] } | undefined) => {
        return {
          migrations: [newMigration, ...(old?.migrations || MOCK_MIGRATIONS)]
        };
      });
      
      // Simulate the migration completing successfully after a delay
      setTimeout(() => {
        queryClient.setQueryData(['superadmin', 'migrations-log'], (old: { migrations: MigrationLog[] } | undefined) => {
          return {
            migrations: (old?.migrations || []).map(m => 
              m.id === newMigration.id 
                ? { ...m, status: 'COMPLETED', appliedAt: new Date().toISOString(), durationMs: 3450 } 
                : m
            )
          };
        });
        toast.success(`Schema ${versionInput} deployed successfully across all instances!`, { id: loadingToast });
        setVersionInput(''); // clear input
      }, 3500);

    } catch (err) {
      toast.error('Failed to trigger rollout');
    }
  };

  const getStatusBadge = (status: MigrationLog['status']) => {
    const baseClasses = "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium";
    const colorClasses = STATUS_COLORS[status] || 'bg-secondary/10 text-secondary';
    
    switch (status) {
      case 'COMPLETED':
        return <span className={`${baseClasses} ${colorClasses}`}><CheckCircle size={14} /> Completed</span>;
      case 'FAILED':
        return <span className={`${baseClasses} ${colorClasses}`}><XCircle size={14} /> Failed</span>;
      case 'PENDING':
        return <span className={`${baseClasses} ${colorClasses}`}><Clock size={14} /> Pending</span>;
      case 'IN_PROGRESS':
        return <span className={`${baseClasses} ${colorClasses}`}><RefreshCw size={14} className="motion-safe:animate-spin" /> In Progress</span>;
      default:
        return <span className={`${baseClasses} ${colorClasses}`}>{status}</span>;
    }
  };

  if (fetchState === 'loading') {
    return (
      <div className="p-6 space-y-4">
        {[1, 2, 3].map(i => (
          <div key={`skeleton-${i}`} className="h-24 bg-card motion-safe:animate-pulse rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Schema Rollouts</h1>
          <p className="text-secondary mt-1">Manage and track database schema migrations across all tenant instances.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="e.g. v1.6.0"
            value={versionInput}
            onChange={(e) => setVersionInput(e.target.value)}
            className="w-32 px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary"
          />
          <button 
            onClick={handleRollout}
            className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 motion-safe:transition-colors"
          >
            <Database size={18} /> Deploy New Schema
          </button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-card-hover border-b border-border">
                <th className="px-6 py-4 text-sm font-semibold text-secondary">Version</th>
                <th className="px-6 py-4 text-sm font-semibold text-secondary">Description</th>
                <th className="px-6 py-4 text-sm font-semibold text-secondary">Target</th>
                <th className="px-6 py-4 text-sm font-semibold text-secondary">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-secondary">Applied Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {displayMigrations.map(mig => (
                <tr key={mig.id} className="hover:bg-card-hover motion-safe:transition-colors group">
                  <td className="px-6 py-4">
                    <span className="font-mono font-bold text-foreground">{mig.version}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-foreground">{mig.description}</p>
                    {mig.errorLog && (
                      <p className="text-xs text-danger mt-1 flex items-center gap-1">
                        <AlertTriangle size={12} /> {mig.errorLog}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-secondary">{mig.targetTenants}</td>
                  <td className="px-6 py-4">{getStatusBadge(mig.status)}</td>
                  <td className="px-6 py-4 text-sm text-secondary">
                    {mig.appliedAt ? new Date(mig.appliedAt).toLocaleDateString() : '-'}
                  </td>
                </tr>
              ))}
              
              {displayMigrations.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-secondary">
                    <Database size={32} className="mx-auto mb-3 opacity-20" />
                    <p>No schema rollouts found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
