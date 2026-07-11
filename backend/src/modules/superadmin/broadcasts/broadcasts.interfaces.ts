export interface IBroadcast {
  id: string;
  title: string;
  content: string;
  status: 'DRAFT' | 'SCHEDULED' | 'SENT';
  audience: 'ALL_TENANTS' | 'PRO_ONLY' | 'ENTERPRISE_ONLY' | 'TRIAL_ONLY';
  scheduledDate: string | null;
  sentDate: string | null;
}

export interface IBroadcastListResponse {
  data: IBroadcast[];
  meta: { total: number; page: number; limit: number };
  message: string;
}
