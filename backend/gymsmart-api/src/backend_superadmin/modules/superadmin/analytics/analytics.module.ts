// RESPONSIBILITY: Registers the analytics feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsSnapshotEntity } from '@/backend_superadmin/modules/superadmin/analytics/analytics.entity';
import { AnalyticsRepository } from '@/backend_superadmin/modules/superadmin/analytics/analytics.repository';
import { AnalyticsQueryController } from '@/backend_superadmin/modules/superadmin/analytics/analytics-query.controller';
import { AnalyticsCommandController } from '@/backend_superadmin/modules/superadmin/analytics/analytics-command.controller';
import { AnalyticsListService } from '@/backend_superadmin/modules/superadmin/analytics/services/analytics-list.service';
import { AnalyticsFindService } from '@/backend_superadmin/modules/superadmin/analytics/services/analytics-find.service';
import { AnalyticsCreateService } from '@/backend_superadmin/modules/superadmin/analytics/services/analytics-create.service';
import { AnalyticsUpdateService } from '@/backend_superadmin/modules/superadmin/analytics/services/analytics-update.service';
import { AnalyticsDeleteService } from '@/backend_superadmin/modules/superadmin/analytics/services/analytics-delete.service';
import { AnalyticsMainService } from '@/backend_superadmin/modules/superadmin/analytics/services/analytics-main.service';
import { AnalyticsRetentionInsightsService } from '@/backend_superadmin/modules/superadmin/analytics/services/analytics-retention-insights.service';
import { AnalyticsSpecialController } from '@/backend_superadmin/modules/superadmin/analytics/analytics-special.controller';
@Module({
  imports: [TypeOrmModule.forFeature([AnalyticsSnapshotEntity])],
  controllers: [AnalyticsQueryController, AnalyticsCommandController, AnalyticsSpecialController],
  providers: [AnalyticsMainService, AnalyticsRetentionInsightsService, AnalyticsRepository, AnalyticsListService, AnalyticsFindService, AnalyticsCreateService, AnalyticsUpdateService, AnalyticsDeleteService],
  exports: [AnalyticsRepository],
})
export class AnalyticsModule {}
