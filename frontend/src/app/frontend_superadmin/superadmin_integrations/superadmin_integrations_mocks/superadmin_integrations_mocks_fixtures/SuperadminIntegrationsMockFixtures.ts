// RESPONSIBILITY: Owns realistic, feature-owned mock API data for Superadmin Integrations.
import { SUPERADMIN_INTEGRATION_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_constants/SuperadminIntegrationsConstants';
import type { SuperadminIntegrationsResponse } from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_types/SuperadminIntegrationsTypes';

export const SUPERADMIN_INTEGRATIONS_MOCK_FIXTURE: SuperadminIntegrationsResponse = {
  tenants: [
    { id: 't1', name: 'Gym 1' },
    { id: 't2', name: 'Gym 2' },
    { id: 't3', name: 'Gym 3' },
  ],
  integrations: [
    { name: 'Razorpay', type: 'Payments', status: SUPERADMIN_INTEGRATION_STATUS_CODES.CONNECTED, lastEvent: '2026-09-17T09:14:00Z', failedEvents: 2, health: 99.8 },
    { name: 'WhatsApp Business', type: 'Messaging', status: SUPERADMIN_INTEGRATION_STATUS_CODES.CONNECTED, lastEvent: '2026-09-17T09:10:00Z', failedEvents: 4, health: 98.9 },
    { name: 'Email Delivery', type: 'Communication', status: SUPERADMIN_INTEGRATION_STATUS_CODES.CONNECTED, lastEvent: '2026-09-17T09:16:00Z', failedEvents: 1, health: 99.9 },
    { name: 'Storage Gateway', type: 'Files', status: SUPERADMIN_INTEGRATION_STATUS_CODES.DEGRADED, lastEvent: null, failedEvents: 11, health: 96.4 },
  ],
  webhooks: [
    { id: 'wh1', event: 'invoice.paid', integration: 'Razorpay', status: SUPERADMIN_INTEGRATION_STATUS_CODES.DELIVERED, attempts: 1, latency: 182, time: '2026-09-17T09:12:00Z' },
    { id: 'wh2', event: 'subscription.cancelled', integration: 'Email Delivery', status: SUPERADMIN_INTEGRATION_STATUS_CODES.FAILED, attempts: 3, latency: 890, time: '2026-09-17T09:06:00Z' },
    { id: 'wh3', event: 'message.sent', integration: 'WhatsApp Business', status: SUPERADMIN_INTEGRATION_STATUS_CODES.DELIVERED, attempts: 1, latency: 240, time: '2026-09-17T09:03:00Z' },
  ],
  keys: [
    { id: 'key1', tenant: 'Gym 1', label: 'Website Booking', status: SUPERADMIN_INTEGRATION_STATUS_CODES.ACTIVE, lastUsed: '2026-09-17T08:50:00Z', rateLimit: '120/min' },
    { id: 'key2', tenant: 'Gym 2', label: 'Mobile App', status: SUPERADMIN_INTEGRATION_STATUS_CODES.ACTIVE, lastUsed: '2026-09-17T07:42:00Z', rateLimit: '180/min' },
    { id: 'key3', tenant: 'Gym 3', label: 'Old Website', status: SUPERADMIN_INTEGRATION_STATUS_CODES.REVOKED, lastUsed: null, rateLimit: '60/min' },
  ],
};
