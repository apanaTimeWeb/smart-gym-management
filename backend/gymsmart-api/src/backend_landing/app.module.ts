// RESPONSIBILITY: Composes global infrastructure and the supplied Landing business feature only.
// FLOW: Bootstrap -> Config -> Logger -> Master DB -> Redis -> Tenant Context -> LandingModule.
import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { trace } from '@opentelemetry/api';

import { buildValidatedConfig } from '@/backend_landing/landing_core/config/app.config';
import { buildMasterDataSourceOptions } from '@/backend_landing/landing_core/database/master-data-source-options';
import { RedisInfrastructureModule } from '@/backend_landing/landing_core/landing_redis/redis-infrastructure.module';
import { CoreDatabaseModule } from '@/backend_landing/landing_core/database/core-database.module';
import { CoreContextModule } from '@/backend_landing/landing_core/context/core-context.module';
import { CoreObservabilityModule } from '@/backend_landing/landing_core/landing_observability/core-observability.module';
import { CoreHealthModule } from '@/backend_landing/landing_core/health/core-health.module';
import { CoreSecurityModule } from '@/backend_landing/landing_core/landing_security/core-security.module';
import { IdempotencyModule } from '@/backend_landing/landing_core/landing_idempotency/idempotency.module';
import { ResponseInterceptor } from '@/backend_landing/landing_core/http/response.interceptor';
import { TestTenantController } from '@/backend_landing/landing_core/landing_tenant/test-tenant.controller';
import { LandingModule } from '@/backend_landing/landing_modules/landing/landing.module';

import { RequestContextMiddleware } from '@/backend_landing/landing_core/context/request-context.middleware';
import { TenantResolutionMiddleware } from '@/backend_landing/landing_core/landing_tenant/tenant-resolution.middleware';
import { MetricsMiddleware } from '@/backend_landing/landing_core/landing_observability/metrics.middleware';

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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestContextMiddleware, TenantResolutionMiddleware, MetricsMiddleware)
      .forRoutes('*');
  }
}
