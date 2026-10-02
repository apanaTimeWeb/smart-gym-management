'use client';
/**
 * RESPONSIBILITY: React component SuperadminGymsGymDetailSkeleton owned by the superadmin_gyms feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: No explicit module import dependencies.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the route-level structural skeleton for the Gym Detail screen.

export default function SuperadminGymsGymDetailSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" data-testid="superadmin_gyms-superadmin-gyms-gym-detail-skeleton-detail-skeleton-loading-state">
      <div className="h-8 w-48 rounded bg-skeleton-base motion-safe:animate-pulse" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {[1, 2, 3].map((item) => <div key={item} className="h-32 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse" />)}
      </div>
      <div className="h-64 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse" />
    </div>
  );
}
