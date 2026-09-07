'use client';

import { useState, useMemo } from 'react';
import { ShieldAlert, Search, Trash2, Edit, PlusCircle, AlertCircle, RefreshCw, X, Download, Eye, LogIn, LogOut, Settings, CreditCard, Users } from 'lucide-react';
import AdminHeader from '@/app/admin/admin_components/AdminLayout/AdminHeader';
import AdminPagination from '@/app/admin/admin_components/AdminShared/AdminPagination';
import { useAdminGlobalStore } from '@/app/admin/admin_store/useAdminGlobalStore';
import { useAdminBranchesData } from '@/app/admin/admin_store/useAdminBranchesData';
import type { Branch } from '@/app/admin/admin_store/useAdminGlobalStore';

const ITEMS_PER_PAGE = 10;

interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  branchId: string;
  details: string;
  severity: 'high' | 'medium' | 'low';
  ip?: string;
  module: string;
}

const MOCK_LOGS: AuditLog[] = [
  { id: '1',  timestamp: '2025-01-20T10:30:00Z', action: 'DELETED_PAYMENT',    user: 'Rahul Verma (Manager)',    branchId: 'b1', details: 'Deleted payment INV-1042 (Amount: ₹5,000, Member: John Doe)',          severity: 'high',   ip: '192.168.1.10', module: 'Finance' },
  { id: '2',  timestamp: '2025-01-20T09:15:00Z', action: 'UPDATED_PLAN',       user: 'Super Admin',              branchId: 'all', details: 'Changed Annual Pro price from ₹12,000 to ₹15,000',                  severity: 'medium', ip: '10.0.0.1',    module: 'Plans' },
  { id: '3',  timestamp: '2025-01-19T18:45:00Z', action: 'ADDED_STAFF',        user: 'Super Admin',              branchId: 'b2', details: 'Added new trainer: Vikas Singh (Role: General Trainer)',              severity: 'low',    ip: '10.0.0.1',    module: 'HR' },
  { id: '4',  timestamp: '2025-01-19T14:20:00Z', action: 'REFUND_ISSUED',      user: 'Pooja Sharma (Manager)',   branchId: 'b2', details: 'Refunded ₹2,000 to Member ID: MEM-009 (Ananya Reddy)',               severity: 'high',   ip: '192.168.1.22', module: 'Finance' },
  { id: '5',  timestamp: '2025-01-18T11:00:00Z', action: 'LOGIN_FAILED',       user: 'Unknown IP',               branchId: 'b1', details: '5 failed login attempts for manager@andheri.com',                    severity: 'high',   ip: '203.0.113.5',  module: 'Auth' },
  { id: '6',  timestamp: '2025-01-18T09:30:00Z', action: 'MEMBER_SUSPENDED',   user: 'Rahul Verma (Manager)',    branchId: 'b1', details: 'Suspended member Karan Mehta (MEM-005) due to non-payment',          severity: 'medium', ip: '192.168.1.10', module: 'Members' },
  { id: '7',  timestamp: '2025-01-17T16:00:00Z', action: 'SETTINGS_CHANGED',   user: 'Super Admin',              branchId: 'all', details: 'Updated GST number from 27AABCU9603R1ZX to 27AABCU9603R1ZY',       severity: 'medium', ip: '10.0.0.1',    module: 'Settings' },
  { id: '8',  timestamp: '2025-01-17T13:45:00Z', action: 'BULK_IMPORT',        user: 'Super Admin',              branchId: 'b3', details: 'Imported 45 new members from CSV file (members_jan2025.csv)',        severity: 'low',    ip: '10.0.0.1',    module: 'Members' },
  { id: '9',  timestamp: '2025-01-16T11:20:00Z', action: 'STAFF_DELETED',      user: 'Super Admin',              branchId: 'b2', details: 'Deleted staff record: Mohan Das (Role: Receptionist)',               severity: 'high',   ip: '10.0.0.1',    module: 'HR' },
  { id: '10', timestamp: '2025-01-16T09:00:00Z', action: 'PLAN_DELETED',       user: 'Super Admin',              branchId: 'all', details: 'Deleted plan: "Trial 7-Day" (was assigned to 0 members)',           severity: 'medium', ip: '10.0.0.1',    module: 'Plans' },
  { id: '11', timestamp: '2025-01-15T17:30:00Z', action: 'ADMIN_LOGIN',        user: 'Super Admin',              branchId: 'all', details: 'Successful admin login from new device (Chrome/Windows)',            severity: 'low',    ip: '10.0.0.1',    module: 'Auth' },
  { id: '12', timestamp: '2025-01-15T14:10:00Z', action: 'EXPENSE_ADDED',      user: 'Pooja Sharma (Manager)',   branchId: 'b2', details: 'Added expense: Rent ₹32,000 for January 2025',                       severity: 'low',    ip: '192.168.1.22', module: 'Finance' },
  { id: '13', timestamp: '2025-01-14T12:00:00Z', action: 'MEMBER_DELETED',     user: 'Rahul Verma (Manager)',    branchId: 'b1', details: 'Permanently deleted member record: Suresh Kumar (MEM-011)',           severity: 'high',   ip: '192.168.1.10', module: 'Members' },
  { id: '14', timestamp: '2025-01-14T10:30:00Z', action: 'PAYROLL_GENERATED',  user: 'Super Admin',              branchId: 'all', details: 'Generated payroll for January 2025 (15 staff, Total: ₹2,45,000)',   severity: 'low',    ip: '10.0.0.1',    module: 'HR' },
  { id: '15', timestamp: '2025-01-13T16:45:00Z', action: 'BRANCH_UPDATED',     user: 'Super Admin',              branchId: 'b3', details: 'Updated branch details: Westside Mall — changed manager to Priya K', severity: 'medium', ip: '10.0.0.1',    module: 'Branches' },
  { id: '16', timestamp: '2025-01-13T11:00:00Z', action: 'PAYMENT_ADDED',      user: 'Rahul Verma (Manager)',    branchId: 'b1', details: 'Recorded payment INV-1089 ₹3,500 from Divya Singh (UPI)',             severity: 'low',    ip: '192.168.1.10', module: 'Finance' },
  { id: '17', timestamp: '2025-01-12T15:20:00Z', action: 'LOGIN_FAILED',       user: 'Unknown IP',               branchId: 'b2', details: '3 failed login attempts for pooja@uptown.com',                       severity: 'high',   ip: '198.51.100.7', module: 'Auth' },
  { id: '18', timestamp: '2025-01-12T09:45:00Z', action: 'MEMBER_FROZEN',      user: 'Pooja Sharma (Manager)',   branchId: 'b2', details: 'Froze membership for Rohan Gupta (MEM-007) — medical leave',          severity: 'medium', ip: '192.168.1.22', module: 'Members' },
  { id: '19', timestamp: '2025-01-11T14:00:00Z', action: 'ADDED_STAFF',        user: 'Super Admin',              branchId: 'b1', details: 'Added new receptionist: Kavya Nair (Role: Receptionist)',             severity: 'low',    ip: '10.0.0.1',    module: 'HR' },
  { id: '20', timestamp: '2025-01-11T10:15:00Z', action: 'SETTINGS_CHANGED',   user: 'Super Admin',              branchId: 'all', details: 'Enabled Two-Factor Authentication for all admin accounts',           severity: 'medium', ip: '10.0.0.1',    module: 'Settings' },
  { id: '21', timestamp: '2025-01-10T17:00:00Z', action: 'REFUND_ISSUED',      user: 'Rahul Verma (Manager)',    branchId: 'b1', details: 'Refunded ₹1,500 to Amit Verma (MEM-003) — plan downgrade',           severity: 'high',   ip: '192.168.1.10', module: 'Finance' },
  { id: '22', timestamp: '2025-01-10T13:30:00Z', action: 'PLAN_CREATED',       user: 'Super Admin',              branchId: 'all', details: 'Created new plan: "Couple Fitness" ₹8,000/month',                   severity: 'low',    ip: '10.0.0.1',    module: 'Plans' },
  { id: '23', timestamp: '2025-01-09T11:45:00Z', action: 'MEMBER_SUSPENDED',   user: 'Priya K (Manager)',        branchId: 'b3', details: 'Suspended Meera Pillai (MEM-012) — 3 months non-payment',            severity: 'medium', ip: '192.168.1.33', module: 'Members' },
  { id: '24', timestamp: '2025-01-09T09:00:00Z', action: 'ADMIN_LOGIN',        user: 'Rahul Verma (Manager)',    branchId: 'b1', details: 'Manager login from mobile device (Safari/iOS)',                       severity: 'low',    ip: '192.168.1.10', module: 'Auth' },
  { id: '25', timestamp: '2025-01-08T16:20:00Z', action: 'DELETED_PAYMENT',    user: 'Super Admin',              branchId: 'b3', details: 'Voided payment INV-0987 (duplicate entry, Amount: ₹4,200)',           severity: 'high',   ip: '10.0.0.1',    module: 'Finance' },
  { id: '26', timestamp: '2025-01-08T12:00:00Z', action: 'BRANCH_CREATED',     user: 'Super Admin',              branchId: 'all', details: 'Created new branch: East Side Hub (Location: Andheri East)',        severity: 'low',    ip: '10.0.0.1',    module: 'Branches' },
  { id: '27', timestamp: '2025-01-07T15:00:00Z', action: 'PAYROLL_PAID',       user: 'Super Admin',              branchId: 'all', details: 'Marked payroll as paid for December 2024 (₹2,38,000)',              severity: 'low',    ip: '10.0.0.1',    module: 'HR' },
  { id: '28', timestamp: '2025-01-07T10:30:00Z', action: 'UPDATED_PLAN',       user: 'Super Admin',              branchId: 'all', details: 'Updated Gold Plan features — added "Personal Training 2x/week"',    severity: 'medium', ip: '10.0.0.1',    module: 'Plans' },
  { id: '29', timestamp: '2025-01-06T14:45:00Z', action: 'STAFF_DELETED',      user: 'Super Admin',              branchId: 'b3', details: 'Removed staff: Arun Pillai (Role: Trainer) — resigned',              severity: 'high',   ip: '10.0.0.1',    module: 'HR' },
  { id: '30', timestamp: '2025-01-06T09:15:00Z', action: 'EXPENSE_ADDED',      user: 'Priya K (Manager)',        branchId: 'b3', details: 'Added expense: Equipment Repair ₹8,500 (Treadmill belt replacement)', severity: 'low',    ip: '192.168.1.33', module: 'Finance' },
];

