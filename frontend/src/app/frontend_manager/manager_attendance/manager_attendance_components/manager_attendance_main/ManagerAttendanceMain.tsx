// RESPONSIBILITY: Renders ManagerAttendanceMain's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
"use client";

import { ManagerAttendanceContent } from '@/app/frontend_manager/manager_attendance/manager_attendance_components/manager_attendance_main/manager_attendance_content/ManagerAttendanceContent';

/** @description Entry component for the Attendance module that wraps the UI in the hook-based state facade and handles the core page layout. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerAttendanceMain() {
  return <ManagerAttendanceContent />;
}
