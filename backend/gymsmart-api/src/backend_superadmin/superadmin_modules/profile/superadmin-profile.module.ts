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
import { SuperadminProfileListService } from '@/backend_superadmin/superadmin_modules/profile/services/superadmin-profile-list.service';
import { SuperadminProfileFindService } from '@/backend_superadmin/superadmin_modules/profile/services/superadmin-profile-find.service';
import { SuperadminProfileCreateService } from '@/backend_superadmin/superadmin_modules/profile/services/superadmin-profile-create.service';
import { SuperadminProfileUpdateService } from '@/backend_superadmin/superadmin_modules/profile/services/superadmin-profile-update.service';
import { SuperadminProfileDeleteService } from '@/backend_superadmin/superadmin_modules/profile/services/superadmin-profile-delete.service';
import { SuperadminProfileMainService } from '@/backend_superadmin/superadmin_modules/profile/services/superadmin-profile-main.service';
import { SuperadminProfilePasswordService } from '@/backend_superadmin/superadmin_modules/profile/services/superadmin-profile-password.service';
import { SuperadminProfileTwoFactorService } from '@/backend_superadmin/superadmin_modules/profile/services/superadmin-profile-two-factor.service';
@Module({
  imports: [TypeOrmModule.forFeature([SuperadminProfileEntity])],
  controllers: [SuperadminProfileQueryController, SuperadminProfileCommandController, SuperadminProfileAdvancedQueryController, SuperadminProfileSecurityCommandController],
  providers: [SuperadminProfileRepository, SuperadminProfileListService, SuperadminProfileFindService, SuperadminProfileCreateService, SuperadminProfileUpdateService, SuperadminProfileDeleteService, SuperadminProfilePasswordService, SuperadminProfileTwoFactorService, SuperadminProfileMainService],
  exports: [SuperadminProfileRepository],
})
export class SuperadminProfileModule {}