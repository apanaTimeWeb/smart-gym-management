// RESPONSIBILITY: Composes only the isolated Auth feature and its core infrastructure dependencies.
// FLOW: AuthModule -> controllers -> orchestrator/services -> repositories -> PostgreSQL/Redis/audit.

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CoreAuditModule } from '@/backend_auth/core/audit/core-audit.module';
import { CoreDatabaseModule } from '@/backend_auth/core/database/core-database.module';
import { AuthCommandController } from '@/backend_auth/modules/auth/controllers/auth-command.controller';
import { AuthQueryController } from '@/backend_auth/modules/auth/controllers/auth-query.controller';
import { AuthSeeder } from '@/backend_auth/modules/auth/auth.seeder';
import { AuthRefreshSessionEntity } from '@/backend_auth/modules/auth/entities/auth-refresh-session.entity';
import { AuthUserEntity } from '@/backend_auth/modules/auth/entities/auth-user.entity';
import { AuthSessionOrchestrator } from '@/backend_auth/modules/auth/orchestrators/auth-session.orchestrator';
import { AuthRefreshSessionRepository } from '@/backend_auth/modules/auth/repositories/auth-refresh-session.repository';
import { AuthUserRepository } from '@/backend_auth/modules/auth/repositories/auth-user.repository';
import { AuthLoginService } from '@/backend_auth/modules/auth/services/auth-login.service';
import { AuthLogoutService } from '@/backend_auth/modules/auth/services/auth-logout.service';
import { AuthMeService } from '@/backend_auth/modules/auth/services/auth-me.service';
import { AuthRefreshRevocationService } from '@/backend_auth/modules/auth/services/auth-refresh-revocation.service';
import { AuthRefreshService } from '@/backend_auth/modules/auth/services/auth-refresh.service';
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
