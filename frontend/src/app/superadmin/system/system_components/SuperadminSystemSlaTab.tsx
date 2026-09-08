'use client';

import { useState } from 'react';
import { ServerCog, Clock, AlertCircle, CheckCircle, Ticket, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { SUPERADMIN_SYSTEM_MOCK_SLA_DATA } from '@/app/superadmin/system/system_utils/SuperadminSystemConstants';

export default function SuperadminSystemSlaTab() {
  const [slaSearch, setSlaSearch] = useState('');

  const handleGenerateCredit = (tenantId: string) => {
    toast.success(`Generated SLA Credit invoice for tenant ${tenantId}`);
  };

  const filteredSla = SUPERADMIN_SYSTEM_MOCK_SLA_DATA.filter(sla => sla.name.toLowerCase().includes(slaSearch.toLowerCase()));
  const totalTenants = SUPERADMIN_SYSTEM_MOCK_SLA_DATA.length;
  const breachedTenants = SUPERADMIN_SYSTEM_MOCK_SLA_DATA.filter(s => s.status === 'BREACHED').length;
  const avgUptime = (SUPERADMIN_SYSTEM_MOCK_SLA_DATA.reduce((acc, s) => acc + s.actualUptime, 0) / totalTenants).toFixed(2);

  return (
    <div className="space-y-8 animate-superadmin-fade-in-up">
      {/* SLA Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg text-primary"><ServerCog size={24} /></div>
            <h3 className="font-semibold text-foreground">Tracked Tenants</h3>
          </div>
          <p className="text-3xl font-extrabold text-foreground">{totalTenants}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-danger/10 rounded-lg text-danger"><AlertCircle size={24} /></div>
            <h3 className="font-semibold text-foreground">SLA Breaches (30d)</h3>
          </div>
          <p className="text-3xl font-extrabold text-danger">{breachedTenants}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-success/10 rounded-lg text-success"><CheckCircle size={24} /></div>
            <h3 className="font-semibold text-foreground">Global Avg Uptime</h3>
          </div>
          <p className="text-3xl font-extrabold text-success">{avgUptime}%</p>
        </div>
      </div>

      {/* SLA Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col min-h-96">
        <div className="p-4 border-b border-border flex justify-between items-center bg-header">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2"><Clock size={20} className="text-primary"/> Tenant SLA Status</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-disabled" />
            <input
              type="text"
              placeholder="Search tenant..."
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
                <th className="p-4 font-semibold">Tenant</th>
                <th className="p-4 font-semibold">Target SLA</th>
                <th className="p-4 font-semibold">30d Uptime</th>
                <th className="p-4 font-semibold">Downtime (Mins)</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredSla.map((sla) => (
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
                        <Ticket size={14} /> Issue Credit
                      </button>
                    )}
                    {sla.status !== 'BREACHED' && (
                      <span className="text-xs text-disabled">—</span>
                    )}
                  </td>
                </tr>
              ))}
              {filteredSla.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-secondary">No tenants found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
