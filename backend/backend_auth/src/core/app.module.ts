// RESPONSIBILITY: Composes core infrastructure and the supplied Auth feature without sibling business-module coupling.
// FLOW: Bootstrap -> CoreAppModule -> core infrastructure/Auth -> controllers/services/repositories.

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { CoreAuditModule } from '@/core/audit/core-audit.module';
import { CoreRedisModule } from '@/core/cache/core-redis.module';
import { CoreEnvironmentConfig } from '@/core/config/core-environment.config';
import { CoreRequestContextMiddleware } from '@/core/context/core-request-context.middleware';
import { CoreRequestContextModule } from '@/core/context/core-request-context.module';
import { CoreDatabaseModule } from '@/core/database/core-database.module';
import { CoreHealthModule } from '@/core/health/core-health.module';
import { CoreResponseInterceptor } from '@/core/http/core-response.interceptor';
import { CoreTimeoutInterceptor } from '@/core/http/core-timeout.interceptor';
import { CoreValidationExceptionFilter } from '@/core/http/core-validation-exception.filter';
import { CoreLoggerModule } from '@/core/logging/core-logger.module';
import { CoreMetricsController } from '@/core/metrics/core-metrics.controller';
import { CoreMetricsInterceptor } from '@/core/metrics/core-metrics.interceptor';
import { CoreMetricsService } from '@/core/metrics/core-metrics.service';
import { CoreRateLimitGuard } from '@/core/rate-limit/core-rate-limit.guard';
import { CoreRateLimitService } from '@/core/rate-limit/core-rate-limit.service';
import { CoreJwtAuthGuard } from '@/core/security/core-jwt-auth.guard';
import { CoreRolesGuard } from '@/core/security/core-roles.guard';
import { AuthModule } from '@/modules/auth/auth.module';

import type { MiddlewareConsumer, NestModule } from '@nestjs/common';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true, load: [CoreEnvironmentConfig] }),
    CoreLoggerModule,
    CoreRequestContextModule,
    CoreDatabaseModule,
    CoreRedisModule,
    CoreAuditModule,
    CoreHealthModule,
    AuthModule,
  ],
  controllers: [CoreMetricsController],
  providers: [
    CoreRateLimitService,
    CoreMetricsService,
    { provide: APP_GUARD, useClass: CoreJwtAuthGuard },
    { provide: APP_GUARD, useClass: CoreRolesGuard },
    { provide: APP_GUARD, useClass: CoreRateLimitGuard },
    { provide: APP_INTERCEPTOR, useClass: CoreResponseInterceptor },
    { provide: APP_INTERCEPTOR, useClass: CoreTimeoutInterceptor },
    { provide: APP_INTERCEPTOR, useClass: CoreMetricsInterceptor },
    { provide: APP_FILTER, useClass: CoreValidationExceptionFilter },
  ],
})
export class CoreAppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void { consumer.apply(CoreRequestContextMiddleware).forRoutes('*'); }
}
