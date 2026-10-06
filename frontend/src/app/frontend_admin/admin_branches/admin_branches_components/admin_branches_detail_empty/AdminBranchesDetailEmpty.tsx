import type { AdminBranchesDetailEmptyProps } from '@/app/frontend_admin/admin_branches/admin_branches_types/AdminBranchesDetailEmptyPropsTypes';
// RESPONSIBILITY: Renders the feature-owned empty terminal state inside the branch detail drawer.
/**
 * AdminBranchesDetailEmpty renders the admin branches detail empty UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminBranchesDetailEmpty: Renders the feature-owned empty terminal state inside the branch detail drawer.
 * @dependencies Consumes the owning feature contract.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminBranchesDetailEmpty({ label }: AdminBranchesDetailEmptyProps) {
  return <div className="rounded-xl border border-border bg-input px-4 py-10 text-center text-sm text-secondary">{label}</div>;
}


