// RESPONSIBILITY: Shared display constants for the Superadmin tenant messaging module.
import type { MessageChannel, MessageStatus } from '@/app/superadmin/messaging/messaging_types/superadmin_messaging_types';

export const ITEMS_PER_PAGE = 10;

export const CHANNEL_STYLES: Record<MessageChannel, string> = {
  EMAIL: 'bg-primary/10 text-primary border border-primary/30',
  SMS: 'bg-success/10 text-success border border-success/30',
  IN_APP: 'bg-info/10 text-info border border-info/30',
};

export const MESSAGE_STATUS_STYLES: Record<MessageStatus, string> = {
  SENT: 'bg-success/10 text-success border border-success/30',
  DRAFT: 'bg-input text-secondary border border-border',
  FAILED: 'bg-danger/10 text-danger border border-danger/30',
  SCHEDULED: 'bg-warning/10 text-warning border border-warning/30',
};
