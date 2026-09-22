// RESPONSIBILITY: Defines the finite notification kinds accepted by the Trainer API and persistence layer.
// FLOW: Notification DTO/entity/mapper → NotificationType → API/DB contract.

export enum NotificationType {
  MEMBER = 'MEMBER',
  WORKOUT = 'WORKOUT',
  ATTENDANCE = 'ATTENDANCE',
  SYSTEM = 'SYSTEM',
}
