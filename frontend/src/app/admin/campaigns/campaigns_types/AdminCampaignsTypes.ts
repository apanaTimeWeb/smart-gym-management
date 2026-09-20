export interface AdminCampaignsTemplate {
  id: string;
  title: string;
  body: string;
  type: 'FEE_REMINDER' | 'OVERDUE' | 'RENEWAL' | 'CUSTOM';
}

export interface AdminCampaignsAudience {
  id: string;
  name: string;
  description: string;
}

export interface AdminCampaignsRecipient {
  id: string;
  name: string;
  phone: string;
  branchName: string;
}

export type AdminCampaignsQueueStatus = 'QUEUED' | 'OPENED' | 'SENT' | 'SKIPPED';

export interface AdminCampaignsQueueItem {
  recipient: AdminCampaignsRecipient;
  message: string;
  status: AdminCampaignsQueueStatus;
}
