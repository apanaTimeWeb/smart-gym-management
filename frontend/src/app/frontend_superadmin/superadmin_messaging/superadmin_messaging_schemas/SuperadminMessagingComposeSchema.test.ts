import {describe, expect, it, beforeEach} from 'vitest';

import { resetSuperadminMessagingMockState } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_mocks/superadmin_messaging_mocks_handlers/SuperadminMessagingMockHandlers';
import { SuperadminMessagingComposeSchema } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_schemas/SuperadminMessagingComposeSchema';
import { resetSuperadminMessagingV1WhatsAppMockState } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_mocks/superadmin_messaging_whatsapp_mocks_handlers/SuperadminMessagingV1WhatsAppMockHandlers';



beforeEach(() => {
  resetSuperadminMessagingV1WhatsAppMockState();
});

beforeEach(() => {
  resetSuperadminMessagingMockState();
});

describe('SuperadminMessagingComposeSchema', () => {
  it('rejects incomplete tenant-level messages before the API is called', () => {
    const result = SuperadminMessagingComposeSchema.safeParse({
      tenantId: '',
      channel: 'EMAIL',
      subject: '   ',
      body: '',
    });
    expect(result.success).toBe(false);
  });

  it('accepts a valid tenant-level message payload', () => {
    const result = SuperadminMessagingComposeSchema.safeParse({
      tenantId: 't1',
      channel: 'SMS',
      subject: 'Maintenance notice',
      body: 'Please review the maintenance window for your tenant.',
    });
    expect(result.success).toBe(true);
  });

  it('enforces the documented field length limits', () => {
    expect(SuperadminMessagingComposeSchema.safeParse({
      tenantId: 't1', channel: 'EMAIL', subject: 'x'.repeat(201), body: 'Body',
    }).success).toBe(false);
    expect(SuperadminMessagingComposeSchema.safeParse({
      tenantId: 't1', channel: 'EMAIL', subject: 'Subject', body: 'x'.repeat(5001),
    }).success).toBe(false);
  });
});
