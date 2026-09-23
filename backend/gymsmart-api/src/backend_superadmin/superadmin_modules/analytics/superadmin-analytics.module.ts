// RESPONSIBILITY: Registers the analytics feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { SuperadminAnalyticsInsightsQueryController } from '@/backend_superadmin/superadmin_modules/analytics/superadmin-analytics-insights-query.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminAnalyticsEntity } from '@/backend_superadmin/superadmin_modules/analytics/superadmin-analytics.entity';
import { SuperadminAnalyticsRepository } from '@/backend_superadmin/superadmin_modules/analytics/superadmin-analytics.repository';
import { SuperadminAnalyticsQueryController } from '@/backend_superadmin/superadmin_modules/analytics/superadmin-analytics-query.controller';
import { SuperadminAnalyticsCommandController } from '@/backend_superadmin/superadmin_modules/analytics/superadmin-analytics-command.controller';
import { SuperadminAnalyticsListService } from '@/backend_superadmin/superadmin_modules/analytics/services/superadmin-analytics-list.service';
import { SuperadminAnalyticsFindService } from '@/backend_superadmin/superadmin_modules/analytics/services/superadmin-analytics-find.service';
import { SuperadminAnalyticsCreateService } from '@/backend_superadmin/superadmin_modules/analytics/services/superadmin-analytics-create.service';
import { SuperadminAnalyticsUpdateService } from '@/backend_superadmin/superadmin_modules/analytics/services/superadmin-analytics-update.service';
import { SuperadminAnalyticsDeleteService } from '@/backend_superadmin/superadmin_modules/analytics/services/superadmin-analytics-delete.service';
import { SuperadminAnalyticsMainService } from '@/backend_superadmin/superadmin_modules/analytics/services/superadmin-analytics-main.service';
import { SuperadminAnalyticsRetentionInsightsService } from '@/backend_superadmin/superadmin_modules/analytics/services/superadmin-analytics-retention-insights.service';
@Module({
  imports: [TypeOrmModule.forFeature([SuperadminAnalyticsEntity])],
  controllers: [SuperadminAnalyticsQueryController, SuperadminAnalyticsCommandController, SuperadminAnalyticsInsightsQueryController],
  providers: [SuperadminAnalyticsMainService, SuperadminAnalyticsRetentionInsightsService, SuperadminAnalyticsRepository, SuperadminAnalyticsListService, SuperadminAnalyticsFindService, SuperadminAnalyticsCreateService, SuperadminAnalyticsUpdateService, SuperadminAnalyticsDeleteService],
  exports: [SuperadminAnalyticsRepository],
})
export class SuperadminAnalyticsModule {}