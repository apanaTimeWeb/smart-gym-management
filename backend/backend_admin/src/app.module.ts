// RESPONSIBILITY: Composes framework infrastructure, master persistence, authentication, and isolated Admin feature modules.
// FLOW: Config → master DataSource → Core infrastructure → Admin feature modules → controllers.

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerModule } from 'nestjs-pino';
import Joi from 'joi';
import { CoreDatabaseConfig } from '@/core/config/core-database.config';
import { CoreRuntimeConfig } from '@/core/config/core-runtime.config';
import { CoreAppConfig } from '@/core/config/core-app.config';
import { CoreMasterAdminEntity } from '@/core/auth/core-master-admin.entity';
import { CoreMasterTenantEntity } from '@/core/tenant/core-master-tenant.entity';
import { CoreMasterTenantMembershipEntity } from '@/core/tenant/core-master-tenant-membership.entity';
import { CoreMasterSubscriptionEntity } from '@/core/subscription/core-master-subscription.entity';
import { CoreMasterPlanEntity } from '@/core/subscription/core-master-plan.entity';
import { CoreMasterInvoiceEntity } from '@/core/subscription/core-master-invoice.entity';
import { CoreMasterPaymentMethodEntity } from '@/core/subscription/core-master-payment-method.entity';
import { CoreMasterUpgradeRequestEntity } from '@/core/subscription/core-master-upgrade-request.entity';
import { CoreRequestContextService } from '@/core/context/core-request-context.service';
import { CoreTenantContextInterceptor } from '@/core/context/core-tenant-context.interceptor';
import { CoreMasterTenantLookupService } from '@/core/tenant/core-master-tenant-lookup.service';
import { CoreTenantDataSourceManager } from '@/core/database/core-tenant-data-source.manager';
import { CoreRedisService } from '@/core/redis/core-redis.service';
import { CoreIdempotencyService } from '@/core/idempotency/core-idempotency.service';
import { CoreAuditTrailService } from '@/core/audit/core-audit-trail.service';
import { CoreEventBusService } from '@/core/events/core-event-bus.service';
import { CoreEncryptionService } from '@/core/security/core-encryption.service';
import { CoreObjectStorageService } from '@/core/storage/core-object-storage.service';
import { CoreResponseInterceptor } from '@/core/response/core-response.interceptor';
import { CoreValidationExceptionFilter } from '@/core/response/core-validation-exception.filter';
import { CoreAuthService } from '@/core/auth/core-auth.service';
import { CoreMasterAdminRepository } from '@/core/auth/core-master-admin-repository';
import { CoreAuthController } from '@/core/auth/core-auth.controller';
import { CoreHealthController } from '@/core/health/core-health.controller';
import { CoreMetricsController } from '@/core/metrics/core-metrics.controller';
import { CoreRateLimitGuard } from '@/core/auth/core-rate-limit.guard';
import { CoreRolesGuard } from '@/core/auth/core-roles.guard';

