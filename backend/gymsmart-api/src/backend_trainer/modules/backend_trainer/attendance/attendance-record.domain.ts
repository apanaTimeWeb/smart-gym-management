// RESPONSIBILITY: Defines the Attendance business representation returned to application services.
// FLOW: Repository entity → mapper → AttendanceRecordDomain.

export interface AttendanceRecordDomain { id: string; type: string; date: string; checkIn: string | null; checkOut: string | null; durationMinutes: number | null; checkInMethod: string | null; notes: string | null; memberId: string | null; staffId: string | null; member: {id:string;name:string;phone?:string|null;email?:string|null} | null; staff: {id:string;name:string;phone?:string|null;email?:string|null} | null; }