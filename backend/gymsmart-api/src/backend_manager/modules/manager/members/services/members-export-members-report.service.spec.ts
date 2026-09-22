// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for MembersExportMembersReportService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> MembersExportMembersReportService.exportMembersReport -> observable return/delegation.
import { MembersExportMembersReportService } from '@/backend_manager/modules/manager/members/services/members-export-members-report.service';

describe('MembersExportMembersReportService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'members' } as const;
    const dependency = { exportMembersReport: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new MembersExportMembersReportService(dependency as never);
    const result = await service.exportMembersReport({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.exportMembersReport as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
