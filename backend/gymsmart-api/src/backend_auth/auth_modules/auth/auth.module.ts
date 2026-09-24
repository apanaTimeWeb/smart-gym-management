// RESPONSIBILITY: Composes only the isolated Auth feature and its core infrastructure dependencies.
// FLOW: AuthModule -> controllers -> orchestrator/services -> repositories -> PostgreSQL/Redis/audit.

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CoreAuditModule } from '@/backend_auth/auth_core/audit/core-audit.module';
import { CoreDatabaseModule } from '@/backend_auth/auth_core/database/core-database.module';
import { AuthCommandController } from '@/backend_auth/auth_modules/auth/auth_controllers/auth-command.controller';
import { AuthQueryController } from '@/backend_auth/auth_modules/auth/auth_controllers/auth-query.controller';
import { AuthCompatibilityController } from '@/backend_auth/auth_modules/auth/auth_controllers/auth-compatibility.controller';
import { AuthSeeder } from '@/backend_auth/auth_modules/auth/auth.seeder';
import { AuthRefreshSessionEntity } from '@/backend_auth/auth_modules/auth/auth_entities/auth-refresh-session.entity';
import { AuthUserEntity } from '@/backend_auth/auth_modules/auth/auth_entities/auth-user.entity';
import { AuthSessionOrchestrator } from '@/backend_auth/auth_modules/auth/auth_orchestrators/auth-session.orchestrator';
import { AuthRefreshSessionRepository } from '@/backend_auth/auth_modules/auth/auth_repositories/auth-refresh-session.repository';
import { AuthUserRepository } from '@/backend_auth/auth_modules/auth/auth_repositories/auth-user.repository';
import { AuthLoginService } from '@/backend_auth/auth_modules/auth/auth_services/auth-login.service';
import { AuthLogoutService } from '@/backend_auth/auth_modules/auth/auth_services/auth-logout.service';
import { AuthMeService } from '@/backend_auth/auth_modules/auth/auth_services/auth-me.service';
import { AuthRefreshRevocationService } from '@/backend_auth/auth_modules/auth/auth_services/auth-refresh-revocation.service';
import { AuthRefreshService } from '@/backend_auth/auth_modules/auth/auth_services/auth-refresh.service';
import { AuthCoreModule } from '@/backend_auth/auth_core/auth-core.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthUserEntity, AuthRefreshSessionEntity]),
    AuthCoreModule
  ],
  controllers: [AuthCommandController, AuthQueryController, AuthCompatibilityController],
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
