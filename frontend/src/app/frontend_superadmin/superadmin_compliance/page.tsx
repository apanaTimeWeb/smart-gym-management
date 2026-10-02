import { Suspense } from 'react';
import SuperadminLayoutPageSuspenseSkeleton from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutPageSuspenseSkeleton';
// RESPONSIBILITY: Framework route artifact for compliance.
import SuperadminComplianceMain from '@/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_components/SuperadminComplianceMain';
/**
 * @description Framework route artifact for compliance.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminCompliancePage() {
    return <Suspense fallback={<SuperadminLayoutPageSuspenseSkeleton />}>
        <SuperadminComplianceMain />
      </Suspense>;
}
