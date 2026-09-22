// RESPONSIBILITY: Defines finite attendance domain enum values used by DTOs and persistence.
// FLOW: attendance DTO/entity → typed enum → API/DB contract.

export enum AttendanceRecordType { MEMBER = 'MEMBER', STAFF = 'STAFF' }
export enum AttendanceCheckInMethod { MANUAL = 'MANUAL', QR = 'QR', SELF = 'SELF' }
