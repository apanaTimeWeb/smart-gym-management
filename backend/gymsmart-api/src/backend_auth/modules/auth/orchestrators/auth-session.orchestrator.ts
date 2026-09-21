// RESPONSIBILITY: Defines Auth session transaction boundaries without owning credential or token business rules.
// FLOW: AuthCommandController -> AuthSessionOrchestrator -> CoreTransactionService -> Auth micro-services/repositories.

import { createHash } from 'node:crypto';

import { Injectable } from '@nestjs/common';

import { CoreAuditService } from '@/backend_auth/core/audit/core-audit.service';
import { CoreTransactionService } from '@/backend_auth/core/database/core-transaction.service';
import { AuthConstants } from '@/backend_auth/modules/auth/auth.constants';
import { AuthAccountLockedException, AuthInvalidCredentialsException, AuthRefreshReuseDetectedException } from '@/backend_auth/modules/auth/auth.exceptions';
import { AuthRefreshSessionRepository } from '@/backend_auth/modules/auth/repositories/auth-refresh-session.repository';
import { AuthLoginService } from '@/backend_auth/modules/auth/services/auth-login.service';
import { AuthLogoutService } from '@/backend_auth/modules/auth/services/auth-logout.service';
import { AuthRefreshRevocationService } from '@/backend_auth/modules/auth/services/auth-refresh-revocation.service';
import { AuthRefreshService } from '@/backend_auth/modules/auth/services/auth-refresh.service';

import type { AuthLoginDomainResult, AuthRefreshDomainResult } from '@/backend_auth/modules/auth/auth.interfaces';
import type { AuthRole } from '@/backend_auth/modules/auth/auth.roles.constants';
@Injectable()
export class AuthSessionOrchestrator {
  constructor(
    private readonly transactions: CoreTransactionService,
    private readonly loginService: AuthLoginService,
    private readonly refreshService: AuthRefreshService,
    private readonly logoutService: AuthLogoutService,
    private readonly audit: CoreAuditService,
    private readonly sessionRepository: AuthRefreshSessionRepository,
    private readonly refreshRevocation: AuthRefreshRevocationService,
  ) {}

  /** @description Runs login in one transaction and persists security failure audit events after rollback. @param email - Login email. @param password - Login password. @returns Login domain result. @throws AuthInvalidCredentialsException/AuthAccountLockedException. */
  async login(email: string, password: string): Promise<AuthLoginDomainResult> {
    try {
      return await this.transactions.run(() => this.loginService.login(email, password));
    } catch (error) {
      await this.auditLoginFailure(email, error);
      throw error;
    }
  }

  /** @description Runs refresh rotation atomically and commits replay revocation after a failed rotation transaction. @param refreshToken - Presented refresh token. @returns Token rotation result. @throws AuthRefreshReuseDetectedException when a rotated token is replayed. */
  async refresh(refreshToken: string): Promise<AuthRefreshDomainResult> {
    try {
      const result = await this.transactions.run(() => this.refreshService.refresh(refreshToken));
      await this.refreshRevocation.revokeRefreshToken(refreshToken);
      return result;
    } catch (error) {
      if (error instanceof AuthRefreshReuseDetectedException) {
        await this.persistRefreshReuseRecovery(error);
        await this.refreshRevocation.revokeRefreshToken(refreshToken);
      }
      throw error;
    }
  }

  /** @description Runs session revocation and audit inside one transaction. @param userId - User UUID. @param role - Auth role. @param sessionId - Session UUID. @returns Void after commit. */
  async logout(userId: string, role: AuthRole, sessionId: string): Promise<void> {
    await this.transactions.run(() => this.logoutService.logout(userId, role, sessionId));
  }

  /** @description Audits authentication failures after the primary transaction has rolled back. @param email - Login email. @param error - Authentication error. @returns Promise completion. */
  private async auditLoginFailure(email: string, error: unknown): Promise<void> {
    if (!(error instanceof AuthInvalidCredentialsException) && !(error instanceof AuthAccountLockedException)) return;
    const isLocked = error instanceof AuthAccountLockedException;
    await this.audit.record({
      actorId: null,
      actorRole: null,
      action: isLocked ? AuthConstants.AUDIT.ACCOUNT_LOCKED : AuthConstants.AUDIT.LOGIN_FAILED,
      entityType: 'auth_user',
      entityId: null,
      oldValue: null,
      newValue: { emailHash: this.emailHash(email) },
      ipAddress: this.audit.getRequestMetadata().ipAddress,
    });
  }

  /** @description Revokes a reused refresh session and commits a security audit outside the failed rotation transaction. @param error - Reuse exception containing user/session identifiers. @returns Promise completion. */
  private async persistRefreshReuseRecovery(error: AuthRefreshReuseDetectedException): Promise<void> {
    await this.transactions.run(async () => {
      await this.sessionRepository.revokeRefreshSession(error.sessionId);
      await this.audit.record({
        actorId: error.userId,
        actorRole: null,
        action: AuthConstants.AUDIT.REFRESH_REUSE,
        entityType: 'auth_refresh_session',
        entityId: error.sessionId,
        oldValue: null,
        newValue: { sessionRevoked: true },
        ipAddress: this.audit.getRequestMetadata().ipAddress,
      });
    });
  }

  /** @description Hashes a login identifier before it is placed into audit metadata. @param email - Login email. @returns SHA-256 digest. */
  private emailHash(email: string): string { return createHash('sha256').update(email.trim().toLowerCase(), 'utf8').digest('hex'); }
}
