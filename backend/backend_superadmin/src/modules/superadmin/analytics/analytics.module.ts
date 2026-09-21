// RESPONSIBILITY: Registers the analytics feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsSnapshotEntity } from '@/modules/superadmin/analytics/analytics.entity';
import { AnalyticsRepository } from '@/modules/superadmin/analytics/analytics.repository';
import { AnalyticsQueryController } from '@/modules/superadmin/analytics/analytics-query.controller';
import { AnalyticsCommandController } from '@/modules/superadmin/analytics/analytics-command.controller';
import { AnalyticsListService } from '@/modules/superadmin/analytics/services/analytics-list.service';
import { AnalyticsFindService } from '@/modules/superadmin/analytics/services/analytics-find.service';
import { AnalyticsCreateService } from '@/modules/superadmin/analytics/services/analytics-create.service';
import { AnalyticsUpdateService } from '@/modules/superadmin/analytics/services/analytics-update.service';
import { AnalyticsDeleteService } from '@/modules/superadmin/analytics/services/analytics-delete.service';
import { AnalyticsMainService } from '@/modules/superadmin/analytics/services/analytics-main.service';
import { AnalyticsRetentionInsightsService } from '@/modules/superadmin/analytics/services/analytics-retention-insights.service';
import { AnalyticsSpecialController } from '@/modules/superadmin/analytics/analytics-special.controller';
@Module({
  imports: [TypeOrmModule.forFeature([AnalyticsSnapshotEntity])],
  controllers: [AnalyticsQueryController, AnalyticsCommandController, AnalyticsSpecialController],
  providers: [AnalyticsMainService, AnalyticsRetentionInsightsService, AnalyticsRepository, AnalyticsListService, AnalyticsFindService, AnalyticsCreateService, AnalyticsUpdateService, AnalyticsDeleteService],
  exports: [AnalyticsRepository],
})
export class AnalyticsModule {}
