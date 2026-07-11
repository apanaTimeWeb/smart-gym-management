import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { AffiliatesModule } from './affiliates/affiliates.module';
import { AuditLogsModule } from './audit-logs/audit-logs.module';
import { BackupsModule } from './backups/backups.module';
import { BroadcastsModule } from './broadcasts/broadcasts.module';
import { CouponsModule } from './coupons/coupons.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { FeaturesModule } from './features/features.module';
import { GymsModule } from './gyms/gyms.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { InvoicesModule } from './invoices/invoices.module';
import { JobsModule } from './jobs/jobs.module';
import { MigrationsModule } from './migrations/migrations.module';
import { PlansModule } from './plans/plans.module';
import { SettingsModule } from './settings/settings.module';
import { SystemModule } from './system/system.module';
import { TenantsModule } from './tenants/tenants.module';
import { TicketsModule } from './tickets/tickets.module';

@Module({
  imports: [
    AffiliatesModule,
    AuditLogsModule,
    BackupsModule,
    BroadcastsModule,
    CouponsModule,
    DashboardModule,
    FeaturesModule,
    GymsModule,
    InfrastructureModule,
    InvoicesModule,
    JobsModule,
    MigrationsModule,
    PlansModule,
    SettingsModule,
    SystemModule,
    TenantsModule,
    TicketsModule,
    RouterModule.register([
      {
        path: 'superadmin',
        children: [
          AffiliatesModule,
          AuditLogsModule,
          BackupsModule,
          BroadcastsModule,
          CouponsModule,
          DashboardModule,
          FeaturesModule,
          GymsModule,
          InfrastructureModule,
          InvoicesModule,
          JobsModule,
          MigrationsModule,
          PlansModule,
          SettingsModule,
          SystemModule,
          TenantsModule,
          TicketsModule,
        ],
      },
    ]),
  ],
})
export class SuperadminModule {}
