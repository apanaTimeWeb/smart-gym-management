// RESPONSIBILITY: Renders the Server Infrastructure page showing real-time node health metrics. Fetches data directly using TanStack Query.
'use client';
import { useMemo, useState } from 'react';
import { Cpu, HardDrive, Server, Zap, RefreshCcw, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import type { InfrastructureNode } from '@/app/superadmin/system-ops/infrastructure/infrastructure_types/SuperadminInfrastructureTypes';
import SuperadminFlushTenantModal from '@/app/superadmin/system-ops/infrastructure/infrastructure_components/SuperadminFlushTenantModal';
import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';
import SuperadminUptimeChart from '@/app/superadmin/system-ops/infrastructure/infrastructure_components/SuperadminUptimeChart/SuperadminUptimeChart';
import { formatNumber } from '@/lib/formatters';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';
import { SuperadminErrorBoundary } from '@/app/superadmin/superadmin_layout/SuperadminLayout/SuperadminErrorBoundary';
import { useUrlState } from '@/hooks/useUrlState';
import { useSuperadminInfrastructureData } from '@/app/superadmin/system-ops/infrastructure/infrastructure_utils/useSuperadminInfrastructureData';
import { SUPERADMIN_INFRASTRUCTURE_STATUS_OPTIONS } from '@/app/superadmin/system-ops/infrastructure/infrastructure_utils/SuperadminInfrastructureConstants';
import { useSuperadminInfrastructureActions } from '@/app/superadmin/system-ops/infrastructure/infrastructure_utils/useSuperadminInfrastructureActions';
export default function SuperadminInfrastructureClient() {
    const [isFlushModalOpen, setIsFlushModalOpen] = useState(false);
    const { getParam, setParam } = useUrlState();
    const statusFilter = getParam('statusFilter', 'ALL');
    const setStatusFilter = (val: string) => setParam('statusFilter', val);
    const { confirm } = useConfirm();
    const queryParams = useMemo(() => {
        const p: Record<string, string> = {};
        if (statusFilter && statusFilter !== 'ALL')
            p.statusFilter = statusFilter;
        return p;
    }, [statusFilter]);
    const { nodesQuery, redisQuery } = useSuperadminInfrastructureData(queryParams);
    const { flushGlobalCache, isFlushingGlobal, flushTenantCache, isFlushingTenant } = useSuperadminInfrastructureActions();
    const { data: fetchRes, isPending: isPendingNodes, isError: isErrorNodes, error: errorNodes, refetch: refetchNodes, isFetching: isFetchingNodes } = nodesQuery;
    const { data: redisRes, isPending: isPendingRedis, refetch: refetchRedis, isFetching: isFetchingRedis } = redisQuery;
    const nodes = fetchRes?.data ?? [];
    const redisTelemetry = redisRes?.data;
    const handleFlushAll = async () => {
        const confirmed = await confirm({
            title: 'Flush Global Cache',
            message: 'Are you sure you want to flush the global Redis cache across all gyms? This may temporarily increase database load.',
            confirmText: 'Flush All',
            type: 'warning'
        });
        if (!confirmed)
            return;
        try {
            const response = await flushGlobalCache(crypto.randomUUID());
            toast.success(response.message, { id: 'superadmin-infrastructure-flush-global' });
        } catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : '', { id: 'superadmin-infrastructure-flush-global' });
        }
    };
    const handleFlushSpecific = async (tenantIds: string[]) => {
        const confirmed = await confirm({
            title: 'Flush Tenant Cache',
            message: `Are you sure you want to flush the Redis cache for ${tenantIds.length} selected tenant${tenantIds.length === 1 ? '' : 's'}?`,
            confirmText: 'Flush Cache',
            type: 'warning'
        });
        if (!confirmed) return;
        try {
            const response = await flushTenantCache({ tenantIds, idempotencyKey: crypto.randomUUID() });
            toast.success(response.message, { id: 'superadmin-infrastructure-flush-tenant' });
        } catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : '', { id: 'superadmin-infrastructure-flush-tenant' });
            throw error;
        }
    };
    // Variables are calculated below after handling error/loading state.
    if (isPendingNodes && nodes.length === 0) {
        return (<div className="space-y-6">
        <div className="h-10 w-64 bg-card motion-safe:animate-pulse rounded-xl mb-8"/>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (<div key={`skeleton-${i}`} className="h-40 bg-card motion-safe:animate-pulse rounded-xl"/>))}
        </div>
      </div>);
    }
    if (isErrorNodes) {
        return <div className="flex h-96 items-center justify-center text-danger font-medium">{errorNodes instanceof Error ? errorNodes.message : String(errorNodes)}</div>;
    }
    const filteredNodes = nodes;
    const withCpu = filteredNodes.filter(n => n.cpuPercent !== null);
    const avgCpu = withCpu.length ? Math.round(withCpu.reduce((acc, n) => acc + (n.cpuPercent ?? 0), 0) / withCpu.length) : 0;
    const withMem = filteredNodes.filter(n => n.memoryPercent !== null);
    const avgMem = withMem.length ? Math.round(withMem.reduce((acc, n) => acc + (n.memoryPercent ?? 0), 0) / withMem.length) : 0;
    const withDisk = filteredNodes.filter(n => n.diskPercent !== null);
    const avgDisk = withDisk.length ? Math.round(withDisk.reduce((acc, n) => acc + (n.diskPercent ?? 0), 0) / withDisk.length) : 0;
    return (<div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">Server Infrastructure</h1>
          <p className="text-secondary mt-1">Real-time health metrics of your Docker/Kubernetes cluster.</p>
        </div>
        <div className="flex items-center gap-4">
          <SearchableDropdown value={statusFilter} onChange={(val) => setStatusFilter(val as string)} options={SUPERADMIN_INFRASTRUCTURE_STATUS_OPTIONS} className="w-40"/>
          <button onClick={() => { refetchNodes(); refetchRedis(); }} disabled={isFetchingNodes || isFetchingRedis} className="bg-primary text-on-primary px-4 py-2 rounded-lg font-medium hover:opacity-90 motion-safe:transition-opacity flex items-center gap-2 border border-primary disabled:opacity-50">
            <RefreshCcw className={`w-4 h-4 ${isFetchingNodes || isFetchingRedis ? 'motion-safe:animate-spin' : ''}`}/> Force Sync Metrics
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CPU */}
        <div className="bg-card border border-border rounded-xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-subtle rounded-bl-full -z-10 group-hover:bg-primary-subtle motion-safe:transition-colors"/>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary-subtle rounded-lg text-primary"><Cpu className="w-6 h-6"/></div>
            <h2 className="text-lg font-bold text-primary">CPU Usage</h2>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-4xl font-extrabold text-primary">{avgCpu}</span>
            <span className="text-xl font-medium text-secondary">%</span>
          </div>
          <div className="w-full h-2 bg-input rounded-full overflow-hidden">
            <div className="h-full bg-primary-subtle rounded-full motion-safe:transition-all motion-safe:duration-xslow" style={{ width: `${avgCpu}%` }}/>
          </div>
          <p className="text-xs text-secondary mt-3">Avg load across {withCpu.length} compute nodes</p>
        </div>

        {/* RAM */}
        <div className="bg-card border border-border rounded-xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-warning-bg rounded-bl-full -z-10 group-hover:bg-warning-bg motion-safe:transition-colors"/>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-warning-bg rounded-lg text-warning"><Server className="w-6 h-6"/></div>
            <h2 className="text-lg font-bold text-primary">Memory (RAM)</h2>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <span className={`text-4xl font-extrabold ${avgMem > 80 ? 'text-warning' : 'text-primary'}`}>{avgMem}</span>
            <span className="text-xl font-medium text-secondary">%</span>
          </div>
          <div className="w-full h-2 bg-input rounded-full overflow-hidden">
            <div className={`h-full rounded-full motion-safe:transition-all motion-safe:duration-xslow ${avgMem > 80 ? 'bg-warning-bg' : 'bg-primary-subtle'}`} style={{ width: `${avgMem}%` }}/>
          </div>
          <p className="text-xs text-secondary mt-3">Avg memory across {withMem.length} nodes {avgMem > 80 ? '• HIGH LOAD' : ''}</p>
        </div>

        {/* STORAGE */}
        <div className="bg-card border border-border rounded-xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-success-bg rounded-bl-full -z-10 group-hover:bg-success-bg motion-safe:transition-colors"/>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-success-bg rounded-lg text-success"><HardDrive className="w-6 h-6"/></div>
            <h2 className="text-lg font-bold text-primary">Storage (SSD)</h2>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-4xl font-extrabold text-primary">{avgDisk}</span>
            <span className="text-xl font-medium text-secondary">%</span>
          </div>
          <div className="w-full h-2 bg-input rounded-full overflow-hidden">
            <div className="h-full bg-success-bg rounded-full motion-safe:transition-all motion-safe:duration-xslow" style={{ width: `${avgDisk}%` }}/>
          </div>
          <p className="text-xs text-secondary mt-3">Avg across {withDisk.length} storage volumes</p>
        </div>
      </div>

      <SuperadminErrorBoundary variant="inline">
        <SuperadminUptimeChart />
      </SuperadminErrorBoundary>

      {redisTelemetry && (<SuperadminErrorBoundary variant="inline">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* REDIS MEMORY */}
          <div className="bg-card border border-border rounded-xl p-6 relative overflow-hidden group">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary-subtle rounded-lg text-primary"><Zap className="w-6 h-6"/></div>
              <h2 className="text-lg font-bold text-primary">Redis Memory</h2>
            </div>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-extrabold text-primary">{redisTelemetry.memoryUsagePercent}</span>
              <span className="text-xl font-medium text-secondary">%</span>
            </div>
            <div className="w-full h-2 bg-input rounded-full overflow-hidden">
              <div className="h-full bg-primary-subtle rounded-full motion-safe:transition-all motion-safe:duration-xslow" style={{ width: `${redisTelemetry.memoryUsagePercent}%` }}/>
            </div>
            <p className="text-xs text-secondary mt-3">Redis cache memory usage</p>
          </div>

          {/* REDIS HIT RATIO */}
          <div className="bg-card border border-border rounded-xl p-6 relative overflow-hidden group">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-success-bg rounded-lg text-success"><RefreshCcw className="w-6 h-6"/></div>
              <h2 className="text-lg font-bold text-primary">Cache Hit Ratio</h2>
            </div>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-extrabold text-primary">{redisTelemetry.hitRatioPercent}</span>
              <span className="text-xl font-medium text-secondary">%</span>
            </div>
            <div className="w-full h-2 bg-input rounded-full overflow-hidden">
              <div className="h-full bg-success-bg rounded-full motion-safe:transition-all motion-safe:duration-xslow" style={{ width: `${redisTelemetry.hitRatioPercent}%` }}/>
            </div>
            <p className="text-xs text-secondary mt-3">Requests served from cache vs DB</p>
          </div>

          {/* REDIS TOTAL KEYS */}
          <div className="bg-card border border-border rounded-xl p-6 relative overflow-hidden group flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-lg font-bold text-primary">Cached Keys</h2>
            </div>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-extrabold text-primary">{formatNumber(redisTelemetry.totalKeysCached)}</span>
            </div>
            <p className="text-xs text-secondary mt-3">Uptime: {redisTelemetry.uptimeHours} hours</p>
          </div>
          </div>
        </SuperadminErrorBoundary>)}

      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-primary"/>
          <h2 className="text-xl font-bold text-primary">Redis Cache Global Control</h2>
        </div>
        <p className="text-sm text-secondary mb-6">
          The SaaS platform uses Redis to cache massive multi-tenant API responses. If gyms are reporting stale data, you can forcefully flush the global cache across all tenants here.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button onClick={handleFlushAll} disabled={isFlushingGlobal} className="flex items-center justify-center gap-2 bg-primary-subtle text-on-success px-5 py-2.5 rounded-lg font-medium hover:opacity-90 motion-safe:transition-opacity min-w-44 disabled:opacity-50">
            {isFlushingGlobal ? <Loader2 className="w-5 h-5 motion-safe:animate-spin"/> : null}
            Flush All Tenants
          </button>
          <button onClick={() => setIsFlushModalOpen(true)} className="flex items-center justify-center gap-2 bg-transparent text-primary px-5 py-2.5 rounded-lg font-medium hover:bg-border motion-safe:transition-colors border border-border min-w-44 disabled:opacity-50">
            Flush Specific Tenant
          </button>
        </div>
      </div>

      <SuperadminFlushTenantModal isOpen={isFlushModalOpen} onClose={() => setIsFlushModalOpen(false)} onFlush={handleFlushSpecific} />
    </div>);
}
