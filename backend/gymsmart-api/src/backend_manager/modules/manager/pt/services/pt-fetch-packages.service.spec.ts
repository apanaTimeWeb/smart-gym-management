// @ts-nocheck
// RESPONSIBILITY: Co-located behavioral unit proof for PtFetchPackagesService.
// FLOW: Jest -> mocked orchestrator/repository boundary -> PtFetchPackagesService.fetchPackages -> observable return/delegation.
import { PtFetchPackagesService } from '@/backend_manager/modules/manager/pt/services/pt-fetch-packages.service';

describe('PtFetchPackagesService', () => {
  it('delegates the use-case call and returns its observable payload', async () => {
    const expected = { ok: true, source: 'pt' } as const;
    const dependency = { fetchPackages: jest.fn().mockResolvedValue(expected) } as unknown as Record<string, unknown>;
    const service = new PtFetchPackagesService(dependency as never);
    const result = await service.fetchPackages({} as never);
    expect(result).toEqual(expected);
    // @ts-ignore
    expect((dependency.fetchPackages as jest.Mock).toHaveBeenCalled()).toBe(true);
  });
});
