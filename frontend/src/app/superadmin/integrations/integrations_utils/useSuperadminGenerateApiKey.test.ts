import { describe, expect, it } from 'vitest';
import { useSuperadminGenerateApiKey } from '@/app/superadmin/integrations/integrations_utils/useSuperadminGenerateApiKey.ts';

describe('useSuperadminGenerateApiKey', () => {
  it('exposes the owning feature contract as a callable/exported symbol', () => {
    expect(typeof useSuperadminGenerateApiKey).toBe('function');
  });
});
