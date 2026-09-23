import { Global, Module } from '@nestjs/common';
import { CoreContextModule } from '@/backend_landing/core/context/core-context.module';
import { CoreDatabaseModule } from '@/backend_landing/core/database/core-database.module';
import { RedisInfrastructureModule } from '@/backend_landing/core/redis/redis-infrastructure.module';
import { CoreObservabilityModule } from '@/backend_landing/core/observability/core-observability.module';
import { CoreHealthModule } from '@/backend_landing/core/health/core-health.module';
import { CoreSecurityModule } from '@/backend_landing/core/security/core-security.module';
import { IdempotencyModule } from '@/backend_landing/core/idempotency/idempotency.module';

@Global()
@Module({
  imports: [
    CoreContextModule,
    CoreDatabaseModule,
    RedisInfrastructureModule,
    CoreObservabilityModule,
    CoreHealthModule,
    CoreSecurityModule,
    IdempotencyModule,
  ],
  exports: [
    CoreContextModule,
    CoreDatabaseModule,
    RedisInfrastructureModule,
    CoreObservabilityModule,
    CoreHealthModule,
    CoreSecurityModule,
    IdempotencyModule,
  ]
})
export class LandingCoreModule {}
