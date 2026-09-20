'use client';
// RESPONSIBILITY: TanStack mutation hooks for Attendance module write operations.
// DATA FLOW: Component → useMutation → attendance_api → invalidate query cache
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getUser } from '@/lib/api';
import {
  createAttendanceRecord,
  checkOutAttendance,
  selfCheckInAttendance,
} from '@/app/trainer/attendance/attendance_api/TrainerAttendance_api';
import type { CreateAttendanceDto } from '@/app/trainer/attendance/attendance_types/TrainerAttendance_types';

/** Mutations: mark attendance, self check-in, and self check-out. */
export function useAttendanceMutations() {
  const queryClient = useQueryClient();

  const invalidateAttendance = () => {
    void queryClient.invalidateQueries({ queryKey: ['trainer', 'attendance'] });
  };

  const markAttendance = useMutation({
    mutationFn: ({ dto, idempotencyKey }: { dto: CreateAttendanceDto; idempotencyKey: string }) => createAttendanceRecord(dto, idempotencyKey),
    onSuccess: invalidateAttendance,
  });

  const selfCheckIn = useMutation({
    mutationFn: ({ idempotencyKey }: { idempotencyKey: string }) => {
      const user = getUser();
      if (!user?.id) throw new Error('Trainer ID not found');
      return selfCheckInAttendance(String(user.id), idempotencyKey);
    },
    onSuccess: invalidateAttendance,
  });

  const selfCheckOut = useMutation({
    mutationFn: ({ idempotencyKey }: { idempotencyKey: string }) => {
      const user = getUser();
      if (!user?.id) throw new Error('Trainer ID not found');
      return checkOutAttendance(String(user.id), new Date().toISOString(), idempotencyKey);
    },
    onSuccess: invalidateAttendance,
  });

  return { markAttendance, selfCheckIn, selfCheckOut };
}
