// RESPONSIBILITY: Encapsulates logic, UI, or types for this module.
// RESPONSIBILITY: Encapsulates logic, UI, or types for this module.
// DATA FLOW: Standard component data flow.
// RESPONSIBILITY: Centralized API client exclusively for the Auth module. Encapsulates network calls to backend authentication routes.
import { apiFetch } from '@/lib/api';
import { AuthUrlConfig } from '@/app/auth/auth_url_config';
import { AuthResponseSchema } from '@/app/auth/login/login_types/login_types';
import type { AuthResponse } from '@/app/auth/login/login_types/login_types';

export const authApi = {
  login: async (email: string, password: string) => {
    const res = await apiFetch<unknown>(AuthUrlConfig.BACKEND_API.LOGIN, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (res.data) {
      res.data = AuthResponseSchema.parse(res.data);
    }
    
    return res as typeof res & { data: AuthResponse | null };
  },
};
