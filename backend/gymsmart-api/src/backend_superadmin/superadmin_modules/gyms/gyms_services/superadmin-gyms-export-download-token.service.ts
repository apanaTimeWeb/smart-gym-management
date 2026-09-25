// RESPONSIBILITY: Mints and verifies short-lived, tamper-evident Gym export download tokens.
// FLOW: Authenticated export request -> signed token -> public download route -> token verification -> artifact stream.
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHmac, timingSafeEqual } from 'node:crypto';

/**
 * Primary Intent: Defines the ExportDownloadTokenPayload type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
interface ExportDownloadTokenPayload { jobId: string; exp: number; }

/**
 * Primary Intent: Defines SuperadminGymsExportDownloadTokenService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminGymsExportDownloadTokenService {
  private readonly ttlSeconds = 15 * 60;

  constructor(private readonly config: ConfigService) {}
/**
 * Primary Intent: Executes the create use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the create use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  create(jobId: string): string {
    const payload: ExportDownloadTokenPayload = { jobId, exp: Math.floor(Date.now() / 1000) + this.ttlSeconds };
    const encoded = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
    const signature = this.sign(encoded);
    return `${encoded}.${signature}`;
  }

  /**
 * Primary Intent: Executes the `verify` responsibility owned by this superadmin-gyms-export-download-token.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the verify use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  verify(token: string): ExportDownloadTokenPayload {
    const [encoded, signature] = token.split('.', 2);
    if (!encoded || !signature) throw new BadRequestException({ error: 'BAD_REQUEST', errorCode: 'GYMS.EXPORT.DOWNLOAD_TOKEN.INVALID', message: { key: 'gyms.ERRORS.BAD_REQUEST' } });
    const expected = this.sign(encoded);
    const actualBytes = Buffer.from(signature);
    const expectedBytes = Buffer.from(expected);
    if (actualBytes.length !== expectedBytes.length || !timingSafeEqual(actualBytes, expectedBytes)) throw new BadRequestException({ error: 'BAD_REQUEST', errorCode: 'GYMS.EXPORT.DOWNLOAD_TOKEN.INVALID', message: { key: 'gyms.ERRORS.BAD_REQUEST' } });
    let payload: ExportDownloadTokenPayload;
    try { payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')) as ExportDownloadTokenPayload; } catch { throw new BadRequestException({ error: 'BAD_REQUEST', errorCode: 'GYMS.EXPORT.DOWNLOAD_TOKEN.INVALID', message: { key: 'gyms.ERRORS.BAD_REQUEST' } }); }
    if (!payload.jobId || !Number.isInteger(payload.exp) || payload.exp < Math.floor(Date.now() / 1000)) throw new BadRequestException({ error: 'BAD_REQUEST', errorCode: 'GYMS.EXPORT.DOWNLOAD_TOKEN.EXPIRED', message: { key: 'gyms.ERRORS.BAD_REQUEST' } });
    return payload;
  }

  /**
 * Primary Intent: Executes the `sign` responsibility owned by this superadmin-gyms-export-download-token.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the sign use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private sign(encoded: string): string { return createHmac('sha256', this.config.getOrThrow<string>('app.jwtAccessSecret')).update(encoded).digest('base64url'); }
}
