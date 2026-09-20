import type { AdminCampaignsQueueItem, AdminCampaignsRecipient } from '@/app/admin/campaigns/campaigns_types/AdminCampaignsTypes';
import { replaceAdminCampaignVariables } from '@/app/admin/campaigns/campaigns_utils/AdminCampaignsWhatsAppUtils';

export function buildAdminCampaignQueue(body: string, recipients: AdminCampaignsRecipient[]): AdminCampaignsQueueItem[] {
  return recipients.map((recipient) => ({
    recipient,
    status: 'QUEUED',
    message: replaceAdminCampaignVariables(body, recipient),
  }));
}

export function updateAdminCampaignQueueStatus(
  queue: AdminCampaignsQueueItem[],
  index: number,
  status: AdminCampaignsQueueItem['status'],
): AdminCampaignsQueueItem[] {
  return queue.map((item, itemIndex) => itemIndex === index ? { ...item, status } : item);
}