import { AdminAnnouncementsModule } from '@/modules/admin/announcements/admin-announcements.module';
import { AdminAttendanceModule } from '@/modules/admin/attendance/admin-attendance.module';
import { AdminAuditLogsModule } from '@/modules/admin/audit_logs/admin-audit_logs.module';
import { AdminBlacklistModule } from '@/modules/admin/blacklist/admin-blacklist.module';
import { AdminBranchesModule } from '@/modules/admin/branches/admin-branches.module';
import { AdminCampaignsModule } from '@/modules/admin/campaigns/admin-campaigns.module';
import { AdminCouponsModule } from '@/modules/admin/coupons/admin-coupons.module';
import { AdminDashboardModule } from '@/modules/admin/dashboard/admin-dashboard.module';
import { AdminDataExportModule } from '@/modules/admin/data-export/admin-data_export.module';
import { AdminFinanceModule } from '@/modules/admin/finance/admin-finance.module';
import { AdminGymHealthAlertsModule } from '@/modules/admin/gym-health-alerts/admin-gym_health_alerts.module';
import { AdminHrModule } from '@/modules/admin/hr/admin-hr.module';
import { AdminMembersModule } from '@/modules/admin/members/admin-members.module';
import { AdminNotificationsModule } from '@/modules/admin/notifications/admin-notifications.module';
import { AdminPayoutsModule } from '@/modules/admin/payouts/admin-payouts.module';
import { AdminPermissionsModule } from '@/modules/admin/permissions/admin-permissions.module';
import { AdminPlansModule } from '@/modules/admin/plans/admin-plans.module';
import { AdminProfileModule } from '@/modules/admin/profile/admin-profile.module';
import { AdminReportsModule } from '@/modules/admin/reports/admin-reports.module';
import { AdminSalesModule } from '@/modules/admin/sales/admin-sales.module';
import { AdminSettingsModule } from '@/modules/admin/settings/admin-settings.module';
import { AdminSubscriptionsModule } from '@/modules/admin/subscriptions/admin-subscriptions.module';
import { AdminUsageModule } from '@/modules/admin/usage/admin-usage.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [CoreDatabaseConfig, CoreRuntimeConfig, CoreAppConfig],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'test', 'staging', 'production').default('development'),
        PORT: Joi.number().port().default(3000),
        MASTER_DB_HOST: Joi.string().required(),
        MASTER_DB_PORT: Joi.number().port().default(5432),
        MASTER_DB_NAME: Joi.string().required(),
        MASTER_DB_USER: Joi.string().required(),
        MASTER_DB_PASSWORD: Joi.string().allow('').required(),
        TENANT_DB_HOST: Joi.string().required(),
        TENANT_DB_PORT: Joi.number().port().default(5432),
        TENANT_DB_USER: Joi.string().required(),
        TENANT_DB_PASSWORD: Joi.string().allow('').required(),
        REDIS_URL: Joi.string().uri().required(),
        JWT_ACCESS_SECRET: Joi.string().min(32).required(),
        JWT_REFRESH_SECRET: Joi.string().min(32).required(),
        DATA_ENCRYPTION_KEY: Joi.string().min(16).required(),
        CORS_ALLOWED_ORIGINS: Joi.string().required(),
        TENANT_DB_POOL_MAX: Joi.number().integer().min(1).max(20).default(5),
      }),
    }),
    LoggerModule.forRoot({ pinoHttp: { autoLogging: true, redact: ['req.headers.authorization', 'req.headers.cookie'] } }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres' as const,
        host: config.getOrThrow<string>('MASTER_DB_HOST'),
        port: config.get<number>('MASTER_DB_PORT', 5432),
        username: config.getOrThrow<string>('MASTER_DB_USER'),
        password: config.getOrThrow<string>('MASTER_DB_PASSWORD'),
        database: config.getOrThrow<string>('MASTER_DB_NAME'),
        entities: [
          CoreMasterAdminEntity,
          CoreMasterTenantEntity,
          CoreMasterTenantMembershipEntity,
          CoreMasterSubscriptionEntity,
          CoreMasterPlanEntity,
          CoreMasterInvoiceEntity,
          CoreMasterPaymentMethodEntity,
          CoreMasterUpgradeRequestEntity,
        ],
        synchronize: false,
        extra: {
          max: 20,
          connectionTimeoutMillis: 30000,
          idleTimeoutMillis: 10000,
          statement_timeout: 3000,
        },
      }),
    }),
    AdminAnnouncementsModule,
    AdminAttendanceModule,
    AdminAuditLogsModule,
    AdminBlacklistModule,
    AdminBranchesModule,
    AdminCampaignsModule,
    AdminCouponsModule,
    AdminDashboardModule,
    AdminDataExportModule,
    AdminFinanceModule,
    AdminGymHealthAlertsModule,
    AdminHrModule,
    AdminMembersModule,
    AdminNotificationsModule,
    AdminPayoutsModule,
    AdminPermissionsModule,
    AdminPlansModule,
    AdminProfileModule,
    AdminReportsModule,
    AdminSalesModule,
    AdminSettingsModule,
    AdminSubscriptionsModule,
    AdminUsageModule,
  ],
  controllers: [CoreAuthController, CoreHealthController, CoreMetricsController],
  providers: [
    CoreRequestContextService,
    CoreMasterTenantLookupService,
    CoreTenantDataSourceManager,
    CoreRedisService,
    CoreIdempotencyService,
    CoreAuditTrailService,
    CoreEventBusService,
    CoreEncryptionService,
    CoreObjectStorageService,
    CoreAuthService,
    CoreMasterAdminRepository,
    CoreRolesGuard,
    { provide: APP_GUARD, useClass: CoreRateLimitGuard },
    { provide: APP_INTERCEPTOR, useClass: CoreTenantContextInterceptor },
    { provide: APP_INTERCEPTOR, useClass: CoreResponseInterceptor },
    { provide: APP_FILTER, useClass: CoreValidationExceptionFilter },
    { provide: 'CONFIG_PORT', useFactory: (config: ConfigService) => config.get<number>('PORT', 3000), inject: [ConfigService] },
    { provide: 'CONFIG_CORS_ALLOWED_ORIGINS', useFactory: (config: ConfigService) => config.get<string>('CORS_ALLOWED_ORIGINS', '').split(',').map((v: string) => v.trim()).filter(Boolean), inject: [ConfigService] },
  ],
})
export class AppModule {}
