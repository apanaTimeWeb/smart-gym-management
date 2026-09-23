// RESPONSIBILITY: Registers health probe endpoints.
// FLOW: AppModule -> SuperadminHealthModule -> health controller.
import { Module } from '@nestjs/common';
import { SuperadminHealthController } from '@/backend_superadmin/superadmin_core/health/superadmin-health.controller';
@Module({ controllers: [SuperadminHealthController] })
export class SuperadminHealthModule {}