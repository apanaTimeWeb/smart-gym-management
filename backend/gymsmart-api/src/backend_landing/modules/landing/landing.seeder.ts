// RESPONSIBILITY: Owns deterministic, idempotent Landing seed behavior; current Landing has no reference data that requires seeding.
// FLOW: Local seed runner â†’ LandingSeeder â†’ no-op by design because bookings/contacts are real visitor data.
import { Injectable } from '@nestjs/common';

@Injectable()
export class LandingSeeder {
  /**
   * @description Provides the Landing module's deterministic, idempotent seed hook without inserting fake visitor records.
   * @returns Resolves immediately because the module has no static database seed requirements.
   */
  async seed(): Promise<void> {
    return;
  }
}
