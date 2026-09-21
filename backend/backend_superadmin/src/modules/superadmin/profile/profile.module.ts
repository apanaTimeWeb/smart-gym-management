// RESPONSIBILITY: Registers the profile feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminProfileEntity } from '@/modules/superadmin/profile/profile.entity';
import { ProfileRepository } from '@/modules/superadmin/profile/profile.repository';
import { ProfileQueryController } from '@/modules/superadmin/profile/profile-query.controller';
import { ProfileCommandController } from '@/modules/superadmin/profile/profile-command.controller';
import { ProfileListService } from '@/modules/superadmin/profile/services/profile-list.service';
import { ProfileFindService } from '@/modules/superadmin/profile/services/profile-find.service';
import { ProfileCreateService } from '@/modules/superadmin/profile/services/profile-create.service';
import { ProfileUpdateService } from '@/modules/superadmin/profile/services/profile-update.service';
import { ProfileDeleteService } from '@/modules/superadmin/profile/services/profile-delete.service';
import { ProfileMainService } from '@/modules/superadmin/profile/services/profile-main.service';
import { ProfilePasswordService } from '@/modules/superadmin/profile/services/profile-password.service';
import { ProfileTwoFactorService } from '@/modules/superadmin/profile/services/profile-two-factor.service';
import { ProfileSpecialController } from '@/modules/superadmin/profile/profile-special.controller';
@Module({
  imports: [TypeOrmModule.forFeature([SuperadminProfileEntity])],
  controllers: [ProfileQueryController, ProfileCommandController, ProfileSpecialController],
  providers: [ProfileMainService, ProfileUpdateService, ProfilePasswordService, ProfileTwoFactorService, ProfileRepository, ProfileListService, ProfileFindService, ProfileCreateService, ProfileUpdateService, ProfileDeleteService],
  exports: [ProfileRepository],
})
export class ProfileModule {}
