// RESPONSIBILITY: Defines the notifications business object independent from TypeORM persistence.
// FLOW: notifications repository → mapper → domain object → service.

export interface NotificationsNotificationDomain {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  type: string | null;
  actionUrl: string | null;
  relatedEntityId: string | null;
  relatedEntityType: string | null;
  metadata: Record<string, unknown> | null;
}
