import { Suspense } from 'react';
// RESPONSIBILITY: Server component page entry point for Admin Attendance (read-only view).
import AdminAttendanceMain from '@/app/admin/attendance/attendance_components/AdminAttendanceMain/AdminAttendanceMain';

export const metadata = { title: 'Attendance Overview — Admin | Smart Gym 360' };

export default function AdminAttendancePage() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <AdminAttendanceMain />
    </Suspense>
  );
}
