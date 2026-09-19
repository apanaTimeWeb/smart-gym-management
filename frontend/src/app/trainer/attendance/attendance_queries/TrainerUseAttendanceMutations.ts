// RESPONSIBILITY: TanStack mutation hooks for Attendance module write operations.
// DATA FLOW: Component → useMutation → attendance_api → invalidate query cache
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getUser } from '@/lib/api';
import {
  createAttendanceRecord,
  checkoutAttendance,
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
    mutationFn: (dto: CreateAttendanceDto) => createAttendanceRecord(dto),
    onSuccess: invalidateAttendance,
  });

  const selfCheckIn = useMutation({
    mutationFn: () => {
      const user = getUser();
      if (!user?.id) throw new Error('Trainer ID not found');
      return selfCheckInAttendance(String(user.id));
    },
    onSuccess: invalidateAttendance,
  });

  const selfCheckOut = useMutation({
    mutationFn: () => {
      const user = getUser();
      if (!user?.id) throw new Error('Trainer ID not found');
      return checkoutAttendance(String(user.id), new Date().toISOString());
    },
    onSuccess: invalidateAttendance,
  });

  return { markAttendance, selfCheckIn, selfCheckOut };
}
