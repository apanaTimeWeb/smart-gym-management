export type BroadcastStatus = 'SENT' | 'SCHEDULED' | 'DRAFT';
export type BroadcastAudience = 'ALL_TENANTS' | 'PRO_ONLY' | 'SUSPENDED_ONLY';
export interface IBroadcast {
  id: string;
  title: string;
  content: string;
  status: BroadcastStatus;
  audience: BroadcastAudience;
  scheduledDate: Date | null;
  sentDate: Date | null;
}
