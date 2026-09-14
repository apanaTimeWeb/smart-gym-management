import { apiFetch, type ApiResponse } from '@/lib/api';
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
  WinBackTemplateTier,
} from '@/app/manager/communications/communications_types/communications_types';
import {
  commCampaignSchema,
  commKPIDataSchema,
  commRecipientSchema,
  commAutomationSchema,
  churnedMemberSchema,
  churnKPIDataSchema,
} from '@/app/manager/communications/communications_types/ManagerCommunicationsSchema';
import { z } from 'zod';

export const ManagerCommunicationsApi = {
  fetchCampaigns: async (): Promise<ApiResponse<CommCampaign[]>> => {
    return apiFetch(`/manager/communications/campaigns`, { dataSchema: z.array(commCampaignSchema) });
  },

  fetchKPIs: async (): Promise<ApiResponse<CommKPIData>> => {
    return apiFetch(`/manager/communications/kpis`, { dataSchema: commKPIDataSchema });
  },

  fetchSegmentRecipients: async (segment: CommSegment): Promise<ApiResponse<CommRecipient[]>> => {
    return apiFetch(`/manager/communications/segments/${segment}`, { dataSchema: z.array(commRecipientSchema) });
  },

  sendCampaign: async (payload: CommFormValues & { recipientCount: number; segmentLabel: string }): Promise<ApiResponse<CommCampaign>> => {
    return apiFetch(`/manager/communications/campaigns`, { method: 'POST', body: JSON.stringify(payload), dataSchema: commCampaignSchema });
  },

  fetchAutomations: async (): Promise<ApiResponse<CommAutomation[]>> => {
    return apiFetch(`/manager/communications/automations`, { dataSchema: z.array(commAutomationSchema) });
  },

  updateAutomation: async (id: string, payload: Partial<CommAutomation>): Promise<ApiResponse<CommAutomation>> => {
    return apiFetch(`/manager/communications/automations/${id}`, { method: 'PATCH', body: JSON.stringify(payload), dataSchema: commAutomationSchema });
  },

  // ─── Churn Recovery API ───────────────────────────────────────────────────

  /** Fetches all exited/churned members for this branch. */
  fetchChurnedMembers: async (): Promise<ApiResponse<ChurnedMember[]>> => {
    return apiFetch(`/manager/communications/churned-members`, { dataSchema: z.array(churnedMemberSchema) });
  },

  /** Fetches churn KPI aggregates for the overview stat cards. */
  fetchChurnKPIs: async (): Promise<ApiResponse<ChurnKPIData>> => {
    return apiFetch(`/manager/communications/churn-kpis`, { dataSchema: churnKPIDataSchema });
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
    return apiFetch(`/manager/communications/win-back`, { method: 'POST', body: JSON.stringify(payload) });
  },
};
