'use client';
// RESPONSIBILITY: Hides the Manager module UI when the authenticated user lacks the required capability.
import type { ManagerPermissionGateProps } from '@/app/manager/manager_infrastructure/manager_infrastructure_types/ManagerPermissionGateTypes';
import { usePermissions } from '@/lib/usePermissions';



export default function ManagerPermissionGate({ capability, children }: ManagerPermissionGateProps) {
  const { can } = usePermissions();
  if (!can(capability)) {
    return (
      <section className="flex min-h-full items-center justify-center p-6" aria-label="Permission denied">
        <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-8 text-center shadow-card">
          <h1 className="text-xl font-semibold text-primary">Permission denied</h1>
          <p className="mt-2 text-sm text-secondary">Your current role does not have access to this Manager workspace.</p>
        </div>
      </section>
    );
  }
  return <>{children}</>;
}
