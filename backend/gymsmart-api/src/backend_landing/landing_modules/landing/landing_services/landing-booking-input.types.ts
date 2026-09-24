// RESPONSIBILITY: Defines the sanitized application-layer input contract for Landing booking operations.
// FLOW: Landing DTO â†’ LandingBookingOrchestratorService â†’ LandingBookingService â†’ LandingBookingRepository.
import type { LandingBookingType } from '@/backend_landing/landing_modules/landing/enums/landing-booking-type.enum';

export interface LandingCreateBookingInput {
  name: string;
  email: string;
  phone: string;
  date: Date;
  type: LandingBookingType;
}
