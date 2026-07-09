import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrismaModule } from './database/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { MembersModule } from './modules/members/members.module';
import { PlansModule } from './modules/plans/plans.module';
import { FinanceModule } from './modules/finance/finance.module';
import { HrModule } from './modules/hr/hr.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { StoreModule } from './modules/store/store.module';
import { WorkoutModule } from './modules/workout/workout.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { InquiriesModule } from './modules/inquiries/inquiries.module';
import { SettingsModule } from './modules/settings/settings.module';

@Module({
  imports: [
    // ─── Config (loads .env) ──────────────────────────────────────────────
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // ─── Database ─────────────────────────────────────────────────────────
    PrismaModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),

    // ─── Feature Modules ──────────────────────────────────────────────────
    AuthModule,
    MembersModule,
    PlansModule,
    FinanceModule,
    HrModule,
    AttendanceModule,
    StoreModule,
    WorkoutModule,
    DashboardModule,
    InquiriesModule,
    SettingsModule,
  ],
})
export class AppModule {}
