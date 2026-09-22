// RESPONSIBILITY: Co-located behavioral unit proof for InquiriesConvertLeadService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> InquiriesConvertLeadService.convertLead -> observable return/delegation.
import { InquiriesConvertLeadService } from '@/modules/manager/inquiries/services/inquiries-convert-lead.service.ts';

describe('InquiriesConvertLeadService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'inquiries' } as const;
    const dependency = { convertLead: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new InquiriesConvertLeadService(dependency as never);
    const result = await service.convertLead({} as never);
    expect(result).toEqual(expected);
    expect((dependency.convertLead as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
