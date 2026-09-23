// RESPONSIBILITY: Owns backend core co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { CoreIdempotencyService } from '@/backend_manager/core/idempotency/core-idempotency.service';

describe('CoreIdempotencyService', () => {
  it('scopes the same client key separately by tenant and actor', async () => {
    const set = jest.fn().mockResolvedValue('OK');
    const get = jest.fn().mockResolvedValue(null);
    const redis = { getClient: () => ({ get, set, del: jest.fn().mockResolvedValue(1) }) };
    const context = { get: jest.fn().mockReturnValue({ tenantId: 'tenant-a', actorId: 'actor-a' }) };
    const service = new CoreIdempotencyService(redis as never, context as never);

    await service.reserveOrReplay('same-key', 'POST /manager/members');

    expect(set).toHaveBeenCalledWith(expect.stringContaining('idempotency:tenant-a:actor-a:POST /manager/members:same-key:lock'), '1', 'EX', 30, 'NX');
  });

  it('replays a cached response without reserving a duplicate lock', async () => {
    const set = jest.fn();
    const get = jest.fn().mockResolvedValue('{"ok":true}');
    const redis = { getClient: () => ({ get, set, del: jest.fn() }) };
    const context = { get: jest.fn().mockReturnValue({ tenantId: 'tenant-a', actorId: 'actor-a' }) };
    const service = new CoreIdempotencyService(redis as never, context as never);

    const replay = await service.reserveOrReplay('same-key', 'POST /manager/members');

    expect(replay).toBe('{"ok":true}');
    expect(set).not.toHaveBeenCalled();
  });
});
