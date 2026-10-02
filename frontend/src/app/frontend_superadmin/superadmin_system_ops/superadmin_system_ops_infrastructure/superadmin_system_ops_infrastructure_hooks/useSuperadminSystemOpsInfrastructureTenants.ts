'use client';// DATA FLOW: Infrastructure tenant API → TanStack Query → Flush Tenant modal.
// RESPONSIBILITY: Owns the tenant list used only by the cache-flush selector; avoids unrelated node/Redis queries.
import { useQuery } from '@tanstack/react-query';

import { infrastructureApi } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_api/SuperadminSystemOpsInfrastructureApi';
import { SUPERADMIN_INFRASTRUCTURE_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_constants/SuperadminSystemOpsInfrastructureQueryKeys';



/** Loads the tenant identities required by the Infrastructure cache flush selector. */
/** Purpose: Owns the useSuperadminSystemOpsInfrastructureTenants data/state orchestration for this Superadmin feature and exposes its typed UI-facing contract. 
 * @description Owns the hook behavior for this Superadmin feature.
 * @dependencies Consumes feature-local state/API/query contracts and approved global infrastructure only.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
export function useSuperadminSystemOpsInfrastructureTenants(isOpen: boolean) {
  return useQuery({
    queryKey: SUPERADMIN_INFRASTRUCTURE_QUERY_KEYS.tenants,
    queryFn: () => infrastructureApi.fetchTenants(),
    enabled: isOpen,
  });
}
