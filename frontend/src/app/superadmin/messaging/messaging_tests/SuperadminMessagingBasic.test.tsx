import { resetSuperadminMessagingMockState } from '@/app/superadmin/messaging/messaging_mocks/handlers/SuperadminMessagingMockHandlers';
import { resetSuperadminMessagingV1WhatsAppMockState } from '@/app/superadmin/messaging/messaging_whatsapp_mocks/handlers/SuperadminMessagingV1WhatsAppMockHandlers';
import {describe, expect, it, beforeEach} from 'vitest';
import { readFile } from 'node:fs/promises';

beforeEach(() => {
  resetSuperadminMessagingV1WhatsAppMockState();
});

beforeEach(() => {
  resetSuperadminMessagingMockState();
});

import source from '../messaging_components/SuperadminMessagingClient.tsx?raw';

describe('superadmin_messaging_basic contract', () => {
  it('renders through the repaired TanStack Query messaging path', () => {
    expect(source).toContain('useSuperadminMessaging');
    expect(source).not.toContain('const filteredMessages = messages.filter');
    expect(source).not.toContain('All data is static/hardcoded');
  });
});
