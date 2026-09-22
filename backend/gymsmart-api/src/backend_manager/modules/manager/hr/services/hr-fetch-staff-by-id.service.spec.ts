// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for HrFetchStaffByIdService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> HrFetchStaffByIdService.fetchStaffById -> observable return/delegation.
import { HrFetchStaffByIdService } from '@/backend_manager/modules/manager/hr/services/hr-fetch-staff-by-id.service';

describe('HrFetchStaffByIdService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'hr' } as const;
    const dependency = { fetchStaffById: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new HrFetchStaffByIdService(dependency as never);
    const result = await service.fetchStaffById({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.fetchStaffById as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
