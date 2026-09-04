// RESPONSIBILITY: Encapsulates all API calls for the Landing module.
// Uses the centralized apiFetch wrapper. No component should call fetch() directly.
import { apiFetch, ApiResponse } from '@/lib/api';
import { LandingUrlConfig } from '@/app/landing/landing_url_config';

export const landingApi = {
  submitBooking: async (data: { name: string; email: string; phone: string; date: string; type: string }) => {
    return apiFetch<ApiResponse<unknown>>(LandingUrlConfig.BACKEND_API.BOOKING, {
      method: 'POST',
      body: JSON.stringify(data),
      auth: false, // Public endpoint, no JWT required
    });
  },

  submitContact: async (data: { name: string; email: string; message: string }) => {
    return apiFetch<ApiResponse<unknown>>(LandingUrlConfig.BACKEND_API.CONTACT, {
      method: 'POST',
      body: JSON.stringify(data),
      auth: false,
    });
  },
};
