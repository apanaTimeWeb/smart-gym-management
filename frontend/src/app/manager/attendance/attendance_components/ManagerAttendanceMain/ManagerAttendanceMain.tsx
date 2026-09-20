// RESPONSIBILITY: Entry component for the Attendance module that wraps the UI in the hook-based state facade and handles the core page layout.
'use client';
import { ManagerAttendanceContent } from '@/app/manager/attendance/attendance_components/ManagerAttendanceMain/ManagerAttendanceContent/ManagerAttendanceContent';

export default function ManagerAttendanceMain() {
  return <ManagerAttendanceContent />;
}
