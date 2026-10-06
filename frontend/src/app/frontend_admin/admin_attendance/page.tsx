import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
// RESPONSIBILITY: Server component page entry point for Admin Attendance (read-only view).
import AdminAttendanceMain from '@/app/frontend_admin/admin_attendance/admin_attendance_components/admin_attendance_main/AdminAttendanceMain';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('attendance.metadata');
  return { title: t('title'), description: t('description') };
}

/**
 * AdminAttendancePage renders the admin attendance page UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminAttendancePage() {
  return (
      <AdminAttendanceMain />
  );
}
