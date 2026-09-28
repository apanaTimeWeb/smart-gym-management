// RESPONSIBILITY: Defines canonical schedule enums; API labels are translated by TrainerScheduleEnumMapper.
// FLOW: Frontend label → DTO transform → canonical enum → TypeORM enum → API mapper → frontend label.
export enum ScheduleDay { MONDAY='MONDAY', TUESDAY='TUESDAY', WEDNESDAY='WEDNESDAY', THURSDAY='THURSDAY', FRIDAY='FRIDAY', SATURDAY='SATURDAY', SUNDAY='SUNDAY' }
export enum LeaveType { SICK_LEAVE='SICK_LEAVE', CASUAL_LEAVE='CASUAL_LEAVE', EMERGENCY='EMERGENCY', PERSONAL='PERSONAL', OTHER='OTHER' }
export enum LeaveStatus { PENDING='PENDING', APPROVED='APPROVED', REJECTED='REJECTED' }
