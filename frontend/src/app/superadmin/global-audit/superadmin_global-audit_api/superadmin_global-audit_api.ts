// RESPONSIBILITY: Modular API client for the Superadmin Global Audit module.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { AuditLog } from '@/app/superadmin/global-audit/superadmin_global-audit_types/superadmin_global-audit_types';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';

import { MOCK_SUPERADMIN_GLOBAL_AUDIT } from '@/app/superadmin/global-audit/superadmin_global-audit_api/SuperadminGlobalAuditMockData';

export const globalAuditApi = {
  fetchAuditLogs: async () => {
    await new Promise(r => setTimeout(r, 400));
    return {
      success: true,
      message: 'Audit logs fetched successfully',
      data: MOCK_SUPERADMIN_GLOBAL_AUDIT
    };
  }
};
