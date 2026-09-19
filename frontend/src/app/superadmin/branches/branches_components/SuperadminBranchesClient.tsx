// RESPONSIBILITY: Root client component for the Superadmin Branches page.
'use client';
// Renders KPI bar, toolbar, and branches table. Consumes useSuperadminBranchesPage hook.
// DATA FLOW: superadminBranchesApi â†’ useSuperadminBranchesPage â†’ SuperadminBranchesClient
import type { SuperadminBranchStatusFilter } from '@/app/superadmin/branches/branches_types/SuperadminBranchesTypes';
import { Building2, Users, TrendingUp, Ban, Search, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useSuperadminBranchesPage } from '@/app/superadmin/branches/branches_utils/useSuperadminBranchesPage';
import { BRANCH_STATUS_STYLES } from '@/app/superadmin/branches/branches_utils/SuperadminBranchesConstants';
import type { SuperadminBranch } from '@/app/superadmin/branches/branches_types/SuperadminBranchesTypes';
import { useSuperadminConfirm } from '@/app/superadmin/superadmin_components/SuperadminFeedback/SuperadminConfirmProvider';
import { formatCurrency, formatNumber, maskSensitiveData } from '@/lib/formatters';
import SuperadminPagination from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminPagination';
export default function SuperadminBranchesClient() {
    const { branches, isPending, isError: error, search, setSearch, statusFilter, setStatusFilter, currentPage, setCurrentPage, total, totalPages, handleSuspend, handleActivate } = useSuperadminBranchesPage();
    const { confirm } = useSuperadminConfirm();
    const onSuspendClick = async (id: string) => {
        if (await confirm({ title: 'Suspend Branch', message: 'Are you sure you want to suspend this branch? It will immediately revoke access for all branch staff.', type: 'danger', confirmText: 'Suspend' })) {
            handleSuspend(id);
        }
    };
    const onActivateClick = async (id: string) => {
        if (await confirm({ title: 'Activate Branch', message: 'Are you sure you want to activate this branch?', type: 'info', confirmText: 'Activate' })) {
            handleActivate(id);
        }
    };
    const kpis = [
        { label: 'Total Branches', value: total, icon: Building2, color: 'text-primary', bg: 'bg-primary/10' },
        { label: 'Active', value: branches.filter(b => b.status === 'ACTIVE').length, icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10' },
        { label: 'Suspended', value: branches.filter(b => b.status === 'SUSPENDED').length, icon: Ban, color: 'text-danger', bg: 'bg-danger/10' },
        { label: 'Total Members', value: formatNumber(branches.reduce((s, b) => s + b.memberCount, 0)), icon: Users, color: 'text-info', bg: 'bg-info/10' },
        { label: 'Combined Monthly Income', value: formatCurrency(branches.reduce((s, b) => s + b.monthlyRevenue, 0)), icon: TrendingUp, color: 'text-warning', bg: 'bg-warning/10' },
    ];
    if (isPending) {
        return (<div className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (<div key={`sk-${i}`} className="h-24 bg-skeleton-base motion-safe:animate-pulse rounded-xl border border-border"/>))}
        </div>
        <div className="h-96 bg-skeleton-base motion-safe:animate-pulse rounded-xl border border-border"/>
      </div>);
    }
    return (<div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-primary">Branches</h1>
        <p className="text-secondary mt-1 text-sm">All gym branches across every gym on the platform.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {kpis.map((k) => {
            const Icon = k.icon;
            return (<div key={k.label} className="bg-card border border-border rounded-xl p-4 shadow-card motion-safe:hover:-translate-y-1 motion-safe:transition-all motion-safe:duration-base">
              <div className={`w-8 h-8 rounded-lg ${k.bg} flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${k.color}`} strokeWidth={2}/>
              </div>
              <p className="text-xs text-secondary uppercase tracking-wider mb-1">{k.label}</p>
              <p className="text-xl font-bold text-primary">{k.value}</p>
            </div>);
        })}
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative max-w-sm flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary"/>
        <input type="text" placeholder="Search branch, gym, city..." value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary"/>
      </div>
      <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as SuperadminBranchStatusFilter)} className="w-full sm:w-44 px-3 py-2 bg-input border border-border rounded-lg text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <option value="ALL">All Statuses</option><option value="ACTIVE">Active</option><option value="INACTIVE">Inactive</option><option value="SUSPENDED">Suspended</option>
      </select>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-input/40">
                {['Branch', 'Gym', 'Manager', 'City', 'Members', 'Monthly Income', 'Status', 'Actions'].map((h) => (<th key={h} className="text-left px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider">{h}</th>))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {branches.map((branch: SuperadminBranch) => (<tr key={branch.id} className="hover:bg-input/30 motion-safe:transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-primary truncate max-w-xs" title={branch.branchName}>{branch.branchName}</p>
                    <p className="text-xs text-secondary">{branch.location}</p>
                  </td>
                  <td className="px-4 py-3 text-secondary text-xs">{branch.tenantName}</td>
                  <td className="px-4 py-3">
                    <p className="text-primary text-xs">{branch.managerName}</p>
                    <p className="text-secondary text-xs">{maskSensitiveData(branch.managerEmail, 'email')}</p>
                  </td>
                  <td className="px-4 py-3 text-secondary text-xs">{branch.city}</td>
                  <td className="px-4 py-3 text-primary font-medium">{formatNumber(branch.memberCount)}</td>
                  <td className="px-4 py-3 text-success font-medium">{formatCurrency(branch.monthlyRevenue)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${BRANCH_STATUS_STYLES[branch.status] ?? ''}`}>
                      {branch.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {branch.status === 'SUSPENDED' ? (<button onClick={() => onActivateClick(branch.id)} className="min-h-11 px-2.5 py-1.5 flex items-center gap-1 rounded-lg bg-success/10 text-success text-xs font-medium hover:bg-success/20 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success">
                        <CheckCircle2 size={18}/> Activate
                      </button>) : (<button onClick={() => onSuspendClick(branch.id)} className="min-h-11 px-2.5 py-1.5 flex items-center gap-1 rounded-lg bg-danger/10 text-danger text-xs font-medium hover:bg-danger/20 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger">
                        <AlertTriangle size={18}/> Suspend
                      </button>)}
                  </td>
                </tr>))}
            </tbody>
          </table>
        </div>

        {branches.length === 0 && (<div className="py-16 text-center">
            <Building2 size={40} className="text-secondary mx-auto mb-3"/>
            <p className="text-secondary text-sm">No branches found.</p>
          </div>)}

      </div>
      {totalPages > 1 && <SuperadminPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}/>}
    </div>);
}
