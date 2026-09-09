// RESPONSIBILITY: Static hardcoded data and style constants for the Messaging module.
// All mock data lives here so the client component stays pure UI. Replace with API calls tomorrow.

import type { TenantMessage, SuperadminNotification, MessageChannel, MessageStatus, MessagingTenant } from '@/app/superadmin/messaging/messaging_types/messaging_types';

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

// Removed INITIAL_MESSAGES, MESSAGING_TENANTS, and INITIAL_NOTIFICATIONS to enforce dynamic API usage.
