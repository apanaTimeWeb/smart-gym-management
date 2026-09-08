// RESPONSIBILITY: Constants, Zod schema, mock data, and message templates for the Communications module.
import { z } from 'zod';
import type { CommCampaign, CommKPIData, CommSegment, CommChannel, CommAutomation } from '@/app/manager/communications/communications_types/communications_types';

export const COMM_SEGMENT_OPTIONS: { value: CommSegment; label: string; description: string }[] = [
  { value: 'all_active',       label: 'All Active Members',       description: 'Every member with an active membership' },
  { value: 'expiring_7_days',  label: 'Expiring in 7 Days',       description: 'Members whose membership expires within 7 days' },
  { value: 'expiring_30_days', label: 'Expiring in 30 Days',      description: 'Members whose membership expires within 30 days' },
  { value: 'expired',          label: 'Expired Members',          description: 'Members whose membership has already expired' },
  { value: 'pending_payment',  label: 'Pending Payment',          description: 'Members with an outstanding due amount' },
  { value: 'custom',           label: 'Custom Selection',         description: 'Manually pick recipients from the member list' },
];

export const COMM_CHANNEL_OPTIONS: { value: CommChannel; label: string }[] = [
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'email',    label: 'Email' },
];

export const COMM_MESSAGE_TEMPLATES: Record<CommSegment, { subject: string; message: string }> = {
  all_active: {
    subject: 'A message from GymSmart',
    message: 'Hi {name}! 👋\n\nThank you for being a valued member of GymSmart. We hope you\'re enjoying your fitness journey!\n\n— Team GymSmart',
  },
  expiring_7_days: {
    subject: 'Your membership expires soon!',
    message: 'Hi {name}! 🔔\n\nYour membership expires in just 7 days. Renew now to keep your fitness streak going without interruption!\n\n— Team GymSmart',
  },
  expiring_30_days: {
    subject: 'Membership renewal reminder',
    message: 'Hi {name}! 📅\n\nJust a heads-up — your membership expires in 30 days. Renew early and lock in the best rates!\n\n— Team GymSmart',
  },
  expired: {
    subject: 'We miss you at GymSmart!',
    message: 'Hi {name}! 💪\n\nYour membership has expired. Come back and restart your fitness journey — we\'d love to have you back!\n\n— Team GymSmart',
  },
  pending_payment: {
    subject: 'Pending payment reminder',
    message: 'Hi {name}! 🙏\n\nFriendly reminder: You have a pending payment due. Please clear your dues at the earliest to avoid any service interruption.\n\n— Team GymSmart',
  },
  custom: {
    subject: 'Message from GymSmart',
    message: 'Hi {name}! 👋\n\n',
  },
};

export const CommFormSchema = z.object({
  title:   z.string().min(3, 'Campaign title is required'),
  channel: z.enum(['whatsapp', 'email']),
  segment: z.enum(['all_active', 'expiring_7_days', 'expiring_30_days', 'expired', 'pending_payment', 'custom']),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  subject: z.string().min(3, 'Subject is required for email'),
});

export const EMPTY_COMM_FORM = {
  title:   '',
  channel: 'whatsapp' as CommChannel,
  segment: 'expiring_7_days' as CommSegment,
  message: COMM_MESSAGE_TEMPLATES.expiring_7_days.message,
  subject: COMM_MESSAGE_TEMPLATES.expiring_7_days.subject,
};

export const MOCK_CAMPAIGNS: CommCampaign[] = [
  { id: 'c1', title: 'June Renewal Reminder', channel: 'whatsapp', segment: 'expiring_7_days', segmentLabel: 'Expiring in 7 Days', message: 'Hi! Your membership expires soon...', recipientCount: 18, sentCount: 18, status: 'sent', sentAt: '2025-06-10T10:30:00Z', sentBy: 'Manager' },
  { id: 'c2', title: 'Pending Dues Alert',    channel: 'whatsapp', segment: 'pending_payment',  segmentLabel: 'Pending Payment',     message: 'Friendly reminder about your dues...', recipientCount: 12, sentCount: 11, status: 'partial', sentAt: '2025-06-08T09:00:00Z', sentBy: 'Manager' },
  { id: 'c3', title: 'Welcome Back Campaign', channel: 'email',    segment: 'expired',          segmentLabel: 'Expired Members',     message: 'We miss you at GymSmart!', subject: 'We miss you!', recipientCount: 34, sentCount: 34, status: 'sent', sentAt: '2025-06-05T14:00:00Z', sentBy: 'Manager' },
  { id: 'c4', title: 'Monthly Newsletter',    channel: 'email',    segment: 'all_active',       segmentLabel: 'All Active Members',  message: 'This month at GymSmart...', subject: 'June Newsletter', recipientCount: 120, sentCount: 120, status: 'sent', sentAt: '2025-06-01T08:00:00Z', sentBy: 'Manager' },
];

export const MOCK_AUTOMATIONS: CommAutomation[] = [
  {
    id: 'auto-1',
    type: 'birthday',
    title: 'Birthday Wishes',
    description: 'Automatically send a WhatsApp message to members on their birthday at 9:00 AM.',
    enabled: true,
    channel: 'whatsapp',
    messageTemplate: 'Hi {name}, wishing you a very Happy Birthday from all of us at GymSmart! 🎂 Have a fantastic day and keep crushing those fitness goals! 💪',
    sendTime: '09:00',
  },
  {
    id: 'auto-2',
    type: 'anniversary',
    title: 'Gym Anniversary',
    description: 'Celebrate the day they joined our gym. Sent at 10:00 AM.',
    enabled: false,
    channel: 'whatsapp',
    messageTemplate: 'Happy Gym Anniversary {name}! 🎉 You have been with us for another strong year. Thank you for being part of the GymSmart family. Keep lifting! 🏋️‍♂️',
    sendTime: '10:00',
  }
];

export const MOCK_COMM_KPI: CommKPIData = {
  totalSent: 183,
  whatsappSent: 29,
  emailSent: 154,
  campaignsThisMonth: 4,
};

export const COMM_ITEMS_PER_PAGE = 10;

export const COMM_STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  sent:    { bg: 'bg-success-bg', text: 'text-success', label: 'Sent' },
  partial: { bg: 'bg-warning-bg', text: 'text-warning', label: 'Partial' },
  failed:  { bg: 'bg-danger-bg',  text: 'text-danger',  label: 'Failed' },
};
