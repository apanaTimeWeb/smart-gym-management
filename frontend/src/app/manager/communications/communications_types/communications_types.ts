// RESPONSIBILITY: TypeScript types for the Manager Communications module.
// HIGHLY RECOMMENDED additions: failedCount, deliveredCount, openRate, scheduledAt on CommCampaign;
// MessageTemplate interface; lifetimeValue on ChurnedMember.

export type FetchState = 'idle' | 'loading' | 'success' | 'error';
export type CommChannel = 'whatsapp' | 'email';
export type CommSegment =
  | 'all_active'
  | 'expiring_7_days'
  | 'expiring_30_days'
  | 'expired'
  | 'pending_payment'
  | 'custom';

export type CommStatus = 'sent' | 'failed' | 'partial' | 'scheduled';

export interface CommRecipient {
  memberId: string;
  name: string;
  phone: string;
  email: string;
  status: string;
  expiryDate: string;
  pendingAmount: number;
}

// ─── Campaign ─────────────────────────────────────────────────────────────────
export interface CommCampaign {
  id: string;
  title: string;
  channel: CommChannel;
  segment: CommSegment;
  segmentLabel: string;
  message: string;
  subject?: string;
  recipientCount: number;
  sentCount: number;
  status: CommStatus;
  sentAt: string;
  sentBy: string;
  // HIGHLY RECOMMENDED — standard analytics fields for campaigns
  failedCount: number;
  deliveredCount: number;
  openRate?: number;      // percentage, email-only
  scheduledAt?: string;   // if status is 'scheduled'
}

// ─── Message Templates ────────────────────────────────────────────────────────
/** HIGHLY RECOMMENDED — standard SaaS feature for reusable message templates. */
export interface MessageTemplate {
  id: string;
  name: string;
  channel: CommChannel;
  body: string;
  variables: string[];     // e.g. ['{{member_name}}', '{{expiry_date}}']
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── KPIs ─────────────────────────────────────────────────────────────────────
export interface CommKPIData {
  totalSent: number;
  whatsappSent: number;
  emailSent: number;
  campaignsThisMonth: number;
}

export interface CommFormValues {
  title: string;
  channel: CommChannel;
  segment: CommSegment;
  message: string;
  subject: string;
}

// ─── Automation ───────────────────────────────────────────────────────────────
export type CommAutomationType = 'birthday' | 'anniversary';

export interface CommAutomation {
  id: string;
  type: CommAutomationType;
  title: string;
  description: string;
  enabled: boolean;
  channel: CommChannel;
  messageTemplate: string;
  sendTime: string;
}

// ─── Churn Recovery ───────────────────────────────────────────────────────────
export type ChurnReasonType =
  | 'price'
  | 'relocation'
  | 'schedule'
  | 'personal'
  | 'dissatisfied'
  | 'unknown';

export type WinBackTemplateTier = '7_days' | '30_days' | '90_days' | 'custom';

export interface ChurnedMember {
  memberId: string;
  name: string;
  phone: string;
  email: string;
  plan: string;
  exitDate: string;
  daysSinceExit: number;
  reason: ChurnReasonType;
  lastContactedAt: string | null;
  recovered: boolean;
  // HIGHLY RECOMMENDED — needed for churn impact analysis
  lifetimeValue: number;   // total INR paid by member during their tenure
}

export interface ChurnKPIData {
  totalChurned: number;
  churnedThisMonth: number;
  recoveryRate: number;
  avgDaysSinceExit: number;
}

export interface WinBackRecord {
  id: string;
  memberId: string;
  memberName: string;
  channel: CommChannel;
  templateTier: WinBackTemplateTier;
  sentAt: string;
  recovered: boolean;
}
