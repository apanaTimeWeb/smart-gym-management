import { z } from 'zod';
import { apiFetch } from '@/lib/api';
import {
  commCampaignSchema,
  commKPIDataSchema,
  commRecipientSchema,
  commAutomationSchema,
  churnedMemberSchema,
  churnKPIDataSchema } from '@/app/manager/communications/communications_schemas/ManagerCommunicationsSchema';
import { ManagerCommunicationsUrlConfig } from '@/app/manager/communications/communications_url_config';
import type {
  CommCampaign,
  CommKPIData,
  CommRecipient,
  CommFormValues,
  CommSegment,
  CommAutomation,
  ChurnedMember,
  ChurnKPIData,
  CommChannel,
  WinBackTemplateTier } from '@/app/manager/communications/communications_types/ManagerCommunications_types';
import type { ApiResponse } from '@/lib/api';


export const ManagerCommunicationsApi = {
  fetchCampaigns: async (params?: Record<string, string>): Promise<ApiResponse<{ campaigns: CommCampaign[]; total: number }>> => {
    const query = new URLSearchParams(params ?? {}).toString();
    return apiFetch(`${ManagerCommunicationsUrlConfig.BACKEND_API.CAMPAIGNS}${query ? `?${query}` : ''}`, { dataSchema: z.object({ campaigns: z.array(commCampaignSchema), total: z.number() }) });
  },

  fetchCommunicationKPIs: async (): Promise<ApiResponse<CommKPIData>> => {
    return apiFetch(ManagerCommunicationsUrlConfig.BACKEND_API.KPIS, { dataSchema: commKPIDataSchema });
  },

  fetchSegmentRecipients: async (segment: CommSegment): Promise<ApiResponse<CommRecipient[]>> => {
    return apiFetch(ManagerCommunicationsUrlConfig.BACKEND_API.SEGMENT(segment), { dataSchema: z.array(commRecipientSchema) });
  },

  sendCampaign: async (payload: CommFormValues & { recipientCount: number; segmentLabel: string }): Promise<ApiResponse<CommCampaign>> => {
    return apiFetch(ManagerCommunicationsUrlConfig.BACKEND_API.CAMPAIGNS, { method: 'POST', body: JSON.stringify(payload), dataSchema: commCampaignSchema });
  },

  fetchAutomations: async (): Promise<ApiResponse<CommAutomation[]>> => {
    return apiFetch(ManagerCommunicationsUrlConfig.BACKEND_API.AUTOMATIONS, { dataSchema: z.array(commAutomationSchema) });
  },

  updateAutomation: async (id: string, payload: Partial<CommAutomation>): Promise<ApiResponse<CommAutomation>> => {
    return apiFetch(ManagerCommunicationsUrlConfig.BACKEND_API.AUTOMATION(id), { method: 'PATCH', body: JSON.stringify(payload), dataSchema: commAutomationSchema });
  },

  // ─── Churn Recovery API ───────────────────────────────────────────────────

  /** Fetches all exited/churned members for this branch. */
  fetchChurnedMembers: async (): Promise<ApiResponse<ChurnedMember[]>> => {
    return apiFetch(ManagerCommunicationsUrlConfig.BACKEND_API.CHURNED_MEMBERS, { dataSchema: z.array(churnedMemberSchema) });
  },

  /** Fetches churn KPI aggregates for the overview stat cards. */
  fetchChurnKPIs: async (): Promise<ApiResponse<ChurnKPIData>> => {
    return apiFetch(ManagerCommunicationsUrlConfig.BACKEND_API.CHURN_KPIS, { dataSchema: churnKPIDataSchema });
  },

  /** Sends a win-back message to a single churned member and logs it as a campaign. */
  sendWinBackMessage: async (payload: {
    memberId: string;
    memberName: string;
    phone: string;
    email: string;
    channel: CommChannel;
    templateTier: WinBackTemplateTier;
    message: string;
    subject: string;
  }): Promise<ApiResponse<CommCampaign>> => {
    return apiFetch(ManagerCommunicationsUrlConfig.BACKEND_API.WIN_BACK, { method: 'POST', body: JSON.stringify(payload), dataSchema: commCampaignSchema });
  } };
