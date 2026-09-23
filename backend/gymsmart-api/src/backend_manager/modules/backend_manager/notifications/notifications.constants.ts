// RESPONSIBILITY: Centralized runtime enum/configuration for Manager notifications.
// FLOW: DTO/entity/query allowlists -> Notifications feature behavior.

export enum NotificationType {
  SYSTEM = 'SYSTEM',
  PAYMENT = 'PAYMENT',
  EXPIRY = 'EXPIRY',
  ATTENDANCE = 'ATTENDANCE',
  INQUIRY = 'INQUIRY',
  ANNOUNCEMENT = 'ANNOUNCEMENT',
}

export enum NotificationStatus {
  UNREAD = 'UNREAD',
  READ = 'READ',
}

export enum NotificationPriority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export enum NotificationsRecordStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export const NotificationsAllowedSortFields = ['createdAt', 'updatedAt', 'id'] as const;
