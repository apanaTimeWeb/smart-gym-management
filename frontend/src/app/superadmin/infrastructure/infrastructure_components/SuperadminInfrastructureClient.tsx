'use client';
// RESPONSIBILITY: Renders the Server Infrastructure page showing real-time node health metrics. Fetches data directly using TanStack Query.
import { useState } from 'react';
import { Cpu, HardDrive, Server, Zap, RefreshCcw, Loader2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { infrastructureApi } from '@/app/superadmin/infrastructure/superadmin_infrastructure_api/superadmin_infrastructure_api';
import toast from 'react-hot-toast';
import type { InfrastructureNode } from '@/app/superadmin/infrastructure/infrastructure_types/superadmin_infrastructure_types';
import SuperadminFlushTenantModal from '@/app/superadmin/infrastructure/infrastructure_components/SuperadminFlushTenantModal';
import { useSuperadminConfirm } from '@/components/ui/SuperadminFeedback/SuperadminConfirmProvider';
import SuperadminUptimeChart from '@/app/superadmin/infrastructure/infrastructure_components/SuperadminUptimeChart/SuperadminUptimeChart';
import { formatNumber } from '@/lib/formatters';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';
import { SuperadminErrorBoundary } from '@/components/ui/SuperadminLayout/SuperadminErrorBoundary';

export default function SuperadminInfrastructureClient() {
  const [isFlushingAll, setIsFlushingAll] = useState(false);
  const [isFlushModalOpen, setIsFlushModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('ALL');

  const { confirm } = useSuperadminConfirm();
  const queryClient = useQueryClient();

  const { data: fetchRes, isLoading: isLoadingNodes, isError: isErrorNodes, refetch: refetchNodes, isFetching: isFetchingNodes } = useQuery({
    queryKey: ['superadmin', 'infrastructure'],
    queryFn: () => infrastructureApi.fetchInfrastructureNodes(),
    refetchInterval: 30000,
  });

  const { data: redisRes, isLoading: isLoadingRedis, refetch: refetchRedis, isFetching: isFetchingRedis } = useQuery({
    queryKey: ['superadmin', 'redis'],
    queryFn: () => infrastructureApi.fetchRedisTelemetry(),
    refetchInterval: 30000,
  });

  const nodes = fetchRes?.data ?? [];
  const redisTelemetry = redisRes?.data;

  const flushGlobalMutation = useMutation({
    mutationFn: () => infrastructureApi.flushGlobalCache(),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['superadmin', 'redis'] });
      toast.success(res?.message || 'Successfully flushed global cache');
      setIsFlushingAll(false);
    },
    onError: (error: unknown) => {
      toast.error((error as Error)?.message || 'Failed to flush global cache');
      setIsFlushingAll(false);
    }
  });

  const flushTenantMutation = useMutation({
    mutationFn: (tenantIds: string[]) => infrastructureApi.flushTenantCache(tenantIds),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['superadmin', 'redis'] });
      toast.success(res?.message || 'Successfully flushed cache for gym(s)');
    },
    onError: (error: unknown) => {
      toast.error((error as Error)?.message || 'Failed to flush gym cache');
    }
  });

  const handleFlushAll = async () => {
    const confirmed = await confirm({
      title: 'Flush Global Cache',
      message: 'Are you sure you want to flush the global Redis cache across all gyms? This may temporarily increase database load.',
      confirmText: 'Flush All',
      type: 'warning'
    });

    if (!confirmed) return;

    setIsFlushingAll(true);
    flushGlobalMutation.mutate();
  };

  const handleFlushSpecific = async (tenantIds: string[]) => {
    flushTenantMutation.mutate(tenantIds);
  };

  // Variables are calculated below after handling error/loading state.

  if (isLoadingNodes && nodes.length === 0) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-64 bg-card motion-safe:animate-pulse rounded-xl mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={`skeleton-${i}`} className="h-40 bg-card motion-safe:animate-pulse rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (isErrorNodes) {
    return <div className="flex h-96 items-center justify-center text-danger font-medium">Error loading data.</div>;
  }

  const filteredNodes = statusFilter === 'ALL' ? nodes : nodes.filter(n => n.status === statusFilter);
  const withCpu = filteredNodes.filter(n => n.cpuPercent !== null);
  const avgCpu = withCpu.length ? Math.round(withCpu.reduce((acc, n) => acc + (n.cpuPercent ?? 0), 0) / withCpu.length) : 0;

  const withMem = filteredNodes.filter(n => n.memoryPercent !== null);
  const avgMem = withMem.length ? Math.round(withMem.reduce((acc, n) => acc + (n.memoryPercent ?? 0), 0) / withMem.length) : 0;

  const withDisk = filteredNodes.filter(n => n.diskPercent !== null);
  const avgDisk = withDisk.length ? Math.round(withDisk.reduce((acc, n) => acc + (n.diskPercent ?? 0), 0) / withDisk.length) : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Server Infrastructure</h1>
          <p className="text-secondary mt-1">Real-time health metrics of your Docker/Kubernetes cluster.</p>
        </div>
        <div className="flex items-center gap-4">
          <SearchableDropdown
            value={statusFilter}
            onChange={(val) => setStatusFilter(val as string)}
            options={[
              { value: 'ALL', label: 'All Nodes' },
              { value: 'HEALTHY', label: 'Healthy' },
              { value: 'WARNING', label: 'Warning' },
              { value: 'CRITICAL', label: 'Critical' },
            ]}
            className="w-40"
          />
          <button
            onClick={() => { refetchNodes(); refetchRedis(); }}
            disabled={isFetchingNodes || isFetchingRedis}
            className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 motion-safe:transition-opacity flex items-center gap-2 border border-primary disabled:opacity-50"
          >
            <RefreshCcw size={16} className={isFetchingNodes || isFetchingRedis ? 'motion-safe:animate-spin' : ''} /> Force Sync Metrics
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CPU */}
        <div className="bg-card border border-border rounded-xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:bg-primary/10 motion-safe:transition-colors" />
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg text-primary"><Cpu size={24} /></div>
            <h2 className="text-lg font-bold text-foreground">CPU Usage</h2>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-4xl font-extrabold text-foreground">{avgCpu}</span>
            <span className="text-xl font-medium text-secondary">%</span>
          </div>
          <div className="w-full h-2 bg-input rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full motion-safe:transition-all motion-safe:duration-500" style={{ width: `${avgCpu}%` }} />
          </div>
          <p className="text-xs text-secondary mt-3">Avg load across {withCpu.length} compute nodes</p>
        </div>

        {/* RAM */}
        <div className="bg-card border border-border rounded-xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-warning/5 rounded-bl-full -z-10 group-hover:bg-warning/10 motion-safe:transition-colors" />
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-warning/10 rounded-lg text-warning"><Server size={24} /></div>
            <h2 className="text-lg font-bold text-foreground">Memory (RAM)</h2>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <span className={`text-4xl font-extrabold ${avgMem > 80 ? 'text-warning' : 'text-primary'}`}>{avgMem}</span>
            <span className="text-xl font-medium text-secondary">%</span>
          </div>
          <div className="w-full h-2 bg-input rounded-full overflow-hidden">
            <div className={`h-full rounded-full motion-safe:transition-all motion-safe:duration-500 ${avgMem > 80 ? 'bg-warning' : 'bg-primary'}`} style={{ width: `${avgMem}%` }} />
          </div>
          <p className="text-xs text-secondary mt-3">Avg memory across {withMem.length} nodes {avgMem > 80 ? '• HIGH LOAD' : ''}</p>
        </div>

        {/* STORAGE */}
        <div className="bg-card border border-border rounded-xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-success/5 rounded-bl-full -z-10 group-hover:bg-success/10 motion-safe:transition-colors" />
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-success/10 rounded-lg text-success"><HardDrive size={24} /></div>
            <h2 className="text-lg font-bold text-foreground">Storage (SSD)</h2>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-4xl font-extrabold text-foreground">{avgDisk}</span>
            <span className="text-xl font-medium text-secondary">%</span>
          </div>
          <div className="w-full h-2 bg-input rounded-full overflow-hidden">
            <div className="h-full bg-success rounded-full motion-safe:transition-all motion-safe:duration-500" style={{ width: `${avgDisk}%` }} />
          </div>
          <p className="text-xs text-secondary mt-3">Avg across {withDisk.length} storage volumes</p>
        </div>
      </div>

      <SuperadminErrorBoundary variant="inline">
        <SuperadminUptimeChart />
      </SuperadminErrorBoundary>

      {redisTelemetry && (
        <SuperadminErrorBoundary variant="inline">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* REDIS MEMORY */}
          <div className="bg-card border border-border rounded-xl p-6 relative overflow-hidden group">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg text-primary"><Zap size={24} /></div>
              <h2 className="text-lg font-bold text-foreground">Redis Memory</h2>
            </div>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-extrabold text-foreground">{redisTelemetry.memoryUsagePercent}</span>
              <span className="text-xl font-medium text-secondary">%</span>
            </div>
            <div className="w-full h-2 bg-input rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full motion-safe:transition-all motion-safe:duration-500" style={{ width: `${redisTelemetry.memoryUsagePercent}%` }} />
            </div>
            <p className="text-xs text-secondary mt-3">Redis cache memory usage</p>
          </div>

          {/* REDIS HIT RATIO */}
          <div className="bg-card border border-border rounded-xl p-6 relative overflow-hidden group">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-success/10 rounded-lg text-success"><RefreshCcw size={24} /></div>
              <h2 className="text-lg font-bold text-foreground">Cache Hit Ratio</h2>
            </div>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-extrabold text-foreground">{redisTelemetry.hitRatioPercent}</span>
              <span className="text-xl font-medium text-secondary">%</span>
            </div>
            <div className="w-full h-2 bg-input rounded-full overflow-hidden">
              <div className="h-full bg-success rounded-full motion-safe:transition-all motion-safe:duration-500" style={{ width: `${redisTelemetry.hitRatioPercent}%` }} />
            </div>
            <p className="text-xs text-secondary mt-3">Requests served from cache vs DB</p>
          </div>

          {/* REDIS TOTAL KEYS */}
          <div className="bg-card border border-border rounded-xl p-6 relative overflow-hidden group flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-lg font-bold text-foreground">Cached Keys</h2>
            </div>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-extrabold text-primary">{formatNumber(redisTelemetry.totalKeysCached)}</span>
            </div>
            <p className="text-xs text-secondary mt-3">Uptime: {redisTelemetry.uptimeHours} hours</p>
          </div>
          </div>
        </SuperadminErrorBoundary>
      )}

      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Redis Cache Global Control</h2>
        </div>
        <p className="text-sm text-secondary mb-6">
          The SaaS platform uses Redis to cache massive multi-tenant API responses. If gyms are reporting stale data, you can forcefully flush the global cache across all tenants here.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={handleFlushAll}
            disabled={isFlushingAll}
            className="flex items-center justify-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-medium hover:opacity-90 motion-safe:transition-opacity min-w-44 disabled:opacity-50"
          >
            {isFlushingAll ? <Loader2 size={18} className="motion-safe:animate-spin" /> : null}
            Flush All Tenants
          </button>
          <button 
            onClick={() => setIsFlushModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-transparent text-foreground px-5 py-2.5 rounded-lg font-medium hover:bg-border motion-safe:transition-colors border border-border min-w-44 disabled:opacity-50"
          >
            Flush Specific Tenant
          </button>
        </div>
      </div>

      <SuperadminFlushTenantModal 
        isOpen={isFlushModalOpen} 
        onClose={() => setIsFlushModalOpen(false)} 
        onFlush={handleFlushSpecific} 
      />
    </div>
  );
}
