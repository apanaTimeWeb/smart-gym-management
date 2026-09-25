// RESPONSIBILITY: Shared display constants for the Superadmin tenant messaging module.
import type { MessageChannel, MessageStatus } from '@/app/superadmin/messaging/messaging_types/SuperadminMessagingTypes';

export const ITEMS_PER_PAGE = 10;

export const CHANNEL_STYLES: Record<MessageChannel, string> = {
  EMAIL: 'bg-primary-subtle text-primary border border-border',
  SMS: 'bg-success-bg text-success border border-border',
  IN_APP: 'bg-info-bg text-info border border-border',
  WHATSAPP: 'bg-success text-white border border-success',
};

export const MESSAGE_STATUS_STYLES: Record<MessageStatus, string> = {
  SENT: 'bg-success-bg text-success border border-border',
  DRAFT: 'bg-input text-secondary border border-border',
  FAILED: 'bg-danger-bg text-danger border border-border',
  SCHEDULED: 'bg-warning-bg text-warning border border-border',
  QUEUED: 'bg-info-bg text-info border border-border',
};
