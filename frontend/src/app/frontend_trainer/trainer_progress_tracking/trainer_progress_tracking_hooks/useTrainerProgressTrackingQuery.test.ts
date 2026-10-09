import { describe, expect, it } from 'vitest';

import * as moduleUnderTest from '@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_hooks/useTrainerProgressTrackingQuery';




describe('useTrainerProgressTrackingQuery', () => {
  it('exposes the module hook contract for co-located verification', () => {
    expect(moduleUnderTest.useTrainerProgressTrackingMembersQuery).toBeTypeOf('function');
    expect(moduleUnderTest.useTrainerProgressTrackingEntriesQuery).toBeTypeOf('function');
    expect(moduleUnderTest.useTrainerProgressTrackingSummaryQuery).toBeTypeOf('function');
  });
});
