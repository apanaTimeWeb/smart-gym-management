'use client';
// RESPONSIBILITY: Root client component for the Superadmin Branches page.
// Renders KPI bar, toolbar, and branches table. Consumes useSuperadminBranchesPage hook.
// DATA FLOW: superadminBranchesApi → useSuperadminBranchesPage → SuperadminBranchesClient

import { useState } from 'react';
import { Building2, Users, TrendingUp, Ban, Search, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useSuperadminBranchesPage } from '@/app/superadmin/branches/branches_utils/useSuperadminBranchesPage';
import { BRANCH_STATUS_STYLES, BRANCHES_PAGE_SIZE } from '@/app/superadmin/branches/branches_utils/SuperadminBranchesConstants';
import type { SuperadminBranch } from '@/app/superadmin/branches/branches_types/superadmin_branches_types';

export default function SuperadminBranchesClient() {
  const { branches, fetchState, search, setSearch, handleSuspend, handleActivate } = useSuperadminBranchesPage();
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(branches.length / BRANCHES_PAGE_SIZE) || 1;
  const paginated = branches.slice((page - 1) * BRANCHES_PAGE_SIZE, page * BRANCHES_PAGE_SIZE);

  const kpis = [
    { label: 'Total Branches', value: branches.length, icon: Building2, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Active', value: branches.filter(b => b.status === 'ACTIVE').length, icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10' },
    { label: 'Suspended', value: branches.filter(b => b.status === 'SUSPENDED').length, icon: Ban, color: 'text-danger', bg: 'bg-danger/10' },
    { label: 'Total Members', value: branches.reduce((s, b) => s + b.memberCount, 0).toLocaleString('en-IN'), icon: Users, color: 'text-info', bg: 'bg-info/10' },
    { label: 'Combined MRR', value: `₹${branches.reduce((s, b) => s + b.monthlyRevenue, 0).toLocaleString('en-IN')}`, icon: TrendingUp, color: 'text-warning', bg: 'bg-warning/10' },
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
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Branches</h1>
        <p className="text-secondary mt-1 text-sm">All gym branches across every tenant on the platform.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div
              key={k.label}
              className="bg-card border border-border rounded-xl p-4 shadow-sm motion-safe:hover:-translate-y-1 motion-safe:transition-all motion-safe:duration-200"
              style={{ background: 'linear-gradient(180deg, rgba(250,204,21,0.08), rgba(255,255,255,0.02))' }}
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
          placeholder="Search branch, tenant, city..."
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
                {['Branch', 'Tenant', 'Manager', 'City', 'Members', 'MRR', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginated.map((branch: SuperadminBranch) => (
                <tr key={branch.id} className="hover:bg-input/30 motion-safe:transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-foreground truncate max-w-[160px]" title={branch.branchName}>{branch.branchName}</p>
                    <p className="text-xs text-secondary">{branch.location}</p>
                  </td>
                  <td className="px-4 py-3 text-secondary text-xs">{branch.tenantName}</td>
                  <td className="px-4 py-3">
                    <p className="text-foreground text-xs">{branch.managerName}</p>
                    <p className="text-secondary text-xs">{branch.managerEmail}</p>
                  </td>
                  <td className="px-4 py-3 text-secondary text-xs">{branch.city}</td>
                  <td className="px-4 py-3 text-foreground font-medium">{branch.memberCount.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3 text-success font-medium">₹{branch.monthlyRevenue.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${BRANCH_STATUS_STYLES[branch.status] ?? ''}`}>
                      {branch.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {branch.status === 'SUSPENDED' ? (
                      <button
                        onClick={() => handleActivate(branch.id)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-success/10 text-success text-xs font-medium hover:bg-success/20 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success"
                      >
                        <CheckCircle2 size={12} /> Activate
                      </button>
                    ) : (
                      <button
                        onClick={() => handleSuspend(branch.id)}
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

        {branches.length === 0 && (
          <div className="py-16 text-center">
            <Building2 size={40} className="text-secondary mx-auto mb-3" />
            <p className="text-secondary text-sm">No branches found.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <p className="text-xs text-secondary">
              Showing {(page - 1) * BRANCHES_PAGE_SIZE + 1}–{Math.min(page * BRANCHES_PAGE_SIZE, branches.length)} of {branches.length}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 rounded-lg bg-input border border-border text-xs text-secondary disabled:opacity-40 hover:text-foreground motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 rounded-lg bg-input border border-border text-xs text-secondary disabled:opacity-40 hover:text-foreground motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
