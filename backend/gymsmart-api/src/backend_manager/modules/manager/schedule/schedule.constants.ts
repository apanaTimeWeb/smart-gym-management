// RESPONSIBILITY: Centralized runtime enum/configuration for Manager schedule.
// FLOW: DTO/entity/query allowlists -> Schedule feature behavior.

export enum ShiftDay {
  MONDAY = 'Monday',
  TUESDAY = 'Tuesday',
  WEDNESDAY = 'Wednesday',
  THURSDAY = 'Thursday',
  FRIDAY = 'Friday',
  SATURDAY = 'Saturday',
  SUNDAY = 'Sunday',
}

export enum ShiftStatus {
  ACTIVE = 'Active',
  OFF = 'Off',
  LEAVE = 'Leave',
}

export enum ScheduleRecordStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export const ScheduleAllowedSortFields = ['createdAt', 'updatedAt', 'id'] as const;
