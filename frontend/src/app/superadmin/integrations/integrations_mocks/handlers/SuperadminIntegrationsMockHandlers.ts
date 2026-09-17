import { http, HttpResponse } from 'msw';
import { SuperadminIntegrationsUrlConfig } from '@/app/superadmin/integrations/superadmin_integrations_url_config';
import { SUPERADMIN_INTEGRATIONS_MOCK_FIXTURE } from '@/app/superadmin/integrations/integrations_mocks/fixtures/SuperadminIntegrationsMockFixtures';
export const superadminIntegrationsHandlers = [http.get('*' + SuperadminIntegrationsUrlConfig.BACKEND_API.BASE, () => HttpResponse.json({ success: true, message: 'Superadmin data loaded.', data: SUPERADMIN_INTEGRATIONS_MOCK_FIXTURE }))];
