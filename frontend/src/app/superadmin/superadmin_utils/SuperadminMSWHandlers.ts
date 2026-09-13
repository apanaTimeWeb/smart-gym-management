import { http, HttpResponse } from 'msw';

export const superadminHandlers = [
  // Dashboard Handlers
  http.get('/api/superadmin/dashboard', () => {
    return HttpResponse.json({
      success: true,
      data: {
        metrics: {
          monthlyRecurringRevenue: 150000,
          totalGyms: 42,
          activeGyms: 38,
          totalEndUsers: 15000,
          arpu: 3500,
          trialGyms: 4,
          platformHealthScore: 92,
        },
        revenue: [],
        growth: [],
      }
    });
  }),

  // Profile Handlers
  http.get('/api/superadmin/profile', () => {
    return HttpResponse.json({
      success: true,
      data: {
        id: 'superadmin-1',
        name: 'Superadmin User',
        email: 'admin@smartgym.com',
        twoFactorEnabled: true,
      }
    });
  }),
  
  // Future handlers for gyms, features, messaging, etc. can be added here
];
