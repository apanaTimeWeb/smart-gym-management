// RESPONSIBILITY: Server route entry point for Admin HR. Data is owned by the client TanStack Query layer.
import AdminHrMain from '@/app/frontend_admin/admin_hr/admin_hr_components/admin_hr_main/AdminHrMain';

/** HR route entry point. Server rendering intentionally does not prefetch because no server-compatible module mock transport is supplied. */
export default function HrPage() {
  return <AdminHrMain />;
}
