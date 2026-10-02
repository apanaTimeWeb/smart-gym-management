'use client';
/**
 * RESPONSIBILITY: React component SuperadminSystemOpsInfrastructureView owned by the superadmin_system_ops_infrastructure feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_layout/superadmin_layout_error_boundary/SuperadminLayoutErrorBoundary, @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_components/SuperadminSystemOpsInfrastructureFlushTenantModal, @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_components/superadmin_system_ops_infrastructure_uptime_chart/SuperadminSystemOpsInfrastructureUptimeChart, @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_components/superadmin_system_ops_infrastructure_header/SuperadminSystemOpsInfrastructureHeader, @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_components/superadmin_system_ops_infrastructure_resource_metrics/SuperadminSystemOpsInfrastructureResourceMetrics, @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_components/superadmin_system_ops_infrastructure_redis_telemetry/SuperadminSystemOpsInfrastructureRedisTelemetry, @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_components/superadmin_system_ops_infrastructure_redis_controls/SuperadminSystemOpsInfrastructureRedisControls, @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_hooks/useSuperadminSystemOpsInfrastructureMainViewModel
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Composes the infrastructure page sections from the feature-owned view-model; contains no API, mutation, toast, confirmation, or business calculation logic.
import { SuperadminLayoutErrorBoundary } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_error_boundary/SuperadminLayoutErrorBoundary';
import SuperadminSystemOpsInfrastructureHeader from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_components/superadmin_system_ops_infrastructure_header/SuperadminSystemOpsInfrastructureHeader';
import SuperadminSystemOpsInfrastructureRedisControls from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_components/superadmin_system_ops_infrastructure_redis_controls/SuperadminSystemOpsInfrastructureRedisControls';
import SuperadminSystemOpsInfrastructureRedisTelemetry from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_components/superadmin_system_ops_infrastructure_redis_telemetry/SuperadminSystemOpsInfrastructureRedisTelemetry';
import SuperadminSystemOpsInfrastructureResourceMetrics from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_components/superadmin_system_ops_infrastructure_resource_metrics/SuperadminSystemOpsInfrastructureResourceMetrics';
import SuperadminSystemOpsInfrastructureUptimeChart from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_components/superadmin_system_ops_infrastructure_uptime_chart/SuperadminSystemOpsInfrastructureUptimeChart';
import SuperadminSystemOpsInfrastructureFlushTenantModal from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_components/SuperadminSystemOpsInfrastructureFlushTenantModal';
import { useSuperadminSystemOpsInfrastructureMainViewModel } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_hooks/useSuperadminSystemOpsInfrastructureMainViewModel';



/**
 * @description Composes the infrastructure page sections from the feature-owned view-model; contains no API, mutation, toast, confirmation, or business calculation logic.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminSystemOpsInfrastructureView() {
  const vm = useSuperadminSystemOpsInfrastructureMainViewModel();

  if (vm.isPendingNodes && vm.nodes.length === 0) {
    return (
      <div className="space-y-6" data-testid="superadmin_system_ops_infrastructure-superadmin-system-ops-infrastructure-main-superadmin_system_ops_infrastructure-infrastructure-main-loading">
        <div className="h-10 w-64 rounded-xl bg-skeleton-base motion-safe:animate-pulse" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[1, 2, 3].map((item) => <div key={`skeleton-${item}`} className="h-40 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse" />)}
        </div>
      </div>
    );
  }

  if (vm.isErrorNodes) {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-4 text-danger" data-testid="superadmin_system_ops_infrastructure-superadmin-system-ops-infrastructure-main-superadmin_system_ops_infrastructure-infrastructure-error">
        <p className="font-medium">{vm.t('ui.unable_to_load_infrastructure')}</p>
        <button type="button" onClick={() => void vm.refetchNodes()} className="min-h-11 rounded-lg border border-border bg-card px-4 py-2 font-medium text-primary hover:bg-surface-hover motion-safe:transition-colors motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_system_ops_infrastructure-superadmin-system-ops-infrastructure-main-superadmin_system_ops_infrastructure-infrastructure-retry">{vm.t('ui.retry')}</button>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="superadmin_system_ops_infrastructure-superadmin-system-ops-infrastructure-main-page">
      <SuperadminSystemOpsInfrastructureHeader statusFilter={vm.statusFilter} options={vm.statusOptions} isRefreshing={vm.isFetchingNodes || vm.isFetchingRedis} onStatusFilterChange={vm.setStatusFilter} onRefresh={() => { void vm.refetchNodes(); void vm.refetchRedis(); }} data-testid="superadmin_system_ops_infrastructure-superadmin-system-ops-infrastructure-header-interactive-1" />
      <SuperadminSystemOpsInfrastructureResourceMetrics withCpuCount={vm.metrics.withCpuCount} withMemCount={vm.metrics.withMemCount} withDiskCount={vm.metrics.withDiskCount} avgCpu={vm.metrics.avgCpu} avgMem={vm.metrics.avgMem} avgDisk={vm.metrics.avgDisk} />
      <SuperadminLayoutErrorBoundary variant="inline"><SuperadminSystemOpsInfrastructureUptimeChart /></SuperadminLayoutErrorBoundary>
      {vm.redisTelemetry ? <SuperadminLayoutErrorBoundary variant="inline"><SuperadminSystemOpsInfrastructureRedisTelemetry telemetry={vm.redisTelemetry} /></SuperadminLayoutErrorBoundary> : null}
      <SuperadminSystemOpsInfrastructureRedisControls isFlushingGlobal={vm.isFlushingGlobal} onFlushAll={vm.handleFlushAll} onOpenTenantFlush={vm.openFlushModal} data-testid="superadmin_system_ops_infrastructure-superadmin-system-ops-infrastructure-redis-controls-interactive-2" />
      <SuperadminSystemOpsInfrastructureFlushTenantModal isOpen={vm.isFlushModalOpen} onClose={vm.closeFlushModal} onFlush={vm.handleFlushSpecific} data-testid="superadmin_system_ops_infrastructure-superadmin-system-ops-infrastructure-flush-tenant-modal-interactive-3" />
    </div>
  );
}
