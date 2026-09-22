// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for HrFetchStaffAttendanceService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> HrFetchStaffAttendanceService.fetchStaffAttendance -> observable return/delegation.
import { HrFetchStaffAttendanceService } from '@/backend_manager/modules/manager/hr/services/hr-fetch-staff-attendance.service';

describe('HrFetchStaffAttendanceService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'hr' } as const;
    const dependency = { fetchStaffAttendance: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new HrFetchStaffAttendanceService(dependency as never);
    const result = await service.fetchStaffAttendance({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.fetchStaffAttendance as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
