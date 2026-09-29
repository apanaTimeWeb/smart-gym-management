// RESPONSIBILITY: Proves booking transaction ordering, strict idempotency replay, and post-commit completion.
// FLOW: Test -> LandingBookingOrchestratorService -> business transaction commit -> completion transaction -> lock release.
import { HttpException, HttpStatus } from '@nestjs/common';

import { LandingBookingType } from '@/backend_landing/landing_modules/landing/landing_enums/landing-booking-type.enum';
import { LandingBookingOrchestratorService } from '@/backend_landing/landing_modules/landing/landing_services/landing-booking-orchestrator.service';

const bookingInput = {
  name: 'Member One',
  email: 'member@example.org',
  phone: '9876543210',
  date: new Date('2026-09-21T00:00:00.000Z'),
  type: LandingBookingType.TRIAL,
};

/**
 * Intent: Protect booking orchestration against duplicate execution and premature idempotency completion.
 * Edge Cases: A replay skips mutation; a new command completes the business transaction before the idempotency completion transaction; conflicts remain conflicts.
 * Side Effects: None; all dependencies are test doubles.
 * AI Notes: The ordering test explicitly models a transaction commit boundary instead of treating the UnitOfWork as a plain callback.
 */
describe('LandingBookingOrchestratorService', () => {
  /**
   * Intent: Build an isolated orchestrator fixture with overridable idempotency behavior.
   * Edge Cases: Tests may replace any collaborator with deterministic spies.
   * Side Effects: None.
   * AI Notes: No production database or Redis connection is created by these tests.
   * @param overrides Partial idempotency-double overrides.
   * @returns Constructed booking orchestrator.
   */
  function build(overrides: Record<string, unknown> = {}): LandingBookingOrchestratorService {
    const idempotency = {
      acquireInProgressLock: jest.fn().mockResolvedValue('lock-token'),
      releaseInProgressLock: jest.fn().mockResolvedValue(undefined),
      reserveOrReplay: jest.fn().mockResolvedValue(null),
      completeAfterCommit: jest.fn().mockResolvedValue(undefined),
      ...overrides,
    };
    const unitOfWork = {
      runInTransaction: jest.fn(async (work: () => Promise<unknown>) => work()),
    };
    const bookingService = { createBooking: jest.fn().mockResolvedValue({ id: 'booking-1' }) };
    const logger = { setContext: jest.fn(), error: jest.fn() };
    return new LandingBookingOrchestratorService(
      unitOfWork as never,
      bookingService as never,
      idempotency as never,
      logger as never,
    );
  }

  it('replays a durable response without executing the mutation again', async () => {
    const replay = { message: 'Already done.', data: null } as const;
    const service = build({ reserveOrReplay: jest.fn().mockResolvedValue(replay) });
    const bookingService = (service as never as { bookingService: { createBooking: jest.Mock } }).bookingService;
    const idempotency = (service as never as { idempotency: { completeAfterCommit: jest.Mock } }).idempotency;

    await expect(service.createBooking(bookingInput, 'key-1')).resolves.toEqual(replay);
    expect(bookingService.createBooking).not.toHaveBeenCalled();
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
    const bookingService = {
      createBooking: jest.fn().mockImplementation(async () => {
        calls.push('create');
        return { id: 'booking-1' };
      }),
    };
    const logger = { setContext: jest.fn(), error: jest.fn() };
    const service = new LandingBookingOrchestratorService(
      unitOfWork as never,
      bookingService as never,
      idempotency as never,
      logger as never,
    );

    const result = await service.createBooking(bookingInput, 'key-2');

    expect(result).toEqual({ message: 'Booking submitted successfully.', data: null });
    expect(bookingService.createBooking).toHaveBeenCalledTimes(1);
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

    await expect(service.createBooking(bookingInput, 'key-3')).rejects.toBe(conflict);
    expect(logger.error).not.toHaveBeenCalled();
  });
});
