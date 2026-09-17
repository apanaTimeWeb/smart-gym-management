import fs from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('useSuperadminAffiliatesMutation contract', () => {
  it('contains the required responsibility/data-flow contract and requires a toast id', () => {
    const source = fs.readFileSync(new URL('useSuperadminAffiliatesMutation.ts', import.meta.url), 'utf8');
    expect(source).toMatch(/(RESPONSIBILITY:|DATA FLOW:)/);
    expect(source).toContain('toastId: string');
    expect(source).toContain('toast.success(response.message, { id: options.toastId })');
    expect(source).toContain('toast.error(errorObj.message, { id: options.toastId })');
  });
});


describe('affiliate mutation toast ownership', () => {
  it('keeps entity mutation toast ids scoped to the stable affiliate id', () => {
    const source = fs.readFileSync(new URL('useSuperadminAffiliatesMutations.ts', import.meta.url), 'utf8');
    expect(source).toContain("toastId: `affiliate-update-${editingAffiliate.id}`");
    expect(source).toContain("toastId: `affiliate-status-${id}`");
    expect(source).toContain("toastId: `affiliate-delete-${id}`");
  });
});
