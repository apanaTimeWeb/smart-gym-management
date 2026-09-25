// RESPONSIBILITY: Registers the profile feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { SuperadminProfileAdvancedQueryController } from '@/backend_superadmin/superadmin_modules/profile/superadmin-profile-advanced-query.controller';
import { SuperadminProfileSecurityCommandController } from '@/backend_superadmin/superadmin_modules/profile/superadmin-profile-security-command.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminProfileEntity } from '@/backend_superadmin/superadmin_modules/profile/superadmin-profile.entity';
import { SuperadminProfileRepository } from '@/backend_superadmin/superadmin_modules/profile/superadmin-profile.repository';
import { SuperadminProfileQueryController } from '@/backend_superadmin/superadmin_modules/profile/superadmin-profile-query.controller';
import { SuperadminProfileCommandController } from '@/backend_superadmin/superadmin_modules/profile/superadmin-profile-command.controller';
import { SuperadminProfileListService } from '@/backend_superadmin/superadmin_modules/profile/profile_services/superadmin-profile-list.service';
import { SuperadminProfileFindService } from '@/backend_superadmin/superadmin_modules/profile/profile_services/superadmin-profile-find.service';
import { SuperadminProfileCreateService } from '@/backend_superadmin/superadmin_modules/profile/profile_services/superadmin-profile-create.service';
import { SuperadminProfileUpdateService } from '@/backend_superadmin/superadmin_modules/profile/profile_services/superadmin-profile-update.service';
import { SuperadminProfileDeleteService } from '@/backend_superadmin/superadmin_modules/profile/profile_services/superadmin-profile-delete.service';
import { SuperadminProfileMainService } from '@/backend_superadmin/superadmin_modules/profile/profile_services/superadmin-profile-main.service';
import { SuperadminProfilePasswordService } from '@/backend_superadmin/superadmin_modules/profile/profile_services/superadmin-profile-password.service';
import { SuperadminProfileTwoFactorService } from '@/backend_superadmin/superadmin_modules/profile/profile_services/superadmin-profile-two-factor.service';
/**
 * Primary Intent: Defines SuperadminProfileModule as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Module({
  imports: [TypeOrmModule.forFeature([SuperadminProfileEntity])],
  controllers: [SuperadminProfileSecurityCommandController, SuperadminProfileAdvancedQueryController, SuperadminProfileCommandController, SuperadminProfileQueryController],
  providers: [SuperadminProfileRepository, SuperadminProfileListService, SuperadminProfileFindService, SuperadminProfileCreateService, SuperadminProfileUpdateService, SuperadminProfileDeleteService, SuperadminProfilePasswordService, SuperadminProfileTwoFactorService, SuperadminProfileMainService],
  exports: [SuperadminProfileRepository],
})
/**
 * Primary Intent: Defines SuperadminProfileModule, the focused backend component for its owning feature or infrastructure boundary.
 * Edge Cases: Preserve validation/tenant/transaction/authorization invariants. Side-Effects: Only documented effects are permitted.
 * AI-Note: Keep this class isolated, dependency-injected, explicitly typed, and aligned with the frozen contract.
 */
export class SuperadminProfileModule {}
