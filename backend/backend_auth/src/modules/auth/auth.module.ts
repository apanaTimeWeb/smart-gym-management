// RESPONSIBILITY: Composes only the isolated Auth feature and its core infrastructure dependencies.
// FLOW: AuthModule -> controllers -> orchestrator/services -> repositories -> PostgreSQL/Redis/audit.

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CoreAuditModule } from '@/core/audit/core-audit.module';
import { CoreDatabaseModule } from '@/core/database/core-database.module';
import { AuthCommandController } from '@/modules/auth/auth-command.controller';
import { AuthQueryController } from '@/modules/auth/auth-query.controller';
import { AuthSeeder } from '@/modules/auth/auth.seeder';
import { AuthRefreshSessionEntity } from '@/modules/auth/entities/auth-refresh-session.entity';
import { AuthUserEntity } from '@/modules/auth/entities/auth-user.entity';
import { AuthSessionOrchestrator } from '@/modules/auth/orchestrators/auth-session.orchestrator';
import { AuthRefreshSessionRepository } from '@/modules/auth/repositories/auth-refresh-session.repository';
import { AuthUserRepository } from '@/modules/auth/repositories/auth-user.repository';
import { AuthLoginService } from '@/modules/auth/services/auth-login.service';
import { AuthLogoutService } from '@/modules/auth/services/auth-logout.service';
import { AuthMeService } from '@/modules/auth/services/auth-me.service';
import { AuthRefreshRevocationService } from '@/modules/auth/services/auth-refresh-revocation.service';
import { AuthRefreshService } from '@/modules/auth/services/auth-refresh.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([AuthUserEntity, AuthRefreshSessionEntity]),
    CoreDatabaseModule,
    CoreAuditModule,
  ],
  controllers: [AuthCommandController, AuthQueryController],
  providers: [
    AuthSessionOrchestrator,
    AuthLoginService,
    AuthRefreshService,
    AuthRefreshRevocationService,
    AuthMeService,
    AuthLogoutService,
    AuthUserRepository,
    AuthRefreshSessionRepository,
    AuthSeeder,
  ],
  exports: [AuthSeeder],
})
export class AuthModule {}
