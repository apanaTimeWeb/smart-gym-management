"use client";
// RESPONSIBILITY: Renders filtered branch records as KPI cards and opens the module-owned detail drawer for the selected view.
import { Building2, TrendingUp, TrendingDown, Users, Activity, ChevronRight } from 'lucide-react';
import { useAdminBranchesLogic } from '@/app/admin/branches/branches_context/useAdminBranchesLogic';
import { formatCurrency } from '@/app/admin/admin_layout/admin_utils/AdminFormatCurrency';

import AdminBranchesCardSkeleton from '@/app/admin/branches/branches_components/AdminBranchesCard/AdminBranchesCardSkeleton';
import AdminBranchesEmptyState from '@/app/admin/branches/branches_components/AdminBranchesEmptyState/AdminBranchesEmptyState';
import { BRANCH_STATUS_STYLES } from '@/app/admin/branches/branches_utils/AdminBranchesSharedConstants';

export default function AdminBranchesCard() {
  const { branches, isPending, isError, openDetail, clearFilters, retry } = useAdminBranchesLogic();

  if (isPending) return <AdminBranchesCardSkeleton />;

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card py-16 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-danger-bg"><Building2 size={22} className="text-danger" aria-hidden="true" /></div>
        <p className="text-sm font-medium text-primary">Failed to load branches</p>
        <p className="text-xs text-secondary">Please refresh the page or try again later.</p>
        <button type="button" onClick={() => void retry()} className="motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Retry</button>
      </div>
    );
  }

  if (!branches.length) return <AdminBranchesEmptyState onClearFilters={clearFilters} />;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {branches.map((branch) => (
        <div key={branch.id} className="rounded-xl border border-border bg-card p-5 shadow-card motion-safe:transition-shadow motion-safe:duration-base hover:shadow-card">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-subtle text-primary"><Building2 size={24} aria-hidden="true" /></div>
            <div className="min-w-0">
              <h3 className="text-lg font-bold leading-tight text-primary">{branch.name}</h3>
              <p className="mt-1 text-sm text-secondary">{branch.location}</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button type="button" onClick={() => openDetail(branch, 'revenue')} className="group rounded-xl border border-transparent bg-input p-3 text-left hover:border-success hover:bg-success-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base">
              <span className="mb-1 flex items-center gap-1.5 text-xs font-medium text-secondary"><TrendingUp size={12} className="text-success" aria-hidden="true" /> Revenue</span>
              <div className="font-bold text-primary motion-safe:transition-colors motion-safe:duration-base group-hover:text-success">{formatCurrency(branch.revenue)}</div>
              <span className="mt-1 flex items-center gap-0.5 text-xs text-success"><span>View details</span><ChevronRight size={11} aria-hidden="true" /></span>
            </button>
            <button type="button" onClick={() => openDetail(branch, 'expenses')} className="group rounded-xl border border-transparent bg-input p-3 text-left hover:border-border hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base">
              <span className="mb-1 flex items-center gap-1.5 text-xs font-medium text-secondary"><TrendingDown size={12} className="text-danger" aria-hidden="true" /> Expenses</span>
              <div className="font-bold text-primary motion-safe:transition-colors motion-safe:duration-base group-hover:text-danger">{formatCurrency(branch.expenses)}</div>
              <span className="mt-1 flex items-center gap-0.5 text-xs text-danger"><span>View details</span><ChevronRight size={11} aria-hidden="true" /></span>
            </button>
            <button type="button" onClick={() => openDetail(branch, 'students')} className="group rounded-xl border border-transparent bg-input p-3 text-left hover:border-warning hover:bg-warning-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base">
              <span className="mb-1 flex items-center gap-1.5 text-xs font-medium text-secondary"><Users size={12} className="text-warning" aria-hidden="true" /> Students</span>
              <div className="font-bold text-primary motion-safe:transition-colors motion-safe:duration-base group-hover:text-warning">{branch.studentsCount}</div>
              <span className="mt-1 flex items-center gap-0.5 text-xs text-warning"><span>View details</span><ChevronRight size={11} aria-hidden="true" /></span>
            </button>
            <button type="button" onClick={() => openDetail(branch, 'staff')} className="group rounded-xl border border-transparent bg-input p-3 text-left hover:border-focus hover:bg-primary-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base">
              <span className="mb-1 flex items-center gap-1.5 text-xs font-medium text-secondary"><Activity size={12} className="text-primary" aria-hidden="true" /> Staff</span>
              <div className="font-bold text-primary">{branch.staffCount}</div>
              <span className="mt-1 flex items-center gap-0.5 text-xs text-primary"><span>View details</span><ChevronRight size={11} aria-hidden="true" /></span>
            </button>
          </div>
          <div className="mt-5 space-y-3 border-t border-border pt-4">
            <div className="flex items-center justify-between gap-3">
              <span className={`rounded-full px-2 py-1 text-xs font-bold uppercase tracking-wider ${BRANCH_STATUS_STYLES[branch.status]}`}>{branch.status}</span>
              <span className="text-xs font-medium text-secondary">ID: {branch.id.toUpperCase()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
