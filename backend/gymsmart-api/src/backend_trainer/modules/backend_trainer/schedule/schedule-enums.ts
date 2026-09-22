// RESPONSIBILITY: Defines finite schedule domain enum values used by DTOs and persistence.
// FLOW: schedule DTO/entity → typed enum → API/DB contract.

export enum ScheduleDay { Monday = 'Monday', Tuesday = 'Tuesday', Wednesday = 'Wednesday', Thursday = 'Thursday', Friday = 'Friday', Saturday = 'Saturday', Sunday = 'Sunday' }
export enum LeaveType { SICK_LEAVE = 'Sick Leave', CASUAL_LEAVE = 'Casual Leave', EMERGENCY = 'Emergency', PERSONAL = 'Personal', OTHER = 'Other' }
export enum LeaveStatus { PENDING = 'PENDING', APPROVED = 'APPROVED', REJECTED = 'REJECTED' }
