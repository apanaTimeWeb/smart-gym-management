import { z } from 'zod';

export const SuperadminShellNotificationTypeSchema = z.enum(['INFO', 'WARNING', 'CRITICAL']);
export type SuperadminShellNotificationType = z.infer<typeof SuperadminShellNotificationTypeSchema>;

export const SuperadminShellNotificationSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  type: SuperadminShellNotificationTypeSchema,
  read: z.boolean(),
  createdAt: z.string(),
});
export type SuperadminShellNotification = z.infer<typeof SuperadminShellNotificationSchema>;

export interface SuperadminShellNotificationIconProps {
  type: SuperadminShellNotificationType;
}
