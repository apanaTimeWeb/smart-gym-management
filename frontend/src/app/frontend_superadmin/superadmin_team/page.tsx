// RESPONSIBILITY: Renders/orchestrates page within its owning Superadmin feature module; no direct backend implementation.
import { Suspense } from 'react';
import SuperadminLayoutPageSuspenseSkeleton from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutPageSuspenseSkeleton';
// RESPONSIBILITY: Framework route artifact for team.
import SuperadminTeamMain from '@/app/frontend_superadmin/superadmin_team/superadmin_team_components/SuperadminTeamMain';
/**
 * @description Framework route artifact for team.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminTeamPage() {
    return <Suspense fallback={<SuperadminLayoutPageSuspenseSkeleton />}>
        <SuperadminTeamMain />
      </Suspense>;
}
