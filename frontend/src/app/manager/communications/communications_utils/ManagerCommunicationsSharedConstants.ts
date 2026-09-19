// RESPONSIBILITY: Static UI configuration and feature-owned message templates for the Communications module.
import type {
  CommSegment,
  CommChannel,
  ChurnReasonType,
  WinBackTemplateTier,
} from '@/app/manager/communications/communications_types/ManagerCommunications_types';

export const COMM_MESSAGE_TEMPLATES: Record<CommSegment, { subject: string; message: string }> = {
  all_active: {
    subject: 'A message from GymSmart',
    message: 'Hi {name}! 👋\n\nThank you for being a valued member of GymSmart. We hope you\'re enjoying your fitness journey!\n\n— Team GymSmart' },
  expiring_7_days: {
    subject: 'Your membership expires soon!',
    message: 'Hi {name}! 🔔\n\nYour membership expires in just 7 days. Renew now to keep your fitness streak going without interruption!\n\n— Team GymSmart' },
  expiring_30_days: {
    subject: 'Membership renewal reminder',
    message: 'Hi {name}! 📅\n\nJust a heads-up — your membership expires in 30 days. Renew early and lock in the best rates!\n\n— Team GymSmart' },
  expired: {
    subject: 'We miss you at GymSmart!',
    message: 'Hi {name}! 💪\n\nYour membership has expired. Come back and restart your fitness journey — we\'d love to have you back!\n\n— Team GymSmart' },
  pending_payment: {
    subject: 'Pending payment reminder',
    message: 'Hi {name}! 🙏\n\nFriendly reminder: You have a pending payment due. Please clear your dues at the earliest to avoid any service interruption.\n\n— Team GymSmart' },
  custom: {
    subject: 'Message from GymSmart',
    message: 'Hi {name}! 👋\n\n' } };

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




export const EMPTY_COMM_FORM = {
  title:   '',
  channel: 'whatsapp' as CommChannel,
  segment: 'expiring_7_days' as CommSegment,
  message: COMM_MESSAGE_TEMPLATES.expiring_7_days.message,
  subject: COMM_MESSAGE_TEMPLATES.expiring_7_days.subject };



export const COMM_ITEMS_PER_PAGE = 10;

export const COMM_STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  sent:    { bg: 'bg-success-bg', text: 'text-success', label: 'Sent' },
  partial: { bg: 'bg-warning-bg', text: 'text-warning', label: 'Partial' },
  failed:  { bg: 'bg-danger-bg',  text: 'text-danger',  label: 'Failed' } };

export const CANCELLATIONS_WIN_BACK_TEMPLATES: Record<WinBackTemplateTier, { label: string; subject: string; message: string }> = {
  '7_days': {
    label: 'Lost < 7 Days',
    subject: 'We noticed you left — come back today!',
    message: 'Hi {name}! 👋\n\nWe noticed your membership ended just a few days ago. We\'d love to have you back! Rejoin this week and we\'ll waive the re-joining fee.\n\nYour fitness journey doesn\'t have to stop here. Come back and pick up right where you left off! 💪\n\n— Team GymSmart' },
  '30_days': {
    label: 'Lost 7–30 Days',
    subject: 'We miss you at GymSmart — special offer inside!',
    message: 'Hi {name}! 🌟\n\nIt\'s been a few weeks since we last saw you, and we genuinely miss having you around!\n\nTo make it easy to come back, we\'re offering you a *special 10% discount* on your next membership renewal. This offer is valid for the next 7 days.\n\nReady to restart your fitness journey? Reply to this message or walk in to the gym anytime!\n\n— Team GymSmart' },
  '90_days': {
    label: 'Lost 30–90 Days',
    subject: 'Still thinking about getting back in shape?',
    message: 'Hi {name}! 💪\n\nWe\'ve been thinking about you. It\'s been a while since your last session at GymSmart, and we want you to know the door is always open.\n\nWe\'ve added new equipment, refreshed our batch timings, and our trainers are ready to build a custom plan just for you.\n\nCome visit us anytime — no strings attached. Let\'s get you back on track! 🏋️\n\n— Team GymSmart' },
  custom: {
    label: 'Custom Message',
    subject: 'A personal message from GymSmart',
    message: 'Hi {name}! 👋\n\n' } };

// ─── Churn Recovery Constants ─────────────────────────────────────────────────

export const CANCELLATIONS_ITEMS_PER_PAGE = 10;

export const CANCELLATIONS_REASON_OPTIONS: { value: ChurnReasonType | 'all'; label: string }[] = [
  { value: 'all',          label: 'All Reasons' },
  { value: 'price',        label: 'Price / Cost' },
  { value: 'relocation',   label: 'Relocation' },
  { value: 'schedule',     label: 'Schedule Conflict' },
  { value: 'personal',     label: 'Personal Reasons' },
  { value: 'dissatisfied', label: 'Dissatisfied' },
  { value: 'unknown',      label: 'Unknown' },
];



export const CANCELLATIONS_REASON_LABEL: Record<ChurnReasonType, string> = {
  price:        'Price / Cost',
  relocation:   'Relocation',
  schedule:     'Schedule Conflict',
  personal:     'Personal Reasons',
  dissatisfied: 'Dissatisfied',
  unknown:      'Unknown' };
