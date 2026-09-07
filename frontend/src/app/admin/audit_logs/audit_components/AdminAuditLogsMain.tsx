'use client';

import { useState, useMemo } from 'react';
import { ShieldAlert, Search, Filter, History, Trash2, Edit, PlusCircle, AlertCircle, RefreshCw } from 'lucide-react';
import AdminHeader from '@/app/admin/admin_components/AdminLayout/AdminHeader';
import { useAdminGlobalStore } from '@/app/admin/admin_store/useAdminGlobalStore';
import { useAdminBranchesData } from '@/app/admin/admin_store/useAdminBranchesData';

// Mock Data for demonstration
const MOCK_LOGS = [
  { id: '1', timestamp: '2023-11-20T10:30:00Z', action: 'DELETED_PAYMENT', user: 'Rahul Verma (Manager)', branchId: 'br-1', details: 'Deleted payment INV-1042 (Amount: ₹5000, Member: John Doe)', severity: 'high' },
  { id: '2', timestamp: '2023-11-20T09:15:00Z', action: 'UPDATED_PLAN', user: 'Super Admin', branchId: 'all', details: 'Changed Annual Pro price from ₹12000 to ₹15000', severity: 'medium' },
  { id: '3', timestamp: '2023-11-19T18:45:00Z', action: 'ADDED_STAFF', user: 'Super Admin', branchId: 'br-2', details: 'Added new trainer: Vikas Singh', severity: 'low' },
  { id: '4', timestamp: '2023-11-19T14:20:00Z', action: 'REFUND_ISSUED', user: 'Pooja Sharma (Manager)', branchId: 'br-2', details: 'Refunded ₹2000 to Member ID: MEM-009', severity: 'high' },
  { id: '5', timestamp: '2023-11-18T11:00:00Z', action: 'LOGIN_FAILED', user: 'Unknown IP', branchId: 'br-1', details: '5 failed login attempts for manager@andheri.com', severity: 'high' },
];

export default function AdminAuditLogsMain() {
  const { selectedBranchId } = useAdminGlobalStore();
  const { data: branchesData = [] } = useAdminBranchesData();
  const branches = Array.isArray(branchesData) ? branchesData : ((branchesData as any)?.branches || []);
  
  const [search, setSearch] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('All');

  const filteredLogs = useMemo(() => {
    return MOCK_LOGS.filter(log => {
      const matchesBranch = selectedBranchId === 'all' || log.branchId === selectedBranchId || log.branchId === 'all';
      const matchesSeverity = filterSeverity === 'All' || log.severity === filterSeverity.toLowerCase();
      const matchesSearch = log.details.toLowerCase().includes(search.toLowerCase()) || log.user.toLowerCase().includes(search.toLowerCase()) || log.action.toLowerCase().includes(search.toLowerCase());
      return matchesBranch && matchesSeverity && matchesSearch;
    });
  }, [selectedBranchId, filterSeverity, search]);

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-danger/20 text-danger border border-danger/30';
      case 'medium': return 'bg-warning/20 text-warning border border-warning/30';
      default: return 'bg-success/20 text-success border border-success/30';
    }
  };

  const getActionIcon = (action: string) => {
    if (action.includes('DELETE') || action.includes('REFUND')) return <Trash2 size={16} className="text-danger" />;
    if (action.includes('UPDATE')) return <Edit size={16} className="text-warning" />;
    if (action.includes('ADD')) return <PlusCircle size={16} className="text-success" />;
    if (action.includes('FAIL')) return <AlertCircle size={16} className="text-danger" />;
    return <History size={16} className="text-primary" />;
  };

  const getBranchName = (id: string) => {
    if (id === 'all') return 'Global (System)';
    const b = branches.find(b => b.id === id);
    return b ? b.name : id;
  };

  return (
    <div className="min-h-full">
      <AdminHeader title="Audit Logs & Security" subtitle="Monitor critical system actions and prevent fraud." />
      
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        
        {/* Top Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-card/60 backdrop-blur-xl p-4 rounded-2xl border border-border shadow-lg">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="p-3 bg-primary/20 text-primary rounded-xl">
              <ShieldAlert size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Activity Monitor</h2>
              <p className="text-sm text-secondary">Showing {filteredLogs.length} events</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={16} />
              <input
                type="text"
                placeholder="Search logs..."
                className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-xl text-sm focus:border-primary text-foreground"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <select
              className="bg-input border border-border rounded-xl px-4 py-2 text-sm text-foreground focus:border-primary"
              value={filterSeverity}
              onChange={e => setFilterSeverity(e.target.value)}
            >
              <option value="All">All Severity</option>
              <option value="High">High (Critical)</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <button className="p-2 bg-input border border-border rounded-xl text-secondary hover:text-foreground transition-colors hover:bg-background">
              <RefreshCw size={18} />
            </button>
          </div>
        </div>

        {/* Logs Table */}
        <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-header border-b border-border">
                  <th className="p-4 text-xs font-semibold text-secondary uppercase tracking-wider">Timestamp</th>
                  <th className="p-4 text-xs font-semibold text-secondary uppercase tracking-wider">Action & Branch</th>
                  <th className="p-4 text-xs font-semibold text-secondary uppercase tracking-wider">Performed By</th>
                  <th className="p-4 text-xs font-semibold text-secondary uppercase tracking-wider">Details</th>
                  <th className="p-4 text-xs font-semibold text-secondary uppercase tracking-wider text-center">Severity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-secondary">
                      No logs found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map(log => (
                    <tr key={log.id} className="hover:bg-input/50 transition-colors group">
                      <td className="p-4 text-sm text-secondary whitespace-nowrap">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center border border-border shadow-inner">
                            {getActionIcon(log.action)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">{log.action.replace('_', ' ')}</p>
                            <p className="text-xs text-secondary">{getBranchName(log.branchId)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-foreground">
                        {log.user}
                      </td>
                      <td className="p-4 text-sm text-secondary max-w-xs truncate" title={log.details}>
                        {log.details}
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide inline-block w-24 text-center ${getSeverityStyle(log.severity)}`}>
                          {log.severity}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
