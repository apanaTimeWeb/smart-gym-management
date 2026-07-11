'use client';

import { useState, useEffect } from 'react';
import { Cpu, HardDrive, Server, Zap, RefreshCcw, Loader2 } from 'lucide-react';
import { superadminApi } from '@/lib/superadmin-api';
import toast from 'react-hot-toast';

export default function InfrastructurePage() {
  const [nodes, setNodes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNodes = async () => {
    setIsLoading(true);
    try {
      const res = await superadminApi.infrastructure.getAll();
      setNodes(res.data || []);
    } catch (e: any) {
      toast.error('Failed to load infrastructure metrics');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNodes();
  }, []);

  // Compute stats
  const withCpu = nodes.filter(n => n.cpuPercent !== null);
  const avgCpu = withCpu.length ? Math.round(withCpu.reduce((acc, n) => acc + n.cpuPercent, 0) / withCpu.length) : 0;
  
  const withMem = nodes.filter(n => n.memoryPercent !== null);
  const avgMem = withMem.length ? Math.round(withMem.reduce((acc, n) => acc + n.memoryPercent, 0) / withMem.length) : 0;
  
  const withDisk = nodes.filter(n => n.diskPercent !== null);
  const avgDisk = withDisk.length ? Math.round(withDisk.reduce((acc, n) => acc + n.diskPercent, 0) / withDisk.length) : 0;

  if (isLoading && nodes.length === 0) {
    return <div className="flex h-96 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-[var(--primary)]" /></div>;
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Server Infrastructure</h1>
          <p className="text-[var(--text-secondary)] mt-1">Real-time health metrics of your Docker/Kubernetes cluster.</p>
        </div>
        <button 
          onClick={fetchNodes}
          disabled={isLoading}
          className="bg-[var(--bg-input)] text-[var(--text-secondary)] px-4 py-2 rounded-lg font-medium hover:bg-[var(--bg-card)] transition-colors flex items-center gap-2 border border-[var(--border)] disabled:opacity-50">
          <RefreshCcw size={16} className={isLoading ? "animate-spin" : ""} /> Force Sync Metrics
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CPU */}
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/5 rounded-bl-full -z-10 group-hover:bg-[var(--primary)]/10 transition-colors"></div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[var(--primary)]/10 rounded-lg text-[var(--primary)]">
              <Cpu size={24} />
            </div>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">CPU Usage</h2>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-4xl font-extrabold text-[var(--text-primary)]">{avgCpu}</span>
            <span className="text-xl font-medium text-[var(--text-secondary)]">%</span>
          </div>
          <div className="w-full h-2 bg-[var(--bg-input)] rounded-full overflow-hidden">
            <div className="h-full bg-[var(--primary)] rounded-full transition-all duration-500" style={{ width: `${avgCpu}%` }}></div>
          </div>
          <p className="text-xs text-[var(--text-secondary)] mt-3">Avg load across {withCpu.length} compute nodes</p>
        </div>

        {/* RAM */}
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--warning)]/5 rounded-bl-full -z-10 group-hover:bg-[var(--warning)]/10 transition-colors"></div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[var(--warning)]/10 rounded-lg text-[var(--warning)]">
              <Server size={24} />
            </div>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">Memory (RAM)</h2>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <span className={`text-4xl font-extrabold ${avgMem > 80 ? 'text-[var(--warning)]' : 'text-[var(--primary)]'}`}>{avgMem}</span>
            <span className="text-xl font-medium text-[var(--text-secondary)]">%</span>
          </div>
          <div className="w-full h-2 bg-[var(--bg-input)] rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-500 ${avgMem > 80 ? 'bg-[var(--warning)] shadow-[0_0_10px_var(--warning)]' : 'bg-[var(--primary)]'}`} style={{ width: `${avgMem}%` }}></div>
          </div>
          <p className="text-xs text-[var(--text-secondary)] mt-3">Avg memory across {withMem.length} nodes {avgMem > 80 ? '• HIGH LOAD' : ''}</p>
        </div>

        {/* STORAGE */}
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--success)]/5 rounded-bl-full -z-10 group-hover:bg-[var(--success)]/10 transition-colors"></div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[var(--success)]/10 rounded-lg text-[var(--success)]">
              <HardDrive size={24} />
            </div>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">Storage (SSD)</h2>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-4xl font-extrabold text-[var(--text-primary)]">{avgDisk}</span>
            <span className="text-xl font-medium text-[var(--text-secondary)]">%</span>
          </div>
          <div className="w-full h-2 bg-[var(--bg-input)] rounded-full overflow-hidden">
            <div className="h-full bg-[var(--success)] rounded-full transition-all duration-500" style={{ width: `${avgDisk}%` }}></div>
          </div>
          <p className="text-xs text-[var(--text-secondary)] mt-3">Avg across {withDisk.length} storage volumes</p>
        </div>
      </div>

      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-[var(--primary)]" />
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Redis Cache Global Control</h2>
        </div>
        <p className="text-sm text-[var(--text-secondary)] mb-6">
          The SaaS platform uses Redis to cache massive multi-tenant API responses. If gyms are reporting stale data, you can forcefully flush the global cache across all tenants here.
        </p>
        
        <div className="flex gap-4">
          <button className="bg-[var(--primary)] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[var(--primary-hover)] transition-colors">
            Flush All Tenants
          </button>
          <button className="bg-[var(--bg-input)] text-[var(--text-primary)] px-5 py-2.5 rounded-lg font-medium hover:bg-[var(--border)] transition-colors border border-[var(--border)]">
            Flush Specific Tenant
          </button>
        </div>
      </div>
    </div>
  );
}
