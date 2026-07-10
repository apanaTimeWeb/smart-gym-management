'use client';

import { Cpu, HardDrive, Server, Zap, RefreshCcw } from 'lucide-react';

export default function InfrastructurePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Server Infrastructure</h1>
          <p className="text-[var(--text-secondary)] mt-1">Real-time health metrics of your Docker/Kubernetes cluster.</p>
        </div>
        <button className="bg-[var(--bg-input)] text-[var(--text-secondary)] px-4 py-2 rounded-lg font-medium hover:bg-[var(--bg-card)] transition-colors flex items-center gap-2 border border-[var(--border)]">
          <RefreshCcw size={16} /> Force Sync Metrics
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
            <span className="text-4xl font-extrabold text-[var(--text-primary)]">42</span>
            <span className="text-xl font-medium text-[var(--text-secondary)]">%</span>
          </div>
          <div className="w-full h-2 bg-[var(--bg-input)] rounded-full overflow-hidden">
            <div className="h-full bg-[var(--primary)] rounded-full w-[42%]"></div>
          </div>
          <p className="text-xs text-[var(--text-secondary)] mt-3">16 Cores • Avg load across 3 nodes</p>
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
            <span className="text-4xl font-extrabold text-[var(--warning)]">84</span>
            <span className="text-xl font-medium text-[var(--text-secondary)]">%</span>
          </div>
          <div className="w-full h-2 bg-[var(--bg-input)] rounded-full overflow-hidden">
            <div className="h-full bg-[var(--warning)] rounded-full w-[84%] shadow-[0_0_10px_var(--warning)]"></div>
          </div>
          <p className="text-xs text-[var(--text-secondary)] mt-3">53.7 GB / 64.0 GB Used • HIGH LOAD</p>
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
            <span className="text-4xl font-extrabold text-[var(--text-primary)]">28</span>
            <span className="text-xl font-medium text-[var(--text-secondary)]">%</span>
          </div>
          <div className="w-full h-2 bg-[var(--bg-input)] rounded-full overflow-hidden">
            <div className="h-full bg-[var(--success)] rounded-full w-[28%]"></div>
          </div>
          <p className="text-xs text-[var(--text-secondary)] mt-3">1.1 TB / 4.0 TB Used</p>
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
