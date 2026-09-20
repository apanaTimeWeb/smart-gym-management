import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse, delay } from 'msw';
import type { ApiResponse } from '@/lib/api';
import { MessagingUrlConfig } from '@/app/superadmin/messaging/superadmin_messaging_url_config';
import { SuperadminWhatsAppCampaignSchema, SuperadminWhatsAppCreateCampaignPayloadSchema, type SuperadminWhatsAppCampaign, type SuperadminWhatsAppBulkCenterData, } from '@/app/superadmin/messaging/messaging_whatsapp_types/SuperadminMessagingV1WhatsAppTypes';
import { SUPERADMIN_WHATSAPP_BULK_CENTER_MOCK_FIXTURE } from '@/app/superadmin/messaging/messaging_whatsapp_mocks/fixtures/SuperadminMessagingV1WhatsAppMockFixtures';
const BASE_URL = `*${MessagingUrlConfig.WHATSAPP_BASE}`;
let mockCampaigns = [...SUPERADMIN_WHATSAPP_BULK_CENTER_MOCK_FIXTURE.campaigns];

export function resetSuperadminMessagingV1WhatsAppMockState(): void {
  mockCampaigns = [...SUPERADMIN_WHATSAPP_BULK_CENTER_MOCK_FIXTURE.campaigns];
}
export const superadminMessagingV1WhatsAppHandlers = [
    http.get(`${BASE_URL}/bulk-center`, async () => {
        await delay(300);
        const data: SuperadminWhatsAppBulkCenterData = {
            ...SUPERADMIN_WHATSAPP_BULK_CENTER_MOCK_FIXTURE,
            campaigns: mockCampaigns,
        };
        return HttpResponse.json<ApiResponse<SuperadminWhatsAppBulkCenterData>>({
            success: true,
            message: 'WhatsApp bulk center loaded.',
            data,
        });
    }),
    http.post(`${BASE_URL}/campaigns`, async ({ request }) => {
        await delay(250);
        const payload = SuperadminWhatsAppCreateCampaignPayloadSchema.safeParse(await request.json());
        if (!payload.success) {
            return HttpResponse.json<ApiResponse<SuperadminWhatsAppCampaign>>({
                success: false,
                message: 'Campaign details are invalid.',
                data: null,
            }, { status: StatusCodes.BAD_REQUEST });
        }
        const audience = SUPERADMIN_WHATSAPP_BULK_CENTER_MOCK_FIXTURE.audiences.find((item) => item.id === payload.data.audienceId);
        const template = SUPERADMIN_WHATSAPP_BULK_CENTER_MOCK_FIXTURE.templates.find((item) => item.id === payload.data.templateId);
        if (!audience || !template) {
            return HttpResponse.json<ApiResponse<SuperadminWhatsAppCampaign>>({
                success: false,
                message: 'Audience or template not found.',
                data: null,
            }, { status: StatusCodes.NOT_FOUND });
        }
        const campaign = SuperadminWhatsAppCampaignSchema.parse({
            id: `camp-${Date.now()}`,
            name: payload.data.name,
            audienceLabel: audience.label,
            templateName: template.name,
            totalRecipients: payload.data.recipientIds.length,
            sentCount: 0,
            skippedCount: 0,
            status: 'READY',
            createdAt: new Date().toISOString(),
        });
        mockCampaigns = [campaign, ...mockCampaigns];
        return HttpResponse.json<ApiResponse<SuperadminWhatsAppCampaign>>({
            success: true,
            message: 'Bulk WhatsApp queue created.',
            data: campaign,
        });
    }),
];
