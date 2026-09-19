// RESPONSIBILITY: Validates Attendance-owned member and staff snapshots returned by the API boundary.
import { z } from 'zod';

export const managerAttendanceMemberSnapshotSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  phone: z.string(),
  status: z.enum(['ACTIVE', 'PENDING', 'EXPIRED', 'FROZEN', 'SUSPENDED', 'BANNED']),
  planName: z.string().optional(),
  joinDate: z.string().optional(),
});

export const managerAttendanceStaffSnapshotSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  role: z.string().min(1),
  phone: z.string(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'ON_LEAVE']),
});

export const managerAttendanceMemberSnapshotResponseSchema = z.object({
  members: z.array(managerAttendanceMemberSnapshotSchema),
});

export const managerAttendanceStaffSnapshotResponseSchema = z.object({
  staff: z.array(managerAttendanceStaffSnapshotSchema),
});
