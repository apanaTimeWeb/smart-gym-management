// RESPONSIBILITY: Proves booking idempotency prevents duplicate execution and replays the canonical result.
// FLOW: Unit test → BookingOrchestrator → Idempotency/UnitOfWork/BookingService mocks.
import { LandingBookingOrchestratorService } from '@/modules/landing/services/landing-booking-orchestrator.service';
import { LandingBookingType } from '@/modules/landing/enums/landing-booking-type.enum';

describe('LandingBookingOrchestratorService', () => {
  it('replays an idempotent response without opening a transaction twice', async () => {
    const replay = { success: true, message: 'Already done.', data: null } as const;
    const idempotency = {
      acquire: jest.fn().mockResolvedValue(replay),
      store: jest.fn(),
      release: jest.fn(),
    };
    const unitOfWork = { runInTransaction: jest.fn() };
    const bookingService = { createBooking: jest.fn() };
    const logger = { setContext: jest.fn(), error: jest.fn() };
    const service = new LandingBookingOrchestratorService(
      unitOfWork as never,
      bookingService as never,
      idempotency as never,
      logger as never,
    );

    const result = await service.createBooking({
      name: 'Member One',
      email: 'member@example.org',
      phone: '9876543210',
      date: new Date('2026-09-21T00:00:00.000Z'),
      type: LandingBookingType.TRIAL,
    }, 'key-1');

    expect(result).toEqual(replay);
    expect(unitOfWork.runInTransaction).not.toHaveBeenCalled();
    expect(bookingService.createBooking).not.toHaveBeenCalled();
  });
});
