// RESPONSIBILITY: Proves the booking service invokes the named repository mutation and audit trail.
// FLOW: Unit test â†’ LandingBookingService.createBooking â†’ mocked repositories.
import { LandingBookingService } from '@/backend_landing/landing_modules/landing/landing_services/landing-booking.service';

import { LandingBookingType } from '@/backend_landing/landing_modules/landing/enums/landing-booking-type.enum';


describe('LandingBookingService', () => {
  it('creates a booking and records its audit entry in the same application flow', async () => {
    const booking = {
      id: 'booking-1',
      name: 'Member One',
      email: 'member@example.org',
      phone: '9876543210',
      date: new Date('2026-09-21T00:00:00.000Z'),
      type: LandingBookingType.TRIAL,
      createdAt: new Date('2026-09-21T00:00:00.000Z'),
      updatedAt: new Date('2026-09-21T00:00:00.000Z'),
      deletedAt: null,
    };
    const bookingRepository = { createBooking: jest.fn().mockResolvedValue(booking) };
    const auditRepository = { recordCreate: jest.fn().mockResolvedValue(undefined) };
    const service = new LandingBookingService(bookingRepository as never, auditRepository as never);

    const result = await service.createBooking({
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      date: booking.date,
      type: booking.type,
    }, { manager: {} as never });

    expect(result).toEqual(booking);
    expect(bookingRepository.createBooking).toHaveBeenCalledTimes(1);
    expect(auditRepository.recordCreate).toHaveBeenCalledWith(
      expect.anything(),
      'LANDING_BOOKING_CREATED',
      'LandingBooking',
      'booking-1',
      expect.objectContaining({ type: 'trial' }),
    );
  });
});
