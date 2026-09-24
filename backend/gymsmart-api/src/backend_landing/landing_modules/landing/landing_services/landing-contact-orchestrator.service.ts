// RESPONSIBILITY: Owns the contact transaction boundary and durable idempotency orchestration; it must not contain persistence details.
// FLOW: LandingCommandController â†’ LandingContactOrchestratorService â†’ IdempotencyService + UnitOfWork â†’ LandingContactService.
import { createHash } from 'node:crypto';

import { HttpException, Injectable } from '@nestjs/common';

import { PinoLogger } from 'nestjs-pino';

import { TypeOrmUnitOfWorkService } from '@/backend_landing/landing_core/database/typeorm-unit-of-work.service';

import { IdempotencyService } from '@/backend_landing/landing_core/landing_idempotency/idempotency.service';

import { LANDING_ENDPOINT_SCOPES, LANDING_ERRORS } from '@/backend_landing/landing_modules/landing/landing.constants';

import { LandingContactUnavailableException } from '@/backend_landing/landing_modules/landing/landing.exceptions';

import { LandingContactService } from '@/backend_landing/landing_modules/landing/landing_services/landing-contact.service';

import type { ApiResponse } from '@/backend_landing/landing_core/landing_types/api-response.types';


@Injectable()
export class LandingContactOrchestratorService {
  constructor(
    private readonly unitOfWork: TypeOrmUnitOfWorkService,
    private readonly contactService: LandingContactService,
    private readonly idempotency: IdempotencyService,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(LandingContactOrchestratorService.name);
  }

  /**
   * @description Creates a contact record atomically and makes the completed mutation safe to replay after Redis failures or retries.
   * @param input - Sanitized contact input.
   * @param idempotencyKey - Optional client retry key.
   * @returns Canonical null-data response.
   */
  async createContact(
    input: { name: string; email: string; message: string },
    idempotencyKey?: string,
  ): Promise<ApiResponse<null>> {
    const requestHash = this.hash(input);
    const cached = idempotencyKey
      ? await this.idempotency.getCachedResponse(LANDING_ENDPOINT_SCOPES.CONTACT, idempotencyKey, requestHash)
      : null;
    if (cached) return cached;

    try {
      const result = await this.unitOfWork.runInTransaction(async (context) => {
        if (idempotencyKey) {
          const replay = await this.idempotency.reserveOrReplay(
            context,
            LANDING_ENDPOINT_SCOPES.CONTACT,
            idempotencyKey,
            requestHash,
          );
          if (replay) return replay;
        }
        await this.contactService.createContact(input, context);
        const response: ApiResponse<null> = {
          success: true,
          message: LANDING_ERRORS.CONTACT_CREATED,
          data: null,
        };
        if (idempotencyKey) {
          await this.idempotency.completeWithinTransaction(
            context,
            LANDING_ENDPOINT_SCOPES.CONTACT,
            idempotencyKey,
            response,
          );
        }
        return response;
      });

      if (idempotencyKey) {
        await this.idempotency.storeCached(
          LANDING_ENDPOINT_SCOPES.CONTACT,
          idempotencyKey,
          requestHash,
          result,
        );
      }
      return result;
    } catch (error: unknown) {
      if (error instanceof HttpException) throw error;
      this.logger.error({ error: error instanceof Error ? error.message : String(error) }, 'Landing contact transaction failed.');
      throw new LandingContactUnavailableException();
    }
  }

  /** @description Produces a deterministic SHA-256 fingerprint of normalized contact input for idempotency comparison. @param input - Normalized contact input. @returns SHA-256 request fingerprint. */
  private hash(input: unknown): string {
    return createHash('sha256').update(JSON.stringify(input)).digest('hex');
  }
}
