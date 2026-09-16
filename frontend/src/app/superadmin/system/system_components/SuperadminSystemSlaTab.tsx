'use client';
// RESPONSIBILITY: Renders the System Sla Tab component and its associated UI logic.
import { useMemo } from 'react';
import { ServerCog, Clock, AlertCircle, CheckCircle, Ticket, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { formatNumber } from '@/lib/formatters';
import { useQuery } from '@tanstack/react-query';
import { systemApi } from '@/app/superadmin/system/superadmin_system_api/superadmin_system_api';
import { useSuperadminUrlState } from '@/app/superadmin/superadmin_utils/useSuperadminUrlState';

interface SlaRecord {
  id: string;
  name: string;
  targetSla: number;
  actualUptime: number;
  downtimeMinutes: number;
  downtimeIncidents: number;
  status: 'MET' | 'WARNING' | 'BREACHED';
}

const TABLE_COLUMN_COUNT = 6;

export default function SuperadminSystemSlaTab() {
  const { getParam, setParam } = useSuperadminUrlState();
  const slaSearch = getParam('search', '');
  const setSlaSearch = (val: string) => setParam('search', val);

  const handleGenerateCredit = (tenantId: string) => {
    toast.success(`Generated Downtime Credit invoice for gym ${tenantId}`, { id: 'generated-downtime-credit-invoice-for-gym-tenantid' });
  };

  const queryParams = useMemo(() => {
    const params: Record<string, string> = {};
    if (slaSearch) params.search = slaSearch;
    return params;
  }, [slaSearch]);

  const { data: res, isLoading } = useQuery({
    queryKey: ['superadmin', 'system-sla', queryParams],
    queryFn: () => systemApi.fetchSystemInfo(queryParams),
  });

  const slaData: SlaRecord[] = (res?.data || []) as SlaRecord[];
  const totalTenants = res?.meta?.total || slaData.length;
  const breachedTenants = slaData.filter(s => s.status === 'BREACHED').length;
  const avgUptimeRaw = slaData.length > 0
    ? slaData.reduce((acc, s) => acc + s.actualUptime, 0) / slaData.length
    : 0;
  const avgUptime = formatNumber(Math.round(avgUptimeRaw * 100) / 100);

  return (
    <div className="space-y-8 motion-safe:animate-superadmin-fade-in-up">
      {/* SLA Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg text-primary"><ServerCog className="w-6 h-6" /></div>
            <h3 className="font-semibold text-foreground">Tracked Gyms</h3>
          </div>
          <p className="text-3xl font-extrabold text-foreground">{totalTenants}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-danger/10 rounded-lg text-danger"><AlertCircle className="w-6 h-6" /></div>
            <h3 className="font-semibold text-foreground">Uptime Failures (30d)</h3>
          </div>
          <p className="text-3xl font-extrabold text-danger">{breachedTenants}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-success/10 rounded-lg text-success"><CheckCircle className="w-6 h-6" /></div>
            <h3 className="font-semibold text-foreground">Global Avg Uptime</h3>
          </div>
          <p className="text-3xl font-extrabold text-success">{avgUptime}%</p>
        </div>
      </div>

      {/* SLA Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col min-h-96">
        <div className="p-4 border-b border-border flex justify-between items-center bg-header">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2"><Clock className="w-5 h-5 text-primary"/> Gym Uptime Status</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-disabled" />
            <input
              type="text"
              placeholder="Search gym..."
              value={slaSearch}
              onChange={(e) => setSlaSearch(e.target.value)}
              className="bg-input border border-border text-foreground text-sm rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-primary w-64"
            />
          </div>
        </div>
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-input/40 border-b border-border text-secondary text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold">Gym</th>
                <th className="p-4 font-semibold">Target Uptime</th>
                <th className="p-4 font-semibold">30d Uptime</th>
                <th className="p-4 font-semibold">Downtime (Mins)</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {slaData.map((sla) => (
                <tr key={sla.id} className="superadmin-table-row group hover:bg-input motion-safe:transition-colors text-sm">
                  <td className="p-4 text-foreground font-medium">{sla.name}</td>
                  <td className="p-4 text-secondary">{sla.targetSla}%</td>
                  <td className={`p-4 font-bold ${sla.actualUptime < sla.targetSla ? 'text-danger' : 'text-success'}`}>
                    {sla.actualUptime}%
                  </td>
                  <td className="p-4 text-secondary">
                    {sla.downtimeMinutes} <span className="text-xs text-disabled">({sla.downtimeIncidents} incidents)</span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                      sla.status === 'MET' ? 'bg-success-bg text-success' : 
                      sla.status === 'WARNING' ? 'bg-warning-bg text-warning' : 
                      'bg-danger-bg text-danger'
                    }`}>
                      {sla.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {sla.status === 'BREACHED' && (
                      <button
                        onClick={() => handleGenerateCredit(sla.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-danger/10 hover:bg-danger/20 text-danger text-xs font-semibold motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger"
                      >
                        <Ticket className="w-3.5 h-3.5" /> Issue Credit
                      </button>
                    )}
                    {sla.status !== 'BREACHED' && (
                      <span className="text-xs text-disabled">—</span>
                    )}
                  </td>
                </tr>
              ))}
              {slaData.length === 0 && (
                <tr>
                  <td colSpan={TABLE_COLUMN_COUNT} className="p-8 text-center text-secondary">No gyms found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
