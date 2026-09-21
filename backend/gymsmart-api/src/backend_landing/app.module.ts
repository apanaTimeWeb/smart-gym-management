// RESPONSIBILITY: Composes global infrastructure and the supplied Landing business feature only.
// FLOW: Bootstrap → Config → Logger → Master DB → Redis → Tenant Context → LandingModule.
import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggerModule } from 'nestjs-pino';

import { trace } from '@opentelemetry/api';

import { buildValidatedConfig } from '@/backend_landing/core/config/app.config';

import { buildMasterDataSourceOptions } from '@/backend_landing/core/database/master-data-source-options';

import { RedisInfrastructureModule } from '@/backend_landing/core/redis/redis-infrastructure.module';

import { CoreDatabaseModule } from '@/backend_landing/core/database/core-database.module';

import { CoreContextModule } from '@/backend_landing/core/context/core-context.module';

import { CoreObservabilityModule } from '@/backend_landing/core/observability/core-observability.module';

import { CoreHealthModule } from '@/backend_landing/core/health/core-health.module';

import { CoreSecurityModule } from '@/backend_landing/core/security/core-security.module';

import { IdempotencyModule } from '@/backend_landing/core/idempotency/idempotency.module';

import { ResponseInterceptor } from '@/backend_landing/core/http/response.interceptor';

import { TestTenantController } from '@/backend_landing/core/tenant/test-tenant.controller';

import { LandingModule } from '@/backend_landing/modules/landing/landing.module';


@Module({
  imports: [

    CoreContextModule,
    CoreDatabaseModule,
    RedisInfrastructureModule,
    CoreObservabilityModule,
    CoreHealthModule,
    CoreSecurityModule,
    IdempotencyModule,
    LandingModule,
  ],
  controllers: [TestTenantController],
  providers: [ResponseInterceptor],
  exports: [ResponseInterceptor],
})
export class AppModule {}
