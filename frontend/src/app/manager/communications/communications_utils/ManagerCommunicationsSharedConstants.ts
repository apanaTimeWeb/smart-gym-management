// RESPONSIBILITY: Constants, Zod schema, mock data, and message templates for the Communications module.
import { z } from 'zod';
import type {
  CommCampaign,
  CommKPIData,
  CommSegment,
  CommChannel,
  CommAutomation,
  ChurnedMember,
  ChurnKPIData,
  ChurnReasonType,
  WinBackTemplateTier,
} from '@/app/manager/communications/communications_types/communications_types';

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
  { id: 'c1', title: 'June Renewal Reminder', channel: 'whatsapp', segment: 'expiring_7_days', segmentLabel: 'Expiring in 7 Days', message: 'Hi! Your membership expires soon...', recipientCount: 18, sentCount: 18, failedCount: 0, deliveredCount: 18, status: 'sent', sentAt: '2025-06-10T10:30:00Z', sentBy: 'Manager' },
  { id: 'c2', title: 'Pending Dues Alert',    channel: 'whatsapp', segment: 'pending_payment',  segmentLabel: 'Pending Payment',     message: 'Friendly reminder about your dues...', recipientCount: 12, sentCount: 11, failedCount: 1, deliveredCount: 11, status: 'partial', sentAt: '2025-06-08T09:00:00Z', sentBy: 'Manager' },
  { id: 'c3', title: 'Welcome Back Campaign', channel: 'email',    segment: 'expired',          segmentLabel: 'Expired Members',     message: 'We miss you at GymSmart!', subject: 'We miss you!', recipientCount: 34, sentCount: 34, failedCount: 0, deliveredCount: 34, status: 'sent', sentAt: '2025-06-05T14:00:00Z', sentBy: 'Manager' },
  { id: 'c4', title: 'Monthly Newsletter',    channel: 'email',    segment: 'all_active',       segmentLabel: 'All Active Members',  message: 'This month at GymSmart...', subject: 'June Newsletter', recipientCount: 120, sentCount: 120, failedCount: 0, deliveredCount: 120, status: 'sent', sentAt: '2025-06-01T08:00:00Z', sentBy: 'Manager' },
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

// ─── Churn Recovery Constants ─────────────────────────────────────────────────

export const CHURN_ITEMS_PER_PAGE = 10;

export const CHURN_REASON_OPTIONS: { value: ChurnReasonType | 'all'; label: string }[] = [
  { value: 'all',          label: 'All Reasons' },
  { value: 'price',        label: 'Price / Cost' },
  { value: 'relocation',   label: 'Relocation' },
  { value: 'schedule',     label: 'Schedule Conflict' },
  { value: 'personal',     label: 'Personal Reasons' },
  { value: 'dissatisfied', label: 'Dissatisfied' },
  { value: 'unknown',      label: 'Unknown' },
];

export const CHURN_WIN_BACK_TEMPLATES: Record<WinBackTemplateTier, { label: string; subject: string; message: string }> = {
  '7_days': {
    label: 'Churned < 7 Days',
    subject: 'We noticed you left — come back today!',
    message: 'Hi {name}! 👋\n\nWe noticed your membership ended just a few days ago. We\'d love to have you back! Rejoin this week and we\'ll waive the re-joining fee.\n\nYour fitness journey doesn\'t have to stop here. Come back and pick up right where you left off! 💪\n\n— Team GymSmart',
  },
  '30_days': {
    label: 'Churned 7–30 Days',
    subject: 'We miss you at GymSmart — special offer inside!',
    message: 'Hi {name}! 🌟\n\nIt\'s been a few weeks since we last saw you, and we genuinely miss having you around!\n\nTo make it easy to come back, we\'re offering you a *special 10% discount* on your next membership renewal. This offer is valid for the next 7 days.\n\nReady to restart your fitness journey? Reply to this message or walk in to the gym anytime!\n\n— Team GymSmart',
  },
  '90_days': {
    label: 'Churned 30–90 Days',
    subject: 'Still thinking about getting back in shape?',
    message: 'Hi {name}! 💪\n\nWe\'ve been thinking about you. It\'s been a while since your last session at GymSmart, and we want you to know the door is always open.\n\nWe\'ve added new equipment, refreshed our batch timings, and our trainers are ready to build a custom plan just for you.\n\nCome visit us anytime — no strings attached. Let\'s get you back on track! 🏋️\n\n— Team GymSmart',
  },
  custom: {
    label: 'Custom Message',
    subject: 'A personal message from GymSmart',
    message: 'Hi {name}! 👋\n\n',
  },
};

