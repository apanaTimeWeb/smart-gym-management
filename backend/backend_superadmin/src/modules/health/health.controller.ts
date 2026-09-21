// RESPONSIBILITY: Exposes live/readiness/deep platform health probes for Kubernetes and internal operations.
// FLOW: Health route -> DB/Redis probes -> HTTP status.
import { Controller, Get, HttpStatus, ServiceUnavailableException, UseGuards } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { RedisService } from '@/core/cache/redis.service';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { Public } from '@/core/auth/public.decorator';
@Controller('/health')
export class HealthController {
  constructor(private readonly dataSource: DataSource, private readonly redis: RedisService) {}
  /** Returns process liveness without downstream dependency checks. */
  @Public() @Get('live') live(): { status: string } { return { status: 'ok' }; }
  /** Returns readiness based on master DB and Redis reachability. */
  @Public() @Get('ready') async ready(): Promise<{ status: string }> { try { await this.dataSource.query('SELECT 1'); await this.redis.ping(); return { status: 'ready' }; } catch { throw new ServiceUnavailableException('Dependencies unavailable'); } }
  /** Performs the full internal dependency-chain check; not exposed publicly. */
  @UseGuards(JwtAuthGuard, RolesGuard) @Roles(SuperadminRole.SUPERADMIN) @Get('deep') async deep(): Promise<{ status: string; dependencies: Record<string, string> }> { await this.dataSource.query('SELECT 1'); const redis = await this.redis.ping(); return { status: 'ok', dependencies: { postgres: 'ok', redis } }; }
}
