// RESPONSIBILITY: Proves booking ORM-to-domain translation preserves the frontend contract semantics.
// FLOW: Unit test → LandingBookingMapper → domain object.
import { LandingBookingMapper } from '@/modules/landing/mappers/landing-booking.mapper';

import { LandingBookingType } from '@/modules/landing/enums/landing-booking-type.enum';

import { LandingBookingEntity } from '@/modules/landing/entities/landing-booking.entity';


describe('LandingBookingMapper', () => {
  it('maps UTC dates and booking type without changing values', () => {
    const entity = new LandingBookingEntity();
    entity.id = 'booking-1';
    entity.name = 'Member One';
    entity.email = 'member@example.org';
    entity.phone = '9876543210';
    entity.date = new Date('2026-09-21T00:00:00.000Z');
    entity.type = LandingBookingType.TRIAL;
    entity.createdAt = entity.date;
    entity.updatedAt = entity.date;
    entity.deletedAt = null;

    const result = new LandingBookingMapper().toDomain(entity);

    expect(result.date.toISOString()).toBe('2026-09-21T00:00:00.000Z');
    expect(result.type).toBe(LandingBookingType.TRIAL);
  });
});
