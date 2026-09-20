// RESPONSIBILITY: Owns MSW handlers for Campaigns API contracts.
// DATA FLOW: Campaigns API client → module-owned MSW handler → fixture → Query/UI.
import { http, HttpResponse } from 'msw';
import { AdminCampaignsUrlConfig } from '@/app/admin/campaigns/campaigns_url_config';
import {
  ADMIN_CAMPAIGNS_AUDIENCES,
  ADMIN_CAMPAIGNS_RECIPIENTS_EXPIRING,
  ADMIN_CAMPAIGNS_RECIPIENTS_PENDING,
  ADMIN_CAMPAIGNS_TEMPLATES,
} from '@/app/admin/campaigns/campaigns_mocks/fixtures/AdminCampaignsMockFixtures';

export const adminCampaignsMockHandlers = [
  http.get(`*${AdminCampaignsUrlConfig.api.audiences}`, () =>
    HttpResponse.json({ success: true, message: 'Success', data: ADMIN_CAMPAIGNS_AUDIENCES })),
  http.get(`*${AdminCampaignsUrlConfig.api.templates}`, () =>
    HttpResponse.json({ success: true, message: 'Success', data: ADMIN_CAMPAIGNS_TEMPLATES })),
  http.get(`*${AdminCampaignsUrlConfig.api.recipients}`, ({ request }) => {
    const audienceId = new URL(request.url).searchParams.get('audienceId') ?? '';
    const recipients = audienceId === 'aud_pending'
      ? ADMIN_CAMPAIGNS_RECIPIENTS_PENDING
      : audienceId === 'aud_expiring'
        ? ADMIN_CAMPAIGNS_RECIPIENTS_EXPIRING
        : audienceId === 'aud_all'
          ? [...ADMIN_CAMPAIGNS_RECIPIENTS_PENDING, ...ADMIN_CAMPAIGNS_RECIPIENTS_EXPIRING]
          : [];
    return HttpResponse.json({ success: true, message: 'Success', data: { recipients } });
  }),
];
