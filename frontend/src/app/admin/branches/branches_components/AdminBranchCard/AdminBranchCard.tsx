"use client";
// RESPONSIBILITY: Renders each branch card with revenue/expense/student/staff tiles and the "Open as Manager" impersonation CTA.
import { Building2, TrendingUp, TrendingDown, Users, Activity, ChevronRight, LogIn } from "lucide-react";
import { useAdminBranchesLogic } from "@/app/admin/branches/branches_context/useAdminBranchesLogic";
import { formatCurrency } from "@/lib/formatters";
import AdminBranchCardSkeleton from "@/app/admin/branches/branches_components/AdminBranchCard/AdminBranchCardSkeleton";
import { useAdminBranchesImpersonationStore } from "@/app/admin/branches/branches_store/useAdminBranchesImpersonationStore";
import type { Branch } from "@/app/admin/branches/branches_types/AdminBranchesTypes";


export default function AdminBranchCard() {
  const { branches, isLoading, isError, multiplier, openDetail } = useAdminBranchesLogic();
  const { startImpersonation } = useAdminBranchesImpersonationStore();

  if (isLoading) return <AdminBranchCardSkeleton />;

  if (isError) return (
    <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
      <div className="w-12 h-12 rounded-xl bg-danger flex items-center justify-center">
        <Building2 size={22} className="text-danger" />
      </div>
      <p className="text-sm font-medium text-primary">Failed to load branches</p>
      <p className="text-xs text-secondary">Please refresh the page or try again later.</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {(branches as Branch[]).map((branch) => (
        <div key={branch.id} className="bg-card border border-border rounded-xl p-5 shadow-card hover:shadow-card motion-safe:transition-shadow motion-safe:duration-base">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-subtle flex items-center justify-center flex-shrink-0 text-primary"><Building2 size={24} /></div>
            <div>
              <h3 className="font-bold text-primary text-lg leading-tight">{branch.name}</h3>
              <p className="text-sm text-secondary mt-1">{branch.location}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-6">
            <button onClick={() => openDetail(branch, "revenue")} className="bg-input hover:bg-success hover:border-success border border-transparent rounded-xl p-3 motion-safe:transition-all motion-safe:duration-base text-left group">
              <span className="text-xs font-medium text-secondary flex items-center gap-1.5 mb-1"><TrendingUp size={12} className="text-success" /> Revenue</span>
              <div className="font-bold text-primary group-hover:text-success motion-safe:transition-colors motion-safe:duration-base">{formatCurrency(branch.revenue * multiplier)}</div>
              <div className="flex items-center gap-0.5 mt-1 text-success opacity-100 lg:opacity-0 lg:group-hover:opacity-100 motion-safe:transition-opacity motion-safe:duration-base"><span className="text-xs">View details</span><ChevronRight size={11} /></div>
            </button>
            <button onClick={() => openDetail(branch, "expenses")} className="bg-input hover:bg-surface-hover hover:border-border border border-transparent rounded-xl p-3 motion-safe:transition-all motion-safe:duration-base text-left group">
              <span className="text-xs font-medium text-secondary flex items-center gap-1.5 mb-1"><TrendingDown size={12} className="text-danger" /> Expenses</span>
              <div className="font-bold text-primary group-hover:text-danger motion-safe:transition-colors motion-safe:duration-base">{formatCurrency(branch.expenses * multiplier)}</div>
              <div className="flex items-center gap-0.5 mt-1 text-danger opacity-100 lg:opacity-0 lg:group-hover:opacity-100 motion-safe:transition-opacity motion-safe:duration-base"><span className="text-xs">View details</span><ChevronRight size={11} /></div>
            </button>
            <button onClick={() => openDetail(branch, "students")} className="bg-input hover:bg-warning hover:border-warning border border-transparent rounded-xl p-3 motion-safe:transition-all motion-safe:duration-base text-left group">
              <span className="text-xs font-medium text-secondary flex items-center gap-1.5 mb-1"><Users size={12} className="text-warning" /> Students</span>
              <div className="font-bold text-primary group-hover:text-warning motion-safe:transition-colors motion-safe:duration-base">{branch.studentsCount}</div>
              <div className="flex items-center gap-0.5 mt-1 text-warning opacity-100 lg:opacity-0 lg:group-hover:opacity-100 motion-safe:transition-opacity motion-safe:duration-base"><span className="text-xs">View details</span><ChevronRight size={11} /></div>
            </button>
            <button onClick={() => openDetail(branch, "staff")} className="bg-input hover:bg-primary-subtle hover:border-focus border border-transparent rounded-xl p-3 motion-safe:transition-all motion-safe:duration-base text-left group">
              <span className="text-xs font-medium text-secondary flex items-center gap-1.5 mb-1"><Activity size={12} className="text-primary" /> Staff</span>
              <div className="font-bold text-primary group-hover:text-primary motion-safe:transition-colors motion-safe:duration-base">{branch.staffCount}</div>
              <div className="flex items-center gap-0.5 mt-1 text-primary opacity-100 lg:opacity-0 lg:group-hover:opacity-100 motion-safe:transition-opacity motion-safe:duration-base"><span className="text-xs">View details</span><ChevronRight size={11} /></div>
            </button>
          </div>
          <div className="mt-5 border-t border-border pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider ${branch.status === "active" ? "bg-success text-on-success" : "bg-input text-secondary"}`}>{branch.status}</span>
              <span className="text-xs text-secondary font-medium">ID: {branch.id.toUpperCase()}</span>
            </div>
            <button
              onClick={() => startImpersonation({ id: branch.id, name: branch.name, location: branch.location })}
              className="w-full flex items-center justify-center gap-2 py-2 bg-primary-subtle hover:bg-primary-subtle border border-border hover:border-focus rounded-xl text-xs font-bold text-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95"
              aria-label={`Open ${branch.name} as manager`}
            >
              <LogIn size={14} />
              Open as Manager
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}