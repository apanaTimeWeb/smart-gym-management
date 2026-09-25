// RESPONSIBILITY: Registers the isolated Superadmin authentication feature.
// FLOW: SuperadminAuthController -> SuperadminAuthService -> SuperadminAuthRepository -> core JWT/Redis infrastructure.
import { Global, Module } from '@nestjs/common';
import { SuperadminAuthController } from '@/backend_superadmin/superadmin_modules/auth/superadmin-auth.controller';
import { SuperadminAuthService } from '@/backend_superadmin/superadmin_modules/auth/superadmin-auth.service';
import { SuperadminAuthRepository } from '@/backend_superadmin/superadmin_modules/auth/superadmin-auth.repository';

@Global()
@Module({ controllers: [SuperadminAuthController], providers: [SuperadminAuthService, SuperadminAuthRepository], exports: [SuperadminAuthService, SuperadminAuthRepository] })
export class SuperadminAuthModule {}