const SEVERITY_STYLES: Record<string, string> = {
  high:   'bg-danger-bg text-danger border border-danger/30',
  medium: 'bg-warning-bg text-warning border border-warning/30',
  low:    'bg-success-bg text-success border border-success/30',
};

const MODULE_OPTIONS = ['All', 'Finance', 'Members', 'HR', 'Plans', 'Auth', 'Settings', 'Branches'];

function getActionIcon(action: string) {
  if (action.includes('DELETE') || action.includes('REFUND')) return <Trash2 size={15} className="text-danger" />;
  if (action.includes('UPDATE') || action.includes('SETTINGS')) return <Settings size={15} className="text-warning" />;
  if (action.includes('ADD') || action.includes('CREATE') || action.includes('IMPORT')) return <PlusCircle size={15} className="text-success" />;
  if (action.includes('FAIL')) return <AlertCircle size={15} className="text-danger" />;
  if (action.includes('LOGIN')) return <LogIn size={15} className="text-info" />;
  if (action.includes('LOGOUT')) return <LogOut size={15} className="text-secondary" />;
  if (action.includes('MEMBER')) return <Users size={15} className="text-primary" />;
  if (action.includes('PAYMENT') || action.includes('PAYROLL')) return <CreditCard size={15} className="text-success" />;
  return <Edit size={15} className="text-primary" />;
}

