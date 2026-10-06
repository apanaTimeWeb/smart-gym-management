import { describe, expect, it } from 'vitest';
import { MANAGER_PLANS_MESSAGES, TIERS } from '@/app/frontend_manager/manager_plans/manager_plans_constants/ManagerPlansSharedConstants';


describe('ManagerPlansSharedConstants', () => {
  it('keeps plan tiers and documented request messages stable', () => {
    expect(TIERS).toEqual(['BASIC', 'GOLD', 'PREMIUM']);
    expect(MANAGER_PLANS_MESSAGES.CHANGE_REQUEST_SUCCESS).toContain('admin');
    expect(MANAGER_PLANS_MESSAGES.CHANGE_REQUEST_ERROR).toContain('Try again');
  });
});
