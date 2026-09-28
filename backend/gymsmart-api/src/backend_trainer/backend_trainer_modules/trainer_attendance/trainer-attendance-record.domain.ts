// RESPONSIBILITY: Defines the Attendance domain response independently from TypeORM persistence.
// FLOW: TrainerAttendanceRecordEntity → mapper → frontend-compatible AttendanceRecordDomain.

export interface AttendanceRecordDomain {
  id: string;
  type: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  durationMinutes?: number;
  checkInMethod?: string;
  notes?: string;
  memberId?: string;
  staffId?: string;
  member?: { id: string; name: string; phone?: string; email?: string };
  staff?: { id: string; name: string; phone?: string; email?: string };
}
