// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for MembersAssignDietPlanService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> MembersAssignDietPlanService.assignDietPlan -> observable return/delegation.
import { MembersAssignDietPlanService } from '@/backend_manager/modules/manager/members/services/members-assign-diet-plan.service';

describe('MembersAssignDietPlanService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'members' } as const;
    const dependency = { assignDietPlan: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new MembersAssignDietPlanService(dependency as never);
    const result = await service.assignDietPlan({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.assignDietPlan as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
