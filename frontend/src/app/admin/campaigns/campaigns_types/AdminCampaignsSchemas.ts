import { z } from 'zod';
import {
  type AdminCampaignsAudience,
  type AdminCampaignsRecipient,
  type AdminCampaignsTemplate,
} from '@/app/admin/campaigns/campaigns_types/AdminCampaignsTypes';

const adminCampaignsTemplateSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  type: z.enum(['FEE_REMINDER', 'OVERDUE', 'RENEWAL', 'CUSTOM']),
});

const adminCampaignsAudienceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});

const adminCampaignsRecipientSchema = z.object({
  id: z.string(),
  name: z.string(),
  phone: z.string(),
  branchName: z.string(),
});

export const adminCampaignsAudiencesResponseSchema = z.array(adminCampaignsAudienceSchema);
export const adminCampaignsTemplatesResponseSchema = z.array(adminCampaignsTemplateSchema);
export const adminCampaignsRecipientsResponseSchema = z.object({
  recipients: z.array(adminCampaignsRecipientSchema),
});

export type AdminCampaignsAudiencesResponse = AdminCampaignsAudience[];
export type AdminCampaignsTemplatesResponse = AdminCampaignsTemplate[];
export type AdminCampaignsRecipientsResponseData = { recipients: AdminCampaignsRecipient[] };
