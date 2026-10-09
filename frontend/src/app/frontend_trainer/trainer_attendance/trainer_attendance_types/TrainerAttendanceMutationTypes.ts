// RESPONSIBILITY: Defines mutation variable contracts for Trainer Attendance server-state writes.
import type { TrainerAttendanceCreateDto } from '@/app/frontend_trainer/trainer_attendance/trainer_attendance_types/TrainerAttendanceTypes';
export interface TrainerAttendanceCreateMutationVariables { dto: TrainerAttendanceCreateDto; idempotencyKey: string; }
export interface TrainerAttendanceSelfMutationVariables { idempotencyKey: string; }