export const MOCK_CHURNED_MEMBERS: ChurnedMember[] = [
  { memberId: 'EX001', name: 'Ravi Shankar',   phone: '9876543222', email: 'ravi@email.com',    plan: 'Monthly Premium', exitDate: '2025-09-02', daysSinceExit: 7,  reason: 'price',        lastContactedAt: null,                 recovered: false, lifetimeValue: 5000 },
  { memberId: 'EX002', name: 'Anita Desai',    phone: '9876543223', email: 'anita@email.com',   plan: 'Quarterly Elite', exitDate: '2025-08-20', daysSinceExit: 20, reason: 'relocation',   lastContactedAt: '2025-08-25T10:00:00Z', recovered: false, lifetimeValue: 12000 },
  { memberId: 'EX003', name: 'Sanjay Patel',   phone: '9876543224', email: 'sanjay@email.com',  plan: 'Monthly Basic',   exitDate: '2025-08-10', daysSinceExit: 30, reason: 'schedule',     lastContactedAt: null,                 recovered: false, lifetimeValue: 3000 },
  { memberId: 'EX004', name: 'Meera Joshi',    phone: '9876543225', email: 'meera@email.com',   plan: 'Annual Premium',  exitDate: '2025-07-15', daysSinceExit: 56, reason: 'personal',     lastContactedAt: null,                 recovered: false, lifetimeValue: 18000 },
  { memberId: 'EX005', name: 'Arun Nair',      phone: '9876543226', email: 'arun@email.com',    plan: 'Monthly Basic',   exitDate: '2025-07-01', daysSinceExit: 70, reason: 'dissatisfied', lastContactedAt: '2025-07-05T09:30:00Z', recovered: false, lifetimeValue: 2000 },
  { memberId: 'EX006', name: 'Priyanka Das',   phone: '9876543227', email: 'priyanka@email.com', plan: 'Quarterly Elite', exitDate: '2025-06-15', daysSinceExit: 86, reason: 'unknown',      lastContactedAt: null,                 recovered: false, lifetimeValue: 9000 },
  { memberId: 'EX007', name: 'Vikram Singh',   phone: '9876543228', email: 'vikram@email.com',  plan: 'Monthly Premium', exitDate: '2025-06-01', daysSinceExit: 100, reason: 'price',       lastContactedAt: null,                 recovered: true,  lifetimeValue: 10000 },
  { memberId: 'EX008', name: 'Divya Kapoor',   phone: '9876543229', email: 'divya2@email.com',  plan: 'Monthly Basic',   exitDate: '2025-05-20', daysSinceExit: 112, reason: 'personal',    lastContactedAt: '2025-06-01T11:00:00Z', recovered: true,  lifetimeValue: 4500 },
];

export const MOCK_CHURN_KPI: ChurnKPIData = {
  totalChurned: 47,
  churnedThisMonth: 8,
  recoveryRate: 12.5,
  avgDaysSinceExit: 43,
};

export const CHURN_REASON_LABEL: Record<ChurnReasonType, string> = {
  price:        'Price / Cost',
  relocation:   'Relocation',
  schedule:     'Schedule Conflict',
  personal:     'Personal Reasons',
  dissatisfied: 'Dissatisfied',
  unknown:      'Unknown',
};
