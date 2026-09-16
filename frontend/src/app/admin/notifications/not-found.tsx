// RESPONSIBILITY: Renders/orchestrates not-found for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
import AdminNotFound from '@/app/admin/admin_components/AdminLayout/AdminNotFound';

export default function NotFound() {
  return <AdminNotFound />;
}