function exportToCSV(logs: AuditLog[]) {
  const headers = ['Timestamp', 'Action', 'Module', 'User', 'Branch', 'Details', 'Severity', 'IP'];
  const rows = logs.map(l => [
    new Date(l.timestamp).toLocaleString(),
    l.action,
    l.module,
    l.user,
    l.branchId,
    `"${l.details}"`,
    l.severity,
    l.ip ?? '',
  ]);
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `audit_logs_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminAuditLogsMain() {
  const { selectedBranchId } = useAdminGlobalStore();
  const { data: branchesData = [] } = useAdminBranchesData();
  const branches = Array.isArray(branchesData) ? branchesData : [];

  const [search, setSearch] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('All');
  const [filterModule, setFilterModule] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  const getBranchName = (id: string) => {
    if (id === 'all') return 'Global (System)';
    const b = (branches as Branch[]).find(b => b.id === id);
    return b ? b.name : id;
  };

  const filteredLogs = useMemo(() => {
    setCurrentPage(1);
    return MOCK_LOGS.filter(log => {
      const matchesBranch = selectedBranchId === 'all' || log.branchId === selectedBranchId || log.branchId === 'all';
      const matchesSeverity = filterSeverity === 'All' || log.severity === filterSeverity.toLowerCase();
      const matchesModule = filterModule === 'All' || log.module === filterModule;
      const q = search.toLowerCase();
      const matchesSearch = !q || log.details.toLowerCase().includes(q) || log.user.toLowerCase().includes(q) || log.action.toLowerCase().includes(q);
      return matchesBranch && matchesSeverity && matchesModule && matchesSearch;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBranchId, filterSeverity, filterModule, search]);

  const totalPages = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE);
  const paginated = filteredLogs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const highCount = filteredLogs.filter(l => l.severity === 'high').length;
  const mediumCount = filteredLogs.filter(l => l.severity === 'medium').length;
  const lowCount = filteredLogs.filter(l => l.severity === 'low').length;

  return (
    <div className="min-h-full">
      <AdminHeader title="Audit Logs & Security" subtitle="Monitor critical system actions and prevent fraud." />

      <div className="p-6 max-w-7xl mx-auto space-y-5">

        {/* KPI Summary */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'High Severity', count: highCount, style: 'text-danger', bg: 'bg-danger-bg border-danger/20' },
            { label: 'Medium Severity', count: mediumCount, style: 'text-warning', bg: 'bg-warning-bg border-warning/20' },
            { label: 'Low Severity', count: lowCount, style: 'text-success', bg: 'bg-success-bg border-success/20' },
          ].map(k => (
            <div key={k.label} className={`rounded-xl p-4 border ${k.bg}`}>
              <p className="text-xs font-medium text-secondary uppercase tracking-wider">{k.label}</p>
              <p className={`text-2xl font-bold mt-1 ${k.style}`}>{k.count}</p>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card p-4 rounded-xl border border-border">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
              <ShieldAlert size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">Activity Monitor</h2>
              <p className="text-xs text-secondary">Showing {filteredLogs.length} of {MOCK_LOGS.length} events</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={15} />
              <input
                type="text"
                placeholder="Search logs..."
                className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-xl text-sm focus:border-primary text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                value={search}
                onChange={e => setSearch(e.target.value)}
                aria-label="Search audit logs"
              />
            </div>
            <select
              className="bg-input border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:border-primary"
              value={filterSeverity}
              onChange={e => setFilterSeverity(e.target.value)}
              aria-label="Filter by severity"
            >
              <option value="All">All Severity</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <select
              className="bg-input border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:border-primary"
              value={filterModule}
              onChange={e => setFilterModule(e.target.value)}
              aria-label="Filter by module"
            >
              {MODULE_OPTIONS.map(m => <option key={m} value={m}>{m === 'All' ? 'All Modules' : m}</option>)}
            </select>
            <button
              onClick={() => exportToCSV(filteredLogs)}
              className="flex items-center gap-2 px-3 py-2 bg-input border border-border rounded-xl text-sm text-secondary hover:text-foreground motion-safe:transition-colors"
              aria-label="Export logs as CSV"
            >
              <Download size={15} /> Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-primary/5 border-b border-border">
                  <th className="p-4 text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap">Timestamp</th>
                  <th className="p-4 text-xs font-semibold text-secondary uppercase tracking-wider">Action & Module</th>
                  <th className="p-4 text-xs font-semibold text-secondary uppercase tracking-wider">Performed By</th>
                  <th className="p-4 text-xs font-semibold text-secondary uppercase tracking-wider">Branch</th>
                  <th className="p-4 text-xs font-semibold text-secondary uppercase tracking-wider">Details</th>
                  <th className="p-4 text-xs font-semibold text-secondary uppercase tracking-wider text-center">Severity</th>
                  <th className="p-4 text-xs font-semibold text-secondary uppercase tracking-wider text-center">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-10 text-center text-secondary">
                      <ShieldAlert size={32} className="mx-auto mb-3 opacity-30" />
                      <p>No logs found matching your criteria.</p>
                    </td>
                  </tr>
                ) : (
                  paginated.map(log => (
                    <tr key={log.id} className="hover:bg-input/40 motion-safe:transition-colors cursor-pointer group" onClick={() => setSelectedLog(log)}>
                      <td className="p-4 text-xs text-secondary whitespace-nowrap">
                        {new Date(log.timestamp).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-input flex items-center justify-center border border-border flex-shrink-0">
                            {getActionIcon(log.action)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">{log.action.replace(/_/g, ' ')}</p>
                            <p className="text-xs text-secondary">{log.module}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-foreground whitespace-nowrap">{log.user}</td>
                      <td className="p-4 text-xs text-secondary whitespace-nowrap">{getBranchName(log.branchId)}</td>
                      <td className="p-4 text-sm text-secondary max-w-xs truncate" title={log.details}>{log.details}</td>
                      <td className="p-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide inline-block ${SEVERITY_STYLES[log.severity]}`}>
                          {log.severity}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={e => { e.stopPropagation(); setSelectedLog(log); }}
                          className="p-1.5 rounded-lg text-secondary hover:text-primary hover:bg-input motion-safe:transition-colors opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
                          aria-label="View log details"
                        >
                          <Eye size={15} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div className="border-t border-border">
              <AdminPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={filteredLogs.length}
                itemsPerPage={ITEMS_PER_PAGE}
              />
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedLog && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={() => setSelectedLog(null)} />
          <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
            <div className="bg-overlay border border-border rounded-2xl shadow-2xl w-full max-w-lg">
              <div className="flex items-center justify-between p-5 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-input flex items-center justify-center border border-border">
                    {getActionIcon(selectedLog.action)}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{selectedLog.action.replace(/_/g, ' ')}</h3>
                    <p className="text-xs text-secondary">{selectedLog.module} Module</p>
                  </div>
                </div>
                <button onClick={() => setSelectedLog(null)} className="w-8 h-8 rounded-lg bg-input hover:bg-border flex items-center justify-center motion-safe:transition-colors" aria-label="Close">
                  <X size={16} className="text-secondary" />
                </button>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Timestamp', value: new Date(selectedLog.timestamp).toLocaleString('en-IN') },
                    { label: 'Severity', value: selectedLog.severity.toUpperCase() },
                    { label: 'Performed By', value: selectedLog.user },
                    { label: 'Branch', value: getBranchName(selectedLog.branchId) },
                    { label: 'IP Address', value: selectedLog.ip ?? 'N/A' },
                    { label: 'Module', value: selectedLog.module },
                  ].map(item => (
                    <div key={item.label} className="bg-input/40 rounded-xl p-3 border border-border">
                      <p className="text-xs text-secondary uppercase tracking-wider font-medium">{item.label}</p>
                      <p className="text-sm font-semibold text-foreground mt-1">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-input/40 rounded-xl p-4 border border-border">
                  <p className="text-xs text-secondary uppercase tracking-wider font-medium mb-2">Full Details</p>
                  <p className="text-sm text-foreground leading-relaxed">{selectedLog.details}</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedLog(null)}
                    className="flex-1 py-2.5 border border-border rounded-xl text-sm font-medium text-secondary hover:text-foreground hover:bg-input motion-safe:transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => { exportToCSV([selectedLog]); }}
                    className="flex-1 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-hover motion-safe:transition-colors flex items-center justify-center gap-2"
                  >
                    <Download size={14} /> Export This Log
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
