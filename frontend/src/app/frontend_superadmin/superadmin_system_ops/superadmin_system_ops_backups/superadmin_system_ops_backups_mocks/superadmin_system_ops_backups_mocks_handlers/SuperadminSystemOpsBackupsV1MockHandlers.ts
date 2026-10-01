// RESPONSIBILITY: Owns MSW handlers for this Superadmin-only feature.
import { http, HttpResponse } from 'msw';

import { SuperadminBackupsV1UrlConfig } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_url_config';
import { SUPERADMIN_BACKUPS_HEALTH_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_mocks/superadmin_system_ops_backups_mocks_fixtures/SuperadminSystemOpsBackupsV1MockFixtures';

export const superadminBackupsV1Handlers = [
    http.get('*' + SuperadminBackupsV1UrlConfig.BACKEND_API.BASE, () => HttpResponse.json({ success: true, message: 'Superadmin data loaded.', data: SUPERADMIN_BACKUPS_HEALTH_MOCK_FIXTURE })),
];
