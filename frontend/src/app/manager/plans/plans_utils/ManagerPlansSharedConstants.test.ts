import { describe, expect, it } from 'vitest';
import { MANAGER_PLANS_MESSAGES, TIERS } from '@/app/manager/plans/plans_utils/ManagerPlansSharedConstants';

describe('ManagerPlansSharedConstants', () => {
  it('keeps plan tiers and documented request messages stable', () => {
    expect(TIERS).toEqual(['BASIC', 'GOLD', 'PREMIUM']);
    expect(MANAGER_PLANS_MESSAGES.CHANGE_REQUEST_SUCCESS).toContain('admin');
    expect(MANAGER_PLANS_MESSAGES.CHANGE_REQUEST_ERROR).toContain('Try again');
  });
});
