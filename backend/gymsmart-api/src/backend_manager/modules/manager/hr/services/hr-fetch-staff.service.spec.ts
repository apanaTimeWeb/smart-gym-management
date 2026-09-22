// RESPONSIBILITY: Co-located behavioral unit proof for HrFetchStaffService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> HrFetchStaffService.fetchStaff -> observable return/delegation.
import { HrFetchStaffService } from '@/modules/manager/hr/services/hr-fetch-staff.service.ts';

describe('HrFetchStaffService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'hr' } as const;
    const dependency = { fetchStaff: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new HrFetchStaffService(dependency as never);
    const result = await service.fetchStaff({} as never);
    expect(result).toEqual(expected);
    expect((dependency.fetchStaff as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
