// RESPONSIBILITY: Root application composition for shared infrastructure and the Manager domain container.
// FLOW: Config/master DB/Redis -> global infrastructure -> ManagerDomainModule.
import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';

import { CoreEnvSchema } from '@/core/config/core-env.schema';
import { CoreConfigService } from '@/core/config/core-config.service';
import { CoreLoggerConfig } from '@/core/observability/core-logger.config';
import { CoreHealthController } from '@/core/health/core-health.controller';
import { CoreMetricsController } from '@/core/observability/core-metrics.controller';
import { CoreMetricsInterceptor } from '@/core/observability/core-metrics.interceptor';
import { CoreMetricsService } from '@/core/observability/core-metrics.service';
import { CoreRequestContextMiddleware } from '@/core/context/core-request-context.middleware';
import { CoreRequestContextService } from '@/core/context/core-request-context.service';
import { MasterTenantEntity } from '@/core/tenant/master-tenant.entity';
import { MasterUserEntity } from '@/core/tenant/master-user.entity';
import { MasterUserTenantEntity } from '@/core/tenant/master-user-tenant.entity';
import { CoreTenantAuthorizationService } from '@/core/tenant/core-tenant-authorization.service';
import { CoreTenantDatasourceService } from '@/core/database/core-tenant-datasource.service';
import { CoreUnitOfWorkService } from '@/core/database/core-unit-of-work.service';
import { CoreAuditLogRepository } from '@/core/audit/core-audit-log.repository';
import { CoreEventService } from '@/core/events/core-event.service';
import { CoreIdempotencyInterceptor } from '@/core/idempotency/core-idempotency.interceptor';
import { CoreIdempotencyService } from '@/core/idempotency/core-idempotency.service';
import { CoreExceptionFilter } from '@/core/http/core-exception.filter';
import { CoreValidationExceptionFilter } from '@/core/http/core-validation.exception.filter';
import { CoreResponseInterceptor } from '@/core/http/core-response.interceptor';
import { CoreJwtGuard } from '@/core/auth/core-jwt.guard';
import { CoreTenantGuard } from '@/core/tenant/core-tenant.guard';
import { CoreRolesGuard } from '@/core/auth/core-roles.guard';
import { CoreRateLimitGuard } from '@/core/security/core-rate-limit.guard';
import { CoreEncryptionService } from '@/core/security/core-encryption.service';
import { CoreRedisService } from '@/core/database/core-redis.service';
import { ManagerDomainModule } from '@/modules/manager/manager-domain.module';

@Global()
@Module({
  imports:[ConfigModule.forRoot({isGlobal:true,validate:(env)=>CoreEnvSchema.parse(env)}),TypeOrmModule.forRootAsync({inject:[CoreConfigService],useFactory:(config:CoreConfigService)=>({type:'postgres',url:config.masterDatabaseUrl,entities:[MasterTenantEntity,MasterUserEntity,MasterUserTenantEntity],synchronize:false})}),LoggerModule.forRoot(CoreLoggerConfig),ManagerDomainModule],
  controllers:[CoreHealthController,CoreMetricsController],
  providers:[CoreConfigService,CoreRequestContextService,CoreTenantAuthorizationService,CoreTenantDatasourceService,CoreUnitOfWorkService,CoreAuditLogRepository,CoreEventService,CoreIdempotencyService,CoreRedisService,CoreMetricsService,CoreEncryptionService,{provide:APP_FILTER,useClass:CoreValidationExceptionFilter},{provide:APP_FILTER,useClass:CoreExceptionFilter},{provide:APP_INTERCEPTOR,useClass:CoreResponseInterceptor},{provide:APP_INTERCEPTOR,useClass:CoreIdempotencyInterceptor},{provide:APP_INTERCEPTOR,useClass:CoreMetricsInterceptor},{provide:APP_GUARD,useClass:CoreJwtGuard},{provide:APP_GUARD,useClass:CoreTenantGuard},{provide:APP_GUARD,useClass:CoreRolesGuard},{provide:APP_GUARD,useClass:CoreRateLimitGuard}],
  exports:[CoreConfigService,CoreRequestContextService,CoreTenantAuthorizationService,CoreTenantDatasourceService,CoreUnitOfWorkService,CoreAuditLogRepository,CoreEventService,CoreIdempotencyService,CoreRedisService,CoreMetricsService,CoreEncryptionService],
})
export class CoreAppModule implements NestModule {
  /** @description Installs request-context middleware at the application boundary. @param consumer - Nest middleware consumer. @returns Nothing. */
  configure(consumer:MiddlewareConsumer):void{consumer.apply(CoreRequestContextMiddleware).forRoutes('*');}
}
