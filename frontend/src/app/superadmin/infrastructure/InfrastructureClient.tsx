'use client';

import { useState, useEffect } from 'react';
import { Cpu, HardDrive, Server, Zap, RefreshCcw, Loader2 } from 'lucide-react';
import { superadminApi } from '@/lib/superadmin-api';
import toast from 'react-hot-toast';

export default function InfrastructureClient() {
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
    return <div className="flex h-96 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Server Infrastructure</h1>
          <p className="text-secondary mt-1">Real-time health metrics of your Docker/Kubernetes cluster.</p>
        </div>
        <button 
          onClick={fetchNodes}
          disabled={isLoading}
          className="bg-input text-secondary px-4 py-2 rounded-lg font-medium hover:bg-card transition-colors flex items-center gap-2 border border-border disabled:opacity-50">
          <RefreshCcw size={16} className={isLoading ? "animate-spin" : ""} /> Force Sync Metrics
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CPU */}
        <div className="bg-card border border-border rounded-xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:bg-primary/10 transition-colors"></div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Cpu size={24} />
            </div>
            <h2 className="text-lg font-bold text-foreground">CPU Usage</h2>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-4xl font-extrabold text-foreground">{avgCpu}</span>
            <span className="text-xl font-medium text-secondary">%</span>
          </div>
          <div className="w-full h-2 bg-input rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${avgCpu}%` }}></div>
          </div>
          <p className="text-xs text-secondary mt-3">Avg load across {withCpu.length} compute nodes</p>
        </div>

        {/* RAM */}
        <div className="bg-card border border-border rounded-xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-warning/5 rounded-bl-full -z-10 group-hover:bg-warning/10 transition-colors"></div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-warning/10 rounded-lg text-warning">
              <Server size={24} />
            </div>
            <h2 className="text-lg font-bold text-foreground">Memory (RAM)</h2>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <span className={`text-4xl font-extrabold ${avgMem > 80 ? 'text-warning' : 'text-primary'}`}>{avgMem}</span>
            <span className="text-xl font-medium text-secondary">%</span>
          </div>
          <div className="w-full h-2 bg-input rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-500 ${avgMem > 80 ? 'bg-warning shadow-[0_0_10px_var(--warning)]' : 'bg-primary'}`} style={{ width: `${avgMem}%` }}></div>
          </div>
          <p className="text-xs text-secondary mt-3">Avg memory across {withMem.length} nodes {avgMem > 80 ? '• HIGH LOAD' : ''}</p>
        </div>

        {/* STORAGE */}
        <div className="bg-card border border-border rounded-xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-success/5 rounded-bl-full -z-10 group-hover:bg-success/10 transition-colors"></div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-success/10 rounded-lg text-success">
              <HardDrive size={24} />
            </div>
            <h2 className="text-lg font-bold text-foreground">Storage (SSD)</h2>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-4xl font-extrabold text-foreground">{avgDisk}</span>
            <span className="text-xl font-medium text-secondary">%</span>
          </div>
          <div className="w-full h-2 bg-input rounded-full overflow-hidden">
            <div className="h-full bg-success rounded-full transition-all duration-500" style={{ width: `${avgDisk}%` }}></div>
          </div>
          <p className="text-xs text-secondary mt-3">Avg across {withDisk.length} storage volumes</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Redis Cache Global Control</h2>
        </div>
        <p className="text-sm text-secondary mb-6">
          The SaaS platform uses Redis to cache massive multi-tenant API responses. If gyms are reporting stale data, you can forcefully flush the global cache across all tenants here.
        </p>
        
        <div className="flex gap-4">
          <button className="bg-primary text-white px-5 py-2.5 rounded-lg font-medium hover:bg-primary-hover transition-colors">
            Flush All Tenants
          </button>
          <button className="bg-input text-foreground px-5 py-2.5 rounded-lg font-medium hover:bg-border transition-colors border border-border">
            Flush Specific Tenant
          </button>
        </div>
      </div>
    </div>
  );
}
