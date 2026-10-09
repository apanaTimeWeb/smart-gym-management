import { describe, expect, it } from 'vitest';

import { TrainerInfrastructureUserSafeError } from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_errors/TrainerInfrastructureUserSafeError';

describe('TrainerInfrastructureUserSafeError', () => {
  const fallback = 'Something went wrong. Please try again.';

  it('uses the localized fallback for non-Error values', () => {
    expect(TrainerInfrastructureUserSafeError({ message: 'internal detail' }, fallback)).toBe(fallback);
  });

  it('preserves a short human-readable domain message', () => {
    expect(TrainerInfrastructureUserSafeError(new Error('Member could not be updated.'), fallback)).toBe('Member could not be updated.');
  });

  it('hides URLs and stack/runtime implementation details', () => {
    expect(TrainerInfrastructureUserSafeError(new Error('Request failed at https://internal.example/api'), fallback)).toBe(fallback);
    expect(TrainerInfrastructureUserSafeError(new Error('TypeError: Cannot read properties of undefined'), fallback)).toBe(fallback);
    expect(TrainerInfrastructureUserSafeError(new Error('at updateMember (/app/src/api.ts:12:4)'), fallback)).toBe(fallback);
  });
});
