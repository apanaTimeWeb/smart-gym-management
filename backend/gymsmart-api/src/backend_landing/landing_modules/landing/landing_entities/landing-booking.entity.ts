// RESPONSIBILITY: Maps Landing bookings to the tenant PostgreSQL table without leaking ORM entities into services.
// FLOW: LandingBookingRepository â†’ TypeORM entity â†’ PostgreSQL landing_bookings.
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { LandingBaseEntity } from '@/backend_landing/landing_core/landing_database/landing-base.entity';

import { LandingBookingType } from '@/backend_landing/landing_modules/landing/landing_enums/landing-booking-type.enum';


/**
 * Intent: Defines the LandingBookingEntity class boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs and infrastructure failures are handled by the owning boundary.
 * Side Effects: None beyond the behavior implemented by this class.
 * AI Notes: Preserve the class responsibility and dependency direction documented by the module.
 */
@Entity('landing_bookings')
@Index('IDX_landing_bookings_created_at', ['createdAt'])
@Index('IDX_landing_bookings_type', ['type'])
/**
 * Intent: Defines the landing booking entity boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs, unavailable infrastructure, and transaction failures must fail through the owning boundary instead of being silently ignored.
 * Side Effects: Performs only the persistence, orchestration, transport, or infrastructure effects explicitly owned by this class.
 * AI Notes: Preserve the class's current responsibility and dependency direction; do not move business logic across feature boundaries.
 */
export class LandingBookingEntity extends LandingBaseEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_landing_bookings', comment: 'Immutable UUID identity for one Landing booking.' })
  declare id: string;

  @Column({ length: 100, comment: 'Visitor name submitted through the public Landing booking form.' })
  name!: string;

  @Column({ length: 320, comment: 'Normalized lowercase contact email submitted with the booking.' })
  email!: string;

  @Column({ length: 15, comment: 'Canonical 10-digit visitor phone number used for contact follow-up.' })
  phone!: string;

  @Column({ type: 'timestamptz', precision: 3, comment: 'Requested appointment date/time in UTC-normalized ISO semantics.' })
  date!: Date;

  @Column({ type: 'enum', enum: LandingBookingType, enumName: 'landing_booking_type', comment: 'Finite booking category selected by the visitor.' })
  type!: LandingBookingType;
}
