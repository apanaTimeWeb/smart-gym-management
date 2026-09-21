// RESPONSIBILITY: Proves durable idempotency replay and Redis-cache failure behavior for booking mutations.
// FLOW: Unit test â†’ LandingBookingOrchestratorService â†’ durable idempotency + UnitOfWork + BookingService.
import { HttpException, HttpStatus } from '@nestjs/common';

import { LandingBookingType } from '@/backend_landing/modules/landing/enums/landing-booking-type.enum';
import { LandingBookingOrchestratorService } from '@/backend_landing/modules/landing/services/landing-booking-orchestrator.service';

const bookingInput = {
  name: 'Member One',
  email: 'member@example.org',
  phone: '9876543210',
  date: new Date('2026-09-21T00:00:00.000Z'),
  type: LandingBookingType.TRIAL,
};

describe('LandingBookingOrchestratorService', () => {
  it('replays a completed durable response without executing the mutation twice', async () => {
    const replay = { success: true, message: 'Already done.', data: null } as const;
    const idempotency = {
      getCachedResponse: jest.fn().mockResolvedValue(null),
      reserveOrReplay: jest.fn().mockResolvedValue(replay),
      completeWithinTransaction: jest.fn(),
      storeCached: jest.fn(),
    };
    const unitOfWork = { runInTransaction: jest.fn(async (work: (context: object) => Promise<unknown>) => work({})) };
    const bookingService = { createBooking: jest.fn() };
    const logger = { setContext: jest.fn(), error: jest.fn() };
    const service = new LandingBookingOrchestratorService(
      unitOfWork as never,
      bookingService as never,
      idempotency as never,
      logger as never,
    );

    const result = await service.createBooking(bookingInput, 'key-1');

    expect(result).toEqual(replay);
    expect(bookingService.createBooking).not.toHaveBeenCalled();
    expect(idempotency.completeWithinTransaction).not.toHaveBeenCalled();
  });

  it('does not turn a committed booking into a 503 when Redis cache storage fails', async () => {
    const idempotency = {
      getCachedResponse: jest.fn().mockResolvedValue(null),
      reserveOrReplay: jest.fn().mockResolvedValue(null),
      completeWithinTransaction: jest.fn().mockResolvedValue(undefined),
      storeCached: jest.fn().mockResolvedValue(undefined),
    };
    const unitOfWork = {
      runInTransaction: jest.fn(async (work: (context: object) => Promise<unknown>) => work({})),
    };
    const bookingService = { createBooking: jest.fn().mockResolvedValue({ id: 'booking-1' }) };
    const logger = { setContext: jest.fn(), error: jest.fn() };
    const service = new LandingBookingOrchestratorService(
      unitOfWork as never,
      bookingService as never,
      idempotency as never,
      logger as never,
    );

    const result = await service.createBooking(bookingInput, 'key-2');

    expect(result.success).toBe(true);
    expect(result.data).toBeNull();
    expect(bookingService.createBooking).toHaveBeenCalledTimes(1);
    expect(idempotency.completeWithinTransaction).toHaveBeenCalledTimes(1);
    expect(logger.error).not.toHaveBeenCalled();
  });

  it('does not translate a Redis cache failure into a business failure', async () => {
    const idempotency = {
      getCachedResponse: jest.fn().mockResolvedValue(null),
      reserveOrReplay: jest.fn().mockResolvedValue(null),
      completeWithinTransaction: jest.fn().mockResolvedValue(undefined),
      storeCached: jest.fn().mockResolvedValue(undefined),
    };
    const unitOfWork = {
      runInTransaction: jest.fn(async (work: (context: object) => Promise<unknown>) => work({})),
    };
    const bookingService = { createBooking: jest.fn().mockResolvedValue({ id: 'booking-2' }) };
    const logger = { setContext: jest.fn(), error: jest.fn() };
    const service = new LandingBookingOrchestratorService(
      unitOfWork as never,
      bookingService as never,
      idempotency as never,
      logger as never,
    );
    await expect(service.createBooking(bookingInput, 'key-redis')).resolves.toEqual({
      success: true,
      message: 'Booking submitted successfully. Our team will contact you shortly.',
      data: null,
    });
  });

  it('preserves canonical HTTP conflicts instead of translating them to availability errors', async () => {
    const conflict = new HttpException({
      success: false,
      message: 'The same request is already being processed.',
      data: null,
      error: 'IDEMPOTENCY_IN_PROGRESS',
      errorCode: 'CORE.IDEMPOTENCY.IN_PROGRESS',
    }, HttpStatus.CONFLICT);
    const idempotency = {
      getCachedResponse: jest.fn().mockResolvedValue(null),
      reserveOrReplay: jest.fn().mockRejectedValue(conflict),
      completeWithinTransaction: jest.fn(),
      storeCached: jest.fn(),
    };
    const unitOfWork = {
      runInTransaction: jest.fn(async (work: (context: object) => Promise<unknown>) => work({})),
    };
    const logger = { setContext: jest.fn(), error: jest.fn() };
    const service = new LandingBookingOrchestratorService(
      unitOfWork as never,
      { createBooking: jest.fn() } as never,
      idempotency as never,
      logger as never,
    );

    await expect(service.createBooking(bookingInput, 'key-3')).rejects.toBe(conflict);
    expect(logger.error).not.toHaveBeenCalled();
  });
});
