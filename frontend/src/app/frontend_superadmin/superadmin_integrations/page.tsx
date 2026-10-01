// RESPONSIBILITY: Framework route artifact for integrations.
import SuperadminLayoutRoleProviders from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutRoleProviders';
import SuperadminIntegrationsMain from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_components/SuperadminIntegrationsMain';
/**
 * @description Framework route artifact for integrations.
 * @dependencies Consumes the owning feature contract and approved global zero-business UI/infrastructure only.
 * @edge-case Preserves documented loading, empty, error, retry, keyboard, responsive, and repeated-action behavior where applicable.
 */
export default function SuperadminIntegrationsPage() {
    return <SuperadminLayoutRoleProviders><SuperadminIntegrationsMain /></SuperadminLayoutRoleProviders>;
}
