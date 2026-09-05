"use client";
import { Building2, TrendingUp, TrendingDown, Users, Activity, ChevronRight } from "lucide-react";
import { useAdminBranchesLogic } from "@/app/admin/branches/branches_context/useAdminBranchesLogic";
import { formatCurrency } from "@/lib/formatters";

export default function AdminBranchCard() {
  const { branches, multiplier, openDetail } = useAdminBranchesLogic();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {branches.map(branch => (
        <div key={branch.id} className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary"><Building2 size={24} /></div>
            <div>
              <h3 className="font-bold text-text-primary text-lg leading-tight">{branch.name}</h3>
              <p className="text-sm text-text-secondary mt-1">{branch.location}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-6">
            <button onClick={() => openDetail(branch, "revenue")} className="bg-bg-input/50 hover:bg-success/10 hover:border-success/40 border border-transparent rounded-xl p-3 transition-all duration-200 text-left group">
              <span className="text-xs font-medium text-text-secondary flex items-center gap-1.5 mb-1"><TrendingUp size={12} className="text-success" /> Revenue</span>
              <div className="font-bold text-text-primary group-hover:text-success transition-colors">{formatCurrency(branch.revenue * multiplier)}</div>
              <div className="flex items-center gap-0.5 mt-1 text-success opacity-0 group-hover:opacity-100 transition-opacity"><span className="text-xs">View details</span><ChevronRight size={11} /></div>
            </button>
            <button onClick={() => openDetail(branch, "expenses")} className="bg-bg-input/50 hover:bg-danger/10 hover:border-danger/40 border border-transparent rounded-xl p-3 transition-all duration-200 text-left group">
              <span className="text-xs font-medium text-text-secondary flex items-center gap-1.5 mb-1"><TrendingDown size={12} className="text-danger" /> Expenses</span>
              <div className="font-bold text-text-primary group-hover:text-danger transition-colors">{formatCurrency(branch.expenses * multiplier)}</div>
              <div className="flex items-center gap-0.5 mt-1 text-danger opacity-0 group-hover:opacity-100 transition-opacity"><span className="text-xs">View details</span><ChevronRight size={11} /></div>
            </button>
            <button onClick={() => openDetail(branch, "students")} className="bg-bg-input/50 hover:bg-warning/10 hover:border-warning/40 border border-transparent rounded-xl p-3 transition-all duration-200 text-left group">
              <span className="text-xs font-medium text-text-secondary flex items-center gap-1.5 mb-1"><Users size={12} className="text-warning" /> Students</span>
              <div className="font-bold text-text-primary group-hover:text-warning transition-colors">{branch.studentsCount}</div>
              <div className="flex items-center gap-0.5 mt-1 text-warning opacity-0 group-hover:opacity-100 transition-opacity"><span className="text-xs">View details</span><ChevronRight size={11} /></div>
            </button>
            <button onClick={() => openDetail(branch, "staff")} className="bg-bg-input/50 hover:bg-primary/10 hover:border-primary/40 border border-transparent rounded-xl p-3 transition-all duration-200 text-left group">
              <span className="text-xs font-medium text-text-secondary flex items-center gap-1.5 mb-1"><Activity size={12} className="text-primary" /> Staff</span>
              <div className="font-bold text-text-primary group-hover:text-primary transition-colors">{branch.staffCount}</div>
              <div className="flex items-center gap-0.5 mt-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity"><span className="text-xs">View details</span><ChevronRight size={11} /></div>
            </button>
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
            <span className={`text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider ${branch.status === "active" ? "bg-success-bg text-success" : "bg-bg-overlay text-text-secondary"}`}>{branch.status}</span>
            <span className="text-xs text-text-secondary font-medium">ID: {branch.id.toUpperCase()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

