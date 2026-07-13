export enum BroadcastStatus {
  SENT = 'SENT',
  SCHEDULED = 'SCHEDULED',
  DRAFT = 'DRAFT'
}
export enum BroadcastAudience {
  ALL_TENANTS = 'ALL_TENANTS',
  PRO_ONLY = 'PRO_ONLY',
  SUSPENDED_ONLY = 'SUSPENDED_ONLY'
}

export interface IBroadcast {
  id: string;
  title: string;
  content: string;
  status: BroadcastStatus;
  audience: BroadcastAudience;
  scheduledDate: Date | null;
  sentDate: Date | null;
}

export interface BroadcastResponse {
  success: boolean;
  message: string;
  data: IBroadcast | IBroadcast[] | any | null;
}
