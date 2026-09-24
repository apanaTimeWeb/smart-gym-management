// RESPONSIBILITY: Composes core infrastructure and the supplied Auth feature without sibling business-module coupling.
// FLOW: Bootstrap -> CoreAppModule -> core infrastructure/Auth -> controllers/services/repositories.

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { CoreAuditModule } from '@/backend_auth/auth_core/audit/core-audit.module';
import { CoreRedisModule } from '@/backend_auth/auth_core/cache/core-redis.module';
import { CoreEnvironmentConfig } from '@/backend_auth/auth_core/config/core-environment.config';
import { CoreRequestContextMiddleware } from '@/backend_auth/auth_core/context/core-request-context.middleware';
import { CoreRequestContextModule } from '@/backend_auth/auth_core/context/core-request-context.module';
import { CoreDatabaseModule } from '@/backend_auth/auth_core/database/core-database.module';
import { CoreHealthModule } from '@/backend_auth/auth_core/health/core-health.module';
import { CoreResponseInterceptor } from '@/backend_auth/auth_core/http/core-response.interceptor';
import { CoreTimeoutInterceptor } from '@/backend_auth/auth_core/http/core-timeout.interceptor';
import { CoreValidationExceptionFilter } from '@/backend_auth/auth_core/http/core-validation-exception.filter';
import { CoreLoggerModule } from '@/backend_auth/auth_core/logging/core-logger.module';
import { CoreMetricsController } from '@/backend_auth/auth_core/metrics/core-metrics.controller';
import { CoreMetricsInterceptor } from '@/backend_auth/auth_core/metrics/core-metrics.interceptor';
import { CoreMetricsService } from '@/backend_auth/auth_core/metrics/core-metrics.service';
import { CoreRateLimitGuard } from '@/backend_auth/auth_core/auth_rate_limit/core-rate-limit.guard';
import { CoreRateLimitService } from '@/backend_auth/auth_core/auth_rate_limit/core-rate-limit.service';
import { CoreJwtAuthGuard } from '@/backend_auth/auth_core/auth_security/core-jwt-auth.guard';
import { CoreRolesGuard } from '@/backend_auth/auth_core/auth_security/core-roles.guard';
import { AuthModule } from '@/backend_auth/auth_modules/auth/auth.module';

import type { MiddlewareConsumer, NestModule } from '@nestjs/common';
@Module({
  imports: [

    CoreLoggerModule,
    CoreRequestContextModule,

    CoreRedisModule,
    CoreAuditModule,
    CoreHealthModule,
    AuthModule,
  ],
  controllers: [CoreMetricsController],
  providers: [
    CoreRateLimitService,
    CoreMetricsService,

  ],
})
export class CoreAppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void { consumer.apply(CoreRequestContextMiddleware).forRoutes('*'); }
}
