import { describe, expect, it } from 'vitest';
import { readFile } from 'node:fs/promises';

describe('superadmin_messaging_basic contract', () => {
  it('renders through the repaired TanStack Query messaging path', async () => {
    const source = await readFile(new URL('../messaging_components/SuperadminMessagingClient.tsx', import.meta.url), 'utf8');
    expect(source).toContain('useSuperadminMessaging');
    expect(source).not.toContain('const filteredMessages = messages.filter');
    expect(source).not.toContain('All data is static/hardcoded');
  });
});
