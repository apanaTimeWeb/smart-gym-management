// RESPONSIBILITY: Composes framework infrastructure, master persistence, authentication, and isolated Admin feature modules.
// FLOW: Config â†’ master DataSource â†’ Core infrastructure â†’ Admin feature modules â†’ controllers.

import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerModule } from 'nestjs-pino';
import Joi from 'joi';
import { CoreDatabaseConfig } from '@/backend_admin/core/config/core-database.config';
import { CoreRuntimeConfig } from '@/backend_admin/core/config/core-runtime.config';
import { CoreAppConfig } from '@/backend_admin/core/config/core-app.config';
import { CoreMasterAdminEntity } from '@/backend_admin/core/auth/core-master-admin.entity';
import { CoreMasterTenantEntity } from '@/backend_admin/core/tenant/core-master-tenant.entity';
import { CoreMasterTenantMembershipEntity } from '@/backend_admin/core/tenant/core-master-tenant-membership.entity';
import { CoreMasterSubscriptionEntity } from '@/backend_admin/core/subscription/core-master-subscription.entity';
import { CoreMasterPlanEntity } from '@/backend_admin/core/subscription/core-master-plan.entity';
import { CoreMasterInvoiceEntity } from '@/backend_admin/core/subscription/core-master-invoice.entity';
import { CoreMasterPaymentMethodEntity } from '@/backend_admin/core/subscription/core-master-payment-method.entity';
import { CoreMasterUpgradeRequestEntity } from '@/backend_admin/core/subscription/core-master-upgrade-request.entity';
import { CoreRequestContextService } from '@/backend_admin/core/context/core-request-context.service';
import { CoreTenantContextInterceptor } from '@/backend_admin/core/context/core-tenant-context.interceptor';
import { CoreMasterTenantLookupService } from '@/backend_admin/core/tenant/core-master-tenant-lookup.service';
import { CoreTenantDataSourceManager } from '@/backend_admin/core/database/core-tenant-data-source.manager';
import { CoreRedisService } from '@/backend_admin/core/redis/core-redis.service';
import { CoreIdempotencyService } from '@/backend_admin/core/idempotency/core-idempotency.service';
import { CoreAuditTrailService } from '@/backend_admin/core/audit/core-audit-trail.service';
import { CoreEventBusService } from '@/backend_admin/core/events/core-event-bus.service';
import { CoreEncryptionService } from '@/backend_admin/core/security/core-encryption.service';
import { CoreObjectStorageService } from '@/backend_admin/core/storage/core-object-storage.service';
import { CoreResponseInterceptor } from '@/backend_admin/core/response/core-response.interceptor';
import { CoreValidationExceptionFilter } from '@/backend_admin/core/response/core-validation-exception.filter';
import { CoreAuthService } from '@/backend_admin/core/auth/core-auth.service';
import { CoreMasterAdminRepository } from '@/backend_admin/core/auth/core-master-admin-repository';
import { CoreAuthController } from '@/backend_admin/core/auth/core-auth.controller';
import { CoreHealthController } from '@/backend_admin/core/health/core-health.controller';
import { CoreMetricsController } from '@/backend_admin/core/metrics/core-metrics.controller';
import { CoreRateLimitGuard } from '@/backend_admin/core/auth/core-rate-limit.guard';
import { CoreRolesGuard } from '@/backend_admin/core/auth/core-roles.guard';

import { AdminAnnouncementsModule } from '@/backend_admin/modules/admin/announcements/admin-announcements.module';
import { AdminAttendanceModule } from '@/backend_admin/modules/admin/attendance/admin-attendance.module';
import { AdminAuditLogsModule } from '@/backend_admin/modules/admin/audit_logs/admin-audit_logs.module';
import { AdminBlacklistModule } from '@/backend_admin/modules/admin/blacklist/admin-blacklist.module';
import { AdminBranchesModule } from '@/backend_admin/modules/admin/branches/admin-branches.module';
import { AdminCampaignsModule } from '@/backend_admin/modules/admin/campaigns/admin-campaigns.module';
import { AdminCouponsModule } from '@/backend_admin/modules/admin/coupons/admin-coupons.module';
import { AdminDashboardModule } from '@/backend_admin/modules/admin/dashboard/admin-dashboard.module';
import { AdminDataExportModule } from '@/backend_admin/modules/admin/data-export/admin-data_export.module';
import { AdminFinanceModule } from '@/backend_admin/modules/admin/finance/admin-finance.module';
import { AdminGymHealthAlertsModule } from '@/backend_admin/modules/admin/gym-health-alerts/admin-gym_health_alerts.module';
import { AdminHrModule } from '@/backend_admin/modules/admin/hr/admin-hr.module';
import { AdminMembersModule } from '@/backend_admin/modules/admin/members/admin-members.module';
import { AdminNotificationsModule } from '@/backend_admin/modules/admin/notifications/admin-notifications.module';
import { AdminPayoutsModule } from '@/backend_admin/modules/admin/payouts/admin-payouts.module';
import { AdminPermissionsModule } from '@/backend_admin/modules/admin/permissions/admin-permissions.module';
import { AdminPlansModule } from '@/backend_admin/modules/admin/plans/admin-plans.module';
import { AdminProfileModule } from '@/backend_admin/modules/admin/profile/admin-profile.module';
import { AdminReportsModule } from '@/backend_admin/modules/admin/reports/admin-reports.module';
import { AdminSalesModule } from '@/backend_admin/modules/admin/sales/admin-sales.module';
import { AdminSettingsModule } from '@/backend_admin/modules/admin/settings/admin-settings.module';
import { AdminSubscriptionsModule } from '@/backend_admin/modules/admin/subscriptions/admin-subscriptions.module';
import { AdminUsageModule } from '@/backend_admin/modules/admin/usage/admin-usage.module';

@Global()
@Module({
  imports: [

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

    { provide: 'CONFIG_PORT', useFactory: (config: ConfigService) => config.get<number>('PORT', 3000), inject: [ConfigService] },
    { provide: 'CONFIG_CORS_ALLOWED_ORIGINS', useFactory: (config: ConfigService) => config.get<string>('CORS_ALLOWED_ORIGINS', '').split(',').map((v: string) => v.trim()).filter(Boolean), inject: [ConfigService] },
  ],
  exports: [
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
    'CONFIG_PORT',
    'CONFIG_CORS_ALLOWED_ORIGINS',
  ],
})
export class AppModule {}
