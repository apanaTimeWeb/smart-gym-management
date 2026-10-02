'use client';
// DATA FLOW: URL filter → infrastructure queries → derived metrics → Infrastructure mutation hooks → visible Superadmin UI.
import { SUPERADMIN_INFRASTRUCTURE_FILTER_ALL } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_constants/SuperadminSystemOpsInfrastructureConstants';

// RESPONSIBILITY: Owns Infrastructure page state, derived metric calculations, and confirmed cache-flush action orchestration.
import { useMemo, useRef, useState } from 'react';

import { toast } from 'sonner';

import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';
import { useUrlState } from '@/hooks/useUrlState';

import { useSuperadminSystemOpsInfrastructureActions } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_hooks/useSuperadminSystemOpsInfrastructureActions';
import { useSuperadminSystemOpsInfrastructureData } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_hooks/useSuperadminSystemOpsInfrastructureData';

import type { InfrastructureNode } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_types/SuperadminSystemOpsInfrastructureTypes';



/**
 * @description Owns page-level Infrastructure state and calculations while keeping the view component focused on composition.
 * @dependencies Uses module-owned URL state, query/data hooks, mutation actions, and confirmation infrastructure.
 * @edge-case Resource-filtered metrics derive only from the currently fetched nodes; mutation retries reuse one idempotency key per user intent.
 */
export function useSuperadminSystemOpsInfrastructurePage(translate: (key: string) => string) {
  const { getParam, setParam } = useUrlState();
  const { confirm } = useConfirm();
  const [isFlushModalOpen, setIsFlushModalOpen] = useState(false);
  const statusFilter = getParam('statusFilter', SUPERADMIN_INFRASTRUCTURE_FILTER_ALL);
  const setStatusFilter = (value: string) => setParam('statusFilter', value);
  const queryParams = useMemo(() => (statusFilter && statusFilter !== SUPERADMIN_INFRASTRUCTURE_FILTER_ALL ? { statusFilter } : {}) as Record<string, string>, [statusFilter]);
  const { nodesQuery, redisQuery } = useSuperadminSystemOpsInfrastructureData(queryParams);
  const actions = useSuperadminSystemOpsInfrastructureActions();
  const globalFlushKeyRef = useRef<string | null>(null);
  const { data: nodesResponse, isPending: isPendingNodes, isError: isErrorNodes, error: errorNodes, refetch: refetchNodes, isFetching: isFetchingNodes } = nodesQuery;
  const { data: redisResponse, isPending: isPendingRedis, refetch: refetchRedis, isFetching: isFetchingRedis } = redisQuery;
  const nodes = nodesResponse?.data ?? [];
  const redisTelemetry = redisResponse?.data;
  const metrics = useMemo(() => {
    const average = (selector: (node: InfrastructureNode) => number | null) => {
      const values = nodes.map(selector).filter((value): value is number => value !== null);
      return { average: values.length ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length) : 0, count: values.length };
    };
    return { cpu: average((node) => node.cpuPercent), memory: average((node) => node.memoryPercent), disk: average((node) => node.diskPercent) };
  }, [nodes]);

  const handleForceSync = async () => {
    await Promise.all([refetchNodes(), refetchRedis()]);
  };
  const handleFlushAll = async () => {
    const confirmed = await confirm({ title: translate('ui.confirm_flush_global_title'), message: translate('ui.confirm_flush_global_message'), confirmText: translate('ui.flush_all_action'), type: 'warning' });
    if (!confirmed) return;
    try {
      globalFlushKeyRef.current ??= crypto.randomUUID();
      const response = await actions.flushGlobalCache(globalFlushKeyRef.current);
      globalFlushKeyRef.current = null;
      toast.success(response.message, { id: 'superadmin-infrastructure-flush-global' });
    } catch (error: unknown) {
      toast.error(translate('ui.action_failed_retry'), { id: 'superadmin-infrastructure-flush-global' });
    }
  };
  const handleFlushSpecific = async (tenantIds: string[], idempotencyKey: string) => {
    try {
      const response = await actions.flushTenantCache({ tenantIds, idempotencyKey });
      toast.success(response.message, { id: 'superadmin-infrastructure-flush-tenant' });
    } catch (error: unknown) {
      toast.error(translate('ui.action_failed_retry'), { id: 'superadmin-infrastructure-flush-tenant' });
      throw error;
    }
  };
  return {
    statusFilter, setStatusFilter, isFlushModalOpen, setIsFlushModalOpen, queryParams, nodes, redisTelemetry, metrics,
    isPendingNodes, isPendingRedis, isErrorNodes, errorNodes, isFetchingNodes, isFetchingRedis,
    isFlushingGlobal: actions.isFlushingGlobal, isFlushingTenant: actions.isFlushingTenant,
    handleForceSync, handleFlushAll, handleFlushSpecific, refetchNodes, refetchRedis,
  };
}
