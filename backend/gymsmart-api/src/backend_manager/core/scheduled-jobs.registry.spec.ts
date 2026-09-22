// RESPONSIBILITY: Verifies the centralized scheduled-job registry contract.
// FLOW: Registry -> structural assertions -> CI gate.
import { SCHEDULED_JOBS_REGISTRY } from '@/core/scheduled-jobs.registry';

describe('scheduled jobs registry', () => {
  it('contains structurally valid entries', () => {
    expect(Array.isArray(SCHEDULED_JOBS_REGISTRY)).toBe(true);
    for (const entry of SCHEDULED_JOBS_REGISTRY) {
      expect(entry.name).toEqual(expect.any(String));
      expect(entry.module).toEqual(expect.any(String));
      expect(entry.file).toEqual(expect.any(String));
      expect(entry.schedule).toEqual(expect.any(String));
      expect(Array.isArray(entry.touchesEntities)).toBe(true);
      expect(entry.failureBehavior).toEqual(expect.any(String));
      expect(typeof entry.idempotent).toBe('boolean');
    }
  });
});
