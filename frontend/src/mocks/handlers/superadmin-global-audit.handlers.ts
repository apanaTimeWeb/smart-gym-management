import { http, HttpResponse, delay } from 'msw';
import { MOCK_AUDIT_LOGS } from '@/app/superadmin/global-audit/global-audit_utils/SuperadminGlobalAuditConstants';
const BASE_URL = '*/superadmin/audit-logs';

export const superadminGlobalAuditHandlers = [
  http.get(BASE_URL, async () => {
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
