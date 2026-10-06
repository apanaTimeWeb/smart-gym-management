// RESPONSIBILITY: Renders the structural loading skeleton for the Admin Reports route.
"use client";

/**
 * AdminReportsSkeleton renders the admin reports skeleton UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminReportsSkeleton: Renders the structural loading skeleton for the Admin Reports route.
 * @dependencies Consumes the owning feature contract.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminReportsSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {["row-1", "row-2", "row-3", "row-4"].map((row) => <div key={row} className="h-28 bg-card rounded-xl motion-safe:animate-pulse border border-border motion-safe:duration-base" />)}
      </div>
      <div className="h-12 bg-card rounded-xl motion-safe:animate-pulse border border-border motion-safe:duration-base" />
      <div className="h-80 bg-card rounded-xl motion-safe:animate-pulse border border-border motion-safe:duration-base" />
    </div>
  );
}
