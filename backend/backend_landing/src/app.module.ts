// RESPONSIBILITY: Composes global infrastructure and the supplied Landing business feature only.
// FLOW: Bootstrap → Config → Logger → Master DB → Redis → Tenant Context → LandingModule.
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { trace } from '@opentelemetry/api';
import { buildValidatedConfig } from '@/core/config/app.config';
import { buildMasterDataSourceOptions } from '@/core/database/master-data-source-options';
import { RedisInfrastructureModule } from '@/core/redis/redis-infrastructure.module';
import { CoreDatabaseModule } from '@/core/database/core-database.module';
import { CoreContextModule } from '@/core/context/core-context.module';
import { CoreObservabilityModule } from '@/core/observability/core-observability.module';
import { CoreHealthModule } from '@/core/health/core-health.module';
import { CoreSecurityModule } from '@/core/security/core-security.module';
import { IdempotencyModule } from '@/core/idempotency/idempotency.module';
import { ResponseInterceptor } from '@/core/http/response.interceptor';
import { LandingModule } from '@/modules/landing/landing.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true, load: [buildValidatedConfig] }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.LOG_LEVEL ?? 'info',
        redact: ['req.headers.authorization', 'req.headers.cookie', 'req.headers["x-api-key"]'],
        customProps: () => {
          const spanContext = trace.getActiveSpan()?.spanContext();
          return {
            context: 'HTTP',
            traceId: spanContext?.traceId ?? 'UNAVAILABLE',
            spanId: spanContext?.spanId ?? 'UNAVAILABLE',
          };
        },
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (_config: ConfigService) => buildMasterDataSourceOptions(),
    }),
    CoreContextModule,
    CoreDatabaseModule,
    RedisInfrastructureModule,
    CoreObservabilityModule,
    CoreHealthModule,
    CoreSecurityModule,
    IdempotencyModule,
    LandingModule,
  ],
  providers: [ResponseInterceptor],
  exports: [ResponseInterceptor],
})
export class AppModule {}
