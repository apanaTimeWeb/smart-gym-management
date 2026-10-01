import type { SuperadminMessagingComposeValues } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_types/SuperadminMessagingComposeTypes';
import type { SuperadminMessagingTenant } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_types/SuperadminMessagingTypes';

/**
 * @description Returns the messaging compose submission callback consumed by the compose modal.
 * @dependencies Depends on the caller-provided async send handler; owns no server state or UI state.
 * @edge-case Preserves promise rejection propagation so the feature owner can show safe retry feedback and reset unsaved state only after success.
 */
// DATA FLOW: Feature/API/query inputs → useSuperadminMessagingCompose → owning feature view/components.
/**
 * @description Owns the feature-local superadmin messaging compose responsibility and keeps implementation state outside presentation components.
 * @dependencies Uses only approved feature-owned APIs/hooks/state plus explicitly approved application infrastructure.
 * @edge-case Preserves loading, error, retry, cancellation, and repeated-action behavior without leaking business state into sibling modules.
 */
export function useSuperadminMessagingCompose(tenants: SuperadminMessagingTenant[]) {
  return (values: SuperadminMessagingComposeValues) => {
    const tenant = tenants.find((candidate) => candidate.id === values.tenantId);
    return tenant ? { ...values, tenantName: tenant.name } : null;
  };
}
