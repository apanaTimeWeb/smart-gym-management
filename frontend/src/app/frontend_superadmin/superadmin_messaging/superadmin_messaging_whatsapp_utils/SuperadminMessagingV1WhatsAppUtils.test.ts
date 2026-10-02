import { describe, expect, it } from 'vitest';

import { replaceWhatsAppVariables, buildWhatsAppLink } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_utils/SuperadminMessagingV1WhatsAppUtils';



describe('SuperadminMessagingV1WhatsAppUtils', () => {
  it('replaces every supported recipient variable with recipient data', () => {
    const result = replaceWhatsAppVariables('Hi {contact_name} at {tenant_name}', { contactName: 'Priya', tenantName: 'Fit Zone', contactRole: null, planName: null, subscriptionAmount: null, invoiceNumber: null, dueDate: null, trialEndDate: null, maintenanceStart: null, maintenanceEnd: null, affectedService: null, supportLink: null, dashboardLink: null } as never);
    expect(result).toBe('Hi Priya at Fit Zone');
  });

  it('normalizes the phone number before constructing the WhatsApp link', () => {
    expect(buildWhatsAppLink('+91 987-654-3210', 'Hello world')).toContain('/919876543210?text=Hello%20world');
  });
});
