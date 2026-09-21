// RESPONSIBILITY: Provides public liveness/readiness and protected deep health checks for the application.
// FLOW: AppModule -> CoreHealthModule -> CoreHealthController -> PostgreSQL/Redis health indicators.

import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { CoreHealthController } from '@/backend_auth/core/health/core-health.controller';
@Module({
  imports: [TerminusModule],
  controllers: [CoreHealthController],
})
export class CoreHealthModule {}
