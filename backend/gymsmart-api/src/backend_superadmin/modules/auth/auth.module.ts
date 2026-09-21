// RESPONSIBILITY: Registers the isolated Superadmin authentication feature.
// FLOW: AuthController -> AuthService -> AuthRepository -> core JWT/Redis infrastructure.
import { Module } from '@nestjs/common';
import { AuthController } from '@/backend_superadmin/modules/auth/auth.controller';
import { AuthService } from '@/backend_superadmin/modules/auth/auth.service';
import { AuthRepository } from '@/backend_superadmin/modules/auth/auth.repository';
@Module({ controllers: [AuthController], providers: [AuthService, AuthRepository], exports: [AuthService] })
export class AuthModule {}
