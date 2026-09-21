// RESPONSIBILITY: Owns the booking transaction boundary and durable idempotency orchestration; it must not contain persistence details.
// FLOW: LandingCommandController → LandingBookingOrchestratorService → IdempotencyService + UnitOfWork → LandingBookingService.
import { createHash } from 'node:crypto';

import { HttpException, Injectable } from '@nestjs/common';

import { PinoLogger } from 'nestjs-pino';

import { TypeOrmUnitOfWorkService } from '@/backend_landing/core/database/typeorm-unit-of-work.service';

import { IdempotencyService } from '@/backend_landing/core/idempotency/idempotency.service';

import { LandingBookingType } from '@/backend_landing/modules/landing/enums/landing-booking-type.enum';

import { LANDING_ENDPOINT_SCOPES, LANDING_ERRORS } from '@/backend_landing/modules/landing/landing.constants';

import { LandingBookingUnavailableException } from '@/backend_landing/modules/landing/landing.exceptions';

import { LandingBookingService } from '@/backend_landing/modules/landing/services/landing-booking.service';

import type { ApiResponse } from '@/backend_landing/core/types/api-response.types';


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

  /**
   * @description Creates a booking atomically and makes the completed mutation safe to replay after Redis failures or retries.
   * @param input - Sanitized booking input.
   * @param idempotencyKey - Optional client retry key.
   * @returns Canonical null-data response.
   */
  async createBooking(
    input: { name: string; email: string; phone: string; date: Date; type: LandingBookingType },
    idempotencyKey?: string,
  ): Promise<ApiResponse<null>> {
    const requestHash = this.hash(input);
    const cached = idempotencyKey
      ? await this.idempotency.getCachedResponse(LANDING_ENDPOINT_SCOPES.BOOKING, idempotencyKey, requestHash)
      : null;
    if (cached) return cached;

    try {
      const result = await this.unitOfWork.runInTransaction(async (context) => {
        if (idempotencyKey) {
          const replay = await this.idempotency.reserveOrReplay(
            context,
            LANDING_ENDPOINT_SCOPES.BOOKING,
            idempotencyKey,
            requestHash,
          );
          if (replay) return replay;
        }
        await this.bookingService.createBooking(input, context);
        const response: ApiResponse<null> = {
          success: true,
          message: LANDING_ERRORS.BOOKING_CREATED,
          data: null,
        };
        if (idempotencyKey) {
          await this.idempotency.completeWithinTransaction(
            context,
            LANDING_ENDPOINT_SCOPES.BOOKING,
            idempotencyKey,
            response,
          );
        }
        return response;
      });

      if (idempotencyKey) {
        await this.idempotency.storeCached(
          LANDING_ENDPOINT_SCOPES.BOOKING,
          idempotencyKey,
          requestHash,
          result,
        );
      }
      return result;
    } catch (error: unknown) {
      if (error instanceof HttpException) throw error;
      this.logger.error({ error: error instanceof Error ? error.message : String(error) }, 'Landing booking transaction failed.');
      throw new LandingBookingUnavailableException();
    }
  }

  /** @description Produces a deterministic SHA-256 fingerprint of normalized booking input for idempotency comparison. @param input - Normalized booking input. @returns SHA-256 request fingerprint. */
  private hash(input: unknown): string {
    return createHash('sha256').update(JSON.stringify(input)).digest('hex');
  }
}
