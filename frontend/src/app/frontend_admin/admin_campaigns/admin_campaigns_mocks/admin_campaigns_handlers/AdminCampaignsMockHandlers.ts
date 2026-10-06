// RESPONSIBILITY: Owns MSW handlers for Campaigns API contracts.
// DATA FLOW: Campaigns API client → module-owned MSW handler → fixture → Query/UI.
import { http, HttpResponse } from 'msw';
import { ADMIN_CAMPAIGNS_API } from '@/app/frontend_admin/admin_campaigns/admin_campaigns_url_config';
import {
  ADMIN_CAMPAIGNS_AUDIENCES,
  ADMIN_CAMPAIGNS_RECIPIENTS_EXPIRING,
  ADMIN_CAMPAIGNS_RECIPIENTS_PENDING,
  ADMIN_CAMPAIGNS_TEMPLATES,
} from '@/app/frontend_admin/admin_campaigns/admin_campaigns_mocks/admin_campaigns_fixtures/AdminCampaignsMockFixtures';

export const adminCampaignsMockHandlers = [
  http.get(`*${ADMIN_CAMPAIGNS_API.audiences}`, () =>
    HttpResponse.json({ success: true, message: 'Success', data: ADMIN_CAMPAIGNS_AUDIENCES })),
  http.get(`*${ADMIN_CAMPAIGNS_API.templates}`, () =>
    HttpResponse.json({ success: true, message: 'Success', data: ADMIN_CAMPAIGNS_TEMPLATES })),
  http.get(`*${ADMIN_CAMPAIGNS_API.recipients}`, ({ request }) => {
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
