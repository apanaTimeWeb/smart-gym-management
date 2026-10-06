// RESPONSIBILITY: Server route entry point for Admin Plans. Data is owned by the client TanStack Query layer.
import AdminPlansMain from '@/app/frontend_admin/admin_plans/admin_plans_components/admin_plans_main/AdminPlansMain';

/** Plans route entry point. Server rendering intentionally does not prefetch because no server-compatible module mock transport is supplied. */
export default function PlansPage() {
  return <AdminPlansMain />;
}
