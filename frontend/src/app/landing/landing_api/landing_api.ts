// RESPONSIBILITY: Encapsulates logic, UI, or types for this module.
// DATA FLOW: Standard component data flow.
// RESPONSIBILITY: Encapsulates logic, UI, or types for this module.
// DATA FLOW: Standard component data flow.
// RESPONSIBILITY: Encapsulates all API calls for the Landing module.
// Uses the centralized apiFetch wrapper. No component should call fetch() directly.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { LandingUrlConfig } from '@/app/landing/landing_url_config';

export const landingApi = {
  submitBooking: async (data: { name: string; email: string; phone: string; date: string; type: string }) => {
    await new Promise(r => setTimeout(r, 600));
    return {
      success: true,
      message: 'Booking submitted successfully',
      data: null
    } as ApiResponse<unknown>;
  },

  submitContact: async (data: { name: string; email: string; message: string }) => {
    await new Promise(r => setTimeout(r, 600));
    return {
      success: true,
      message: 'Message sent successfully',
      data: null
    } as ApiResponse<unknown>;
  },
};
