'use client';

import { useState } from 'react';
import AdminHeader from '@/app/admin/admin_components/AdminLayout/AdminHeader';
import {
  Building2, Users, IndianRupee, Activity, ShieldCheck,
  Calendar, X, TrendingUp, TrendingDown, ChevronRight
} from 'lucide-react';
import { useAdminGlobalStore } from '@/app/admin/admin_store/useAdminGlobalStore';
import type { Branch } from '@/app/admin/admin_store/useAdminGlobalStore';
import type { TimeRange } from '@/app/admin/dashboard/dashboard_types/dashboard_types';

type DetailView = 'revenue' | 'expenses' | 'staff' | 'students';

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
}

function getMultiplier(timeRange: TimeRange): number {
  if (timeRange === 'weekly') return 0.25;
  if (timeRange === 'yearly') return 12;
  if (timeRange === 'custom') return 0.5;
  return 1;
}

// ---------- Detail Drawer ----------
function BranchDetailDrawer({
  branch,
  view,
  onClose,
}: {
  branch: Branch;
  view: DetailView;
  onClose: () => void;
}) {
  const methodColor: Record<string, string> = {
    UPI: 'bg-primary/10 text-primary',
    Cash: 'bg-success/10 text-success',
    Card: 'bg-warning/10 text-warning',
  };
  const categoryColor: Record<string, string> = {
    Utilities: 'bg-primary/10 text-primary',
    Payroll: 'bg-warning/10 text-warning',
    Maintenance: 'bg-secondary/10 text-secondary',
    Operations: 'bg-success/10 text-success',
    Marketing: 'bg-danger/10 text-danger',
  };

  const titles: Record<DetailView, string> = {
    revenue: 'Revenue Breakdown',
    expenses: 'Expense Breakdown',
    staff: 'Staff List',
    students: 'Students',
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-card border-l border-border z-50 flex flex-col shadow-2xl motion-safe:animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div>
            <h2 className="font-bold text-foreground text-lg">{titles[view]}</h2>
            <p className="text-sm text-secondary flex items-center gap-1.5 mt-0.5">
              <Building2 size={13} /> {branch.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-input hover:bg-border flex items-center justify-center transition-colors"
            aria-label="Close panel"
          >
            <X size={16} className="text-secondary" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">

          {/* Revenue */}
          {view === 'revenue' && (
            <>
              <div className="bg-success/10 border border-success/20 rounded-xl p-4 mb-4 flex items-center gap-3">
                <TrendingUp size={20} className="text-success" />
                <div>
                  <p className="text-xs text-secondary font-medium">Total Revenue</p>
                  <p className="text-xl font-bold text-success">{formatCurrency(branch.revenue)}</p>
                </div>
              </div>
              {(branch.revenueItems || []).map(item => (
                <div key={item.id} className="flex items-center justify-between p-3.5 bg-input/40 rounded-xl border border-border hover:border-success/40 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-secondary mt-0.5">{new Date(item.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${methodColor[item.method] || 'bg-input text-secondary'}`}>{item.method}</span>
                    <span className="font-bold text-success text-sm">{formatCurrency(item.amount)}</span>
                  </div>
                </div>
              ))}
              {!branch.revenueItems?.length && <p className="text-center text-secondary text-sm py-8">No revenue entries for this period.</p>}
            </>
          )}

          {/* Expenses */}
          {view === 'expenses' && (
            <>
              <div className="bg-danger/10 border border-danger/20 rounded-xl p-4 mb-4 flex items-center gap-3">
                <TrendingDown size={20} className="text-danger" />
                <div>
                  <p className="text-xs text-secondary font-medium">Total Expenses</p>
                  <p className="text-xl font-bold text-danger">{formatCurrency(branch.expenses)}</p>
                </div>
              </div>
              {(branch.expenseItems || []).map(item => (
                <div key={item.id} className="flex items-center justify-between p-3.5 bg-input/40 rounded-xl border border-border hover:border-danger/40 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-secondary mt-0.5">{new Date(item.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColor[item.category] || 'bg-input text-secondary'}`}>{item.category}</span>
                    <span className="font-bold text-danger text-sm">{formatCurrency(item.amount)}</span>
                  </div>
                </div>
              ))}
              {!branch.expenseItems?.length && <p className="text-center text-secondary text-sm py-8">No expense entries for this period.</p>}
            </>
          )}

          {/* Staff */}
          {view === 'staff' && (
            <>
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-4 flex items-center gap-3">
                <Activity size={20} className="text-primary" />
                <div>
                  <p className="text-xs text-secondary font-medium">Total Staff</p>
                  <p className="text-xl font-bold text-primary">{branch.staffCount}</p>
                </div>
              </div>
              {(branch.staffList || []).map(s => (
                <div key={s.id} className="flex items-center justify-between p-3.5 bg-input/40 rounded-xl border border-border">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                      {s.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{s.name}</p>
                      <p className="text-xs text-secondary">{s.role} · {s.shift} shift</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    s.status === 'active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                  }`}>
                    {s.status === 'on-leave' ? 'On Leave' : 'Active'}
                  </span>
                </div>
              ))}
              {!branch.staffList?.length && <p className="text-center text-secondary text-sm py-8">No staff data available.</p>}
            </>
          )}

          {/* Students */}
          {view === 'students' && (
            <>
              <div className="bg-warning/10 border border-warning/20 rounded-xl p-4 mb-4 flex items-center gap-3">
                <Users size={20} className="text-warning" />
                <div>
                  <p className="text-xs text-secondary font-medium">Total Students</p>
                  <p className="text-xl font-bold text-warning">{branch.studentsCount}</p>
                </div>
              </div>
              {(branch.studentList || []).map(s => (
                <div key={s.id} className="flex items-center justify-between p-3.5 bg-input/40 rounded-xl border border-border">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-warning/10 flex items-center justify-center text-warning font-bold text-sm flex-shrink-0">
                      {s.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{s.name}</p>
                      <p className="text-xs text-secondary">{s.plan} · Joined {new Date(s.joinDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    s.status === 'active' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
                  }`}>
                    {s.status === 'active' ? 'Active' : 'Expired'}
                  </span>
                </div>
              ))}
              {!branch.studentList?.length && <p className="text-center text-secondary text-sm py-8">No student data available.</p>}
            </>
          )}
        </div>
      </div>
    </>
  );
}

// ---------- Main Page ----------
export default function AdminBranchesPage() {
  const { branches } = useAdminGlobalStore();
  const [timeRange, setTimeRange] = useState<TimeRange>('monthly');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [detailView, setDetailView] = useState<DetailView | null>(null);

  const multiplier = getMultiplier(timeRange);

  const openDetail = (branch: Branch, view: DetailView) => {
    setSelectedBranch(branch);
    setDetailView(view);
  };
  const closeDetail = () => { setSelectedBranch(null); setDetailView(null); };

  return (
    <div className="min-h-full pb-10">
      <AdminHeader title="Gym Branches" subtitle="Overview of all gym locations and their performance metrics" />

      <div className="p-6 max-w-6xl mx-auto space-y-6">
        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card p-4 border border-border rounded-xl">
          <div className="flex flex-wrap items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">Branch Analytics</h2>
              <span className="text-xs text-secondary flex items-center gap-1 mt-0.5">
                <ShieldCheck size={12} className="text-success" /> Read-only · Click any metric to see details
              </span>
            </div>
          </div>

          <div className="flex justify-end gap-3 items-center flex-wrap">
            {timeRange === 'custom' && (
              <div className="flex flex-wrap items-center gap-2">
                <label className="text-sm font-medium text-secondary">From:</label>
                <input type="date" className="bg-input border border-border text-sm rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                <label className="text-sm font-medium text-secondary">To:</label>
                <input type="date" className="bg-input border border-border text-sm rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary" value={endDate} onChange={(e) => setEndDate(e.target.value)} min={startDate} />
              </div>
            )}
            <select
              value={timeRange}
              onChange={(e) => { setTimeRange(e.target.value as TimeRange); if (e.target.value !== 'custom') { setStartDate(''); setEndDate(''); } }}
              className="bg-input border border-border text-sm rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary cursor-pointer"
            >
              <option value="weekly">This Week</option>
              <option value="monthly">This Month</option>
              <option value="yearly">This Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
        </div>

        {/* Branch Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {branches.map(branch => (
            <div key={branch.id} className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                  <Building2 size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg leading-tight">{branch.name}</h3>
                  <p className="text-sm text-secondary mt-1">{branch.location}</p>
                </div>
              </div>

              {/* Clickable Metric Cards (Rule 74 style) */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <button
                  onClick={() => openDetail(branch, 'revenue')}
                  className="bg-input/50 hover:bg-success/10 hover:border-success/40 border border-transparent rounded-xl p-3 transition-all duration-200 text-left group"
                >
                  <span className="text-xs font-medium text-secondary flex items-center gap-1.5 mb-1">
                    <TrendingUp size={12} className="text-success" /> Revenue
                  </span>
                  <div className="font-bold text-foreground group-hover:text-success transition-colors">{formatCurrency(branch.revenue * multiplier)}</div>
                  <div className="flex items-center gap-0.5 mt-1 text-success opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs">View details</span><ChevronRight size={11} />
                  </div>
                </button>

                <button
                  onClick={() => openDetail(branch, 'expenses')}
                  className="bg-input/50 hover:bg-danger/10 hover:border-danger/40 border border-transparent rounded-xl p-3 transition-all duration-200 text-left group"
                >
                  <span className="text-xs font-medium text-secondary flex items-center gap-1.5 mb-1">
                    <TrendingDown size={12} className="text-danger" /> Expenses
                  </span>
                  <div className="font-bold text-foreground group-hover:text-danger transition-colors">{formatCurrency(branch.expenses * multiplier)}</div>
                  <div className="flex items-center gap-0.5 mt-1 text-danger opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs">View details</span><ChevronRight size={11} />
                  </div>
                </button>

                <button
                  onClick={() => openDetail(branch, 'students')}
                  className="bg-input/50 hover:bg-warning/10 hover:border-warning/40 border border-transparent rounded-xl p-3 transition-all duration-200 text-left group"
                >
                  <span className="text-xs font-medium text-secondary flex items-center gap-1.5 mb-1">
                    <Users size={12} className="text-warning" /> Students
                  </span>
                  <div className="font-bold text-foreground group-hover:text-warning transition-colors">{branch.studentsCount}</div>
                  <div className="flex items-center gap-0.5 mt-1 text-warning opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs">View details</span><ChevronRight size={11} />
                  </div>
                </button>

                <button
                  onClick={() => openDetail(branch, 'staff')}
                  className="bg-input/50 hover:bg-primary/10 hover:border-primary/40 border border-transparent rounded-xl p-3 transition-all duration-200 text-left group"
                >
                  <span className="text-xs font-medium text-secondary flex items-center gap-1.5 mb-1">
                    <Activity size={12} className="text-primary" /> Staff
                  </span>
                  <div className="font-bold text-foreground group-hover:text-primary transition-colors">{branch.staffCount}</div>
                  <div className="flex items-center gap-0.5 mt-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs">View details</span><ChevronRight size={11} />
                  </div>
                </button>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <span className={`text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider ${
                  branch.status === 'active' ? 'bg-success-bg text-success' : 'bg-secondary/10 text-secondary'
                }`}>
                  {branch.status}
                </span>
                <span className="text-xs text-secondary font-medium">ID: {branch.id.toUpperCase()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Drawer */}
      {selectedBranch && detailView && (
        <BranchDetailDrawer branch={selectedBranch} view={detailView} onClose={closeDetail} />
      )}
    </div>
  );
}
