// RESPONSIBILITY: TypeScript types for the Manager Communications module.

export type FetchState = 'idle' | 'loading' | 'success' | 'error';
export type CommChannel = 'whatsapp' | 'email';
export type CommSegment =
  | 'all_active'
  | 'expiring_7_days'
  | 'expiring_30_days'
  | 'expired'
  | 'pending_payment'
  | 'custom';

export type CommStatus = 'sent' | 'failed' | 'partial';

export interface CommRecipient {
  memberId: string;
  name: string;
  phone: string;
  email: string;
  status: string;
  expiryDate: string;
  pendingAmount: number;
}

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
}

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
