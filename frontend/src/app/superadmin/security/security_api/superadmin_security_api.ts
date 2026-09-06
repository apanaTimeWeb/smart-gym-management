import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/app/superadmin/superadmin_types/superadmin_types';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import type { SecurityDataResponse, BlockedIp, WafConfig } from '@/app/superadmin/security/security_types/superadmin_security_types';

export const securityApi = {
  fetchSecurityData: () => 
    apiFetch<ApiResponse<SecurityDataResponse>>(SuperadminUrlConfig.BACKEND_API.SECURITY_BASE),
    
  updateWafConfig: (body: Partial<WafConfig>) => 
    apiFetch<ApiResponse<WafConfig>>(`${SuperadminUrlConfig.BACKEND_API.SECURITY_BASE}/waf`, { 
      method: 'PATCH', 
      body: JSON.stringify(body) 
    }),

  addBlockedIp: (body: Partial<BlockedIp>) => 
    apiFetch<ApiResponse<BlockedIp>>(`${SuperadminUrlConfig.BACKEND_API.SECURITY_BASE}/ips`, { 
      method: 'POST', 
      body: JSON.stringify(body) 
    }),

  removeBlockedIp: (id: string) => 
    apiFetch<ApiResponse<void>>(`${SuperadminUrlConfig.BACKEND_API.SECURITY_BASE}/ips/${id}`, { 
      method: 'DELETE' 
    }),
};
