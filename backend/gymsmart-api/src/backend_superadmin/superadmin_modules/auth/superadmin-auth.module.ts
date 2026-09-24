// RESPONSIBILITY: Registers the isolated Superadmin authentication feature.
// FLOW: SuperadminAuthController -> SuperadminAuthService -> SuperadminAuthRepository -> core JWT/Redis infrastructure.
import { Module } from '@nestjs/common';
import { SuperadminAuthController } from '@/backend_superadmin/superadmin_modules/auth/superadmin-auth.controller';
import { SuperadminAuthService } from '@/backend_superadmin/superadmin_modules/auth/superadmin-auth.service';
import { SuperadminAuthRepository } from '@/backend_superadmin/superadmin_modules/auth/superadmin-auth.repository';
/**
 * Primary Intent: Defines SuperadminAuthModule as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Module({ controllers: [SuperadminAuthController], providers: [SuperadminAuthService, SuperadminAuthRepository], exports: [SuperadminAuthService] })
export class SuperadminAuthModule {}
