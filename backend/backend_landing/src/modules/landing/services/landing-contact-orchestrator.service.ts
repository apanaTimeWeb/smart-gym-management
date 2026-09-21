// RESPONSIBILITY: Owns the contact transaction boundary, idempotency, and controlled infrastructure-error translation.
// FLOW: LandingCommandController → ContactOrchestrator → Idempotency → UnitOfWork → ContactService.
import { Injectable } from '@nestjs/common';
import { createHash } from 'node:crypto';
import { PinoLogger } from 'nestjs-pino';
import type { ApiResponse } from '@/core/types/api-response.types';
import { TypeOrmUnitOfWorkService } from '@/core/database/typeorm-unit-of-work.service';
import { LandingContactService } from '@/modules/landing/services/landing-contact.service';
import { IdempotencyService } from '@/core/idempotency/idempotency.service';
import { LANDING_ERRORS, LANDING_ENDPOINT_SCOPES } from '@/modules/landing/landing.constants';
import { LandingContactUnavailableException } from '@/modules/landing/landing.exceptions';

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

  /** @description Executes contact creation atomically and replays a matching idempotency result. @param input - Contact application input. @param idempotencyKey - Optional retry key. @returns Canonical null-data response. @throws LandingContactUnavailableException when persistence is unavailable. */
  async createContact(input: { name: string; email: string; message: string }, idempotencyKey?: string): Promise<ApiResponse<null>> {
    const requestHash = this.hash(input);
    const replay = idempotencyKey ? await this.idempotency.acquire(LANDING_ENDPOINT_SCOPES.CONTACT, idempotencyKey, requestHash) : null;
    if (replay) return replay;
    try {
      return await this.execute(input, idempotencyKey, requestHash);
    } catch (error: unknown) {
      if (idempotencyKey) await this.idempotency.release(LANDING_ENDPOINT_SCOPES.CONTACT, idempotencyKey, requestHash);
      this.logger.error({ error: error instanceof Error ? error.message : String(error) }, 'Landing contact transaction failed.');
      throw new LandingContactUnavailableException();
    }
  }

  private async execute(
    input: { name: string; email: string; message: string },
    idempotencyKey: string | undefined,
    requestHash: string,
  ): Promise<ApiResponse<null>> {
    await this.unitOfWork.runInTransaction(async (context) => this.contactService.createContact(input, context));
    const response: ApiResponse<null> = { success: true, message: LANDING_ERRORS.CONTACT_CREATED, data: null };
    if (idempotencyKey) await this.idempotency.store(LANDING_ENDPOINT_SCOPES.CONTACT, idempotencyKey, requestHash, response);
    return response;
  }

  private hash(input: unknown): string {
    return createHash('sha256').update(JSON.stringify(input)).digest('hex');
  }
}
