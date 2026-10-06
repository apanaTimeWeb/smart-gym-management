// RESPONSIBILITY: Defines the typed response record for Manager HR staff attendance history.
export interface ManagerHrStaffAttendanceRecord {
  date: string;
  status: string;
  checkIn?: string;
  checkOut?: string;
}
