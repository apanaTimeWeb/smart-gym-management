// RESPONSIBILITY: Registers health probe endpoints.
// FLOW: AppModule -> HealthModule -> health controller.
import { Module } from '@nestjs/common';
import { HealthController } from '@/backend_superadmin/modules/health/health.controller';
@Module({ controllers: [HealthController] })
export class HealthModule {}
