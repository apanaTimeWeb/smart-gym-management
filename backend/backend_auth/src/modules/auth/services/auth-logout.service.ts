// RESPONSIBILITY: Revokes the current refresh session and records a logout audit event.
// FLOW: AuthCommandController -> AuthSessionOrchestrator -> AuthLogoutService -> session repository/audit.

import { Injectable } from '@nestjs/common';

import { CoreAuditService } from '@/core/audit/core-audit.service';
import { AuthConstants } from '@/modules/auth/auth.constants';
import { AuthRefreshSessionRepository } from '@/modules/auth/repositories/auth-refresh-session.repository';

import type { AuthRole } from '@/modules/auth/auth.roles.constants';
@Injectable()
export class AuthLogoutService {
  constructor(private readonly sessionRepository: AuthRefreshSessionRepository, private readonly audit: CoreAuditService) {}

  /** @description Revokes the session embedded in the verified access token. @param userId - Auth user UUID. @param role - Auth role. @param sessionId - Refresh session UUID. @returns void. */
  async logout(userId: string, role: AuthRole, sessionId: string): Promise<void> {
    await this.sessionRepository.revokeRefreshSession(sessionId);
    await this.audit.record({ actorId: userId, actorRole: role, action: AuthConstants.AUDIT.LOGOUT, entityType: 'auth_refresh_session', entityId: sessionId, oldValue: null, newValue: { revoked: true }, ipAddress: null });
  }
}
