// RESPONSIBILITY: Provides the sanitized audit boundary used by security-critical feature mutations.
// FLOW: Feature service/orchestrator -> CoreAuditService -> CoreAuditLogRepository -> audit_logs.

import { Injectable } from '@nestjs/common';

import { CoreAuditLogRepository } from '@/backend_auth/auth_core/audit/core-audit-log.repository';

import type { CoreAuditLogInput } from '@/backend_auth/auth_core/audit/core-audit-log.interfaces';
import { CoreRequestContextService } from '@/backend_auth/auth_core/context/core-request-context';
@Injectable()
export class CoreAuditService {
  constructor(
    private readonly repository: CoreAuditLogRepository,
    private readonly requestContext: CoreRequestContextService,
  ) {}

  /** @description Persists one sanitized audit event. @param input - Sanitized audit input. @returns void. */
  async record(input: CoreAuditLogInput): Promise<void> { await this.repository.createAuditLog(input); }

  /** @description Returns server-derived IP metadata from the current request context. @returns Safe IP metadata. */
  getRequestMetadata(): { ipAddress: string | null } { return { ipAddress: this.requestContext.get()?.ipAddress ?? null }; }

  /** @description Reads the authenticated actor ID from request context. @returns Actor UUID or null. */
  getActorId(): string | null { return this.requestContext.get()?.userId ?? null; }
}
