// RESPONSIBILITY: Maps Landing bookings to the tenant PostgreSQL table without leaking ORM entities into services.
// FLOW: LandingBookingRepository â†’ TypeORM entity â†’ PostgreSQL landing_bookings.
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { CoreBaseEntity } from '@/backend_landing/landing_core/database/base.entity';

import { LandingBookingType } from '@/backend_landing/landing_modules/landing/enums/landing-booking-type.enum';


@Entity('landing_bookings')
@Index('IDX_landing_bookings_created_at', ['createdAt'])
@Index('IDX_landing_bookings_type', ['type'])
export class LandingBookingEntity extends CoreBaseEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_landing_bookings' })
  declare id: string;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 320 })
  email!: string;

  @Column({ length: 15 })
  phone!: string;

  @Column({ type: 'timestamptz', precision: 3 })
  date!: Date;

  @Column({ type: 'enum', enum: LandingBookingType, enumName: 'landing_booking_type' })
  type!: LandingBookingType;
}
