"use client";
// RESPONSIBILITY: Empty state shown when attendance table has zero rows matching current filters.

import { CalendarX } from 'lucide-react';

import type { AdminAttendanceEmptyStateProps } from '@/app/admin/attendance/attendance_types/AdminAttendanceEmptyStatePropsTypes';


export default function AdminAttendanceEmptyState({ hasFilters }: AdminAttendanceEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <div className="w-14 h-14 rounded-full bg-input flex items-center justify-center">
        <CalendarX size={24} strokeWidth={1.5} className="text-secondary" />
      </div>
      <p className="text-base font-semibold text-primary">
        {hasFilters ? 'No records match your filters' : 'No attendance records found'}
      </p>
      <p className="text-sm text-secondary text-center max-w-xs">
        {hasFilters
          ? 'Try adjusting the date range, status, or branch filter.'
          : 'Attendance records will appear here once members start checking in.'}
      </p>
    </div>
  );
}