// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for HrFetchStaffService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> HrFetchStaffService.fetchStaff -> observable return/delegation.
import { HrFetchStaffService } from '@/backend_manager/modules/manager/hr/services/hr-fetch-staff.service';

describe('HrFetchStaffService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'hr' } as const;
    const dependency = { fetchStaff: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new HrFetchStaffService(dependency as never);
    const result = await service.fetchStaff({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.fetchStaff as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
