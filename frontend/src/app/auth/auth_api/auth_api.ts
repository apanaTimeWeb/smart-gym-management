import { apiFetch } from '@/lib/api';
import { AuthUrlConfig } from '@/app/auth/auth_url_config';

export const authApi = {
  login: async (email: string, password: string) => {
    return apiFetch<any>(AuthUrlConfig.BACKEND_API.LOGIN, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      auth: false,
    });
  },
};
