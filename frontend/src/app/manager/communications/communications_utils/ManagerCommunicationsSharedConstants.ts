// RESPONSIBILITY: Constants, Zod schema, mock data, and message templates for the Communications module.
import { z } from 'zod';
import { COMM_MESSAGE_TEMPLATES } from '@/app/manager/communications/communications_fixtures/ManagerCommunicationsMockData';
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



export const CHURN_REASON_LABEL: Record<ChurnReasonType, string> = {
  price:        'Price / Cost',
  relocation:   'Relocation',
  schedule:     'Schedule Conflict',
  personal:     'Personal Reasons',
  dissatisfied: 'Dissatisfied',
  unknown:      'Unknown',
};
