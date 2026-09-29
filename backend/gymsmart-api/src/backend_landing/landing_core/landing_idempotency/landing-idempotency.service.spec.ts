// RESPONSIBILITY: Proves strict mutational idempotency behavior at the Redis and durable-record boundary.
// FLOW: Test -> LandingIdempotencyService -> request context + Redis + repository -> atomic lock/replay semantics.
import { ConflictException, ServiceUnavailableException } from '@nestjs/common';

import { LandingIdempotencyService } from '@/backend_landing/landing_core/landing_idempotency/landing-idempotency.service';

/**
 * Intent: Protect Rule 103 against duplicate mutation execution, cross-tenant replay, and incomplete post-commit recovery.
 * Edge Cases: Redis outage fails closed; an existing lock rejects concurrent execution; a committed processing row with a stored response is replayable.
 * Side Effects: None; all dependencies are test doubles and no production database is touched.
 * AI Notes: These tests exercise the service's real decision logic rather than replacing the method under test.
 */
describe('LandingIdempotencyService', () => {
  const context = { get: jest.fn().mockReturnValue({ tenantId: 'tenant-a' }) };
  const response = { message: 'Done.', data: null } as const;

  it('uses a tenant-scoped Redis key and atomically owns an in-progress lock', async () => {
    const redis = { client: { ping: jest.fn().mockResolvedValue('PONG'), set: jest.fn().mockResolvedValue('OK') } };
    const service = new LandingIdempotencyService(redis as never, {} as never, context as never);

    const token = await service.acquireInProgressLock('landing.booking.create', 'key-1');

    expect(token).toEqual(expect.any(String));
    expect(redis.client.set).toHaveBeenCalledWith(
      'idempotency:tenant-a:landing.booking.create:lock:key-1',
      expect.any(String),
      'EX',
      300,
      'NX',
    );
  });

  it('rejects a concurrent request when the Redis NX lock is already owned', async () => {
    const redis = { client: { ping: jest.fn().mockResolvedValue('PONG'), set: jest.fn().mockResolvedValue(null) } };
    const service = new LandingIdempotencyService(redis as never, {} as never, context as never);

    await expect(service.acquireInProgressLock('landing.booking.create', 'key-2')).rejects.toBeInstanceOf(ConflictException);
  });

  it('fails closed when Redis is unavailable before mutation execution', async () => {
    const redis = { client: { ping: jest.fn().mockRejectedValue(new Error('redis down')) } };
    const service = new LandingIdempotencyService(redis as never, {} as never, context as never);

    await expect(service.acquireInProgressLock('landing.contact.create', 'key-3')).rejects.toBeInstanceOf(ServiceUnavailableException);
  });

  it('replays a stored response even when the durable row is still marked processing', async () => {
    const redis = { client: { ping: jest.fn(), set: jest.fn(), eval: jest.fn() } };
    const repository = {
      findByScopeAndKey: jest.fn().mockResolvedValue({
        id: 'record-1',
        scope: 'landing.booking.create',
        key: 'key-4',
        requestHash: 'hash-1',
        processing: true,
        response,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      }),
    };
    const service = new LandingIdempotencyService(redis as never, repository as never, context as never);

    await expect(service.reserveOrReplay('landing.booking.create', 'key-4', 'hash-1', response)).resolves.toEqual(response);
    expect(repository.findByScopeAndKey).toHaveBeenCalledTimes(1);
  });

  it('keeps an in-progress durable row in conflict when no response is stored', async () => {
    const redis = { client: { ping: jest.fn(), set: jest.fn(), eval: jest.fn() } };
    const repository = {
      findByScopeAndKey: jest.fn().mockResolvedValue({
        id: 'record-2',
        scope: 'landing.contact.create',
        key: 'key-5b',
        requestHash: 'hash-2b',
        processing: true,
        response: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      }),
    };
    const service = new LandingIdempotencyService(redis as never, repository as never, context as never);

    await expect(service.reserveOrReplay('landing.contact.create', 'key-5b', 'hash-2b', response)).rejects.toBeInstanceOf(ConflictException);
  });

  it('stores the deterministic replay response when reserving a new key', async () => {
    const redis = { client: { ping: jest.fn(), set: jest.fn(), eval: jest.fn() } };
    const repository = {
      findByScopeAndKey: jest.fn().mockResolvedValue(null),
      reserve: jest.fn().mockResolvedValue(true),
    };
    const service = new LandingIdempotencyService(redis as never, repository as never, context as never);

    await expect(service.reserveOrReplay('landing.contact.create', 'key-5', 'hash-2', response)).resolves.toBeNull();
    expect(repository.reserve).toHaveBeenCalledWith('landing.contact.create', 'key-5', 'hash-2', response);
  });

  it('releases only the lock token owned by the caller', async () => {
    const redis = { client: { get: jest.fn(), eval: jest.fn().mockResolvedValue(1), ping: jest.fn().mockResolvedValue('PONG') } };
    const service = new LandingIdempotencyService(redis as never, {} as never, context as never);

    await service.releaseInProgressLock('landing.contact.create', 'key-6', 'lock-token');

    expect(redis.client.eval).toHaveBeenCalledWith(
      expect.stringContaining("redis.call('get', KEYS[1]) == ARGV[1]"),
      1,
      'idempotency:tenant-a:landing.contact.create:lock:key-6',
      'lock-token',
    );
  });
});
