'use client';
// RESPONSIBILITY: Renders the Security & WAF dashboard.
import React, { useState } from 'react';
import { useSuperadminSecurityData } from '@/app/superadmin/security/security_utils/useSuperadminSecurityData';
import { Shield, ShieldAlert, Globe, ServerCrash, Trash2, Plus, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SuperadminSecurityClient() {
  const [activeTab, setActiveTab] = useState<'WAF' | 'THREATS'>('WAF');
  const [newIp, setNewIp] = useState('');
  const [newReason, setNewReason] = useState('');
  
  const { data, isLoading, isError, updateWafConfig, addBlockedIp, removeBlockedIp } = useSuperadminSecurityData();

  if (isLoading) return (
    <div className="space-y-4 motion-safe:animate-pulse">
      <div className="h-8 w-64 bg-skeleton-base rounded" />
      <div className="h-96 bg-skeleton-base rounded-xl border border-border" />
    </div>
  );
  
  if (isError || !data) return <div className="p-8 text-center text-danger font-medium">Error loading security data.</div>;

  const { wafConfig, blockedIps, threats } = data;

  const handleToggleGeoBlocking = async () => {
    try {
      await updateWafConfig({ geoBlockingEnabled: !wafConfig.geoBlockingEnabled });
      toast.success(`Geo-blocking ${!wafConfig.geoBlockingEnabled ? 'enabled' : 'disabled'}`);
    } catch (e) {
      toast.error('Failed to update WAF settings');
    }
  };

  const handleAddIp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIp.trim()) return;
    try {
      await addBlockedIp({ ipAddress: newIp, reason: newReason || 'Manual block' });
      toast.success('IP blocked successfully');
      setNewIp('');
      setNewReason('');
    } catch (e) {
      toast.error('Failed to block IP');
    }
  };

  const handleRemoveIp = async (id: string) => {
    try {
      await removeBlockedIp(id);
      toast.success('IP unblocked successfully');
    } catch (e) {
      toast.error('Failed to unblock IP');
    }
  };

  return (
    <div className="space-y-6 motion-safe:animate-in motion-safe:fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Shield className="text-primary w-6 h-6" /> Security & WAF
          </h1>
          <p className="text-secondary mt-1">Manage web application firewall and monitor threats.</p>
        </div>
        <div className="flex bg-input p-1 rounded-lg border border-border">
          <button 
            onClick={() => setActiveTab('WAF')}
            className={`px-4 py-2 rounded-md text-sm font-medium motion-safe:transition-colors ${activeTab === 'WAF' ? 'bg-card text-foreground shadow-sm' : 'text-secondary hover:text-foreground'}`}
          >
            WAF Rules
          </button>
          <button 
            onClick={() => setActiveTab('THREATS')}
            className={`px-4 py-2 rounded-md text-sm font-medium motion-safe:transition-colors ${activeTab === 'THREATS' ? 'bg-card text-foreground shadow-sm' : 'text-secondary hover:text-foreground'}`}
          >
            Threat Monitoring
          </button>
        </div>
      </div>

      {activeTab === 'WAF' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border border-border rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2 mb-4">
                <Globe className="text-primary w-5 h-5" /> Global Access Controls
              </h2>
              <div className="flex items-center justify-between p-4 bg-input rounded-lg border border-border">
                <div>
                  <h3 className="font-semibold text-foreground">Geo-Blocking</h3>
                  <p className="text-sm text-secondary">Block traffic from outside operating countries.</p>
                </div>
                <div onClick={handleToggleGeoBlocking} className={`w-12 h-6 rounded-full relative cursor-pointer motion-safe:transition-colors ${wafConfig.geoBlockingEnabled ? 'bg-success' : 'bg-border'}`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full motion-safe:transition-all ${wafConfig.geoBlockingEnabled ? 'right-1' : 'left-1'}`}></div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-border">
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <ShieldAlert className="text-danger w-5 h-5" /> IP Blacklist
                </h2>
                <p className="text-sm text-secondary mt-1">IP addresses that are explicitly blocked from accessing any API routes.</p>
              </div>
              <div className="divide-y divide-border">
                {blockedIps.length === 0 ? (
                  <div className="p-6 text-center text-secondary text-sm">No blocked IPs found.</div>
                ) : (
                  blockedIps.map(ip => (
                    <div key={ip.id} className="p-4 flex items-center justify-between hover:bg-input motion-safe:transition-colors">
                      <div>
                        <h3 className="font-mono text-sm font-bold text-foreground">{ip.ipAddress}</h3>
                        <p className="text-xs text-secondary mt-1">Reason: {ip.reason} &bull; Blocked at {new Date(ip.blockedAt).toLocaleString()}</p>
                      </div>
                      <button 
                        onClick={() => handleRemoveIp(ip.id)}
                        className="p-2 text-secondary hover:text-danger hover:bg-danger/10 rounded-lg motion-safe:transition-colors"
                        title="Unblock IP"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleAddIp} className="bg-card border border-border rounded-xl shadow-sm p-6 sticky top-24">
              <h3 className="font-bold text-foreground mb-4">Add IP to Blacklist</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-secondary mb-1 block">IP Address</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 192.168.1.1" 
                    required 
                    value={newIp} 
                    onChange={e => setNewIp(e.target.value)} 
                    className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground" 
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-secondary mb-1 block">Reason (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Spamming API" 
                    value={newReason} 
                    onChange={e => setNewReason(e.target.value)} 
                    className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground" 
                  />
                </div>
                <button type="submit" className="w-full bg-danger hover:bg-danger-hover text-white py-2.5 rounded-lg font-medium motion-safe:transition-colors flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" /> Block IP
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeTab === 'THREATS' && (
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <ServerCrash className="text-warning w-5 h-5" /> Threat Logs
            </h2>
            <p className="text-sm text-secondary mt-1">Recent detected suspicious activity across all tenants.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-input border-b border-border text-xs text-secondary">
                  <th className="p-4 font-semibold uppercase">Timestamp</th>
                  <th className="p-4 font-semibold uppercase">IP Address</th>
                  <th className="p-4 font-semibold uppercase">Event Type</th>
                  <th className="p-4 font-semibold uppercase">Target Gym ID</th>
                  <th className="p-4 font-semibold uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {threats.length === 0 ? (
                  <tr><td colSpan={5} className="p-6 text-center text-secondary text-sm">No threats detected.</td></tr>
                ) : (
                  threats.map(threat => (
                    <tr key={threat.id} className="hover:bg-input/50 motion-safe:transition-colors text-sm">
                      <td className="p-4 text-secondary whitespace-nowrap">{new Date(threat.timestamp).toLocaleString()}</td>
                      <td className="p-4 font-mono text-foreground font-medium">{threat.ipAddress}</td>
                      <td className="p-4 font-medium">{threat.eventType.replace(/_/g, ' ')}</td>
                      <td className="p-4 text-secondary font-mono">{threat.targetGymId || 'Global'}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                          threat.status === 'BLOCKED' ? 'bg-danger/10 text-danger' : 
                          threat.status === 'FLAGGED' ? 'bg-warning/10 text-warning' : 'bg-primary/10 text-primary'
                        }`}>
                          {threat.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
