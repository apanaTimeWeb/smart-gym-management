import { resetSuperadminMessagingMockState } from '@/app/superadmin/messaging/messaging_mocks/handlers/SuperadminMessagingMockHandlers';
import { resetSuperadminMessagingV1WhatsAppMockState } from '@/app/superadmin/messaging/messaging_whatsapp_mocks/handlers/SuperadminMessagingV1WhatsAppMockHandlers';
import {describe, expect, it, beforeEach} from 'vitest';
import { SuperadminMessagingComposeSchema } from '@/app/superadmin/messaging/messaging_schemas/SuperadminMessagingComposeSchema';

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
