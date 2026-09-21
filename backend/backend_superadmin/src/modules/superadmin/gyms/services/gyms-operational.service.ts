// RESPONSIBILITY: Executes gym operational commands that are not CRUD persistence operations.
// FLOW: Controller -> operational use case -> repository validation/audit -> response contract.
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ConfigService } from '@nestjs/config';
import { getRequestContext } from '@/core/observability/request-context';
import { GymsRepository } from '@/modules/superadmin/gyms/gyms.repository';

@Injectable()
export class GymsOperationalService {
  constructor(
    private readonly repository: GymsRepository,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  /** Returns live aggregate Gym statistics from the authoritative master database. */
  async stats(): Promise<{ totalActive: number; totalSuspended: number; mrrContribution: number }> { return this.repository.getStats(); }

  /** Records a validated owner-email operation without exposing credentials or PII. */
  async emailOwner(id: string, subject: string, message: string): Promise<null> {
    await this.repository.findByIdOrThrow(id);
    if (!subject.trim() || !message.trim()) throw new BadRequestException('Email subject and message are required');
    await this.repository.recordAdministrativeAction(id, 'EMAIL_OWNER_REQUESTED');
    return null;
  }

  /** Creates a short-lived impersonation token tied to the requested tenant and current actor. */
  async impersonate(id: string): Promise<{ token: string }> {
    const tenant = await this.repository.findByIdOrThrow(id);
    const actor = getRequestContext()?.userId ?? null;
    if (!actor) throw new BadRequestException('Authenticated actor context is required');
    const secret = this.config.getOrThrow<string>('app.jwtAccessSecret');
    const token = await this.jwtService.signAsync({ sub: actor, impersonatedTenantId: tenant.id, purpose: 'GYM_IMPERSONATION' }, { secret, expiresIn: '10m' });
    await this.repository.recordAdministrativeAction(id, 'IMPERSONATION_ISSUED');
    return { token };
  }

  /** Returns a stable export resource URI owned by the backend. */
  async exportGyms(): Promise<{ downloadUrl: string }> {
    return { downloadUrl: '/api/v1/superadmin/gyms/export/file' };
  }
}
