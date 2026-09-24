// RESPONSIBILITY: Revokes the current refresh session and records a logout audit event.
// FLOW: AuthCommandController -> AuthSessionOrchestrator -> AuthLogoutService -> session repository/audit.

import { Injectable } from '@nestjs/common';

import { CoreAuditService } from '@/backend_auth/auth_core/audit/core-audit.service';
import { AuthConstants } from '@/backend_auth/auth_modules/auth/auth.constants';
import { AuthRefreshSessionRepository } from '@/backend_auth/auth_modules/auth/auth_repositories/auth-refresh-session.repository';
import { AuthAuditRoleMapper } from '@/backend_auth/auth_modules/auth/auth_utils/auth-audit-role.mapper';

import type { AuthRole } from '@/backend_auth/auth_modules/auth/auth.roles.constants';
@Injectable()
export class AuthLogoutService {
  constructor(private readonly sessionRepository: AuthRefreshSessionRepository, private readonly audit: CoreAuditService) {}

  /** @description Revokes the session embedded in the verified access token. @param userId - Auth user UUID. @param role - Auth role. @param sessionId - Refresh session UUID. @returns void. */
  async logout(userId: string, role: AuthRole, sessionId: string): Promise<void> {
    await this.sessionRepository.revokeRefreshSession(sessionId);
    await this.audit.record({ actorId: userId, actorRole: AuthAuditRoleMapper(role), action: AuthConstants.AUDIT.LOGOUT, entityType: 'auth_refresh_session', entityId: sessionId, oldValue: null, newValue: { revoked: true }, ipAddress: this.audit.getRequestMetadata().ipAddress });
  }
}
