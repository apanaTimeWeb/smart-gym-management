// RESPONSIBILITY: Owns the booking transaction boundary and durable idempotency orchestration without persistence details.
// FLOW: LandingCommandController -> LandingBookingOrchestratorService -> UnitOfWork -> BookingService/Idempotency -> repositories.
import { createHash } from 'node:crypto';

import { HttpException, Inject, Injectable } from '@nestjs/common';

import { PinoLogger } from 'nestjs-pino';

import { LANDING_UNIT_OF_WORK } from '@/backend_landing/landing_core/landing_database/landing-unit-of-work.token';
import { LandingIdempotencyService } from '@/backend_landing/landing_core/landing_idempotency/landing-idempotency.service';

import { LandingBookingType } from '@/backend_landing/landing_modules/landing/landing_enums/landing-booking-type.enum';
import { LANDING_ENDPOINT_SCOPES, LANDING_ERRORS } from '@/backend_landing/landing_modules/landing/landing-landing.constants';
import { LandingBookingUnavailableException } from '@/backend_landing/landing_modules/landing/landing-landing.exceptions';
import { LandingBookingService } from '@/backend_landing/landing_modules/landing/landing_services/landing-booking.service';

import type { LandingCoreUnitOfWork } from '@/backend_landing/landing_core/landing_database/landing-transaction-context';
import type { LandingCommandResult } from '@/backend_landing/landing_core/landing_types/landing-command-result.types';

/**
 * Intent: Coordinate booking creation, strict idempotency reservation, business persistence, and post-commit completion.
 * Edge Cases: Completed retries replay without mutation; post-commit completion failures surface as unavailable while the durable reservation remains replay-safe.
 * Side Effects: Delegates all database writes to transaction-aware services/repositories and uses Redis only for in-flight concurrency control.
 * AI Notes: Keep transport types, ORM details, and persistence primitives out of this orchestrator.
 */
@Injectable()
export class LandingBookingOrchestratorService {
  /**
   * Intent: Construct the booking orchestration boundary with only application-level collaborators.
   * Edge Cases: The UnitOfWork must resolve the trusted tenant DataSource before executing business work.
   * Side Effects: Sets the structured logger context for this orchestrator.
   * AI Notes: Do not add TypeORM repositories or EntityManager dependencies here.
   */
  constructor(
    @Inject(LANDING_UNIT_OF_WORK) private readonly unitOfWork: LandingCoreUnitOfWork,
    private readonly bookingService: LandingBookingService,
    private readonly idempotency: LandingIdempotencyService,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(LandingBookingOrchestratorService.name);
  }

  /**
   * Intent: Execute one booking command exactly once while keeping the durable replay record consistent with the committed business transaction.
   * Edge Cases: A completed key replays immediately; a failed business transaction rolls back its reservation; a post-commit completion failure remains replayable because the response was reserved with the mutation.
   * Side Effects: Performs the booking mutation, durable idempotency reservation/completion, Redis locking, and structured error logging on infrastructure failure.
   * AI Notes: Rule 103 requires the completion state transition after the business transaction commits.
   * @param input Sanitized booking input.
   * @param idempotencyKey Required client retry key.
   * @returns ORM-neutral command result for the HTTP response interceptor.
   */
  async createBooking(
    input: { name: string; email: string; phone: string; date: Date; type: LandingBookingType },
    idempotencyKey: string,
  ): Promise<LandingCommandResult<null>> {
    const requestHash = this.hash(input);
    const response = this.buildResponse();
    const lockToken = await this.idempotency.acquireInProgressLock(LANDING_ENDPOINT_SCOPES.BOOKING, idempotencyKey);

    try {
      const replay = await this.runBusinessTransaction(input, idempotencyKey, requestHash, response);
      if (replay) return replay;
      await this.completeIdempotencyAfterCommit(idempotencyKey);
      return response;
    } catch (error: unknown) {
      if (error instanceof HttpException) throw error;
      this.logger.error({ error: error instanceof Error ? error.message : String(error) }, 'Landing booking transaction failed.');
      throw new LandingBookingUnavailableException();
    } finally {
      await this.idempotency.releaseInProgressLock(LANDING_ENDPOINT_SCOPES.BOOKING, idempotencyKey, lockToken);
    }
  }

  /**
   * Intent: Execute booking persistence and reservation inside one tenant transaction.
   * Edge Cases: Existing durable keys return their replay response; new reservations return null after the business mutation is committed.
   * Side Effects: Inserts the booking and idempotency reservation using the same database transaction.
   * AI Notes: The reservation stores the deterministic response while remaining processing=true until the post-commit completion transaction.
   * @param input Sanitized booking input.
   * @param idempotencyKey Required retry key.
   * @param requestHash Request fingerprint.
   * @param response Deterministic replay response.
   * @returns Existing replay response, or null for a newly committed mutation.
   */
  private async runBusinessTransaction(
    input: { name: string; email: string; phone: string; date: Date; type: LandingBookingType },
    idempotencyKey: string,
    requestHash: string,
    response: LandingCommandResult<null>,
  ): Promise<LandingCommandResult<null> | null> {
    return this.unitOfWork.runInTransaction(async () => {
      const replay = await this.idempotency.reserveOrReplay(
        LANDING_ENDPOINT_SCOPES.BOOKING,
        idempotencyKey,
        requestHash,
        response,
      );
      if (replay) return replay;
      await this.bookingService.createBooking(input);
      return null;
    });
  }

  /**
   * Intent: Flip the durable idempotency reservation to completed only after the business transaction has committed.
   * Edge Cases: Completion failure is surfaced; the pre-committed response remains available for safe replay on the next request.
   * Side Effects: Opens one short tenant transaction that updates the durable idempotency record.
   * AI Notes: Never invoke this helper before runBusinessTransaction resolves successfully.
   * @param idempotencyKey Required retry key.
   * @returns Resolves after the completion transaction commits.
   */
  private async completeIdempotencyAfterCommit(idempotencyKey: string): Promise<void> {
    await this.unitOfWork.runInTransaction(async () => {
      await this.idempotency.completeAfterCommit(LANDING_ENDPOINT_SCOPES.BOOKING, idempotencyKey);
      return undefined;
    });
  }

  /**
   * Intent: Build the deterministic response payload used both for reservation and successful replay.
   * Edge Cases: Landing booking creation intentionally returns null data.
   * Side Effects: None.
   * AI Notes: Keep this response transport-neutral; the HTTP interceptor adds the canonical envelope.
   * @returns Booking command result.
   */
  private buildResponse(): LandingCommandResult<null> {
    return { message: LANDING_ERRORS.BOOKING_CREATED, data: null };
  }

  /**
   * Intent: Produce a deterministic SHA-256 request fingerprint for strict retry comparison.
   * Edge Cases: The caller passes already normalized DTO-derived input.
   * Side Effects: None.
   * AI Notes: Never hash raw HTTP objects containing headers or credentials.
   * @param input Normalized booking input.
   * @returns SHA-256 request fingerprint.
   */
  private hash(input: unknown): string {
    return createHash('sha256').update(JSON.stringify(input)).digest('hex');
  }
}
