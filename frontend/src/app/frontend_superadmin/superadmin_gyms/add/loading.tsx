// RESPONSIBILITY: Framework route artifact for superadmin_gyms/add.
/**
 * @description Renders AddGymLoading within the owning Superadmin feature module.
 * @dependencies Uses only dependencies declared in this module file and documented feature infrastructure.
 * @edge-case Preserves documented loading, empty, error, disabled, retry, and repeated-action behavior.
 */
export default function SuperadminAddGymLoading() {
    return (
        <main className="space-y-5 p-6" aria-busy="true" data-testid="superadmin_gyms-add-loading-state">
            <div className="h-9 w-64 motion-safe:animate-pulse rounded-xl bg-skeleton-base" />
            <div className="h-96 rounded-xl bg-skeleton-base" />
        </main>
    );
}
