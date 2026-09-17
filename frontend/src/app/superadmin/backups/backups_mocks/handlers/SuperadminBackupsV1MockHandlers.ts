// RESPONSIBILITY: Owns MSW handlers for this Superadmin-only feature.
import { http, HttpResponse } from 'msw';
import { SuperadminBackupsV1UrlConfig } from '@/app/superadmin/backups/superadmin_backups_health_url_config';
import { SUPERADMIN_BACKUPS_HEALTH_MOCK_FIXTURE } from '@/app/superadmin/backups/backups_mocks/fixtures/SuperadminBackupsV1MockFixtures';
export const superadminBackupsV1Handlers = [
    http.get('*' + SuperadminBackupsV1UrlConfig.BACKEND_API.BASE, () => HttpResponse.json({ success: true, message: 'Superadmin data loaded.', data: SUPERADMIN_BACKUPS_HEALTH_MOCK_FIXTURE })),
];
