'use client';
// RESPONSIBILITY: Owns Campaigns UI state, query orchestration, queue construction, and external WhatsApp-open lifecycle.
// DATA FLOW: selected audience/template → TanStack Query → feature-owned queue state → WhatsApp action → visible queue status.
import { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { adminCampaignsApi } from '@/app/admin/campaigns/campaigns_api/AdminCampaignsApi';
import { buildAdminCampaignQueue, updateAdminCampaignQueueStatus } from '@/app/admin/campaigns/campaigns_utils/AdminCampaignsQueueUtils';
import { buildAdminWhatsAppLink } from '@/app/admin/campaigns/campaigns_utils/AdminCampaignsWhatsAppUtils';
import type { AdminCampaignsQueueItem } from '@/app/admin/campaigns/campaigns_types/AdminCampaignsTypes';

/** Coordinates CampaignsLogic state, data flow, and feature behavior. */
export function useAdminCampaignsLogic() {
  const [audienceId, setAudienceId] = useState('');
  const [templateId, setTemplateId] = useState('');
  const [body, setBody] = useState('');
  const [queue, setQueue] = useState<AdminCampaignsQueueItem[]>([]);

  const audiencesQuery = useQuery({
    queryKey: ['admin', 'campaigns', 'audiences'],
    queryFn: () => adminCampaignsApi.fetchAudiences(),
  });
  const templatesQuery = useQuery({
    queryKey: ['admin', 'campaigns', 'templates'],
    queryFn: () => adminCampaignsApi.fetchTemplates(),
  });
  const recipientsQuery = useQuery({
    queryKey: ['admin', 'campaigns', 'recipients', { audienceId }],
    queryFn: () => adminCampaignsApi.fetchRecipients(audienceId),
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
    if (!item || item.status !== 'QUEUED') return;
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
