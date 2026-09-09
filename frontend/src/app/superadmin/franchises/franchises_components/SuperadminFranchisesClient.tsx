'use client';
// RESPONSIBILITY: Root client component for the Superadmin Franchises page.
// DATA FLOW: superadminFranchisesApi → useSuperadminFranchisesPage → SuperadminFranchisesClient

import { useState } from 'react';
import { Network, Users, TrendingUp, Ban, Search, CheckCircle2, AlertTriangle, Building2 } from 'lucide-react';
import { useSuperadminFranchisesPage } from '@/app/superadmin/franchises/franchises_utils/useSuperadminFranchisesPage';
import { FRANCHISE_STATUS_STYLES, FRANCHISES_PAGE_SIZE } from '@/app/superadmin/franchises/franchises_utils/SuperadminFranchisesConstants';
import type { SuperadminFranchise } from '@/app/superadmin/franchises/franchises_types/superadmin_franchises_types';
import { useSuperadminConfirm } from '@/app/superadmin/superadmin_components/SuperadminFeedback/SuperadminConfirmProvider';

export default function SuperadminFranchisesClient() {
  const { franchises, fetchState, search, setSearch, handleSuspend, handleActivate } = useSuperadminFranchisesPage();
  const [page, setPage] = useState(1);
  const { confirm } = useSuperadminConfirm();

  const onSuspendClick = async (id: string) => {
    if (await confirm({ title: 'Suspend Franchise', message: 'Are you sure you want to suspend this franchise? It will immediately revoke access for all branch staff under this franchise.', type: 'danger', confirmText: 'Suspend' })) {
      handleSuspend(id);
    }
  };

  const onActivateClick = async (id: string) => {
    if (await confirm({ title: 'Activate Franchise', message: 'Are you sure you want to activate this franchise?', type: 'info', confirmText: 'Activate' })) {
      handleActivate(id);
    }
  };

  const totalPages = Math.ceil(franchises.length / FRANCHISES_PAGE_SIZE) || 1;
  const paginated = franchises.slice((page - 1) * FRANCHISES_PAGE_SIZE, page * FRANCHISES_PAGE_SIZE);

  const kpis = [
    { label: 'Total Franchises', value: franchises.length, icon: Network, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Active', value: franchises.filter(f => f.status === 'ACTIVE').length, icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10' },
    { label: 'Total Branches', value: franchises.reduce((s, f) => s + f.branchCount, 0), icon: Building2, color: 'text-info', bg: 'bg-info/10' },
    { label: 'Total Members', value: franchises.reduce((s, f) => s + f.totalMembers, 0).toLocaleString('en-IN'), icon: Users, color: 'text-warning', bg: 'bg-warning/10' },
    { label: 'Combined MRR', value: `₹${franchises.reduce((s, f) => s + f.totalMonthlyRevenue, 0).toLocaleString('en-IN')}`, icon: TrendingUp, color: 'text-success', bg: 'bg-success/10' },
  ];

  if (fetchState === 'loading') {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={`sk-${i}`} className="h-24 bg-skeleton-base motion-safe:animate-pulse rounded-xl border border-border" />
          ))}
        </div>
        <div className="h-96 bg-skeleton-base motion-safe:animate-pulse rounded-xl border border-border" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Franchises</h1>
        <p className="text-secondary mt-1 text-sm">Multi-branch franchise networks across the platform.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div
              key={k.label}
              className="bg-card border border-border rounded-xl p-4 shadow-sm motion-safe:hover:-translate-y-1 motion-safe:transition-all motion-safe:duration-200 bg-gradient-to-b from-yellow-400/10 to-transparent"
            >
              <div className={`w-8 h-8 rounded-lg ${k.bg} flex items-center justify-center mb-3`}>
                <Icon size={18} strokeWidth={2} className={k.color} />
              </div>
              <p className="text-xs text-secondary uppercase tracking-wider mb-1">{k.label}</p>
              <p className="text-xl font-bold text-foreground">{k.value}</p>
            </div>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
        <input
          type="text"
          placeholder="Search franchise, owner, city..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-input/40">
                {['Franchise', 'Owner', 'Plan', 'Branches', 'Members', 'MRR', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginated.map((f: SuperadminFranchise) => (
                <tr key={f.id} className="hover:bg-input/30 motion-safe:transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-foreground">{f.franchiseName}</p>
                    <p className="text-xs text-secondary">{f.city}, {f.state}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-foreground text-xs">{f.ownerName}</p>
                    <p className="text-secondary text-xs">{f.ownerEmail}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-primary-subtle text-primary border border-primary/20">
                      {f.plan}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-foreground font-medium">{f.branchCount}</td>
                  <td className="px-4 py-3 text-foreground font-medium">{f.totalMembers.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3 text-success font-medium">₹{f.totalMonthlyRevenue.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${FRANCHISE_STATUS_STYLES[f.status] ?? ''}`}>
                      {f.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {f.status === 'SUSPENDED' ? (
                      <button
                        onClick={() => onActivateClick(f.id)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-success/10 text-success text-xs font-medium hover:bg-success/20 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success"
                      >
                        <CheckCircle2 size={12} /> Activate
                      </button>
                    ) : (
                      <button
                        onClick={() => onSuspendClick(f.id)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-danger/10 text-danger text-xs font-medium hover:bg-danger/20 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger"
                      >
                        <AlertTriangle size={12} /> Suspend
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {franchises.length === 0 && (
          <div className="py-16 text-center">
            <Network size={40} className="text-secondary mx-auto mb-3" />
            <p className="text-secondary text-sm">No franchises found.</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <p className="text-xs text-secondary">
              Showing {(page - 1) * FRANCHISES_PAGE_SIZE + 1}–{Math.min(page * FRANCHISES_PAGE_SIZE, franchises.length)} of {franchises.length}
            </p>
            <div className="flex gap-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1.5 rounded-lg bg-input border border-border text-xs text-secondary disabled:opacity-40 hover:text-foreground motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Previous</button>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1.5 rounded-lg bg-input border border-border text-xs text-secondary disabled:opacity-40 hover:text-foreground motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
