"use client";
import { CAMPAIGN_QUEUE_STATUS_VALUES } from '@/app/frontend_admin/admin_campaigns/admin_campaigns_constants/AdminCampaignsConstants';
// RESPONSIBILITY: Owns Campaigns UI state, query orchestration, queue construction, and external WhatsApp-open lifecycle.
import { ADMIN_CAMPAIGNS_QUERY_KEYS } from '@/app/frontend_admin/admin_campaigns/admin_campaigns_constants/AdminCampaignsQueryKeys';
// DATA FLOW: selected audience/template → TanStack Query → feature-owned queue state → WhatsApp action → visible queue status.
import { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AdminCampaignsApi } from '@/app/frontend_admin/admin_campaigns/admin_campaigns_api/AdminCampaignsApi';
import { buildAdminCampaignQueue, updateAdminCampaignQueueStatus } from '@/app/frontend_admin/admin_campaigns/admin_campaigns_utils/AdminCampaignsQueueUtils';
import { buildAdminWhatsAppLink } from '@/app/frontend_admin/admin_campaigns/admin_campaigns_utils/AdminCampaignsWhatsAppUtils';
import type { AdminCampaignsQueueItem } from '@/app/frontend_admin/admin_campaigns/admin_campaigns_types/AdminCampaignsTypes';
/**
 * @description useAdminCampaignsLogic: Owns Campaigns UI state, query orchestration, queue construction, and external WhatsApp-open lifecycle.
 * @dependencies Consumes AdminCampaignsQueryKeys, AdminCampaignsApi, AdminCampaignsQueueUtils, AdminCampaignsWhatsAppUtils, AdminCampaignsTypes.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminCampaignsLogic() {
  const [audienceId, setAudienceId] = useState('');
  const [templateId, setTemplateId] = useState('');
  const [body, setBody] = useState('');
  const [queue, setQueue] = useState<AdminCampaignsQueueItem[]>([]);

  const audiencesQuery = useQuery({
    queryKey: ADMIN_CAMPAIGNS_QUERY_KEYS.key('audiences'),
    queryFn: () => AdminCampaignsApi.fetchAudiences(),
  });
  const templatesQuery = useQuery({
    queryKey: ADMIN_CAMPAIGNS_QUERY_KEYS.key('templates'),
    queryFn: () => AdminCampaignsApi.fetchTemplates(),
  });
  const recipientsQuery = useQuery({
    queryKey: ADMIN_CAMPAIGNS_QUERY_KEYS.key('recipients', { audienceId }),
    queryFn: () => AdminCampaignsApi.fetchRecipients(audienceId),
    enabled: Boolean(audienceId),
  });

  const selectAudience = useCallback((id: string) => {
    setAudienceId(id);
    setQueue([]);
  }, []);

  const selectTemplate = useCallback((id: string) => {
    setTemplateId(id);
    const template = templatesQuery.data?.data?.find((item) => item.id === id);
    setBody(template?.body ?? '');
  }, [templatesQuery.data?.data]);

  const createQueue = useCallback(() => {
    const recipients = recipientsQuery.data?.data?.recipients ?? [];
    if (!audienceId || !body.trim() || recipients.length === 0) return false;
    setQueue(buildAdminCampaignQueue(body, recipients));
    return true;
  }, [audienceId, body, recipientsQuery.data?.data?.recipients]);

  const openQueueItem = useCallback((index: number) => {
    const item = queue[index];
    if (!item || item.status !== CAMPAIGN_QUEUE_STATUS_VALUES.QUEUED) return;
    const link = buildAdminWhatsAppLink(item.recipient.phone, item.message);
    if (!link) return;
    window.open(link, '_blank', 'noopener,noreferrer');
    setQueue((current) => updateAdminCampaignQueueStatus(current, index, 'OPENED'));
  }, [queue]);

  const setQueueStatus = useCallback((index: number, status: AdminCampaignsQueueItem['status']) => {
    setQueue((current) => updateAdminCampaignQueueStatus(current, index, status));
  }, []);

  return {
    audienceId, selectAudience, templateId, selectTemplate, body, setBody, queue,
    audiences: audiencesQuery.data?.data ?? [], audiencesStatus: audiencesQuery.status, audiencesError: audiencesQuery.error, refetchAudiences: audiencesQuery.refetch,
    templates: templatesQuery.data?.data ?? [], templatesStatus: templatesQuery.status, templatesError: templatesQuery.error, refetchTemplates: templatesQuery.refetch,
    recipientsStatus: recipientsQuery.status, recipientsError: recipientsQuery.error, refetchRecipients: recipientsQuery.refetch, recipientCount: recipientsQuery.data?.data?.recipients?.length ?? 0,
    createQueue, openQueueItem, setQueueStatus,
  };
}
