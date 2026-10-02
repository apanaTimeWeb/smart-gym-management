import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse, delay } from 'msw';
import { SuperadminWhatsAppCampaignSchema, SuperadminWhatsAppCreateCampaignPayloadSchema } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_schemas/SuperadminMessagingV1WhatsAppSchema';
import { SUPERADMIN_WHATSAPP_TEMPLATE_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_constants/SuperadminMessagingConstants';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminMessagingV1WhatsAppMockHandlers owned by the superadmin_messaging feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_constants/SuperadminMessagingConstants, http-status-codes, msw, @/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_mocks/superadmin_messaging_whatsapp_mocks_fixtures/SuperadminMessagingV1WhatsAppMockFixtures, @/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_schemas/SuperadminMessagingV1WhatsAppSchema, @/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_url_config, @/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_types/SuperadminMessagingV1WhatsAppTypes, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_url_config';
import { SUPERADMIN_WHATSAPP_BULK_CENTER_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_mocks/superadmin_messaging_whatsapp_mocks_fixtures/SuperadminMessagingV1WhatsAppMockFixtures';

import type { SuperadminWhatsAppCampaign, SuperadminWhatsAppBulkCenterData } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_types/SuperadminMessagingV1WhatsAppTypes';
import type { ApiResponse } from '@/lib/api';



const BASE_URL = `*${MODULE_URLS.WHATSAPP_BASE}`;
let mockCampaigns = [...SUPERADMIN_WHATSAPP_BULK_CENTER_MOCK_FIXTURE.campaigns];

export function resetSuperadminMessagingV1WhatsAppMockState(): void {
  mockCampaigns = [...SUPERADMIN_WHATSAPP_BULK_CENTER_MOCK_FIXTURE.campaigns];
}
export const superadminMessagingV1WhatsAppHandlers = [
    http.get('*' + `${BASE_URL}/bulk-center`, async () => {
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
    http.post('*' + `${BASE_URL}/campaigns`, async ({ request }) => {
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
            status: SUPERADMIN_WHATSAPP_TEMPLATE_STATUS_CODES.READY,
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
