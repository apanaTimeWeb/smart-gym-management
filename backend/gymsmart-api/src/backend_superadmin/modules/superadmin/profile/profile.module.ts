// RESPONSIBILITY: Registers the profile feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminProfileEntity } from '@/backend_superadmin/modules/superadmin/profile/profile.entity';
import { ProfileRepository } from '@/backend_superadmin/modules/superadmin/profile/profile.repository';
import { ProfileQueryController } from '@/backend_superadmin/modules/superadmin/profile/profile-query.controller';
import { ProfileCommandController } from '@/backend_superadmin/modules/superadmin/profile/profile-command.controller';
import { ProfileListService } from '@/backend_superadmin/modules/superadmin/profile/services/profile-list.service';
import { ProfileFindService } from '@/backend_superadmin/modules/superadmin/profile/services/profile-find.service';
import { ProfileCreateService } from '@/backend_superadmin/modules/superadmin/profile/services/profile-create.service';
import { ProfileUpdateService } from '@/backend_superadmin/modules/superadmin/profile/services/profile-update.service';
import { ProfileDeleteService } from '@/backend_superadmin/modules/superadmin/profile/services/profile-delete.service';
import { ProfileMainService } from '@/backend_superadmin/modules/superadmin/profile/services/profile-main.service';
import { ProfilePasswordService } from '@/backend_superadmin/modules/superadmin/profile/services/profile-password.service';
import { ProfileTwoFactorService } from '@/backend_superadmin/modules/superadmin/profile/services/profile-two-factor.service';
import { ProfileSpecialController } from '@/backend_superadmin/modules/superadmin/profile/profile-special.controller';
import { ProfileCompatibilityController } from '@/backend_superadmin/modules/superadmin/profile/profile-compatibility.controller';
@Module({
  imports: [TypeOrmModule.forFeature([SuperadminProfileEntity])],
  controllers: [ProfileQueryController, ProfileCommandController, ProfileSpecialController, ProfileCompatibilityController],
  providers: [ProfileRepository, ProfileListService, ProfileFindService, ProfileCreateService, ProfileUpdateService, ProfileDeleteService, ProfilePasswordService, ProfileTwoFactorService, ProfileMainService],
  exports: [ProfileRepository],
})
export class ProfileModule {}
