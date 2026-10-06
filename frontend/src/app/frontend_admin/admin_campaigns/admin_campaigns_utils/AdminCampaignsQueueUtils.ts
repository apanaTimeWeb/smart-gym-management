import type { AdminCampaignsQueueItem, AdminCampaignsRecipient } from '@/app/frontend_admin/admin_campaigns/admin_campaigns_types/AdminCampaignsTypes';
import { replaceAdminCampaignVariables } from '@/app/frontend_admin/admin_campaigns/admin_campaigns_utils/AdminCampaignsWhatsAppUtils';
import { CAMPAIGN_QUEUE_STATUS_VALUES } from '@/app/frontend_admin/admin_campaigns/admin_campaigns_constants/AdminCampaignsConstants';

/**
 * buildAdminCampaignQueue provides a feature-local utility used by the Admin module without introducing cross-feature business dependencies.
 * @remarks Inputs and outputs stay explicitly typed and deterministic for tests and reuse inside this feature.
 */
export function buildAdminCampaignQueue(body: string, recipients: AdminCampaignsRecipient[]): AdminCampaignsQueueItem[] {
  return recipients.map((recipient) => ({
    recipient,
    status: CAMPAIGN_QUEUE_STATUS_VALUES.QUEUED,
    message: replaceAdminCampaignVariables(body, recipient),
  }));
}

/**
 * updateAdminCampaignQueueStatus provides a feature-local utility used by the Admin module without introducing cross-feature business dependencies.
 * @remarks Inputs and outputs stay explicitly typed and deterministic for tests and reuse inside this feature.
 */
export function updateAdminCampaignQueueStatus(
  queue: AdminCampaignsQueueItem[],
  index: number,
  status: AdminCampaignsQueueItem['status'],
): AdminCampaignsQueueItem[] {
  return queue.map((item, itemIndex) => itemIndex === index ? { ...item, status } : item);
}
