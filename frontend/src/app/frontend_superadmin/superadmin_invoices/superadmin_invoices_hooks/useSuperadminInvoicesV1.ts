'use client';// DATA FLOW: MSW/Backend → fetchInvoiceRecoveryCenter() → TanStack Query → owning V1 feature UI
// RESPONSIBILITY: Owns server-state query orchestration for the owning V1 feature. No JSX and no business UI state.
import { useQuery } from '@tanstack/react-query';

import { fetchInvoiceRecoveryCenter } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_api/SuperadminInvoicesRecoveryCenterApi';
import { SUPERADMIN_INVOICES_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_constants/SuperadminInvoicesQueryKeys';



/**
 * @description Loads Invoice recovery-center server state for the owning V1 feature surface.
 * @dependencies TanStack Query with feature-owned query keys and the recovery-center API.
 * @edge-case Missing backend records are surfaced as query data/empty state rather than fabricated invoice rows.
 */
export function useSuperadminInvoicesV1() {
  return useQuery({
    queryKey: SUPERADMIN_INVOICES_QUERY_KEYS.recoveryCenter,
    queryFn: () => fetchInvoiceRecoveryCenter(),
  });
}
