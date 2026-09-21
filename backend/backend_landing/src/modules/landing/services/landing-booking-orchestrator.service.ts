// RESPONSIBILITY: Owns the booking transaction boundary, idempotency, and controlled infrastructure-error translation.
// FLOW: LandingCommandController → BookingOrchestrator → Idempotency → UnitOfWork → BookingService.
import { Injectable } from '@nestjs/common';
import { createHash } from 'node:crypto';
import { PinoLogger } from 'nestjs-pino';
import type { ApiResponse } from '@/core/types/api-response.types';
import { TypeOrmUnitOfWorkService } from '@/core/database/typeorm-unit-of-work.service';
import { LandingBookingService } from '@/modules/landing/services/landing-booking.service';
import { LandingBookingType } from '@/modules/landing/enums/landing-booking-type.enum';
import { IdempotencyService } from '@/core/idempotency/idempotency.service';
import { LANDING_ERRORS, LANDING_ENDPOINT_SCOPES } from '@/modules/landing/landing.constants';
import { LandingBookingUnavailableException } from '@/modules/landing/landing.exceptions';

@Injectable()
export class LandingBookingOrchestratorService {
  constructor(
    private readonly unitOfWork: TypeOrmUnitOfWorkService,
    private readonly bookingService: LandingBookingService,
    private readonly idempotency: IdempotencyService,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(LandingBookingOrchestratorService.name);
  }

  /** @description Executes booking creation atomically and replays a matching idempotency result. @param input - Booking application input. @param idempotencyKey - Optional retry key. @returns Canonical null-data response. @throws LandingBookingUnavailableException when persistence is unavailable. */
  async createBooking(input: { name: string; email: string; phone: string; date: Date; type: LandingBookingType }, idempotencyKey?: string): Promise<ApiResponse<null>> {
    const requestHash = this.hash(input);
    const replay = idempotencyKey ? await this.idempotency.acquire(LANDING_ENDPOINT_SCOPES.BOOKING, idempotencyKey, requestHash) : null;
    if (replay) return replay;
    try {
      return await this.execute(input, idempotencyKey, requestHash);
    } catch (error: unknown) {
      if (idempotencyKey) await this.idempotency.release(LANDING_ENDPOINT_SCOPES.BOOKING, idempotencyKey, requestHash);
      this.logger.error({ error: error instanceof Error ? error.message : String(error) }, 'Landing booking transaction failed.');
      throw new LandingBookingUnavailableException();
    }
  }

  private async execute(
    input: { name: string; email: string; phone: string; date: Date; type: LandingBookingType },
    idempotencyKey: string | undefined,
    requestHash: string,
  ): Promise<ApiResponse<null>> {
    await this.unitOfWork.runInTransaction(async (context) => this.bookingService.createBooking(input, context));
    const response: ApiResponse<null> = { success: true, message: LANDING_ERRORS.BOOKING_CREATED, data: null };
    if (idempotencyKey) await this.idempotency.store(LANDING_ENDPOINT_SCOPES.BOOKING, idempotencyKey, requestHash, response);
    return response;
  }

  private hash(input: unknown): string {
    return createHash('sha256').update(JSON.stringify(input)).digest('hex');
  }
}
