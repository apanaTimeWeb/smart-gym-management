import { http, HttpResponse } from 'msw';
import { SuperadminComplianceUrlConfig } from '@/app/superadmin/compliance/superadmin_compliance_url_config';
import { SUPERADMIN_COMPLIANCE_MOCK_FIXTURE } from '@/app/superadmin/compliance/compliance_mocks/fixtures/SuperadminComplianceMockFixtures';
export const superadminComplianceHandlers = [http.get(SuperadminComplianceUrlConfig.BACKEND_API.BASE, () => HttpResponse.json({ success: true, message: 'Superadmin data loaded.', data: SUPERADMIN_COMPLIANCE_MOCK_FIXTURE }))];
