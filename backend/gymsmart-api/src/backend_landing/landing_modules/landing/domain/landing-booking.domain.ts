// RESPONSIBILITY: Defines the persistence-independent Landing booking domain object.
// FLOW: Repository mapper â†’ LandingBookingDomainModel â†’ Landing service.
import type { LandingBookingType } from '@/backend_landing/landing_modules/landing/enums/landing-booking-type.enum';

export interface LandingBookingDomainModel {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: Date;
  type: LandingBookingType;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
