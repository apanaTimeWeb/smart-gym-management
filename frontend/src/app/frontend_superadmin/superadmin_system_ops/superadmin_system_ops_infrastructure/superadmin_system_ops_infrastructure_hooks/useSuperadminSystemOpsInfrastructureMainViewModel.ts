import { useMemo, useRef, useState } from 'react';

import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';
import { useUrlState } from '@/hooks/useUrlState';

import { SUPERADMIN_INFRASTRUCTURE_STATUS_OPTIONS, SUPERADMIN_INFRASTRUCTURE_FILTER_ALL } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_constants/SuperadminSystemOpsInfrastructureConstants';
import { useSuperadminSystemOpsInfrastructureActions } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_hooks/useSuperadminSystemOpsInfrastructureActions';
import { useSuperadminSystemOpsInfrastructureData } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_hooks/useSuperadminSystemOpsInfrastructureData';
import { useSuperadminSystemOpsInfrastructureViewModel } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_hooks/useSuperadminSystemOpsInfrastructureViewModel';



// DATA FLOW: API / URL state / module client state → useMemo → superadmin_system_ops_infrastructure view components.
/**
 * @description Owns Infrastructure page URL state, server queries, mutation confirmations, and translated view-model data so the Main component remains a pure composition layer.
 * @dependencies Feature-owned infrastructure data/actions/view-model hooks plus approved URL state and confirmation infrastructure.
 * @edge-case Reuses one idempotency key for repeated retries of the same confirmed cache-flush intent and clears it only after authoritative success.
 */
// DATA FLOW: Feature/API/query inputs → useSuperadminSystemOpsInfrastructureMainViewModel → owning feature view/components.
/**
 * @description Owns the feature-local superadmin system ops infrastructure main view model responsibility and keeps implementation state outside presentation components.
 * @dependencies Uses only approved feature-owned APIs/hooks/state plus explicitly approved application infrastructure.
 * @edge-case Preserves loading, error, retry, cancellation, and repeated-action behavior without leaking business state into sibling modules.
 */
export function useSuperadminSystemOpsInfrastructureMainViewModel() {
  const t = useTranslations('superadmin_system_ops_infrastructure');
  const { getParam, setParam } = useUrlState();
  const { confirm } = useConfirm();
  const [isFlushModalOpen, setIsFlushModalOpen] = useState(false);
  const globalFlushIdempotencyKeyRef = useRef<string | null>(null);
  const statusFilter = getParam('statusFilter', SUPERADMIN_INFRASTRUCTURE_FILTER_ALL);
  const setStatusFilter = (value: string) => setParam('statusFilter', value);
  const queryParams = useMemo(() => (statusFilter && statusFilter !== SUPERADMIN_INFRASTRUCTURE_FILTER_ALL ? { statusFilter } : {}) as Record<string, string>, [statusFilter]);
  const { nodesQuery, redisQuery } = useSuperadminSystemOpsInfrastructureData(queryParams);
  const { flushGlobalCache, isFlushingGlobal, flushTenantCache } = useSuperadminSystemOpsInfrastructureActions();
  const { data: fetchRes, isPending: isPendingNodes, isError: isErrorNodes, refetch: refetchNodes, isFetching: isFetchingNodes } = nodesQuery;
  const { data: redisRes, refetch: refetchRedis, isFetching: isFetchingRedis } = redisQuery;
  const nodes = fetchRes?.data ?? [];
  const redisTelemetry = redisRes?.data;
  const metrics = useSuperadminSystemOpsInfrastructureViewModel(nodes);
  const statusOptions = SUPERADMIN_INFRASTRUCTURE_STATUS_OPTIONS.map((option) => ({ value: option.value, label: t(option.labelKey) }));

  const handleFlushAll = async (): Promise<void> => {
    const confirmed = await confirm({ title: t('ui.confirm_flush_global_title'), message: t('ui.confirm_flush_global_message'), confirmText: t('ui.flush_all_action'), type: 'warning' });
    if (!confirmed) return;
    try {
      globalFlushIdempotencyKeyRef.current ??= crypto.randomUUID();
      const response = await flushGlobalCache(globalFlushIdempotencyKeyRef.current);
      toast.success(response.message, { id: 'superadmin-infrastructure-flush-global' });
      globalFlushIdempotencyKeyRef.current = null;
    } catch (error: unknown) {
      toast.error(t('ui.action_failed_retry'), { id: 'superadmin-infrastructure-flush-global-error' });
    }
  };

  const handleFlushSpecific = async (tenantIds: string[], idempotencyKey: string): Promise<void> => {
    try {
      const response = await flushTenantCache({ tenantIds, idempotencyKey });
      toast.success(response.message, { id: 'superadmin-infrastructure-flush-tenant' });
    } catch (error: unknown) {
      toast.error(t('ui.action_failed_retry'), { id: 'superadmin-infrastructure-flush-tenant-error' });
      throw error;
    }
  };

  return {
    t,
    statusFilter,
    statusOptions,
    setStatusFilter,
    nodes,
    redisTelemetry,
    metrics,
    isPendingNodes,
    isErrorNodes,
    refetchNodes,
    refetchRedis,
    isFetchingNodes,
    isFetchingRedis,
    isFlushingGlobal,
    handleFlushAll,
    handleFlushSpecific,
    isFlushModalOpen,
    openFlushModal: () => setIsFlushModalOpen(true),
    closeFlushModal: () => setIsFlushModalOpen(false),
  };
}

