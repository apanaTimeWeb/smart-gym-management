// RESPONSIBILITY: Executes gym operational commands that are not CRUD persistence operations.
// FLOW: Controller -> operational use case -> repository validation/export -> response contract.
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getRequestContext } from '@/backend_superadmin/core/observability/request-context';
import { GymsRepository } from '@/backend_superadmin/modules/superadmin/gyms/gyms.repository';

@Injectable()
export class GymsOperationalService {
  constructor(
    private readonly repository: GymsRepository,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  /** Returns live aggregate Gym statistics from the authoritative master database. */
  async stats(): Promise<{ totalActive: number; totalSuspended: number; mrrContribution: number }> { return this.repository.getStats(); }

  /** Validates an owner message request and records the command for downstream delivery infrastructure. */
  async emailOwner(id: string, subject: string, message: string): Promise<null> {
    await this.repository.findByIdOrThrow(id);
    if (!subject.trim() || !message.trim()) throw new BadRequestException({ error: 'BAD_REQUEST', errorCode: 'GYMS.EMAIL.INPUT_REQUIRED', message: { key: 'gyms.ERRORS.BAD_REQUEST' } });
    await this.repository.recordAdministrativeAction(id, 'EMAIL_OWNER_REQUESTED');
    return null;
  }

  /** Creates a short-lived impersonation token tied to the requested tenant and current actor. */
  async impersonate(id: string): Promise<{ token: string }> {
    const tenant = await this.repository.findByIdOrThrow(id);
    const actor = getRequestContext()?.userId ?? null;
    if (!actor) throw new BadRequestException({ error: 'BAD_REQUEST', errorCode: 'GYMS.EMAIL.ACTOR_REQUIRED', message: { key: 'gyms.ERRORS.BAD_REQUEST' } });
    const secret = this.config.getOrThrow<string>('app.jwtAccessSecret');
    const token = await this.jwtService.signAsync({ sub: actor, impersonatedTenantId: tenant.id, purpose: 'GYM_IMPERSONATION' }, { secret, expiresIn: '10m' });
    await this.repository.recordAdministrativeAction(id, 'IMPERSONATION_ISSUED');
    return { token };
  }

  /** Returns a download URL backed by the real CSV export endpoint. */
  async exportGyms(): Promise<{ downloadUrl: string }> {
    return { downloadUrl: '/api/gyms/export/file' };
  }

  /** Builds a CSV representation from active tenant records for download transport. */
  async buildGymsExportCsv(): Promise<string> {
    const rows = await this.repository.findAllForExport();
    const header = ['id', 'name', 'ownerName', 'adminEmail', 'phone', 'status', 'plan', 'memberCount', 'monthlyRevenue', 'createdAt'];
    const escape = (value: unknown): string => `"${String(value ?? '').replaceAll('"', '""')}"`;
    return [header.join(','), ...rows.map((row) => [row.id, row.name, row.ownerName, row.adminEmail, row.phone, row.status, row.plan, row.memberCount, row.monthlyRevenue, row.createdAt.toISOString()].map(escape).join(','))].join('\n');
  }
}