// RESPONSIBILITY: Proves contact transaction ordering, strict idempotency replay, and post-commit completion.
// FLOW: Test -> LandingContactOrchestratorService -> business transaction commit -> completion transaction -> lock release.
import { HttpException, HttpStatus } from '@nestjs/common';

import { LandingContactOrchestratorService } from '@/backend_landing/landing_modules/landing/landing_services/landing-contact-orchestrator.service';

const contactInput = {
  name: 'Member One',
  email: 'member@example.org',
  message: 'Please call me.',
};

/**
 * Intent: Protect contact orchestration against duplicate execution and premature idempotency completion.
 * Edge Cases: A replay skips mutation; a new command completes the business transaction before the idempotency completion transaction; conflicts remain conflicts.
 * Side Effects: None; all dependencies are test doubles.
 * AI Notes: The ordering test explicitly models a transaction commit boundary instead of treating the UnitOfWork as a plain callback.
 */
describe('LandingContactOrchestratorService', () => {
  /**
   * Intent: Build an isolated contact orchestrator fixture.
   * Edge Cases: Tests may replace idempotency behavior without touching production infrastructure.
   * Side Effects: None.
   * AI Notes: This helper is local to the spec and is not imported by another module.
   * @param overrides Partial idempotency-double overrides.
   * @returns Constructed contact orchestrator.
   */
  function build(overrides: Record<string, unknown> = {}): LandingContactOrchestratorService {
    const idempotency = {
      acquireInProgressLock: jest.fn().mockResolvedValue('lock-token'),
      releaseInProgressLock: jest.fn().mockResolvedValue(undefined),
      reserveOrReplay: jest.fn().mockResolvedValue(null),
      completeAfterCommit: jest.fn().mockResolvedValue(undefined),
      ...overrides,
    };
    const unitOfWork = { runInTransaction: jest.fn(async (work: () => Promise<unknown>) => work()) };
    const contactService = { createContact: jest.fn().mockResolvedValue({ id: 'contact-1' }) };
    const logger = { setContext: jest.fn(), error: jest.fn() };
    return new LandingContactOrchestratorService(
      unitOfWork as never,
      contactService as never,
      idempotency as never,
      logger as never,
    );
  }

  it('replays a durable response without executing the mutation again', async () => {
    const replay = { message: 'Already done.', data: null } as const;
    const service = build({ reserveOrReplay: jest.fn().mockResolvedValue(replay) });
    const contactService = (service as never as { contactService: { createContact: jest.Mock } }).contactService;
    const idempotency = (service as never as { idempotency: { completeAfterCommit: jest.Mock } }).idempotency;

    await expect(service.createContact(contactInput, 'key-1')).resolves.toEqual(replay);
    expect(contactService.createContact).not.toHaveBeenCalled();
    expect(idempotency.completeAfterCommit).not.toHaveBeenCalled();
  });

  it('completes idempotency only after the business transaction commit', async () => {
    const calls: string[] = [];
    const idempotency = {
      acquireInProgressLock: jest.fn().mockResolvedValue('lock-token'),
      reserveOrReplay: jest.fn().mockImplementation(async (...args: unknown[]) => {
        calls.push(`reserve:${args.length}`);
        return null;
      }),
      completeAfterCommit: jest.fn().mockImplementation(async () => {
        calls.push('complete');
      }),
      releaseInProgressLock: jest.fn().mockImplementation(async () => {
        calls.push('release');
      }),
    };
    const unitOfWork = {
      runInTransaction: jest.fn(async (work: () => Promise<unknown>) => {
        calls.push('transaction-start');
        const result = await work();
        calls.push('commit');
        return result;
      }),
    };
    const contactService = {
      createContact: jest.fn().mockImplementation(async () => {
        calls.push('create');
        return { id: 'contact-1' };
      }),
    };
    const logger = { setContext: jest.fn(), error: jest.fn() };
    const service = new LandingContactOrchestratorService(
      unitOfWork as never,
      contactService as never,
      idempotency as never,
      logger as never,
    );

    const result = await service.createContact(contactInput, 'key-2');

    expect(result).toEqual({ message: 'Contact request received successfully.', data: null });
    expect(contactService.createContact).toHaveBeenCalledTimes(1);
    expect(idempotency.completeAfterCommit).toHaveBeenCalledTimes(1);
    expect(calls).toEqual([
      'transaction-start',
      'reserve:4',
      'create',
      'commit',
      'transaction-start',
      'complete',
      'commit',
      'release',
    ]);
  });

  it('preserves HTTP conflicts instead of translating them to availability errors', async () => {
    const conflict = new HttpException({
      message: 'The same request is already being processed.',
      error: 'IDEMPOTENCY_IN_PROGRESS',
      errorCode: 'CORE.IDEMPOTENCY.IN_PROGRESS',
    }, HttpStatus.CONFLICT);
    const service = build({ reserveOrReplay: jest.fn().mockRejectedValue(conflict) });
    const logger = (service as never as { logger: { error: jest.Mock } }).logger;

    await expect(service.createContact(contactInput, 'key-3')).rejects.toBe(conflict);
    expect(logger.error).not.toHaveBeenCalled();
  });
});
