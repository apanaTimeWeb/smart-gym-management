// RESPONSIBILITY: Defines application-layer inputs for booking persistence without coupling repositories to HTTP DTO classes.
// FLOW: DTO → orchestrator/service input → repository.
import type { LandingBookingType } from '@/modules/landing/enums/landing-booking-type.enum';

export interface LandingCreateBookingInput {
  name: string;
  email: string;
  phone: string;
  date: Date;
  type: LandingBookingType;
}
