import fs from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('SuperadminOnboardingModals accessibility contract', () => {
  it('wires both dialogs to the shared accessibility hook and Escape close callbacks', () => {
    const source = fs.readFileSync(new URL('SuperadminOnboardingModals.tsx', import.meta.url), 'utf8');
    expect((source.match(/useSuperadminDialogAccessibility/g) ?? []).length).toBe(3);
    expect(source).toContain('Boolean(extendModalId), () => setExtendModalId(null)');
    expect(source).toContain('Boolean(convertConfirmId), () => setConvertConfirmId(null)');
    expect((source.match(/role="dialog"/g) ?? []).length).toBe(2);
    expect((source.match(/tabIndex=\{\-1\}/g) ?? []).length).toBe(2);
  });
});
