import { http, HttpResponse, delay } from 'msw';
import { SuperadminGlobalAuditUrlConfig } from '@/app/superadmin/global-audit/superadmin_global-audit_url_config';
import { MOCK_AUDIT_LOGS } from '@/app/superadmin/global-audit/global-audit_utils/SuperadminGlobalAuditConstants';

export const superadminGlobalAuditHandlers = [
  http.get(SuperadminGlobalAuditUrlConfig.BACKEND_API.AUDIT_LOGS_BASE, async () => {
    await delay(400);
    const logs = MOCK_AUDIT_LOGS.map(log => ({
        id: log.id,
        timestamp: log.timestamp,
        targetResource: log.resource,
        actorName: log.actor,
        actorRole: 'SYSTEM',
        action: log.action,
    }));
    return HttpResponse.json({ success: true, message: 'Success', data: logs });
  }),
];
