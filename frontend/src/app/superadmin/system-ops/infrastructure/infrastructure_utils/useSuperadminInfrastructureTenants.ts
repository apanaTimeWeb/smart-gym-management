// DATA FLOW: Infrastructure tenant API → TanStack Query → Flush Tenant modal.
// RESPONSIBILITY: Owns the tenant list used only by the cache-flush selector; avoids unrelated node/Redis queries.
'use client';
import { useQuery } from '@tanstack/react-query';
import { infrastructureApi } from '@/app/superadmin/system-ops/infrastructure/infrastructure_api/SuperadminInfrastructureApi';

/** Loads the tenant identities required by the Infrastructure cache flush selector. */
/** Purpose: Owns the useSuperadminInfrastructureTenants data/state orchestration for this Superadmin feature and exposes its typed UI-facing contract. */
export function useSuperadminInfrastructureTenants(isOpen: boolean) {
  return useQuery({
    queryKey: ['superadmin', 'infrastructure', 'tenants'],
    queryFn: () => infrastructureApi.fetchTenants(),
    enabled: isOpen,
  });
}
