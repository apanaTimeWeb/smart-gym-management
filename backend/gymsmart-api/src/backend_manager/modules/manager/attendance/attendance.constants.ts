// RESPONSIBILITY: Centralized runtime enum/configuration for Manager attendance.
// FLOW: DTO/entity/query allowlists -> Attendance feature behavior.

export enum ManagerAttendancePersonType {
  MEMBER = 'MEMBER',
  STAFF = 'STAFF',
}

export enum CheckInMethod {
  QR = 'QR',
  MANUAL = 'Manual',
  BIOMETRIC = 'Biometric',
}

export enum ManagerAttendanceMemberStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  EXPIRED = 'EXPIRED',
  FROZEN = 'FROZEN',
  SUSPENDED = 'SUSPENDED',
  BANNED = 'BANNED',
}

export enum ManagerAttendanceStaffStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ON_LEAVE = 'ON_LEAVE',
}

export enum ManagerQrScanStatus {
  IDLE = 'IDLE',
  SCANNING = 'SCANNING',
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
}

export enum AttendanceRecordStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export const AttendanceAllowedSortFields = ['createdAt', 'updatedAt', 'id'] as const;

export enum AttendancePersonType {
  MEMBER = 'MEMBER',
  STAFF = 'STAFF',
}

export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  LEAVE = 'LEAVE',
  ABSENT = 'ABSENT',
}
